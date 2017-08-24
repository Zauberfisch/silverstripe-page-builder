<?php

namespace zauberfisch\PageBuilder\Model\Block;

use zauberfisch\NamespaceTemplates\View\SSViewer;
use zauberfisch\NamespaceTemplates\Form\CompositeField;
use zauberfisch\PageBuilder\Form\Field;
use zauberfisch\SerializedDataObject\AbstractDataObject;

/**
 * @author zauberfisch
 * @method string getWidthDesktop
 * @method string getWidthTablet
 * @method $this setWidthDesktop(string $width)
 * @method $this setWidthTablet(string $width)
 */
abstract class AbstractBlock extends AbstractDataObject {
	private static $fields = [
		'WidthDesktop',
		'WidthTablet',
	];
	protected $name;
	protected $prefix;
	protected $extraClasses = [];
	
	public function getName() {
		if (!$this->name) {
			$this->name = uniqid();
		}
		return $this->name;
	}
	
	public static function get_create_options() {
		$class = get_called_class();
		if ($class != __CLASS__) {
			return [
				$class => [
					'Title' => singleton($class)->i18n_singular_name(),
					'ClassName' => $class,
				],
			];
		}
		return [];
	}
	
	public function getNamePrefixed($prefix) {
		return sprintf('%s[%s]', $prefix, $this->getName());
	}
	
	public function getNameForField($prefix, $fieldName) {
		return sprintf('%s[%s]', $this->getNamePrefixed($prefix), $fieldName);
	}
	
	public function getBlockDescription() {
		return $this->i18n_singular_name();
	}
	
	public function _getPageBuilderFields($prefix, $pageBuilder, $blockPosition = 0, $parent = null) {
		$return = $this->getPageBuilderFields($prefix, $pageBuilder, $blockPosition, $parent);
		$this->extend('updatePageBuilderFields', $return, $prefix, $pageBuilder, $blockPosition, $parent);
		return $return;
	}
	
	/**
	 * @param string $prefix
	 * @param Field $pageBuilder
	 * @param int $blockPosition
	 * @param string $parent
	 * @return CompositeField
	 */
	public function getPageBuilderFields($prefix, $pageBuilder, $blockPosition = 0, $parent = null) {
		$classes = [];
		foreach (array_reverse(\ClassInfo::ancestry($this->class)) as $class) {
			$classes[] = $class;
			if ($class == __CLASS__) {
				break;
			}
		}
		return (new CompositeField([
			(new \LabelField($this->getNameForField($prefix, 'ClassNameInfo'), $this->getBlockDescription()))
				->addExtraClass('PageBuilder_Value_Block-ClassNameInfo'),
			(new CompositeField([
				//(new \FormAction($this->getNameForField($prefix, 'EditColumns'), ''))
				//	->setUseButtonTag(true)
				//	->addExtraClass('PageBuilder_Value_Block-EditColumns')
				//	->addExtraClass('font-icon-columns'),
				new \LiteralField($this->getNameForField($prefix, 'Reorder'), '<div class="PageBuilder_Value_Block-Reorder"></div>'),
				(new \FormAction($this->getNameForField($prefix, 'Delete'), ''))
					->setUseButtonTag(true)
					->addExtraClass('PageBuilder_Value_Block-Delete')
					->addExtraClass('font-icon-cancel-circled')
					->setAttribute('data-confirm', _t('PageBuilder_Value_Block.ConfirmDelete', 'Are you sure you want to delete this block?')),
				//(new FormAction($this->getNameForField($prefix, 'Edit'), ''))
				//	->setUseButtonTag(true)
				//	->addExtraClass('PageBuilder_Value_Block-Edit')
				//	->addExtraClass('font-icon-edit-write'),
				(new CompositeField([
					(new \TextField($this->getNameForField($prefix, 'WidthDesktop'), $this->fieldLabel('WidthDesktop'), $this->getWidthDesktop()))
						->setAttribute('type', 'number')
						->setAttribute('min', '1')
						->setAttribute('max', '12')
						->addExtraClass('PageBuilder_Value_Block-Width PageBuilder_Value_Block-WidthDesktop'),
					(new \TextField($this->getNameForField($prefix, 'WidthTablet'), $this->fieldLabel('WidthTablet'), $this->getWidthTablet()))
						->setAttribute('type', 'number')
						->setAttribute('min', '1')
						->setAttribute('max', '12')
						->addExtraClass('PageBuilder_Value_Block-Width PageBuilder_Value_Block-WidthTablet'),
				]))->addExtraClass('PageBuilder_Value_Block-Widths')->setName($this->getNameForField($prefix, 'Widths')),
				//new InlineFormAction($this->getNameForField($prefix, 'Edit')),
			]))->addExtraClass('PageBuilder_Value_Block-Controls')->setName($this->getNameForField($prefix, 'Controls')),
			new \HiddenField($this->getNameForField($prefix, 'ClassName'), '', $this->class),
			new \HiddenField($this->getNameForField($prefix, 'BlockPosition'), '', $blockPosition),
			new \HiddenField($this->getNameForField($prefix, 'BlockParent'), '', $parent),
		]))
			->addExtraClass(implode(' ', $classes))
			->setAttribute('data-width-desktop', $this->getWidthDesktop())
			//->setAttribute('data-width-desktop-context', 12)
			//->setAttribute('data-width-desktop-context', $this->getMaxWidthDesktop())
			->setAttribute('data-width-tablet', $this->getWidthTablet())
			//->setAttribute('data-width-tablet-context', 12)
			//->setAttribute('data-width-tablet-context', $this->getMaxWidthTablet())
			->setAttribute('data-name', $this->getName());
	}
	
	public static function getPageBuilderEditPopupFields() {
		return new \FieldList([]);
	}
	
	public function onAfterCreate() {
		$this->setWidthDesktop(12);
		$this->setWidthTablet(12);
		//$this->setField('WidthDesktop', 12);
		//$this->setField('WidthTablet', 12);
	}
	
	public function forTemplate() {
		$templates = SSViewer::get_templates_by_class($this->class, '', __CLASS__);
		//$templates = \SSViewer::get_templates_by_class($this->class, '', __CLASS__);
		if (!$templates) {
			throw new \Exception("No template found for {$this->class}");
		}
		return $this->renderWith($templates);
	}
	
	/**
	 * Compiles all CSS-classes
	 *
	 * @return string
	 */
	public function extraClass() {
		$array = array_merge($this->extraClasses, $this->getClassNameForExtraClass());
		$this->extend('updateExtraClass', $array);
		return implode(' ', $array);
	}
	
	protected function getClassNameForExtraClass() {
		$classes = [];
		foreach (array_reverse(\ClassInfo::ancestry($this->class)) as $class) {
			if ($class == self::class) {
				break;
			}
			$class = str_replace('zauberfisch\\PageBuilder\\Model\\', '', $class);
			$class = str_replace('\\', '-', $class);
			$classes[] = $class;
		}
		return $classes;
	}
	
	/**
	 * Add one or more CSS-classes
	 * Multiple class names should be space delimited
	 *
	 * @param string $class
	 * @return $this
	 */
	public function addExtraClass($class) {
		$classes = preg_split('/\s+/', $class);
		foreach ($classes as $class) {
			$this->extraClasses[$class] = $class;
		}
		return $this;
	}
	
	/**
	 * Remove one or more CSS-classes
	 *
	 * @param string $class
	 * @return $this
	 */
	public function removeExtraClass($class) {
		$classes = preg_split('/\s+/', $class);
		foreach ($classes as $class) {
			unset($this->extraClasses[$class]);
		}
		return $this;
	}
}
