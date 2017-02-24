<?php

class PageBuilder_Field_Handler_Block extends PageBuilder_Field_Handler {
	private static $allowed_actions = [
		'Add',
		'AddForm',
		'EditContentElement',
		'EditContentElementForm',
		'EditorToolbar',
	];
	
	/**
	 * @param string $action
	 * @return string
	 */
	public function Link($action = null) {
		return Controller::join_links($this->parent->Link(), '/handleBlock/', $action);
	}
	
	public function Add(SS_HTTPRequest $r) {
		return json_encode([
			'html' => $this->AddForm()->loadDataFrom([
				'BlockPosition' => $r->requestVar('BlockPosition'),
				'BlockParent' => $r->requestVar('BlockParent'),
			])->forTemplate()->forTemplate(),
		]);
	}
	
	protected function getCreateOptions() {
		return call_user_func_array('array_merge', array_map(function($class) {
			return $class::get_create_options();
		}, ClassInfo::subclassesFor('PageBuilder_Value_Block')));
	}
	
	/**
	 * @return Form
	 */
	public function AddForm() {
		$options = [];
		foreach($this->getCreateOptions() as $key => $info) {
			$options[$key] = $info['Title'];
		}
		return (new Form(
			$this,
			__FUNCTION__,
			new FieldList([
				new HiddenField('BlockPosition', ''),
				new HiddenField('BlockParent', ''),
				new OptionsetField('BlockType', _t('PageBuilder_Field_Handler_Block.AddFormBlockType', 'Type'), $options),
			]),
			new FieldList([
				new FormAction('AddFormSubmit', _t('PageBuilder_Field_Handler_Block.AddFormSubmit', 'add')),
			]),
			new RequiredFields(['BlockType'])
		))->disableSecurityToken()->addExtraClass('PageBuilderDialog-Form');
	}
	
	public function AddFormSubmit($data) {
		$pageBuilder = $this->getParent();
		$options = $this->getCreateOptions();
		$key = $data['BlockType'];
		if (!isset($options[$key])) {
			throw new Exception(sprintf('Failed to create block, they key "%s" does not exist', $key));
		}
		$info = $options[$key];
		if (isset($info['Callback'])) {
			/** @var PageBuilder_Value_Block $obj */
			$obj = call_user_func($info['Callback']);
			if ($obj->hasMethod('onAfterCreate')) {
				$obj->onAfterCreate();
			}
		} elseif (isset($info['ClassName'])) {
			$class = $info['ClassName'];
			/** @var PageBuilder_Value_Block $obj */
			$obj = new $class();
		} else {
			throw new Exception(sprintf('Failed to create block, "%s" is not a valid class', $key));
		}
		if ($obj->hasMethod('onAfterCreate')) {
			$obj->onAfterCreate();
		}
		return json_encode([
			'DialogEnd' => [
				'html' => (string)$obj->getPageBuilderFields($pageBuilder->getName(), $pageBuilder, $data['BlockPosition'], $data['BlockParent'])->FieldHolder(),
			],
		]);
	}
}
