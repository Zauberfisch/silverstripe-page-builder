<?php

namespace zauberfisch\PageBuilder\Model\Block;

use zauberfisch\NamespaceTemplates\Form\CompositeField;
use zauberfisch\SerializedDataObject\ArrayList;

/**
 * @author zauberfisch
 * @method ArrayList|AbstractBlock[] getBlocks
 * @method $this setBlocks(ArrayList $blocks)
 */
class Group extends AbstractBlock {
	private static $lists = [
		'Blocks',
	];

	public function getPageBuilderFields($prefix, $pageBuilder, $blockPosition = 0, $parent = null) {
		$fields = parent::getPageBuilderFields($prefix, $pageBuilder, $blockPosition, $parent);
		$name = $this->getName();
		$i = 0;
		$fields->push(
			(new CompositeField(
				array_map(function (AbstractBlock $block) use ($prefix, $pageBuilder, &$i, $name) {
					return $block->_getPageBuilderFields($prefix, $pageBuilder, $i++, $name);
				}, $this->getBlocks()->toArray())
			))->addExtraClass('PageBuilder_Value_Block_BlockGroup-Blocks')
		);
		$fields->push(
			(new \FormAction(
				$this->getNameForField($prefix, 'AddButton'),
				_t('PageBuilder_Value_Block_Group.AddButton', 'add block')
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
		$i = 0;
		if ($this->getBlocks()) {
			foreach (array_values($this->getBlocks()->toArray()) as $_block) {
				/** @var AbstractBlock|BlockProvider $_block */
				$_blocks = $_block->is_a(BlockProvider::class) ? $_block->getExtraBlocks() : [$_block];
				foreach ($_blocks as $block) {
					//$block->setMaxWidthDesktop($this->getWidthDesktop());
					//$block->setMaxWidthTablet($this->getWidthTablet());
					$desktop = (int)$block->getWidthDesktop();
					$tablet = (int)$block->getWidthTablet();
					$desktopMax = (int)$this->getWidthDesktop();
					$tabletMax = (int)$this->getWidthTablet();
					if ($this->is_a(Base::class)) {
						$block->addExtraClass('grid-column-top-level');
					}
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
						$block->addExtraClass('grid-column-group');
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
					$i++;
				}
			}
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
		$this->extend('updateBlocksForTemplate', $blocks);
		return new \ArrayList($blocks);
	}

	public function duplicate() {
		$new = parent::duplicate();
		$blocks = [];
		foreach ($this->getBlocks() as $block) {
			$blocks[] = $block->duplicate();
		}
		$this->setBlocks(new ArrayList($blocks));
		return $new;
	}
}
