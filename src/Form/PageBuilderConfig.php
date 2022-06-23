<?php

declare(strict_types=1);

namespace zauberfisch\PageBuilder\Form;

use app\model\DataObject;
use Exception;
use SilverStripe\ORM\ArrayList;
use zauberfisch\PageBuilder\Element\Element;
use zauberfisch\PageBuilder\Element\ElementConfig;
use zauberfisch\PageBuilder\Element\RootContainer;
use zauberfisch\PageBuilder\Element\RootContainerConfig;
use zauberfisch\PageBuilder\Model\PageBuilderArea;

class PageBuilderConfig {
	protected PageBuilderArea $area;
	protected $context;
	/**
	 * @var array|ElementConfig[]
	 */
	protected array $elements = [];

	public function __construct(PageBuilderArea $area, $context = null) {
		$this->area = $area;
		$this->context = $context;
		$this->setElements([]);
	}

	public function getArea(): PageBuilderArea {
		return $this->area;
	}

	/**
	 * @return mixed|null|\Page|DataObject
	 */
	public function getContext() {
		return $this->context;
	}

	public function saveInto($value) {
		$elements = $this->deSerializeValue($value);
		$return = new \stdClass();
		if ($elements) {
			$return = [];
			foreach ($elements as $id => $element) {
				$return[$id] = $element->getValueForWrite($this);
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
				'key' => $elementConfig->getElementKey(),
				'className' => $elementConfig->getElementJavascriptClassName(),
				'singularName' => $elementConfig->getSingularName(),
				'config' => $elementConfig->getConfig(),
			];
		}
		return $return;
	}

	/**
	 * @throws Exception
	 */
	public function addElement(ElementConfig $element, string $beforeElementKey = null): PageBuilderConfig {
		if ($this->getElementByKey($element->getElementKey())) {
			throw new Exception("Tried to add new element, but elementKey '{$element->getElementKey()}' already exists");
		}
		if ($beforeElementKey) {
			foreach ($this->elements as $i => $child) {
				array_splice($this->elements, $i + 1, 0, [$element]);
				return $this;
			}
		}
		$this->elements[] = $element;
		return $this;
	}

	public function removeElement(ElementConfig $element): PageBuilderConfig {
		$renumberKeys = false;
		foreach ($this->elements as $key => $_element) {
			if ($element === $_element) {
				$renumberKeys = true;
				unset($this->elements[$key]);
			}
		}
		if ($renumberKeys) {
			$this->elements = array_values($this->elements);
		}
		return $this;
	}

	public function removeElementsByType($className): PageBuilderConfig {
		foreach ($this->getElementsByType($className) as $element) {
			$this->removeElement($element);
		}
		return $this;
	}

	public function removeElementsByKey(string $elementKey): PageBuilderConfig {
		return $this->removeElement($this->getElementByKey($elementKey));
	}

	public function setElements(array $elements, $addRoot = true): PageBuilderConfig {
		$this->elements = array_values($elements);
		if ($addRoot) {
			$this->addElement(new RootContainerConfig());
		}
		return $this;
	}

	public function getElements(): array {
		return $this->elements;
	}

	public function getElementsByType($className): ArrayList {
		$elements = new ArrayList();
		foreach ($this->elements as $element) {
			if ($element instanceof $className) {
				$elements->push($element);
			}
		}
		return $elements;
	}

	public function getElementByType($className): ?ElementConfig {
		return $this->getElementsByType($className)->first();
	}

	public function getElementByKey(string $elementKey): ?ElementConfig {
		if ($elementKey === 'RootContainer') {
			// TODO refactor this to not need a hardcoded string here
			$elementKey = RootContainer::class . '.Default';
		}
		foreach ($this->elements as $elementConfig) {
			if ($elementConfig->getElementKey() === $elementKey) {
				return $elementConfig;
			}
		}
		return null;
	}

	public function getValueForFrontend(): array {
		$elements = $this->deSerializeValue($this->area->ElementsData);
		$return = [];
		foreach ($elements as $elementId => $element) {
			$return[$elementId] = $element->getValueForFrontend($this);
		}
		return $return;
	}

	public function getValueForBackend($value): array {
		$elements = $this->deSerializeValue($value);
		$return = [];
		foreach ($elements as $elementId => $element) {
			$return[$elementId] = $element->getValueForBackend($this);
		}
		return $return;
	}

	/**
	 * @param $json
	 * @return array|Element[]
	 * @throws Exception
	 */
	protected function deSerializeValue($json) {
		$return = [];
		if ($json) {
			$elements = json_decode($json);
			if ($elements) {
				foreach ($elements as $elementId => $elementData) {
					$elementKey = $elementData->type->resolvedName;
					$config = $this->getElementByKey($elementKey);
					if (!$config) {
						throw new Exception("Element config for component key '$elementKey' could not be found");
					}
					$class = $config->getElementPhpClassName();
					$return[$elementId] = new $class($elementData, $elementId, $elementKey, $config);
				}
			}
		}
		return $return;
	}
}
