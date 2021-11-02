<?php

declare(strict_types=1);

namespace zauberfisch\PageBuilder\Form;

use zauberfisch\PageBuilder\Element\ElementConfig;
use zauberfisch\PageBuilder\Model\PageBuilderArea;

class PageBuilderConfig {
	protected PageBuilderArea $area;
	/**
	 * @var array|ElementConfig[]
	 */
	protected array $elements = [];

	public function __construct(PageBuilderArea $area) {
		$this->area = $area;
	}

	public function getArea(): PageBuilderArea {
		return $this->area;
	}

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

	protected function findElementConfigForComponentKey(string $key): ElementConfig {
		foreach ($this->elements as $elementConfig) {
			if ($elementConfig->getComponentKey() === $key) {
				return $elementConfig;
			}
		}
		throw new \Exception("Element config for component key '$key' could not be found");
	}

	public function getValueForFrontend(): array {
		$elements = json_decode($this->area->ElementsData, true);
		$return = [];
		if ($elements) {
			foreach ($elements as $elementId => $elementData) {
				$componentKey = $elementData['type']['resolvedName'];
				if ($componentKey === 'RootContainer') {
					$return['ROOT'] = [
						"type" => $componentKey,
						"props" => $elementData["props"],
						"custom" => $elementData["custom"],
						"nodes" => $elementData["nodes"],
						"linkedNodes" => $elementData["linkedNodes"],
					];

				} else {
					$config = $this->findElementConfigForComponentKey($componentKey);
					$class = $config->getElementPhpClassName();
					$obj = new $class([
						"props" => $elementData["props"],
						"custom" => $elementData["custom"],
						"nodes" => $elementData["nodes"],
						"linkedNodes" => $elementData["linkedNodes"],
					], $elementId, $componentKey, $config);
					$return[$elementId] = $obj->getValueForFrontend();
				}
			}
		}
		return $return;
	}
}
