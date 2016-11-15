(function ($) {
	$.widget("ssui.PageBuilderDialog", $.ui.dialog, {
		DialogContentElement: null,
		options: {
			width: 700,
			height: 600,
			modal: true,
			autoOpen: false,
			autoPosition: true,
			minWidth: 700,
			maxWidth: 600,
			resizable: false,
			data: []
		},
		_loadContent: function (config) {
			var _this = this;
			this.uiDialog.addClass('loading');
			config = $.extend({
				type: 'GET',
				dataType: 'json'
			}, config, {
				success: function (data) {
					_this.uiDialog.removeClass('loading');
					if (typeof data != 'object' || !(data.html || data.DialogEnd)) {
						data = {
							html: data
						};
					}
					if (data.DialogEnd) {
						_this._trigger('DialogEnd', null, data.DialogEnd);
						_this.close();
						_this.DialogContentElement.remove();
					} else {
						_this.DialogContentElement.html(data.html);
						//var grid = _this.DialogContentElement.find('.ss-gridfield');
						//if (grid.length) {
						//	var input = grid.closest('form').find('[name=SelectedIDs]')
						//	var bindSelectHandler = function () {
						//		var gridItems = grid.find('.ss-gridfield-items.ui-selectable');
						//		if (gridItems.length) {
						//			gridItems.on('selectableselected selectableunselected', function () {
						//				input.val($.map(gridItems.find('.ss-gridfield-item.ui-selected'), function (el) {
						//					return $(el).data('id');
						//				}).join(','));
						//			});
						//		}
						//	};
						//	bindSelectHandler();
						//	grid.on('reload', bindSelectHandler);
						//}
					}
				}
			});
			$.ajax(config);
		},
		_create: function () {
			var _this = this;
			//$.ssui.ssdialog.prototype._create.call(this);
			$.ui.dialog.prototype._create.call(this);

			this.DialogContentElement = $('<div class="PageBuilderDialog-Content"></div>');
			this.element.append(this.DialogContentElement);
			//this.DialogContentElement.on('click', 'a.PageBuilderDialog-Link', function () {
			//	_this._loadContent({url: $(this).prop('href')});
			//	return false;
			//});
			// live bind submit event in case there is a form that needs to be ajax submitted
			this.DialogContentElement.on('submit', 'form.PageBuilderDialog-Form', function () {
				var data = $(this).serializeArray();
				//if (_this.options.FormMergeData) {
				//	for (var key in _this.options.FormMergeData) {
				//		data.push({name: key, value: _this.options.FormMergeData[key]});
				//	}
				//}
				_this._loadContent({
					type: 'POST',
					url: $(this).prop('action'),
					data: $.param(data)
				});
				return false;
			});
			// load the initial content
			this._loadContent({
				url: this.options.contentURL,
				data: this.options.data
			});
		},
		close: function () {
			$.ui.dialog.prototype.close.call(this);
			this.element.remove();
		}
	});

}(jQuery));
