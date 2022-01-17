<?php

declare(strict_types=1);

namespace zauberfisch\PageBuilder\Model;

use SilverStripe\Assets\File;
use SilverStripe\CMS\Model\SiteTree;
use SilverStripe\ORM\DataObject;
use SilverStripe\ORM\FieldType\DBText;
use SilverStripe\Versioned\Versioned;

/**
 * @property string $ElementsData
 * @property string $OwnerClassName
 * @method File[] RelatedFiles()
 * @method SiteTree[] RelatedPages()
 */
class PageBuilderArea extends DataObject {
	private static $db = [
		'ElementsData' => DBText::class,
		'OwnerClassName' => 'Varchar(255)',
	];
	private static $many_many = [
		'RelatedFiles' => File::class,
		'RelatedPages' => SiteTree::class,
	];
	private static $table_name = 'PageBuilderArea';
	private static $extensions = [
		Versioned::class,
	];

	private static $hide_in_campaigns = true;
}
