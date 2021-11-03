<?php

declare(strict_types=1);

namespace zauberfisch\PageBuilder\Element;

class RootContainerConfig extends ContainerConfig {
	protected string $phpClassName = RootContainer::class;

	public function __construct() {
		$this->config['canCreate'] = false;
	}
}
