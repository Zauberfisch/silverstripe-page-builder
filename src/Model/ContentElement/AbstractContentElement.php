<?php

//namespace zauberfisch\PageBuilder\Model\ContentElement;

/**
 * DataObject classes can not be namespaced in SilverStripe 3.x
 *
 * @author zauberfisch
 */
class PageBuilder_Model_ContentElement_AbstractContentElement extends \PersistentDataObject_Model_DataObject {
//class AbstractContentElement extends \DataObject {
	protected $block;

	public function getPageBuilderPopupFields() {
		$fields = new \FieldList();
		$this->extend('updatePageBuilderPopupFields', $fields);
		return $fields;
	}
	
	public function forTemplate() {
		$templates = \SSViewer::get_templates_by_class($this->class, '', __CLASS__);
		if (!$templates) {
			throw new \Exception("No template found for {$this->class}");
		}
		return $this->renderWith($templates);
	}
	
	public function PageBuilderPreview() {
		return $this->getTitle();
	}
	
	/**
	 * Compiles all CSS-classes, used by Block->extraClass()
	 *
	 * @return array
	 */
	public function getClassNameForExtraClass() {
		$classes = [];
		foreach (array_reverse(\ClassInfo::ancestry($this->class)) as $class) {
			if ($class == self::class) {
				break;
			}
			$class = explode('_ContentElement_', $class, 2);
			$classes[] = 'ContentElement-' . end($class);
		}
		return $classes;
	}
	
	public function i18n_singular_name() {
		$class = explode('ContentElement_', $this->class);
		$class = $class[count($class) - 1];
		return _t("{$this->class}.SINGULARNAME", FormField::name_to_label($class));
	}
	
	/**
	 * @param \zauberfisch\PageBuilder\Model\Block\ContentElement $block
	 * @return PageBuilder_Model_ContentElement_AbstractContentElement
	 */
	public function setBlock($block) {
		$this->block = $block;
		return $this;
	}
	
	/**
	 * @return \zauberfisch\PageBuilder\Model\Block\ContentElement
	 */
	public function getBlock() {
		return $this->block;
	}
}
