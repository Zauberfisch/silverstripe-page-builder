<?php

declare(strict_types=1);

namespace zauberfisch\PageBuilder\Extensions;

use SilverStripe\Core\Config\Config;
use SilverStripe\Core\Extension;
use SilverStripe\View\Requirements;

class LeftAndMainExtension extends Extension {

	public function init() {
		foreach (Config::inst()->get('zauberfisch\PageBuilder\PageBuilderField', 'javascript') as $file) {
			Requirements::javascript($file);
		}
		foreach (Config::inst()->get('zauberfisch\PageBuilder\PageBuilderField', 'css') as $file) {
			Requirements::css($file);
		}
		foreach (Config::inst()->get('zauberfisch\PageBuilder\PageBuilderField', 'lang') as $file) {
			Requirements::add_i18n_javascript($file);
		}
	}
}
