<?php

/**
 * Class PageBuilder_LeftAndMainExtension
 *
 * @property LeftAndMain $owner
 */
class PageBuilder_LeftAndMainExtension extends LeftAndMainExtension {
	public function init() {
		parent::init();
		//Requirements::css(PAGE_BUILDER_DIR . 'PageBuilder/scss/PageBuilder.scss');
		Requirements::css(PAGE_BUILDER_DIR . '/css/PageBuilder.scss.css');
		Requirements::javascript(PAGE_BUILDER_DIR . '/javascript/PageBuilder.js');
		Requirements::javascript(PAGE_BUILDER_DIR . '/javascript/PageBuilderDialog.js');
	}
}
