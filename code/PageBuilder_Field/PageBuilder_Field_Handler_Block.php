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
	
	/**
	 * @return Form
	 */
	public function AddForm() {
		$classes = [];
		foreach (ClassInfo::subclassesFor('PageBuilder_Value_Block') as $class) {
			if (!in_array($class, ['PageBuilder_Value_Block', 'PageBuilder_Value_Block_BlockGroup_Base', 'PageBuilder_Value_Block_ContentElement'])) {
				$classes[$class] = singleton($class)->i18n_singular_name();
			}
		}
		return (new Form(
			$this,
			__FUNCTION__,
			new FieldList([
				new HiddenField('BlockPosition', ''),
				new HiddenField('BlockParent', ''),
				new OptionsetField('ClassName', _t('PageBuilder_Field_Handler_Block.AddFormClassName', 'Class name'), $classes),
			]),
			new FieldList([
				new FormAction('AddFormSubmit', _t('PageBuilder_Field_Handler_Block.AddFormSubmit', 'add')),
			]),
			new RequiredFields(['AddClassName'])
		))->disableSecurityToken()->addExtraClass('PageBuilderDialog-Form');
	}
	
	public function AddFormSubmit($data) {
		$pageBuilder = $this->getParent();
		$class = $data['ClassName'];
		/** @var PageBuilder_Value_Block $obj */
		$obj = new $class();
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
