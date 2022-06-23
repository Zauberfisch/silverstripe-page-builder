<?php

declare(strict_types=1);

namespace zauberfisch\PageBuilder\Form;

use SilverStripe\Forms\FormField;
use SilverStripe\ORM\DataObjectInterface;

class PageBuilderField extends FormField {
	protected PageBuilderConfig $config;

	public function __construct($name, $title, PageBuilderConfig $config) {
		$this->config = $config;
		$this->addExtraClass('zauberfisch__page-builder__field');
		parent::__construct($name, $title);
		$this->value = $this->config->getArea()->ElementsData;
	}

	public function setSubmittedValue($value, $data = null) {
		$this->value = $value;
		return $this;
	}

	public function setValue($value, $data = null) {
		return $this;
	}

	public function getSchemaData() {
		$arr = parent::getSchemaData();
		$arr['elements'] = $this->config->getElementMap();
		// $arr['value'] = $this->dataValue();
		$arr['value'] = $this->config->getValueForBackend();
		return $arr;
	}

	public function saveInto(DataObjectInterface $record) {
		$this->config->saveInto($this->dataValue());
	}
}
