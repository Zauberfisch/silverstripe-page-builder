<?php

/**
 * no underscore because it would break routing
 */
class PageBuilderHtmlEditorField_Toolbar extends HtmlEditorField_Toolbar {
	private static $allowed_actions = ['viewfile'];

	/**
	 * @param SS_HTTPRequest $request
	 * @return HTMLText
	 * @throws SS_HTTPResponse_Exception
	 */
	public function viewfile($request) {
		$data = [
			$request->getVars(),
			$request->postVars(),
			];
		foreach($data as &$arr) {
			if (isset($arr['FileID'])) {
				$arr['ID'] = $arr['FileID'];
				unset($arr['FileID']);
			}
		}
		$request = new SS_HTTPRequest($request->httpMethod(), $request->getURL(), $data[0], $data[1], $request->getBody());
		return parent::viewfile($request);
	}

}
