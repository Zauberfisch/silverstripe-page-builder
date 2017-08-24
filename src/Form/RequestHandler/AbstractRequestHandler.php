<?php

namespace zauberfisch\PageBuilder\Form\RequestHandler;

use zauberfisch\PageBuilder\Form\Field;

/**
 * @author zauberfisch
 */
class AbstractRequestHandler extends \RequestHandler {
	/**
	 * @var Field|\RequestHandler
	 */
	protected $parent;
	
	public function getParent() {
		return $this->parent;
	}
	
	public function __construct($parent) {
		$this->parent = $parent;
		parent::__construct();
	}
}
