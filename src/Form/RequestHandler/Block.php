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
		$_options = [];
		foreach ($this->getCreateOptions() as $key => $info) {
			$_options[] = [
				'Key' => $key,
				'Sort' => isset($info['Sort']) ? $info['Sort'] : 100,
				'TitlePlain' => $info['Title'],
				'Title' => \DBField::create_field(\HTMLText::class, sprintf(
					'<span class="block-type-icon" style="%s">%s</span><span class="block-type-title">%s</span>',
					isset($info['Icon']) && $info['Icon'] ? "background-image: url('{$info['Icon']}');" : '',
					isset($info['Icon']) && $info['Icon'] ? '' : '<span>' . (isset($info['IconText']) && $info['IconText'] ? $info['IconText'] : substr($info['Title'], 0, 3)) . '</span>',
					$info['Title']
				))
			];
		}
		usort($_options, function ($a, $b) {
			$return = $a['Sort'] <=> $b['Sort'];
			if ($return == 0) {
				$return = $a['TitlePlain'] <=> $b['TitlePlain'];
				if ($return == 0) {
					$return = $a['Key'] <=> $b['Key'];
				}
			}
			return $return;
		});
		$options = [];
		foreach ($_options as $info) {
			$options[$info['Key']] = $info['Title'];
		}
		/** @noinspection PhpParamsInspection */
		return (new \Form(
			$this,
			__FUNCTION__,
			new \FieldList([
				new \HiddenField('BlockPosition', ''),
				new \HiddenField('BlockParent', ''),
				(new \OptionsetField('BlockType', _t('PageBuilder_Form_RequestHandler_Block.AddFormBlockType', 'Type'), $options))
					->addExtraClass('stacked'),
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
		} else if (isset($info['ClassName'])) {
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
