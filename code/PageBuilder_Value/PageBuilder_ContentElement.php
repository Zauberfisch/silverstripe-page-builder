<?php

/**
 * Class PageBuilder_AbstractContentElement
 
 */
class PageBuilder_ContentElement extends DataObject {
	public function getPageBuilderPopupFields() {
		return new FieldList();
	}
	
	public function forTemplate() {
		$templates = SSViewer::get_templates_by_class($this->class, '', __CLASS__);
		if (!$templates) {
			throw new Exception("No template found for {$this->class}");
		}
		return $this->renderWith($templates);
	}
	
	public function PageBuilderPreview() {
		return $this->getTitle();
	}
}
