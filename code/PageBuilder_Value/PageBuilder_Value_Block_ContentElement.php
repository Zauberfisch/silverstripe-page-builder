<?php

/**
 * @author zauberfisch
 * @method string getContentElementID
 * @method $this setContentElementID(string $id)
 */
class PageBuilder_Value_Block_ContentElement extends PageBuilder_Value_Block {
	private static $fields = [
		'ContentElementID',
	];
	protected $_contentElement;
	
	/**
	 * @return PageBuilder_ContentElement
	 */
	public function getContentElement() {
		if (!$this->_contentElement && $this->getContentElementID()) {
			/** @var PageBuilder_ContentElement $obj */
			$obj = PageBuilder_ContentElement::get()->byID($this->getContentElementID());
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
		return $obj ? $obj->i18n_singular_name() : parent::getBlockDescription();
	}
	
	public static function get_create_options() {
		$elementClasses = ClassInfo::subclassesFor('PageBuilder_ContentElement');
		$options = [];
		$class = __CLASS__;
		foreach ($elementClasses as $elementClass) {
			if ($elementClass != 'PageBuilder_ContentElement') {
				$options["$class.$elementClass"] = [
					'Title' => singleton($elementClass)->i18n_singular_name(),
					'Callback' => function () use ($class, $elementClass) {
						/** @var PageBuilder_Value_Block_ContentElement $block */
						$block = new $class();
						/** @var PageBuilder_ContentElement $elementObj */
						$elementObj = new $elementClass();
						$elementObj->write();
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
		$return->push(new HiddenField($this->getNameForField($prefix, 'ContentElementID'), '', $this->getContentElementID()));
		$return->push((new CompositeField([
			new LiteralField(
				$this->getNameForField($prefix, 'Preview'),
				$obj ? $obj->PageBuilderPreview() : _t('PageBuilder_Value_Block_ContentElement.NoContentElement', 'Content not found')
			),
		]))->addExtraClass('PageBuilder_Value_Block-Preview'));
		$return->push(
			(new FormAction(
				$this->getNameForField($prefix, 'Edit'),
				_t('PageBuilder_Value_Block_ContentElement.Edit', 'edit block content')
			))
				->setUseButtonTag(true)
				->addExtraClass('PageBuilder_Value_Block-Edit')
				->addExtraClass('font-icon-edit-write')
				->setAttribute('data-id', $this->getContentElementID())
				->setAttribute('data-edit-url', $pageBuilder->getContentElementEditLink($this->getContentElementID()))
				->setAttribute('data-preview-url', $pageBuilder->getContentElementPreviewLink($this->getContentElementID()))
		);
		return $return;
	}
}
