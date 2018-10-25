(function ($) {
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
			if (this.hasClass('zauberfisch\\PageBuilder\\Model\\Block\\Group')) {
				this.updateWidthContext();
			}
		},
		updateWidthTablet: function (width) {
			this.data('width-tablet', width);
			this.attr('data-width-tablet', width);
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
			var val = parseInt(this.val()),
				max = parseInt(this.prop('max'));
			if (val > max) {
				val = max;
				this.val(val);
			}
			this.getBlockContainer().updateWidthDesktop(val);
		}
	});
	$('.zauberfisch\\\\PageBuilder\\\\Form\\\\Field input.PageBuilder_Value_Block-WidthTablet').entwine({
		onchange: function () {
			var val = parseInt(this.val()),
				max = parseInt(this.prop('max'));
			if (val > max) {
				val = max;
				this.val(val);
			}
			this.getBlockContainer().updateWidthTablet(val);
		}
	});
	$('.zauberfisch\\\\PageBuilder\\\\Form\\\\Field .zauberfisch\\\\PageBuilder\\\\Model\\\\Block\\\\Group').entwine({
		getDirectChildren: function () {
			return this.find('> .PageBuilder_Value_Block_BlockGroup-Blocks > .zauberfisch\\\\PageBuilder\\\\Model\\\\Block\\\\AbstractBlock');
		},
		updateWidthContext: function () {
			var parentWidthDesktop = parseInt(this.data('width-desktop')),
				parentWidthTablet = parseInt(this.data('width-tablet'));
			this.getDirectChildren().each(function () {
				var _this = $(this);
				// set max values
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
		updateBlocksMetadata: function () {
			var groupName = this.data('name');
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
	$('.zauberfisch\\\\PageBuilder\\\\Form\\\\Field .zauberfisch\\\\PageBuilder\\\\Model\\\\Block\\\\AbstractBlock .PageBuilder_Value_Block-Reorder').entwine({
		onmousedown: function () {
			this.getBlockContainer().attr('draggable', 'true');
		}
	});
	$('.zauberfisch\\\\PageBuilder\\\\Form\\\\Field').entwine({
		BlockDragElement: null,
		BlockDragElementWidthDesktop: null,
		BlockDragElementWidthTablet: null,
		ondragstart: function (e) {
			var dragElement = $(e.target);
			if (dragElement.hasClass('zauberfisch\\PageBuilder\\Model\\Block\\AbstractBlock')) {
				this.setBlockDragElement(dragElement);
				this.setBlockDragElementWidthDesktop(dragElement.data('width-desktop'));
				this.setBlockDragElementWidthTablet(dragElement.data('width-tablet'));
				/* dragGhost = dragEl.cloneNode(true);
				dragGhost.classList.add('hidden-drag-ghost'); */
				
				/*  document.body.appendChild(dragGhost);
				 e.dataTransfer.setDragImage(dragGhost, 0, 0); */
				
				e.originalEvent.dataTransfer.effectAllowed = 'move';
				// TODO once we have support for copy&paste, the drag data should also be set to the copy text
				//e.originalEvent.dataTransfer.setData('Text', '');
				
				// var img = new Image();
				// img.src = 'example.png';
				// e.originalEvent.dataTransfer.setDragImage(img, 10, 10);
				
				setTimeout(function () {
					dragElement.addClass('drag-ghost');
				}, 0);
				var _this = this,
					dragoverRunning = false;
				this.on('dragover', function (e) {
					if (!dragoverRunning) {
						dragoverRunning = true;
						_this._ondragover(e);
						dragoverRunning = false;
					}
				});
				this.on('dragend', function (e) {
					_this._ondragend(e);
				});
			}
		},
		_ondragover: function (e) {
			console.log('ondragover');
			var dragElement = this.getBlockDragElement();
			if (dragElement) {
				e.preventDefault();
				e.originalEvent.dataTransfer.dropEffect = 'move';
				var dragTarget = null,
					dragTargetIsGroup = false;
				for (var i in e.originalEvent.path) {
					var _dragTarget = e.originalEvent.path[i];
					if (_dragTarget.classList.contains('PageBuilder_Value_Block_BlockGroup-Blocks')) {
						dragTargetIsGroup = true;
					}
					if (_dragTarget.classList.contains('zauberfisch\\PageBuilder\\Model\\Block\\AbstractBlock')) {
						dragTarget = _dragTarget;
						break;
					}
				}
				if (dragTarget) {
					dragTarget = $(dragTarget);
					if (!dragTarget.is(dragElement)) {
						var group = dragTargetIsGroup ? dragTarget : dragTarget.getParentBlockContainer();
						var widthDesktop = Math.min(this.getBlockDragElementWidthDesktop(), group.data('width-desktop'));
						dragElement.data('width-desktop', widthDesktop);
						dragElement.attr('data-width-desktop', widthDesktop);
						var widthTablet = Math.min(this.getBlockDragElementWidthTablet(), group.data('width-tablet'));
						dragElement.data('width-tablet', widthTablet);
						dragElement.attr('data-width-tablet', widthTablet);
						if (dragTargetIsGroup) {
							var blocks = group.find('> .PageBuilder_Value_Block_BlockGroup-Blocks');
							dragElement.appendTo(blocks);
						} else {
							dragElement[((e.originalEvent.clientX - dragTarget.offset().left) / dragTarget.width() > .5) ? 'insertAfter' : 'insertBefore'](dragTarget);
						}
					}
				}
			}
		},
		_ondragend: function (e) {
			var dragElement = this.getBlockDragElement();
			this.off('dragover');
			this.off('dragend');
			if (dragElement) {
				e.preventDefault();
				dragElement.removeClass('drag-ghost');
				// setting the width back to it's previous value. This is needed for .updateBlocksMetadata() to work
				// correctly which will then return it back to the current value
				var widthDesktop = this.getBlockDragElementWidthDesktop();
				dragElement.data('width-desktop', widthDesktop);
				dragElement.attr('data-width-desktop', widthDesktop);
				var widthTablet = this.getBlockDragElementWidthTablet();
				dragElement.data('width-tablet', widthTablet);
				dragElement.attr('data-width-tablet', widthTablet);
				dragElement.attr('draggable', 'false');
				this.setBlockDragElement(null);
				this.setBlockDragElementWidthDesktop(null);
				this.setBlockDragElementWidthTablet(null);
				this.find('.zauberfisch\\\\PageBuilder\\\\Model\\\\Block\\\\Base').updateBlocksMetadata();
				this.getRootForm().addClass('changed');
			}
		}
	});
})(jQuery);
