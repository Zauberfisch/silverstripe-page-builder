<?php

declare(strict_types=1);

namespace zauberfisch\PageBuilder\Form;

use app\model\DataObject;
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
				'key' => $elementConfig->getComponentFullKey(),
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

	public function setElements(array $elements, $addRoot = true): PageBuilderConfig {
		$this->elements = $elements;
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

	protected function getElementByKey(string $elementKey): ?ElementConfig {
		if ($elementKey === 'RootContainer') {
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
					$elementKey = $elementData->type->resolvedName;
					$config = $this->getElementByKey($elementKey);
					if (!$config) {
						throw new \Exception("Element config for component key '$elementKey' could not be found");
					}
					$class = $config->getElementPhpClassName();
					$return[$elementId] = new $class($elementData, $elementId, $elementKey, $config);
				}
			}
		}
		return $return;
	}
}
