<?php

declare(strict_types=1);

namespace zauberfisch\PageBuilder\Form;

use zauberfisch\PageBuilder\Element\Element;
use zauberfisch\PageBuilder\Element\ElementConfig;
use zauberfisch\PageBuilder\Element\RootContainer;
use zauberfisch\PageBuilder\Element\RootContainerConfig;
use zauberfisch\PageBuilder\Model\PageBuilderArea;

class PageBuilderConfig {
	protected PageBuilderArea $area;
	/**
	 * @var array|ElementConfig[]
	 */
	protected array $elements = [];

	public function __construct(PageBuilderArea $area) {
		$this->area = $area;
		$this->elements[] = new RootContainerConfig();
	}

	public function getArea(): PageBuilderArea {
		return $this->area;
	}

	public function saveInto($value) {
		$elements = $this->deSerializeValue($value);
		$return = new \stdClass();
		if ($elements) {
			$return = [];
			foreach ($elements as $id => $element) {
				$return[$id] = $element->getValueForBackend();
			}
		}
		$newJson = json_encode($return, JSON_PRETTY_PRINT);
		$this->area->setCastedField("ElementsData", $newJson);
		$this->area->write();
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
		if ($key === 'RootContainer') {
			$key = RootContainer::class . '.Default';
		}
		foreach ($this->elements as $elementConfig) {
			if ($elementConfig->getComponentKey() === $key) {
				return $elementConfig;
			}
		}
		throw new \Exception("Element config for component key '$key' could not be found");
	}

	public function getValueForFrontend(): array {
		$elements = $this->deSerializeValue($this->area->ElementsData);
		$return = [];
		foreach ($elements as $elementId => $element) {
			$return[$elementId] = $element->getValueForFrontend();
		}
		return $return;
	}

	/**
	 * @param $json
	 * @return array|Element[]
	 * @throws \Exception
	 */
	protected function deSerializeValue($json) {
		$return = [];
		if ($json) {
			$elements = json_decode($json);
			if ($elements) {
				foreach ($elements as $elementId => $elementData) {
					$componentKey = $elementData->type->resolvedName;
					$config = $this->findElementConfigForComponentKey($componentKey);
					$class = $config->getElementPhpClassName();
					$return[$elementId] = new $class($elementData, $elementId, $componentKey, $config);
				}
			}
		}
		return $return;
	}
}
