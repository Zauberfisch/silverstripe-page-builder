<?php

class PageBuilder_Field_Handler_ContentElement extends PageBuilder_Field_Handler {
	private static $url_handlers = [
		'$ContentElementID/$Action' => '$Action',
	];
	private static $allowed_actions = [
		'Form',
		'PageBuilderPreview',
		'EditorToolbar',
	];
	protected $_contentElement;

	public function getContentElementID() {
		return $this->getRequest()->param('ContentElementID');
	}

	/**
	 * @return PageBuilder_ContentElement
	 */
	public function getContentElement() {
		if (!$this->_contentElement && $this->getContentElementID()) {
			$obj = PageBuilder_ContentElement::get()->byID($this->getContentElementID());
			if ($obj && $obj->exists()) {
				$this->_contentElement = $obj;
			}
		}
		return $this->_contentElement;
	}

	/**
	 * @param string $action
	 * @return string
	 */
	public function Link($action = null) {
		return Controller::join_links($this->getParent()->Link('handleContentElement'), $this->getContentElementID(), $action);
	}

	public function index(SS_HTTPRequest $r) {
		$dummy = new LeftAndMain();
		$dummy->response = new SS_HTTPResponse();
		$dummy->init();
		HtmlEditorConfig::require_js();
		// not using json because editing uses an iframe
		return $this->customise([
			'Content' => $this->EditorToolbar()->forTemplate(),
		])->renderWith('CMSDialog');
	}

	public function Form() {
		$obj = $this->getContentElement();
		$fields = $obj->getPageBuilderPopupFields();
		return (new Form(
			$this,
			__FUNCTION__,
			$fields,
			new FieldList([
				(new FormAction('EditContentElementSubmit', _t('PageBuilder_Field_Handler_ContentElement.Submit', 'save')))
					->addExtraClass('ss-ui-action-constructive icon-accept'),
			])
		))->disableSecurityToken()->loadDataFrom($obj)->setAttribute('style', 'padding: 20px;');
	}

	public function EditContentElementSubmit($data, Form $f) {
		$obj = $this->getContentElement();
		$f->saveInto($obj);
		$obj->write();
		$f->sessionMessage(_t('PageBuilder_Field_Handler_ContentElement.SubmitSuccess', 'saved'), 'good');
		return Controller::curr()->redirectBack();
	}

	public function PageBuilderPreview() {
		return $this->getContentElement()->PageBuilderPreview();
	}
	
	/**
	 * @return PageBuilderHtmlEditorField_Toolbar
	 */
	public function EditorToolbar() {
		return PageBuilderHtmlEditorField_Toolbar::create($this, "EditorToolbar");
	}
}
