<?php

namespace zauberfisch\PageBuilder\Model\Block;

/**
 * @author zauberfisch
 * @method string getContentElementID
 * @method $this setContentElementID(string $id)
 * @method string getContentElementVersionGroupID
 * @method $this setContentElementVersionGroupID(string $id)
 */
class ContentElement extends AbstractBlock {
	private static $fields = [
		'ContentElementID',
		'ContentElementVersionGroupID',
	];
	protected $_contentElement;
	
	/**
	 * @param mixed $contentElement
	 * @return ContentElement
	 */
	public function setContentElement($contentElement) {
		$this->_contentElement = $contentElement;
		if ($contentElement->hasField('ID') && $contentElement->ID) {
			$this->setContentElementID($contentElement->ID);
		}
		return $this;
	}
	
	/**
	 * @return \PageBuilder_Model_ContentElement_AbstractContentElement
	 */
	public function getContentElement() {
		if (!$this->_contentElement && $this->getContentElementID()) {
			/** @var \PageBuilder_Model_ContentElement_AbstractContentElement $obj */
			$obj = \PageBuilder_Model_ContentElement_AbstractContentElement::get()->byID($this->getContentElementID());
			if ($obj && $obj->exists()) {
				$this->_contentElement = $obj;
			}
		}
		return $this->_contentElement;
	}
	
	public function getContentElementForTemplate() {
		$obj = $this->getContentElement();
		if ($obj) {
			return $obj->customise([
				'MetaData' => $this,
			]);
		}
		return null;
	}
	
	public function getBlockDescription() {
		$obj = $this->getContentElement();
		if ($obj) {
			return $obj->i18n_singular_name();
		}
		return _t(static::class . '.NoContentElement', 'ERROR');
	}
	
	public static function get_create_options() {
		$elementClasses = \ClassInfo::subclassesFor(\PageBuilder_Model_ContentElement_AbstractContentElement::class);
		$options = [];
		$class = __CLASS__;
		foreach ($elementClasses as $elementClass) {
			if ($elementClass != \PageBuilder_Model_ContentElement_AbstractContentElement::class) {
				$options["$class.$elementClass"] = [
					'Title' => singleton($elementClass)->i18n_singular_name(),
					'Callback' => function () use ($class, $elementClass) {
						/** @var ContentElement $block */
						$block = new $class();
						/** @var \PageBuilder_Model_ContentElement_AbstractContentElement $elementObj */
						$elementObj = new $elementClass();
						$elementObj->write();
						$block->setContentElementVersionGroupID($elementObj->VersionGroupID);
						$block->setContentElementID($elementObj->ID);
						return $block;
					},
				];
			}
		}
		return $options;
	}
	
	public function getPageBuilderFields($prefix, $pageBuilder, $blockPosition = 0, $parent = null) {
		$return = parent::getPageBuilderFields($prefix, $pageBuilder, $blockPosition, $parent);
		$obj = $this->getContentElement();
		$return->push(new \HiddenField($this->getNameForField($prefix, 'ContentElementID'), '', $this->getContentElementID()));
		$return->push(new \HiddenField($this->getNameForField($prefix, 'ContentElementVersionGroupID'), '', $this->getContentElementVersionGroupID()));
		// not using \zauberfisch\PageBuilder\Form\CompositeField on purpose
		$return->push((new \CompositeField([
			new \LiteralField(
				$this->getNameForField($prefix, 'Preview'),
				$obj ? $obj->PageBuilderPreview() : _t('PageBuilder_Value_Block_ContentElement.NoContentElement', 'Content not found')
			),
		]))->addExtraClass('PageBuilder_Value_Block-Preview'));
		$return->push(
			(new \FormAction(
				$this->getNameForField($prefix, 'Edit'),
				_t('PageBuilder_Value_Block_ContentElement.Edit', 'edit block content')
			))
				->setUseButtonTag(true)
				->addExtraClass('PageBuilder_Value_Block-Edit')
				->addExtraClass('font-icon-edit-write')
				->setAttribute('data-id', $this->getContentElementID())
				->setAttribute('data-version-group-id', $this->getContentElementVersionGroupID())
				->setAttribute('data-edit-url', $pageBuilder->getContentElementEditLink($this->getContentElementVersionGroupID(), $this->getContentElementID()))
		);
		return $return;
	}
	
	protected function getClassNameForExtraClass() {
		$return = parent::getClassNameForExtraClass();
		$obj = $this->getContentElement();
		if ($obj) {
			$return = array_merge($return, $obj->getClassNameForExtraClass());
		}
		return $return;
	}
}
