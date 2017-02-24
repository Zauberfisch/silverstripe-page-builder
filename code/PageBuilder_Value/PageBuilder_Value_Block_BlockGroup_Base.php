<?php

/**
 * @author zauberfisch
 */
class PageBuilder_Value_Block_BlockGroup_Base extends PageBuilder_Value_Block_BlockGroup {
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
		return 'grid-base' . parent::extraClass();
	}
}
