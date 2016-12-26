<?php

/**
 * @author zauberfisch
 * @method SerializedDataList|PageBuilder_Value_Block[] getBlocks
 * @method $this setBlocks(SerializedDataList $blocks)
 */
class PageBuilder_Value_Block_BlockGroup extends PageBuilder_Value_Block {
	private static $lists = [
		'Blocks',
	];

	public function getPageBuilderFields($prefix, $pageBuilder,  $blockPosition = 0, $parent = null) {
		$fields = parent::getPageBuilderFields($prefix, $pageBuilder, $blockPosition, $parent);
		$name = $this->getName();
		$i = 0;
		$fields->push(
			(new PageBuilder_CompositeField(
				array_map(function (PageBuilder_Value_Block $block) use ($prefix, $pageBuilder, &$i, $name) {
					return $block->getPageBuilderFields($prefix, $pageBuilder, $i++, $name);
				}, $this->getBlocks()->toArray())
			))->addExtraClass('PageBuilder_Value_Block_BlockGroup-Blocks')
		);
		$fields->push(
			(new FormAction(
				$this->getNameForField($prefix, 'AddButton'),
				_t('PageBuilder_Value_Block_BlockGroup.AddButton', 'add block')
			))
				->setUseButtonTag(true)
				->addExtraClass('PageBuilder_Value_Block_BlockGroup-AddButton')
				->addExtraClass('font-icon-plus')
		);
		return $fields;
	}

	public function BlocksForTemplate() {
		$rowDesktop = 0;
		$rowTablet = 0;
		$blocks = [];
		foreach (array_values($this->getBlocks()->toArray()) as $i => $_block) {
			/** @var PageBuilder_Value_Block $block */
			$block = clone $_block;
			//$block->setMaxWidthDesktop($this->getWidthDesktop());
			//$block->setMaxWidthTablet($this->getWidthTablet());
			foreach (array_reverse(ClassInfo::ancestry($block->class)) as $class) {
				$baseClass = 'PageBuilder_Value_Block';
				if ($class == $baseClass) {
					break;
				}
				$block->addExtraClass(str_replace($baseClass . '_', '', $class));
			}
			$desktop = (int)$block->getWidthDesktop();
			$tablet = (int)$block->getWidthTablet();
			$desktopMax = (int)$this->getWidthDesktop();
			$tabletMax = (int)$this->getWidthTablet();
			$block->addExtraClass('grid-column');
			$block->addExtraClass("grid-column-desktop-$desktop");
			$block->addExtraClass("grid-column-desktop-context-$desktopMax");
			//$block->addExtraClass("grid-column-desktop-n-of-$desktopMax");
			//$block->addExtraClass("grid-column-desktop-$desktop-of-$desktopMax");
			$block->addExtraClass("grid-column-tablet-$tablet");
			$block->addExtraClass("grid-column-tablet-context-$tabletMax");
			//$block->addExtraClass("grid-column-tablet-$tablet-of-$tabletMax");
			//$block->addExtraClass("grid-column-tablet-$tablet-of-n");
			if ($block->is_a(__CLASS__)) {
				$block->addExtraClass('grid-column-container');
			}
			$rowDesktop += $desktop;
			if ($i == 0 || $rowDesktop > $desktopMax) {
				// item can't fit into current row, place it on next row
				$block->addExtraClass('grid-desktop-clear');
				$rowDesktop = $desktop;
				if ($i) {
					$blocks[$i - 1]->addExtraClass('grid-desktop-last');
				}
			}
			$rowTablet += $tablet;
			if ($i == 0 || $rowTablet > $tabletMax) {
				// item can't fit into current row, place it on next row
				$block->addExtraClass('grid-tablet-clear');
				$rowTablet = $tablet;
				if ($i) {
					$blocks[$i - 1]->addExtraClass('grid-tablet-last');
				}
			}
			$blocks[] = $block;
		}
		$count = count($blocks);
		if ($count > 0 && $rowDesktop == (int)$this->getWidthDesktop()) {
		//if ($rowDesktop == 12) {
			$blocks[$count - 1]->addExtraClass('grid-desktop-last');
		}
		if ($count > 0 && $rowTablet == (int)$this->getWidthTablet()) {
		//if ($rowTablet == 12) {
			$blocks[$count - 1]->addExtraClass('grid-tablet-last');
		}
		return new ArrayList($blocks);
	}
}
