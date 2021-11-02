<?php

declare(strict_types=1);

namespace zauberfisch\PageBuilder\Element;

use SilverStripe\Assets\File;
use SilverStripe\CMS\Model\SiteTree;
use SilverStripe\View\ArrayData;

abstract class Element extends ArrayData {
	protected string $elementId;
	protected string $componentKey;
	protected ElementConfig $config;

	public function __construct(array $value, string $elementId, string $componentKey, ElementConfig $config) {
		parent::__construct($value);
		$this->array['componentKey'] = $componentKey;
		$this->elementId = $elementId;
		$this->componentKey = $componentKey;
		$this->config = $config;
	}

	public function getValueForFrontend(): array {
		return $this->array;
	}

	protected function frontendConvertLink($link): ?array {
		if (!isset($link['linkType'])) {
			return null;
		}
		$return = [
			'href' => '/404/',
			'title' => $link['data']['Description'] ?? '',
			'type' => $link['linkType'],
		];
		if ($link['linkType'] === 'Internal') {
			/** @var SiteTree $page */
			$page = SiteTree::get()->byID($link['data']['PageID']);
			if ($page && $page->exists()) {
				$return['href'] = $page->Link();
			}
		} else if ($link['linkType'] === 'External') {
			$return['href'] = $link['data']['Link'];
			if ($link['data']['Anchor']) {
				// urlencode()
				$return['href'] .= "#" . $link['data']['Anchor'];
			}
		} else if ($link['linkType'] === 'Email') {
			$return['href'] = "mailto:" . $link['data']['Link'];
			if ($link['data']['Subject']) {
				$return['href'] .= "?subject=" . $link['data']['Subject'];
			}
		} else if ($link['linkType'] === 'File') {
			/** @var File $file */
			$file = File::get()->byID($link['data']['ID']);
			if ($file && $file->exists()) {
				$return['href'] = $file->Link();
			}
		}
		if (isset($link['data']['TargetBlank']) && $link['data']['TargetBlank'] === 1) {
			$return['target'] = "_blank";
		}
		return $return;
	}

	protected function frontendConvertImage($image): ?array {
		if (!isset($image['file']['url'])) {
			return null;
		}
		return [
			'name' => $image['file']['name'] ?? null,
			'title' => $image['file']['title'] ?? null,
			'url' => $image['file']['url'] ?? null,
		];
	}

}
