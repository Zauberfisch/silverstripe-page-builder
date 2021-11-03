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

	public function saveInto(DataObjectInterface $record) {
		$this->config->saveInto($this->dataValue());
	}
}
