<?php

namespace zauberfisch\PageBuilder\Model;

use zauberfisch\PageBuilder\Model\Block\Base;
use zauberfisch\SerializedDataObject\DBField\DataObjectField;

/**
 * @author zauberfisch
 */
class DBField extends DataObjectField {
	public function nullValue() {
		return new Base();
	}
	
	public function duplicate() {
		$new = new static();
		$new->setValue($this->getValue()->duplicate());
		return $new;
	}
}
