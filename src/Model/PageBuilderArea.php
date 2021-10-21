<?php

declare(strict_types=1);

namespace zauberfisch\PageBuilder\Model;

use app\model\DataObject;
use SilverStripe\Assets\File;
use SilverStripe\CMS\Model\SiteTree;
use SilverStripe\ORM\FieldType\DBText;

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
}
