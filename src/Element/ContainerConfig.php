<?php

declare(strict_types=1);

namespace zauberfisch\PageBuilder\Element;

class ContainerConfig extends ElementCanvasConfig {
	protected string $phpClassName = Container::class;

	public function setBackgroundOptions(array $options): ContainerConfig {
		$this->config['backgroundOptions'] = $options;
		return $this;
	}

	public function setColumnOptions(array $options): ContainerConfig {
		$this->config['columnsOptions'] = $options;
		return $this;
	}
}
