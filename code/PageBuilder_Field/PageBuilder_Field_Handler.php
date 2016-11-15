<?php

class PageBuilder_Field_Handler extends RequestHandler {
	/**
	 * @var PageBuilder_Field|RequestHandler
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
