<?php

declare(strict_types=1);

namespace zauberfisch\PageBuilder\Form;

use SilverStripe\Forms\FormField;
use SilverStripe\ORM\DataObjectInterface;

/**
 * @author zauberfisch
 */
class Field extends FormField {
	protected PageBuilderConfig $config;

	public function __construct($name, $title, PageBuilderConfig $config) {
		$this->config = $config;
		$this->addExtraClass('zauberfisch__page-builder__field');
		parent::__construct($name, $title, $this->config->getArea()->ElementsData);
	}

	public function getSchemaData() {
		$arr = parent::getSchemaData();
		$arr['elements'] = $this->config->getElementMap();
		$arr['value'] = $this->dataValue();
		return $arr;
	}

	public function saveInto(DataObjectInterface $record) {
		$this->config->saveInto($this->dataValue());
	}
}
