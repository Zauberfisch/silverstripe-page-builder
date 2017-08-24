<?php

namespace zauberfisch\PageBuilder\Model\Block;

/**
 * @author zauberfisch
 */
class Base extends Group {
	public static function get_create_options() {
		return [];
	}
	
	public function getField($name) {
		return $name = in_array($name, ['WidthDesktop', 'WidthTablet']) ? 12 : parent::getField($name);
	}
	
	function getPageBuilderFields($prefix, $pageBuilder, $blockPosition = 0, $parent = null) {
		$fields = parent::getPageBuilderFields($prefix, $pageBuilder, $blockPosition, $parent);
		$fields->removeByName($this->getNameForField($prefix, 'Widths'));
		$fields->removeByName($this->getNameForField($prefix, 'Controls'));
		$fields->removeByName($this->getNameForField($prefix, 'ClassNameInfo'));
		return $fields;
	}
	
	public function extraClass() {
		$this->addExtraClass('grid-base');
		return parent::extraClass();
	}
}
