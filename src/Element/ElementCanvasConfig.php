<?php

declare(strict_types=1);

namespace zauberfisch\PageBuilder\Element;

abstract class ElementCanvasConfig extends ElementConfig {
	public function __construct(string $elementKeySuffix = "Default") {
		parent::__construct($elementKeySuffix);
		$this->config['forbiddenChildren'] = null;
		$this->config['forbiddenParents'] = null;
		$this->config['allowedChildren'] = null;
		$this->config['allowedParents'] = null;
	}

	protected function hierarchySettingsHelperSet(string $key, ?array $elementKeys): ElementConfig {
		$this->config[$key] = is_array($elementKeys) ? array_values($elementKeys) : null;
		return $this;
	}

	protected function hierarchySettingsHelperGet(string $key): ?array {
		return $this->config[$key];
	}

	protected function hierarchySettingsHelperAdd(string $key, string $elementKey): ElementCanvasConfig {
		$this->config[$key] = $this->config[$key] ?: [];
		$this->config[$key][] = $elementKey;
		return $this;
	}

	protected function hierarchySettingsHelperRemove(string $key, string $elementKey): ElementCanvasConfig {
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
