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

	public function setForbiddenChildren(array $array): ElementConfig {
		$this->config['forbiddenChildren'] = $array;
		return $this;
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
