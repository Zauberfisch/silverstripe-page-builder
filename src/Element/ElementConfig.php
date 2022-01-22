<?php

declare(strict_types=1);

namespace zauberfisch\PageBuilder\Element;

use SilverStripe\Core\ClassInfo;

abstract class ElementConfig {
	protected string $phpClassName;
	protected string $elementKeySuffix;
	protected string $singularName;
	protected array $config = [
		'canCreate' => true,
	];

	public function __construct(string $elementKeySuffix = "Default") {
		$this->elementKeySuffix = $elementKeySuffix;
		$this->config['forbiddenChildren'] = null;
		$this->config['forbiddenParents'] = null;
		$this->config['allowedChildren'] = null;
		$this->config['allowedParents'] = null;
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

	protected function hierarchySettingsHelperSet(string $key, ?array $elementKeys): ElementConfig {
		$this->config[$key] = is_array($elementKeys) ? array_values($elementKeys) : null;
		return $this;
	}

	protected function hierarchySettingsHelperGet(string $key): ?array {
		return $this->config[$key];
	}

	protected function hierarchySettingsHelperAdd(string $key, string $elementKey): ElementConfig {
		$this->config[$key] = $this->config[$key] ?: [];
		$this->config[$key][] = $elementKey;
		return $this;
	}

	protected function hierarchySettingsHelperRemove(string $key, string $elementKey): ElementConfig {
		if ($this->config[$key]) {
			$this->config[$key] = array_diff($this->config[$key], [$elementKey]);
		}
		return $this;
	}

	/**
	 * @param ?array $elementKeys array of elementKey strings that cannot be a child of this element (forbids an item even if it's in allowed children)
	 * @return $this
	 */
	public function setForbiddenChildren(?array $elementKeys): ElementConfig {
		return $this->hierarchySettingsHelperSet('forbiddenChildren', $elementKeys);
	}

	public function getForbiddenChildren(): array {
		return $this->hierarchySettingsHelperGet('forbiddenChildren');
	}

	public function addForbiddenChild($elementKey): ElementConfig {
		return $this->hierarchySettingsHelperAdd('forbiddenChildren', $elementKey);
	}

	public function removeForbiddenChild($elementKey): ElementConfig {
		return $this->hierarchySettingsHelperRemove('forbiddenChildren', $elementKey);
	}

	/**
	 * @param ?array $elementKeys array of elementKey strings that cannot be a child of this element (forbids an item even if it's in allowed children)
	 * @return $this
	 */
	public function setForbiddenParents(?array $elementKeys): ElementConfig {
		return $this->hierarchySettingsHelperSet('forbiddenChildren', $elementKeys);
	}

	public function getForbiddenParents(): array {
		return $this->hierarchySettingsHelperGet('forbiddenChildren');
	}

	public function addForbiddenParent($elementKey): ElementConfig {
		return $this->hierarchySettingsHelperAdd('forbiddenChildren', $elementKey);
	}

	public function removeForbiddenParent($elementKey): ElementConfig {
		return $this->hierarchySettingsHelperRemove('forbiddenChildren', $elementKey);
	}

	/**
	 * @param ?array $elementKeys array of elementKey strings that can be a child of this element (forbids all others)
	 * @return $this
	 */
	public function setAllowedChildren(?array $elementKeys): ElementConfig {
		return $this->hierarchySettingsHelperSet('allowedChildren', $elementKeys);
	}

	public function getAllowedChildren(): array {
		return $this->hierarchySettingsHelperGet('allowedChildren');
	}

	public function addAllowedChild($elementKey): ElementConfig {
		return $this->hierarchySettingsHelperAdd('allowedChildren', $elementKey);
	}

	public function removeAllowedChild($elementKey): ElementConfig {
		return $this->hierarchySettingsHelperRemove('allowedChildren', $elementKey);
	}

	/**
	 * @param ?array $elementKeys array of elementKey strings that this element can be a child of (forbids all others)
	 * @return $this
	 */
	public function setAllowedParents(?array $elementKeys): ElementConfig {
		return $this->hierarchySettingsHelperSet('allowedParents', $elementKeys);
	}

	public function getAllowedParents(): array {
		return $this->hierarchySettingsHelperGet('allowedParents');
	}

	public function addAllowedParent($elementKey): ElementConfig {
		return $this->hierarchySettingsHelperAdd('allowedParents', $elementKey);
	}

	public function removeAllowedParent($elementKey): ElementConfig {
		return $this->hierarchySettingsHelperRemove('allowedParents', $elementKey);
	}
}
