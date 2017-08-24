<?php

namespace zauberfisch\PageBuilder\Model\Block;

interface BlockProvider {
	/**
	 * @return array
	 */
	public function getExtraBlocks();
}
