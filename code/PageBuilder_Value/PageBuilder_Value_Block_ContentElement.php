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
	
	public function getPageBuilderFields($prefix, $blockPosition = 0, $parent = null) {
		$return = parent::getPageBuilderFields($prefix, $blockPosition, $parent);
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
				->setAttribute('data-edit-type', 'edit-content-element')
		);
		return $return;
	}
	
	public function onAfterCreate() {
		parent::onAfterCreate();
		$class = "{$this->class}_ContentElement";
		/** @var PageBuilder_ContentElement $obj */
		$obj = new $class();
		$obj->write();
		$this->setContentElementID($obj->ID);
	}
}
