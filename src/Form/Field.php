<?php

namespace zauberfisch\PageBuilder\Form;

use zauberfisch\NamespaceTemplates\Form\FormField;
use zauberfisch\PageBuilder\Form\RequestHandler\Block as RequestHandler_Block;
use zauberfisch\PageBuilder\Form\RequestHandler\ContentElement as RequestHandler_ContentElement;
use zauberfisch\PageBuilder\Model as Model;
use zauberfisch\SerializedDataObject\ArrayList;

/**
 * @author zauberfisch
 */
class Field extends FormField {
	public function __construct($name, $title = null, $value = null) {
		parent::__construct($name, $title, $value);
		$this->addExtraClass('stacked');
	}
	
	/**
	 * @param Model\DBField|array|string $val
	 * @return $this
	 * @throws \Exception
	 */
	public function setValue($val) {
		if (is_a($val, Model\DBField::class)) {
			$this->value = $val;
		} else {
			$this->value = new Model\DBField();
			$this->value->setValue('', null, true);
			if ($val) {
				// value is an array after form submission, lets turn it into an object
				if (is_array($val)) {
					$this->value->setValue($this->createValueFromArray($val));
				} elseif (is_string($val)) {
					$this->value->setValue($val);
				} else {
					throw new \Exception('unexpected value');
				}
			}
		}
		return $this;
	}
	
	/**
	 * @return Model\DBField
	 */
	public function Value() {
		$return = parent::Value();
		if (!$return) {
			$this->setValue(null);
			$return = parent::Value();
		}
		return $return;
	}
	
	/**
	 * @param array $array
	 * @return null|Model\Block\AbstractBlock|Model\Block\Base|Model\Block\Group
	 * @throws \Exception
	 */
	public function createValueFromArray($array) {
		$baseUID = '';
		/** @var Model\Block\Base $base */
		$base = null;
		$blocksByParent = [];
		foreach ($array as $uid => $blockArray) {
			if (isset($blockArray['ClassName'])) {
				if (!in_array($blockArray['ClassName'], \ClassInfo::subclassesFor(Model\Block\AbstractBlock::class))) {
					throw new \Exception(sprintf('Invalid class name "%s"', $blockArray['ClassName']));
				}
				/** @var Model\Block\AbstractBlock $block */
				$block = new $blockArray['ClassName']();
				$block->update($blockArray);
				//$blocks[$uid] = $block;
				$parentUID = $blockArray['BlockParent'];
				if (!$parentUID) {
					$baseUID = $uid;
					$base = $block;
				} else {
					if (!isset($blocksByParent[$parentUID])) {
						$blocksByParent[$parentUID] = [];
					}
					$blocksByParent[$parentUID][$blockArray['BlockPosition']] = [
						'UID' => $uid,
						'Block' => $block,
					];
				}
			}
		}
		if (!$base) {
			throw new \Exception('PageBuilder is missing the base block');
		}
		/**
		 * @param Model\Block\Group $parent
		 * @param array $blocks
		 * @return Model\Block\Group
		 */
		$nestBlock = function ($parent, $blocks) use ($blocksByParent, &$nestBlock) {
			ksort($blocks);
			$_blocks = [];
			foreach ($blocks as $childBlock) {
				/** @var array|Model\Block\AbstractBlock[] $childBlock */
				$childBlock['Block']->setWidthDesktop(min(
					$childBlock['Block']->getWidthDesktop(),
					$parent->getWidthDesktop()
				));
				$childBlock['Block']->setWidthTablet(min(
					$childBlock['Block']->getWidthTablet(),
					$parent->getWidthTablet()
				));
				if (isset($blocksByParent[$childBlock['UID']])) {
					$_blocks[] = $nestBlock($childBlock['Block'], $blocksByParent[$childBlock['UID']]);
				} else {
					$_blocks[] = $childBlock['Block'];
				}
			}
			$parent->setBlocks(new ArrayList($_blocks));
			return $parent;
		};
		if (isset($blocksByParent[$baseUID])) {
			$base = $nestBlock($base, $blocksByParent[$baseUID]);
			foreach ($base->getBlocks() as $block) {
				$block->setWidthDesktop(12);
				$block->setWidthTablet(12);
			}
		}
		return $base;
	}
	
	/**
	 * @return array
	 */
	public function getAttributes() {
		return $this->attributes;
	}
	
	/**
	 * @return string
	 */
	public function Type() {
		return 'page-builder';
	}
	
	/**
	 * @param array $properties
	 * @return string
	 */
	public function FieldHolder($properties = []) {
		$this->addExtraClass(self::class);
		$this->setAttribute('data-name', $this->getName());
		$this->setAttribute('data-grid-mode', 'desktop');
		$this->setAttribute('data-config', json_encode([
			'urls' => [
				'add' => $this->Link('handleBlock/add'),
			],
		]));
		return parent::FieldHolder($properties);
	}
	
	/**
	 * @param array $properties
	 * @return string
	 * @throws \Exception
	 */
	public function Field($properties = []) {
		$val = $this->Value();
		if ($val && is_a($val->getValue(), Model\Block\Base::class)) {
			/** @var Model\Block\Base $baseBlock */
			$baseBlock = $val->getValue();
			return $baseBlock->_getPageBuilderFields($this->getName(), $this)->FieldHolder();
		}
		throw new \Exception(sprintf('%s does not have a base block', $this->class));
	}
	
	/**
	 * @param \DataObjectInterface $record
	 */
	public function saveInto(\DataObjectInterface $record) {
		$record->{$this->name} = $this->Value();
	}
	
	private static $allowed_actions = [
		'handleBlock',
		'handleContentElement',
	];
	
	/**
	 * @return RequestHandler_Block
	 */
	public function handleBlock() {
		return new RequestHandler_Block($this);
	}
	
	/**
	 * @return RequestHandler_ContentElement
	 */
	public function handleContentElement() {
		return new RequestHandler_ContentElement($this);
	}
	
	/**
	 * @param int $versionGroupID
	 * @param int $id
	 * @return string
	 */
	public function getContentElementEditLink($versionGroupID, $id) {
		return $this->handleContentElement()->LinkForID($versionGroupID, $id);
		//return \Controller::join_links($this->Link('handleContentElement'), $versionGroupID, $id);
	}
}
