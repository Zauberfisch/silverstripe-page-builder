<?php

declare(strict_types=1);

namespace zauberfisch\PageBuilder\Element;

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

	public function getSingularName(): string {
		return $this->singularName ?? preg_replace('@^.*\\\\(.*)$@', '$1', $this->phpClassName);
	}

	public function setSingularName(string $name): ElementConfig {
		$this->singularName = $name;
		return $this;
	}
}
