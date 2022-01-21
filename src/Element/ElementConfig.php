<?php

declare(strict_types=1);

namespace zauberfisch\PageBuilder\Element;

use SilverStripe\Core\ClassInfo;

abstract class ElementConfig {
	protected string $phpClassName;
	protected string $componentKey = "Default";
	protected string $singularName;
	protected array $config = [
		'canCreate' => true,
	];

	public function getElementPhpClassName(): string {
		return $this->phpClassName;
	}

	public function getElementJavascriptClassName(): string {
		return $this->phpClassName;
	}

	public function getComponentKey(): string {
		return "{$this->phpClassName}.{$this->componentKey}";
	}

	public function setComponentKey(string $key): ElementConfig {
		$this->componentKey = $key;
		return $this;
	}

	public function getConfig(): array {
		return $this->config;
	}

	public function setDefaultProps(array $array): ElementConfig {
		$this->config['defaultProps'] = $array;
		return $this;
	}

	public function setCanCreate(bool $bool): ElementConfig {
		$this->config['canCreate'] = $bool;
		return $this;
	}

	/**
	 * @param array $array array of componentKey strings that cannot be a child of this element (forbids an item even if it's in allowed children)
	 * @return $this
	 */
	public function setForbiddenChildren(array $array): ElementConfig {
		$this->config['forbiddenChildren'] = $array;
		return $this;
	}

	public function getForbiddenChildren(): array {
		return $this->config['forbiddenChildren'];
	}

	/**
	 * @param array $array array of componentKey strings that this element cannot be a child of (forbids an item even if it's in allowed parents)
	 * @return $this
	 */
	public function setForbiddenParents(array $array): ElementConfig {
		$this->config['forbiddenParents'] = $array;
		return $this;
	}

	public function getForbiddenParents(): array {
		return $this->config['forbiddenParents'];
	}

	/**
	 * @param array $array array of componentKey strings that can be a child of this element (forbids all others)
	 * @return $this
	 */
	public function setAllowedChildren(array $array): ElementConfig {
		$this->config['allowedChildren'] = $array;
		return $this;
	}

	public function getAllowedChildren(): array {
		return $this->config['allowedChildren'];
	}

	/**
	 * @param array $array array of componentKey strings that this element can be a child of (forbids all others)
	 * @return $this
	 */
	public function setAllowedParents(array $array): ElementConfig {
		$this->config['allowedParents'] = $array;
		return $this;
	}

	public function getAllowedParents(): array {
		return $this->config['allowedParents'];
	}

	public function getSingularName(): string {
		return $this->singularName ?? _t($this->getElementPhpClassName() . '.SINGULARNAME', ucwords(trim(strtolower(preg_replace(
				'/_?([A-Z])/',
				' $1',
				ClassInfo::shortName($this->getElementPhpClassName())
			)))));
	}

	public function setSingularName(string $name): ElementConfig {
		$this->singularName = $name;
		return $this;
	}
}
