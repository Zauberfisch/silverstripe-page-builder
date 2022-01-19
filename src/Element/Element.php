<?php

declare(strict_types=1);

namespace zauberfisch\PageBuilder\Element;

use SilverStripe\Assets\File;
use SilverStripe\CMS\Model\SiteTree;
use SilverStripe\View\ArrayData;
use zauberfisch\PageBuilder\Form\PageBuilderConfig;

abstract class Element extends ArrayData {
	public function __construct($value, string $elementId, string $componentKey, ElementConfig $config) {
		parent::__construct([
			'data' => $value,
			'elementId' => $elementId,
			'componentKey' => $componentKey,
			'config' => $config,
		]);
	}

	public function getValueForBackend() {
		return $this->array['data'];
	}

	public function getValueForFrontend(PageBuilderConfig $config = null): \stdClass {
		$return = new \stdClass();
		$data = $this->array['data'];
		$return->type = $data->type->resolvedName;
		$return->props = $data->props;
		$return->nodes = $data->nodes;
		$return->linkedNodes = $data->linkedNodes;
		return $return;
	}

	protected function ensureFileIsPublished(File $file) {
		$file->publishRecursive();
	}

	protected function frontendConvertLink($link) {
		if ($link && $link->linkType) {
			$return = [
				'href' => '/404/',
				'title' => $link->data->Description ?? '',
				'type' => $link->linkType,
			];
			if ($link->linkType === 'Internal') {
				/** @var SiteTree $page */
				$page = SiteTree::get()->byID($link->data->PageID);
				if ($page && $page->exists()) {
					$return['href'] = $page->Link();
				}
			} else if ($link->linkType === 'External') {
				$return['href'] = $link->data->Link;
				if ($link->data->Anchor) {
					$return['href'] .= "#" . $link->data->Anchor;
				}
			} else if ($link->linkType === 'Email') {
				$return['href'] = "mailto:" . $link->data->Link;
				if ($link->data->Subject) {
					$return['href'] .= "?subject=" . $link->data->Subject;
				}
			} else if ($link->linkType === 'File') {
				/** @var File $file */
				$file = File::get()->byID($link->data->ID);
				if ($file && $file->exists()) {
					$return['href'] = $file->Link();
				}
			}
			if (isset($link->data->TargetBlank) && $link->data->TargetBlank === 1) {
				$return['target'] = "_blank";
			}
			return (object)$return;
		}
		return null;
	}

	protected function frontendConvertImage($image) {
		if ($image && $image->data->ID) {
			/** @var File $file */
			$file = File::get()->byID($image->data->ID);
			if ($file && $file->exists()) {
				return (object)[
					'name' => $file->getFilename(),
					'title' => $file->getTitle(),
					'url' => $file->Link(),
				];
			}
		}
		return null;
	}

	protected function backendConvertLink($link) {
		if ($link && $link->linkType === 'File') {
			/** @var File $file */
			$file = File::get()->byID($link->data->ID);
			if ($file && $file->exists()) {
				$this->ensureFileIsPublished($file);
			}
		}
		return $link;
	}

	protected function backendConvertImage($image) {
		if ($image && $image->data->ID) {
			/** @var File $file */
			$file = File::get()->byID($image->data->ID);
			if ($file && $file->exists()) {
				$this->ensureFileIsPublished($file);
			}
		}
		return $image;
	}
}
