<?php

declare(strict_types=1);

namespace zauberfisch\PageBuilder\Element;

use SilverStripe\Core\ClassInfo;
use SilverStripe\ORM\ArrayList;

abstract class ElementConfig {
	protected string $phpClassName;
	protected string $elementKeySuffix;
	protected string $singularName;
	protected array $config = [
		'canCreate' => true,
	];

	public function __construct(string $elementKeySuffix = "Default") {
		$this->elementKeySuffix = $elementKeySuffix;
	}

	public function getElementPhpClassName(): string {
		return $this->phpClassName;
	}

	public function getElementJavascriptClassName(): string {
		return $this->phpClassName;
	}

	public function getElementKey(): string {
		return "{$this->phpClassName}.{$this->elementKeySuffix}";
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
