(function ($) {
    if ($.ui.sortable) {
        var sortable_mouseStart = $.ui.sortable.prototype._mouseStart;
        $.ui.sortable.prototype._mouseStart = function (event, overrideHandle, noActivation) {
            this._trigger('customBeforeStart', event, this._uiHash());
            sortable_mouseStart.apply(this, [event, overrideHandle, noActivation]);
        };
    }
    $('.PageBuilder_Field, .PageBuilder_Field *').entwine({
        getPageBuilderField: function () {
            return this.closest('.PageBuilder_Field');
        },
        getRootForm: function () {
            return this.closest('form');
        },
        getConfig: function () {
            return this.getPageBuilderField().data('config');
        }
    });
    $('.PageBuilder_Field .grid-controls .icon-button').entwine({
        onclick: function () {
            var field = this.closest('.PageBuilder_Field'),
                val = this.prop('href').split('#')[1];
            field.data('grid-mode', val);
            field.attr('data-grid-mode', val);
            this.addClass('active').siblings().removeClass('active');
            return false;
        }
    });
    $('.PageBuilder_Field .PageBuilder_Value_Block *').entwine({
        getBlockContainer: function () {
            return this.closest('.PageBuilder_Value_Block');
        },
        getParentBlockContainer: function () {
            return this.parent().closest('.PageBuilder_Value_Block_BlockGroup');
        }
    });
    $('.PageBuilder_Field .PageBuilder_Value_Block').entwine({
        updateWidthDesktop: function (width) {
            this.data('width-desktop', width);
            this.attr('data-width-desktop', width);
            this.getParentBlockContainer().updateGrid();
            if (this.hasClass('PageBuilder_Value_Block_BlockGroup')) {
                this.updateWidthContext();
            }
        },
        updateWidthTablet: function (width) {
            this.data('width-tablet', width);
            this.attr('data-width-tablet', width);
            this.getParentBlockContainer().updateGrid();
            if (this.hasClass('PageBuilder_Value_Block_BlockGroup')) {
                this.updateWidthContext();
            }
        }
    });
    $('.PageBuilder_Field input.PageBuilder_Value_Block-WidthDesktop').entwine({
        onchange: function () {
            this.getBlockContainer().updateWidthDesktop(this.val());
        }
    });
    $('.PageBuilder_Field input.PageBuilder_Value_Block-WidthTablet').entwine({
        onchange: function () {
            this.getBlockContainer().updateWidthTablet(this.val());
        }
    });
    $('.PageBuilder_Field .PageBuilder_Value_Block_BlockGroup').entwine({
        onmatch: function () {
            this.updateGrid();
        },
        getDirectChildren: function () {
            return this.find('> .PageBuilder_Value_Block_BlockGroup-Blocks > .PageBuilder_Value_Block');
        },
        updateWidthContext: function () {
            var parentWidthDesktop = parseInt(this.data('width-desktop')),
                parentWidthTablet = parseInt(this.data('width-tablet'));
            this.getDirectChildren().each(function () {
                var _this = $(this);
                _this.data('width-desktop-context', parentWidthDesktop);
                _this.attr('data-width-desktop-context', parentWidthDesktop);
                _this.data('width-tablet-context', parentWidthTablet);
                _this.attr('data-width-tablet-context', parentWidthTablet);
                _this.find('> .PageBuilder_Value_Block-Widths input.PageBuilder_Value_Block-WidthDesktop').attr('max', parentWidthDesktop);
                _this.find('> .PageBuilder_Value_Block-Widths input.PageBuilder_Value_Block-WidthTablet').attr('max', parentWidthTablet);
                _this.updateWidthContext();
            });
        },
        updateGrid: function () {
            var rowDesktop = 0,
                rowTablet = 0,
                parentWidthDesktop = parseInt(this.data('width-desktop')),
                parentWidthTablet = parseInt(this.data('width-desktop'));
            this.getDirectChildren().each(function (i) {
                var _this = $(this),
                    desktop = parseInt(_this.data('width-desktop')),
                    tablet = parseInt(_this.data('width-tablet'));
                rowDesktop += desktop;
                if (i == 0 || rowDesktop > parentWidthDesktop) {
                    // item can't fit into current row, place it on next row
                    _this.addClass('grid-desktop-clear');
                    rowDesktop = desktop;
                } else {
                    // item fits
                    _this.removeClass('grid-desktop-clear');
                }
                rowTablet += tablet;
                if (i == 0 || rowTablet > parentWidthTablet) {
                    // item can't fit into current row, place it on next row
                    _this.addClass('grid-tablet-clear');
                    rowTablet = tablet;
                } else {
                    // item fits
                    _this.removeClass('grid-tablet-clear');
                }
            });
        },
        updateBlocksMetadata: function () {
            var prefix = this.closest('.PageBuilder_Field').data('name'),
                groupName = this.data('name');
            this.updateGrid();
            this.find('> .PageBuilder_Value_Block_BlockGroup-Blocks > .PageBuilder_Value_Block').each(function (i) {
                var _this = $(this),
                    name = _this.data('name'),
                    selector = '#' + prefix + '_' + name + '_';
                _this.find(selector + 'BlockPosition').val(i);
                _this.find(selector + 'BlockParent').val(groupName);
                if (_this.hasClass('PageBuilder_Value_Block_BlockGroup')) {
                    _this.updateBlocksMetadata();
                    _this.updateGrid();
                }
            });
        }
    });
    $('.PageBuilder_Field .PageBuilder_Value_Block_BlockGroup.PageBuilder_Value_Block_BlockGroup_Base').entwine({
        onmatch: function () {
            this.data('width-desktop-context', 12);
            this.attr('data-width-desktop-context', 12);
            this.data('width-tablet-context', 12);
            this.attr('data-width-tablet-context', 12);
            this.updateWidthContext();
            this._super();
        }
    });
    $('.PageBuilder_Field .PageBuilder_Value_Block_BlockGroup-AddButton').entwine({
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
                    BlockPosition: blocks.find('> .PageBuilder_Value_Block').length
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
                    if (!block.hasClass('PageBuilder_Value_Block_BlockGroup')) {
                        block.find('.PageBuilder_Value_Block-Edit').click();
                    }
                    container.updateWidthContext();
                }
            });
            dialog.PageBuilderDialog('open');
        }
    });
    $('.PageBuilder_Value_Block-EditColumns').entwine({
        onclick: function () {
            var container = this.getBlockContainer();
            container.find('> .PageBuilder_Value_Block-Widths').slideToggle();
            this.blur();
            return false;
        }
    });
    $('.PageBuilder_Value_Block-Delete').entwine({
        onclick: function () {
            var container = this.getBlockContainer();
            container.addClass('pre-delete');
            if (confirm(this.data('confirm'))) {
                var parent = this.getParentBlockContainer();
                container.remove();
                parent.updateBlocksMetadata();
                //var index = this.closest('.PageBuilder_Field-BlockGroup').index();
                //this.closest('.PageBuilder_Field-BlockGroups').removeGroup(index);
            }
            container.removeClass('pre-delete');
            this.blur();
            return false;
        }
    });
    $('.PageBuilder_Value_Block-Edit').entwine({
        onclick: function () {
            var dialog = $('<div/>'),
                iframeURL = [
                    this.getConfig().urls[this.data('edit-type')],
                    this.data('id')
                ].join('/'),
                updatePreviewURL = [
                    this.getConfig().urls[this.data('edit-type')],
                    this.data('id'),
                    'PageBuilderPreview'
                ].join('/'),
                previewElement = this.getBlockContainer().find('> .PageBuilder_Value_Block-Preview');
            dialog.ssdialog({
                iframeUrl: iframeURL,
                height: 550,
                beforeClose: function () {
                    $.get(updatePreviewURL, function (content) {
                        previewElement.html(content);
                    });
                }
            });
            dialog.ssdialog('open');
            this.blur();
            return false;
        }
    });
    $('.PageBuilder_Field').entwine({
        onmatch: function () {
            this.sortableBind();
        },
        sortableBind: function () {
            var rootForm = this.getRootForm(),
                base = this.find('.PageBuilder_Value_Block_BlockGroup_Base'),
                groups = this.find('.PageBuilder_Value_Block_BlockGroup-Blocks');
            groups.each(function () {
                if ($(this).hasClass('ui-sortable')) {
                    $(this).sortable('destroy');
                }
            });
            groups.sortable({
                connectWith: '#' + this.prop('id') + " .PageBuilder_Value_Block_BlockGroup-Blocks",
                handle: '> .PageBuilder_Value_Block-Controls > .PageBuilder_Value_Block-Reorder',
                placeholder: 'PageBuilder_Value_Block',
                //helper: 'clone',
                //forceHelperSize: true,
                forcePlaceholderSize: true,
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
