<?php

declare(strict_types=1);

namespace zauberfisch\PageBuilder\Form;

use SilverStripe\Forms\FormField;
use SilverStripe\ORM\DataObjectInterface;
use SilverStripe\View\SSViewer;

/**
 * @author zauberfisch
 */
class Field extends FormField {
	protected PageBuilderConfig $config;

	public function __construct($name, $title, PageBuilderConfig $config) {
		$this->config = $config;
		$this->addExtraClass('zauberfisch__page-builder__field');
		$this->addExtraClass('stacked');
		parent::__construct($name, $title, $this->config->getArea()->ElementsData);
	}

	public function getSchemaData() {
		$arr = parent::getSchemaData();
		$arr['elements'] = $this->config->getElementMap();
		$arr['value'] = $this->dataValue();
		return $arr;
	}

	public function Field($properties = []) {
		$context = $this;
		$this->extend('onBeforeRender', $context, $properties);
		if (count($properties)) {
			$context = $context->customise($properties);
		}
		return $context->renderWith(SSViewer::fromString('<div $getAttributesHTML("value") data-schema="$SchemaData.JSON"><input type="hidden" $getAttributesHTML("class", "type", "id", "value") value="" /><div></div></div>'));
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
		$component = $this->config->getArea();
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
