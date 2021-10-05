<?php

namespace zauberfisch\PageBuilder\Form;

use SilverStripe\Forms\FormField;
use SilverStripe\View\Requirements;
use SilverStripe\View\SSViewer;

/**
 * @author zauberfisch
 */
class Field extends FormField {
	public function __construct($name, $title = null, $value = null) {
		Requirements::css('zauberfisch/silverstripe-page-builder: client/dist/styles/bundle.css');
		Requirements::javascript('zauberfisch/silverstripe-page-builder: client/dist/js/vendor.js');
		Requirements::javascript('zauberfisch/silverstripe-page-builder: client/dist/js/bundle.js');

		$this->addExtraClass('zauberfisch__page-builder__field');
		$this->addExtraClass('stacked');
		parent::__construct($name, $title, $value);
	}

	public function Field($properties = []) {
		$context = $this;
		$this->extend('onBeforeRender', $context, $properties);
		if (count($properties)) {
			$context = $context->customise($properties);
		}
		return $context->renderWith(SSViewer::fromString('<div $AttributesHTML data-schema="$SchemaData.JSON"></div>'));
	}
}
