(function ($) {
	if ($.ui.sortable) {
		var sortable_mouseStart = $.ui.sortable.prototype._mouseStart;
		$.ui.sortable.prototype._mouseStart = function (event, overrideHandle, noActivation) {
			this._trigger('customBeforeStart', event, this._uiHash());
			sortable_mouseStart.apply(this, [event, overrideHandle, noActivation]);
		};
	}
	$('.zauberfisch\\\\PageBuilder\\\\Form\\\\Field, .zauberfisch\\\\PageBuilder\\\\Form\\\\Field *').entwine({
		getPageBuilderField: function () {
			return this.closest('.zauberfisch\\\\PageBuilder\\\\Form\\\\Field');
		},
		getRootForm: function () {
			return this.closest('form');
		},
		getConfig: function () {
			return this.getPageBuilderField().data('config');
		}
	});
	$('.zauberfisch\\\\PageBuilder\\\\Form\\\\Field .grid-controls .icon-button').entwine({
		onclick: function () {
			var field = this.closest('.zauberfisch\\\\PageBuilder\\\\Form\\\\Field'),
				val = this.prop('href').split('#')[1];
			field.data('grid-mode', val);
			field.attr('data-grid-mode', val);
			this.addClass('active').siblings().removeClass('active');
			return false;
		}
	});
	$('.zauberfisch\\\\PageBuilder\\\\Form\\\\Field .zauberfisch\\\\PageBuilder\\\\Model\\\\Block\\\\AbstractBlock *').entwine({
		getBlockContainer: function () {
			return this.closest('.zauberfisch\\\\PageBuilder\\\\Model\\\\Block\\\\AbstractBlock');
		},
		getParentBlockContainer: function () {
			return this.parent().closest('.zauberfisch\\\\PageBuilder\\\\Model\\\\Block\\\\Group');
		}
	});
	$('.zauberfisch\\\\PageBuilder\\\\Form\\\\Field .zauberfisch\\\\PageBuilder\\\\Model\\\\Block\\\\AbstractBlock').entwine({
		getWidthsControls: function () {
			return this.find('> .PageBuilder_Value_Block-Controls > .PageBuilder_Value_Block-Widths');
		},
		updateWidthDesktop: function (width) {
			this.data('width-desktop', width);
			this.attr('data-width-desktop', width);
			this.getParentBlockContainer().updateGrid();
			if (this.hasClass('zauberfisch\\PageBuilder\\Model\\Block\\Group')) {
				this.updateWidthContext();
			}
		},
		updateWidthTablet: function (width) {
			this.data('width-tablet', width);
			this.attr('data-width-tablet', width);
			this.getParentBlockContainer().updateGrid();
			if (this.hasClass('zauberfisch\\PageBuilder\\Model\\Block\\Group')) {
				this.updateWidthContext();
			}
		},
		findBlockMetaField: function (fieldName) {
			var pageBuilderFieldName = this.closest('.zauberfisch\\\\PageBuilder\\\\Form\\\\Field').data('name'),
				blockName = this.data('name');
			return this.find('#' + pageBuilderFieldName + '_' + blockName + '_' + fieldName);
		}
	});
	$('.zauberfisch\\\\PageBuilder\\\\Form\\\\Field input.PageBuilder_Value_Block-WidthDesktop').entwine({
		onchange: function () {
			this.getBlockContainer().updateWidthDesktop(this.val());
		}
	});
	$('.zauberfisch\\\\PageBuilder\\\\Form\\\\Field input.PageBuilder_Value_Block-WidthTablet').entwine({
		onchange: function () {
			this.getBlockContainer().updateWidthTablet(this.val());
		}
	});
	$('.zauberfisch\\\\PageBuilder\\\\Form\\\\Field .zauberfisch\\\\PageBuilder\\\\Model\\\\Block\\\\Group').entwine({
		onmatch: function () {
			this.updateGrid();
		},
		getDirectChildren: function () {
			return this.find('> .PageBuilder_Value_Block_BlockGroup-Blocks > .zauberfisch\\\\PageBuilder\\\\Model\\\\Block\\\\AbstractBlock');
		},
		updateWidthContext: function () {
			var parentWidthDesktop = parseInt(this.data('width-desktop')),
				parentWidthTablet = parseInt(this.data('width-tablet'));
			this.getDirectChildren().each(function () {
				var _this = $(this);
				// _this.data('width-desktop-context', parentWidthDesktop);
				// _this.attr('data-width-desktop-context', parentWidthDesktop);
				// _this.data('width-tablet-context', parentWidthTablet);
				// _this.attr('data-width-tablet-context', parentWidthTablet);
				//// set max values
				var inputDesktop = _this.getWidthsControls().find('input.PageBuilder_Value_Block-WidthDesktop');
				var inputTablet = _this.find('input.PageBuilder_Value_Block-WidthTablet');
				inputDesktop.attr('max', parentWidthDesktop);
				inputTablet.attr('max', parentWidthTablet);
				if (_this.data('width-desktop') > parentWidthDesktop) {
					_this.data('width-desktop', parentWidthDesktop);
					_this.attr('data-width-desktop', parentWidthDesktop);
					inputDesktop.val(parentWidthDesktop);
				}
				if (_this.data('width-tablet') > parentWidthTablet) {
					_this.data('width-tablet-context', parentWidthTablet);
					_this.attr('data-width-tablet-context', parentWidthTablet);
					inputTablet.val(parentWidthTablet);
				}
				_this.updateWidthContext();
			});
		},
		updateGrid: function () {
			// var rowDesktop = 0,
			// 	rowTablet = 0,
			// 	parentWidthDesktop = parseInt(this.data('width-desktop')),
			// 	parentWidthTablet = parseInt(this.data('width-tablet'));
			// this.getDirectChildren().each(function (i) {
			// 	var _this = $(this),
			// 		desktop = parseInt(_this.data('width-desktop')),
			// 		tablet = parseInt(_this.data('width-tablet'));
			// 	rowDesktop += desktop;
			// 	if (i == 0 || rowDesktop > parentWidthDesktop) {
			// 		// item can't fit into current row, place it on next row
			// 		_this.addClass('grid-desktop-clear');
			// 		rowDesktop = desktop;
			// 	} else {
			// 		// item fits
			// 		_this.removeClass('grid-desktop-clear');
			// 	}
			// 	rowTablet += tablet;
			// 	if (i == 0 || rowTablet > parentWidthTablet) {
			// 		// item can't fit into current row, place it on next row
			// 		_this.addClass('grid-tablet-clear');
			// 		rowTablet = tablet;
			// 	} else {
			// 		// item fits
			// 		_this.removeClass('grid-tablet-clear');
			// 	}
			// });
		},
		updateBlocksMetadata: function () {
			var groupName = this.data('name');
			this.updateGrid();
			this.updateWidthContext();
			this.getDirectChildren().each(function (i) {
				var _this = $(this);
				_this.findBlockMetaField('BlockPosition').val(i);
				_this.findBlockMetaField('BlockParent').val(groupName);
				if (_this.hasClass('zauberfisch\\PageBuilder\\Model\\Block\\Group')) {
					_this.updateBlocksMetadata();
				}
			});
		}
	});
	$('.zauberfisch\\\\PageBuilder\\\\Form\\\\Field .zauberfisch\\\\PageBuilder\\\\Model\\\\Block\\\\Group.zauberfisch\\\\PageBuilder\\\\Model\\\\Block\\\\Base').entwine({
		onmatch: function () {
			// this.data('width-desktop-context', 12);
			// this.attr('data-width-desktop-context', 12);
			// this.data('width-tablet-context', 12);
			// this.attr('data-width-tablet-context', 12);
			this.updateWidthContext();
			this._super();
		},
		updateWidthContext: function () {
			this.getDirectChildren().each(function (i) {
				var _this = $(this);
				_this.data('width-desktop', 12);
				_this.attr('data-width-desktop', 12);
				_this.data('width-tablet', 12);
				_this.attr('data-width-tablet', 12);
				// _this.data('width-desktop-context', 12);
				// _this.attr('data-width-desktop-context', 12);
				// _this.data('width-tablet-context', 12);
				// _this.attr('data-width-tablet-context', 12);
				// set max values
				var inputDesktop = _this.find('> .PageBuilder_Value_Block-Widths input.PageBuilder_Value_Block-WidthDesktop');
				var inputTablet = _this.find('> .PageBuilder_Value_Block-Widths input.PageBuilder_Value_Block-WidthTablet');
				inputDesktop.attr('max', 12);
				inputTablet.attr('max', 12);
				inputDesktop.val(12);
				inputTablet.val(12);
			});
			this._super();
		}
	});
	$('.zauberfisch\\\\PageBuilder\\\\Form\\\\Field .PageBuilder_Value_Block_BlockGroup-AddButton').entwine({
		onclick: function () {
			var rootForm = this.getRootForm(),
				//_this = this,
				dialog = $('<div/>'),
				container = this.getBlockContainer(),
				pageBuilder = this.getPageBuilderField(),
				blocks = container.find('> .PageBuilder_Value_Block_BlockGroup-Blocks');
			dialog.PageBuilderDialog({
				contentURL: this.getConfig().urls.add,
				data: $.param({
					BlockParent: container.data('name'),
					BlockPosition: blocks.find('> .zauberfisch\\\\PageBuilder\\\\Model\\\\Block\\\\AbstractBlock').length
				}),
				//,
				//FormMergeData: {
				//	GroupIndex: container.data('unique-index'),
				//	BlockIndex: _this.getUniqueBlockIndex(),
				//	CreatedForClassName: rootForm.find('input[name=ClassName]').val(),
				//	CreatedForID: parseInt(rootForm.find('input[name=ID]').val())
				//},
				DialogEnd: function (event, data) {
					var block = $(data.html);
					blocks.append(block);
					pageBuilder.sortableBind();
					rootForm.addClass('changed');
					if (!block.hasClass('zauberfisch\\PageBuilder\\Model\\Block\\Group')) {
						block.find('.PageBuilder_Value_Block-Edit').click();
					}
					container.updateWidthContext();
				}
			});
			dialog.PageBuilderDialog('open');
		}
	});
	$('.PageBuilder_Value_Block-Delete').entwine({
		onclick: function () {
			var container = this.getBlockContainer(),
				_this = this;
			container.addClass('pre-delete');
			setTimeout(function () {
				if (confirm(_this.data('confirm'))) {
					var parent = _this.getParentBlockContainer();
					container.remove();
					parent.updateBlocksMetadata();
					//var index = this.closest('.PageBuilder_Field-BlockGroup').index();
					//this.closest('.PageBuilder_Field-BlockGroups').removeGroup(index);
				}
				container.removeClass('pre-delete');
			}, 100);
			this.blur();
			return false;
		}
	});
	$('.PageBuilder_Value_Block-Edit').entwine({
		onclick: function () {
			var dialog = $('<div/>'),
				_this = this,
				block = _this.getBlockContainer();
			dialog.ssdialog({
				iframeUrl: this.data('edit-url'),
				//height: 550,
				//height: $(window).height() - 100,
				//width: $(window).width() - 100,
				//maxWidth: 1000,
				maxHeight: 1000,
				maxWidth: 1000,
				beforeClose: function (a, b) {
					var iframeForm = $(this).find('iframe').contents().find('form');
					if (iframeForm) {
						var id = iframeForm.data('content-element-id'),
							versionGroupID = iframeForm.data('content-element-version-group-id'),
							previewURL = iframeForm.data('content-element-preview-url'),
							editURL = iframeForm.data('content-element-edit-url');
						if (id && versionGroupID) {
							block.findBlockMetaField('ContentElementID').val(id);
							block.data('id', id);
							block.data('version-group-id', versionGroupID);
							_this.getRootForm().addClass('changed');
						}
						if (previewURL) {
							$.get(previewURL, function (content) {
								block.find('> .PageBuilder_Value_Block-Preview').html(content);
							});
						}
						if (editURL) {
							_this.data('edit-url', editURL);
						}
					}
				}
			});
			dialog.ssdialog('open');
			this.blur();
			return false;
		}
	});
	$('.zauberfisch\\\\PageBuilder\\\\Form\\\\Field').entwine({
		onmatch: function () {
			this.sortableBind();
		},
		sortableBind: function () {
			var rootForm = this.getRootForm(),
				base = this.find('.zauberfisch\\\\PageBuilder\\\\Model\\\\Block\\\\Base'),
				groups = this.find('.PageBuilder_Value_Block_BlockGroup-Blocks');
			groups.each(function () {
				if ($(this).hasClass('ui-sortable')) {
					$(this).sortable('destroy');
				}
			});
			groups.sortable({
				connectWith: '#' + this.prop('id') + " .PageBuilder_Value_Block_BlockGroup-Blocks",
				handle: '> .PageBuilder_Value_Block-Controls > .PageBuilder_Value_Block-Reorder',
				//placeholder: 'zauberfisch\\\\PageBuilder\\\\Model\\\\Block\\\\AbstractBlock',
				placeholder: {
					element: function (orig, ui) {
						// rootForm.addClass('changed');
						var clone = $('<div></div>');
						// clone.addClass(orig.get(0).className);
						clone.addClass('sort-placeholder');
						clone.css('grid-column', 'span 1');
						$('.zauberfisch\\\\PageBuilder\\\\Model\\\\Block\\\\Base .PageBuilder_Value_Block_BlockGroup-Blocks').prepend(clone);
						// clone.css('height', orig.css('height'));
						// clone.css('border', '1px solid red');
						// clone.css('float', 'left');
						// clone.css('margin-right', '0');
						// clone.css('min-width', '10%');
						// clone.css('max-width', '100%');

						return clone;
					},
					update: function () {
						return;
					}
				},
				helper: 'clone',
				//forceHelperSize: true,
				//forcePlaceholderSize: true,
				update: function () {
					base.updateBlocksMetadata();
					rootForm.addClass('changed');
				},
				customBeforeStart: function () {
					//_this.find('.PageBuilder_Field-BlockGroup > *').hide()
					//	.filter('.PageBuilder_Field-BlockGroup-MetaFields, .PageBuilder_Field-BlockGroup-Reorder').show();
				},
				stop: function () {
					//_this.find('.PageBuilder_Field-BlockGroup > *').show();
				}
			});
		}
	});
})
(jQuery);
