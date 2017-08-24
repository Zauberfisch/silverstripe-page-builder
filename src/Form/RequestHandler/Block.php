<?php

namespace zauberfisch\PageBuilder\Form\RequestHandler;

use zauberfisch\PageBuilder\Model as Model;

/**
 * @author zauberfisch
 */
class Block extends AbstractRequestHandler {
	private static $allowed_actions = [
		'Add',
		'AddForm',
	];
	
	/**
	 * @param string $action
	 * @return string
	 */
	public function Link($action = null) {
		return \Controller::join_links($this->parent->Link(), '/handleBlock/', $action);
	}
	
	public function Add(\SS_HTTPRequest $r) {
		/** @var \HTMLText $html */
		$html = $this->AddForm()->loadDataFrom([
			'BlockPosition' => $r->requestVar('BlockPosition'),
			'BlockParent' => $r->requestVar('BlockParent'),
		])->forTemplate();
		return json_encode([
			'html' => $html->forTemplate(),
		]);
	}
	
	protected function getCreateOptions() {
		return call_user_func_array('array_merge', array_map(function ($class) {
			/** @noinspection PhpUndefinedMethodInspection */
			return $class::get_create_options();
		}, \ClassInfo::subclassesFor(Model\Block\AbstractBlock::class)));
	}
	
	/**
	 * @return \Form
	 */
	public function AddForm() {
		$options = [];
		foreach ($this->getCreateOptions() as $key => $info) {
			$options[$key] = $info['Title'];
		}
		/** @noinspection PhpParamsInspection */
		return (new \Form(
			$this,
			__FUNCTION__,
			new \FieldList([
				new \HiddenField('BlockPosition', ''),
				new \HiddenField('BlockParent', ''),
				new \OptionsetField('BlockType', _t('PageBuilder_Form_RequestHandler_Block.AddFormBlockType', 'Type'), $options),
			]),
			new \FieldList([
				new \FormAction('AddFormSubmit', _t('PageBuilder_Form_RequestHandler_Block.AddFormSubmit', 'add')),
			]),
			new \RequiredFields(['BlockType'])
		))->disableSecurityToken()->addExtraClass('PageBuilderDialog-Form');
	}
	
	public function AddFormSubmit($data) {
		$pageBuilder = $this->getParent();
		$options = $this->getCreateOptions();
		$key = $data['BlockType'];
		if (!isset($options[$key])) {
			throw new \Exception(sprintf('Failed to create block, they key "%s" does not exist', $key));
		}
		$info = $options[$key];
		if (isset($info['Callback'])) {
			/** @var Model\Block\AbstractBlock $obj */
			$obj = call_user_func($info['Callback']);
		} elseif (isset($info['ClassName'])) {
			$class = $info['ClassName'];
			/** @var Model\Block\AbstractBlock $obj */
			$obj = new $class();
		} else {
			throw new \Exception(sprintf('Failed to create block, "%s" is not a valid class', $key));
		}
		if ($obj->hasMethod('onAfterCreate')) {
			$obj->onAfterCreate();
		}
		return json_encode([
			'DialogEnd' => [
				'html' => (string)$obj->_getPageBuilderFields($pageBuilder->getName(), $pageBuilder, $data['BlockPosition'], $data['BlockParent'])->FieldHolder(),
			],
		]);
	}
}
