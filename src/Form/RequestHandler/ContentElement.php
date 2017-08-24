<?php

namespace zauberfisch\PageBuilder\Form\RequestHandler;

use zauberfisch\PageBuilder\Form\HtmlEditorField_Toolbar;

/**
 * @author zauberfisch
 */
class ContentElement extends AbstractRequestHandler {
	private static $url_handlers = [
		'$ContentElementVersionGroupID/$ContentElementID/$Action' => '$Action',
	];
	private static $allowed_actions = [
		'Form',
		'PageBuilderPreview',
		'EditorToolbar',
	];
	/**
	 * @var \PageBuilder_Model_ContentElement_AbstractContentElement
	 */
	protected $_contentElement;
	
	public function getContentElementVersionGroupID() {
		return $this->getRequest()->param('ContentElementVersionGroupID');
	}
	
	public function getContentElementID() {
		return $this->getRequest()->param('ContentElementID');
	}
	
	/**
	 * @return \PageBuilder_Model_ContentElement_AbstractContentElement
	 */
	public function getContentElement() {
		if (!$this->_contentElement && $this->getContentElementID()) {
			$obj = \PageBuilder_Model_ContentElement_AbstractContentElement::get()->byID($this->getContentElementID());
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
		return $this->linkForID($this->getContentElementVersionGroupID(), $this->getContentElementID(), $action);
	}
	
	/**
	 * @param int $versionGroupID
	 * @param int $elementID
	 * @param string $action
	 * @return string
	 */
	public function LinkForID($versionGroupID, $elementID, $action = null) {
		return \Controller::join_links($this->getParent()->Link('handleContentElement'), $versionGroupID, $elementID, $action);
	}
	
	public function index(\SS_HTTPRequest $r) {
		if (!$this->getContentElement()) {
			return $this->httpError(404);
		}
		$dummy = new \LeftAndMain();
		$dummy->response = new \SS_HTTPResponse();
		$dummy->init();
		\HtmlEditorConfig::require_js();
		// not using json because editing uses an iframe
		return $this->customise([
			'Content' => $this->EditorToolbar()->forTemplate(),
		])->renderWith('CMSDialog');
	}
	
	public function Form() {
		$obj = $this->getContentElement();
		$fields = $obj->getPageBuilderPopupFields();
		/** @noinspection PhpParamsInspection */
		$action = (new \FormAction('EditContentElementSubmit', _t('PageBuilder_Form_RequestHandler_ContentElement.Submit', 'save')))
			->addExtraClass('ss-ui-action-constructive icon-accept');
		if (!$obj->canView()) {
			return null;
		}
		if (!$obj->canEdit()) {
			$action->setDisabled(true);
		}
		return (new \Form(
			$this,
			__FUNCTION__,
			$fields,
			new \FieldList([
				$action,
			])
		))
			->disableSecurityToken()
			->loadDataFrom($obj)
			->setupFormErrors()
			->setAttribute('data-content-element-edit-url', $this->Link())
			->setAttribute('data-content-element-id', $this->getContentElementID())
			->setAttribute('data-content-element-version-group-id', $this->getContentElementVersionGroupID())
			->setAttribute('data-content-element-preview-url', $this->Link('PageBuilderPreview'))
			->setAttribute('style', 'padding: 20px;');
	}
	
	public function EditContentElementSubmit($data, \Form $f) {
		$obj = $this->getContentElement();
		if (!$obj->canEdit()) {
			\Session::set("FormInfo.{$f->FormName()}.data", $data);
			\Session::set("FormInfo.{$f->FormName()}.errors", []);
			$f->sessionMessage(_t('PageBuilder_Form_RequestHandler_ContentElement.SubmitPermissionDenied', 'You do not have permission to save this record'), 'bad');
		} else {
			try {
				$f->saveInto($obj);
				$obj->write();
				$f->sessionMessage(_t('PageBuilder_Form_RequestHandler_ContentElement.SubmitSuccess', 'saved'), 'good');
				return \Controller::curr()->redirect($this->LinkForID($obj->VersionGroupID, $obj->ID));
			} catch (\ValidationException $e) {
				\Session::set("FormInfo.{$f->FormName()}.data", $data);
				\Session::set("FormInfo.{$f->FormName()}.errors", []);
				$f->sessionMessage($e->getResult()->message(), 'bad');
			}
		}
		return \Controller::curr()->redirectBack();
	}
	
	public function PageBuilderPreview() {
		return $this->getContentElement()->PageBuilderPreview();
	}
	
	/**
	 * @return HtmlEditorField_Toolbar
	 */
	public function EditorToolbar() {
		return HtmlEditorField_Toolbar::create($this, 'EditorToolbar');
	}
}
