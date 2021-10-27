<?php

declare(strict_types=1);

namespace zauberfisch\PageBuilder\Form;

use SilverStripe\Forms\FormField;
use SilverStripe\ORM\DataObjectInterface;
use SilverStripe\View\Requirements;
use SilverStripe\View\SSViewer;
use zauberfisch\PageBuilder\Model\PageBuilderArea;

/**
 * @author zauberfisch
 */
class Field extends FormField {
	protected PageBuilderArea $area;
	protected array $elements = [];

	public function __construct($name, $title, PageBuilderArea $area, array $config) {
		$this->area = $area;
		$this->elements = $config['elements'];
		Requirements::css('zauberfisch/silverstripe-page-builder: client/dist/styles/bundle.css');
		Requirements::javascript('zauberfisch/silverstripe-page-builder: client/dist/js/vendor.js');
		Requirements::javascript('zauberfisch/silverstripe-page-builder: client/dist/js/bundle.js');
		Requirements::add_i18n_javascript('zauberfisch/silverstripe-page-builder: client/lang', false, true);

		foreach($config['javascript'] as $file) {
			Requirements::javascript($file);
		}
		foreach($config['css'] as $file) {
			Requirements::css($file);
		}
		foreach($config['i18n'] as $file) {
			Requirements::add_i18n_javascript($file, false, true);
		}
		$this->addExtraClass('zauberfisch__page-builder__field');
		$this->addExtraClass('stacked');
		parent::__construct($name, $title, $this->area->ElementsData);
	}

	public function getSchemaData() {
		$arr = parent::getSchemaData();
		$arr['elements'] = $this->elements;
		return $arr;
	}

	public function Field($properties = []) {
		$context = $this;
		$this->extend('onBeforeRender', $context, $properties);
		if (count($properties)) {
			$context = $context->customise($properties);
		}
		// value="$Value"
		return $context->renderWith(SSViewer::fromString('<div $getAttributesHTML("value") data-schema="$SchemaData.JSON"><input type="hidden" $getAttributesHTML("class", "type", "id") /><div></div></div>'));
		// return $context->renderWith(SSViewer::fromString('<div $AttributesHTML data-schema="$SchemaData.JSON"></div>'));
	}


	// public function setSubmittedValue($value, $data = null) {
	// 	// file_put_contents(BASE_PATH . '/debug.log', json_encode(['setSubmittedValue' => $value], JSON_PRETTY_PRINT));
	//
	// 	file_put_contents(BASE_PATH . '/debug.log', $value, FILE_APPEND);
	// 	// Content comes through as a JSON encoded list through a hidden field.
	// 	// return $this->setValue(json_decode($value, true));
	// }

	public function saveInto(DataObjectInterface $record) {
		$component = $this->area;
		$component->setCastedField("ElementsData", $this->dataValue());
		$component->write();

		// $component = $record;
		// $fieldName = $this->name;
		//
		// // Allow for dot syntax
		// if (($pos = strrpos($this->name, '.')) !== false) {
		// 	$relation = substr($this->name, 0, $pos);
		// 	$fieldName = substr($this->name, $pos + 1);
		// 	$component = $record->relObject($relation);
		// }
		//
		// if ($fieldName) {
		// 	$component->setCastedField($fieldName, $this->dataValue());
		// }
	}

// 	public function saveInto(DataObjectInterface $dataObject) {
// 		file_put_contents(BASE_PATH . '/debug.log', json_encode(['setSubmittedValue' => $value], JSON_PRETTY_PRINT));
// 		// /** @var BlocksPage $dataObject */
// 		// parent::saveInto($dataObject);
// 		//
// 		// $elementData = $this->Value();
// 		// $idPrefixLength = strlen(sprintf(ElementalAreaController::FORM_NAME_TEMPLATE, ''));
// 		//
// 		// if (!$elementData) {
// 		// 	return;
// 		// }
// 		//
// 		// foreach ($elementData as $form => $data) {
// 		// 	// Extract the ID
// 		// 	$elementId = (int) substr($form, $idPrefixLength);
// 		//
// 		// 	/** @var BaseElement $element */
// 		// 	$element = $this->getArea()->Elements()->byID($elementId);
// 		//
// 		// 	if (!$element) {
// 		// 		// Ignore invalid elements
// 		// 		continue;
// 		// 	}
// 		//
// 		// 	$data = ElementalAreaController::removeNamespacesFromFields($data, $element->ID);
// 		//
// 		// 	$element->updateFromFormData($data);
// 		// 	$element->write();
// 		// }
// /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//

// 	}
}
