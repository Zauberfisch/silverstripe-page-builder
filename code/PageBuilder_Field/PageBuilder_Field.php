<?php

/**
 * @author zauberfisch
 */
class PageBuilder_Field extends FormField {
	public function __construct($name, $title = null, $value = null) {
		parent::__construct($name, $title, $value);
		$this->addExtraClass('stacked');
	}

	public function setValue($val) {
		if (is_a($val, 'PageBuilder_DBField')) {
			$this->value = $val;
		} else {
			$this->value = new PageBuilder_DBField();
			$this->value->setValue('', null, true);
			if ($val) {
				// value is an array after form submission, lets turn it into an object
				if (is_array($val)) {
					$this->value->setValue($this->createValueFromArray($val));
				} elseif (is_string($val)) {
					$this->value->setValue($val);
				} else {
					throw new Exception('unexpected value');
				}
			}
		}
		return $this;
	}

	public function Value() {
		$return = parent::Value();
		if (!$return) {
			$this->setValue(null);
			$return = parent::Value();
		}
		return $return;
	}

	public function createValueFromArray($array) {
		$baseUID = '';
		$base = null;
		$blocksByParent = [];
		foreach ($array as $uid => $blockArray) {
			if (isset($blockArray['ClassName'])) {
				if (!in_array($blockArray['ClassName'], ClassInfo::subclassesFor('PageBuilder_Value_Block'))) {
					throw new Exception(sprintf('Invalid class name "%s"', $blockArray['ClassName']));
				}
				/** @var PageBuilder_Value_Block $block */
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
			throw new Exception('PageBuilder is missing the base block');
		}
		/**
		 * @param PageBuilder_Value_Block_BlockGroup $parent
		 * @param array $blocks
		 * @return PageBuilder_Value_Block_BlockGroup
		 */
		$nestBlock = function ($parent, $blocks) use ($blocksByParent, &$nestBlock) {
			ksort($blocks);
			$_blocks = [];
			foreach ($blocks as $childBlock) {
				//$childBlock['Block']->setMaxWidthDesktop($parent->getWidthDesktop());
				//$childBlock['Block']->setMaxWidthTablet($parent->getWidthTablet());
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
			$parent->setBlocks(new SerializedDataList($_blocks));
			return $parent;
		};
		if (isset($blocksByParent[$baseUID])) {
			$base = $nestBlock($base, $blocksByParent[$baseUID]);
		}
		return $base;
	}

	public function getAttributes() {
		return $this->attributes;
	}

	public function FieldHolder($properties = []) {
		$this->addExtraClass('PageBuilder_Field');
		$this->setAttribute('data-name', $this->getName());
		$this->setAttribute('data-grid-mode', 'desktop');
		$this->setAttribute('data-config', json_encode([
			'urls' => [
				'add' => $this->Link('handleBlock/add'),
				//'group' => [
				//	'create' => $this->Link('handleGroup/createNew'),
				//	'createFromTemplate' => $this->Link('handleGroup/createFromTemplate'),
				////'createFromTemplate' => $this->Link('newFromTemplate'),
				//],
				//'block' => [
				//	'create' => $this->Link('handleBlock'),
				//	'edit' => $this->Link('handleBlock/edit'),
				//],
			],
		]));
		return parent::FieldHolder($properties);
	}

	public function Field($properties = []) {
		$val = $this->Value();
		if ($val && is_a($val->getValue(), 'PageBuilder_Value_Block_BlockGroup_Base')) {
			/** @var PageBuilder_Value_Block_BlockGroup_Base $baseBlock */
			$baseBlock = $val->getValue();
			return $baseBlock->getPageBuilderFields($this->getName(), $this);
			//foreach ($val->getValue() as $i => $group) {
			//	/** @var PageBuilder_Value_BlockGroup_Grid $group */
			//	$groupsFields[] = $group->getPageBuilderGridFields($this->getName(), $i);
			//}
		}
		throw new Exception('PageBuilder_Field does not have a base block');
		//return new LiteralField($this->getName(), '');

		//return (new PageBuilder_CompositeField([
		//	(new PageBuilder_CompositeField($groupsFields))
		//		->addExtraClass('PageBuilder_Field-BlockGroups'),
		//	(new FormAction(sprintf('%s[groups][%s]', $this->getName(), 'add'), _t('PageBuilder_Field.BlockGroup-Add', 'add new block group')))
		//		->setUseButtonTag(true)
		//		->addExtraClass('PageBuilder_Field-BlockGroup-Add')
		//		->addExtraClass('font-icon-plus'),
		//]))
		//	->addExtraClass('PageBuilder_Field')
		//	->addExtraClass('PageBuilder_Field_HasMany')
		//	->setAttribute('data-config', json_encode([
		//		'urls' => [
		//			'group' => [
		//				'create' => $this->Link('handleGroup/createNew'),
		//				'createFromTemplate' => $this->Link('handleGroup/createFromTemplate'),
		//				//'createFromTemplate' => $this->Link('newFromTemplate'),
		//			],
		//			'block' => [
		//				'create' => $this->Link('handleBlock'),
		//				'edit' => $this->Link('handleBlock/edit'),
		//			],
		//		],
		//	]));
	}

	public function saveInto(DataObjectInterface $record) {
		$record->{$this->name} = $this->Value();
	}

	private static $allowed_actions = [
		'handleBlock',
		'handleContentElement',
	];

	public function handleBlock(SS_HTTPRequest $r) {
		return new PageBuilder_Field_Handler_Block($this);
	}

	public function handleContentElement(SS_HTTPRequest $r) {
		return new PageBuilder_Field_Handler_ContentElement($this);
	}
	
	public function getContentElementEditLink($id) {
		return Controller::join_links($this->Link('handleContentElement'), $id);
	}
	public function getContentElementPreviewLink($id) {
		return Controller::join_links($this->Link('handleContentElement'), $id, 'PageBuilderPreview');
	}
}
