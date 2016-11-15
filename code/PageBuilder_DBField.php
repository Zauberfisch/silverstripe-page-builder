<?php

class PageBuilder_DBField extends SerializedDBFieldHasOne {
	public function nullValue() {
		return new PageBuilder_Value_Block_BlockGroup_Base();
	}
}
