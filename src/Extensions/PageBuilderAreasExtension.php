<?php

declare(strict_types=1);

namespace zauberfisch\PageBuilder\Extensions;

use SilverStripe\ORM\DataExtension;
use SilverStripe\ORM\DataObject;
use SilverStripe\ORM\ValidationException;
use zauberfisch\PageBuilder\Model\PageBuilderArea;

class PageBuilderAreasExtension extends DataExtension {
	/**
	 * Returns an array of the relation names to PageBuilderAreas. Ignores any
	 * has_one fields named `Parent` because we are treating parent as a reserved name for now
	 */
	public function getAreaRelations(): array {
		$hasOnes = $this->owner->hasOne();
		$relations = [];
		if ($hasOnes) {
			foreach ($hasOnes as $hasOneName => $hasOneClass) {
				if ($hasOneName === 'Parent' || $hasOneName === 'ParentID') {
					continue;
				}
				if ($hasOneClass == PageBuilderArea::class || is_subclass_of($hasOneClass, PageBuilderArea::class)) {
					$relations[] = $hasOneName;
				}
			}
		}
		return $relations;
	}

	/**
	 * @throws ValidationException
	 */
	public function onBeforeWrite() {
		parent::onBeforeWrite();
		$relations = $this->owner->getAreaRelations();
		$this->ensureAreasExist($relations);

		$ownerClassName = get_class($this->owner);

		// Update the OwnerClassName on EA if the class has changed
		foreach ($relations as $eaRelation) {
			$ea = $this->owner->$eaRelation();
			if ($ea->OwnerClassName !== $ownerClassName) {
				$ea->OwnerClassName = $ownerClassName;
				$ea->write();
			}
		}
	}

	/**
	 * Set all has_one relationships to a PageBuilderArea to a valid ID if they're unset
	 *
	 * @param array $relations indexed array of relationship names that are to PageBuilderAreas
	 * @return DataObject
	 * @throws ValidationException
	 */
	public function ensureAreasExist(array $relations): DataObject {
		foreach ($relations as $eaRelationship) {
			$areaID = $eaRelationship . 'ID';

			if (!$this->owner->$areaID) {
				$area = PageBuilderArea::create();
				$area->OwnerClassName = get_class($this->owner);
				$area->write();
				$this->owner->$areaID = $area->ID;
			}
		}
		return $this->owner;
	}
}
