<?php

declare(strict_types=1);

namespace zauberfisch\PageBuilder\Form;

use zauberfisch\PageBuilder\Element\ElementConfig;

class PageBuilderConfig {
	/**
	 * @var array|ElementConfig[]
	 */
	protected array $elements = [];

	public function getElementMap(): array {
		$return = [];
		foreach ($this->elements as $elementConfig) {
			$return[] = [
				'key' => $elementConfig->getComponentKey(),
				'className' => $elementConfig->getElementJavascriptClassName(),
				'singularName' => $elementConfig->getSingularName(),
				'config' => $elementConfig->getConfig(),
			];
		}
		return $return;
	}

	public function addElement(ElementConfig $element): PageBuilderConfig {
		$this->elements[] = $element;
		return $this;
	}
}
