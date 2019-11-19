var fakeID = 0;

/**
 * I render a contentView based on a contentView data object
 * and a target layoutArea.
 * If startEditing is set to true, editContentView is called
 * right after rendering.
 *
 * @method renderContentViewPreview
 * @param {String} layoutArea
 * @param {Object} contentViewData
 * @param {Boolean} startEditing
 */
function renderContentViewPreview(layoutArea, contentViewData, startEditing) {
    var areaContainer = $('.layoutArea[data-area="'+ layoutArea +'"]'),
        contentViewTabElement = renderContentViewPreviewPreviewTab(contentViewData),
        contentViewPreviewElement = renderContentViewPreviewPreviewElement(contentViewData);
    
    areaContainer.find('.layoutAreaTabs').append( contentViewTabElement );
    areaContainer.find('.layoutAreaContent').append( contentViewPreviewElement );

    activateContentViewPreview( layoutArea, contentViewTabElement.attr('data-fakeid') );
    
    if (startEditing) {
        window.setTimeout(function() {
            editContentView( contentViewPreviewElement );
        }, 200);
    }
    
}

/**
 * I render a tab based on a contentView data object.
 *
 * @method renderContentViewPreviewTab
 * @param {Object} contentViewData
 * @return HTMLElement
 */
function renderContentViewPreviewTab(contentViewData) {

    var tabItem = $('<div class="contentViewTab" '
                    +   'data-type="'+ contentViewData.type +'" '
                    +   'data-fakeid="'+ fakeID +'" '
                    +   '>'
                    +   '    <div class="contentViewTabName">'+ contentViewData.name +'</div>'
                    +   '</div>');

    tabItem.find('.contentViewTabName').click(function() {
        activateContentViewPreview( $(this).parents('.layoutArea').attr('data-area'), $(this).parents('.contentViewTab').attr('data-fakeid') );
    });

    return tabItem;

}

/**
 * I render a preview based on a contentView data object.
 *
 * @method renderContentViewPreviewElement
 * @param {Object} contentViewData
 * @return HTMLElement
 */
function renderContentViewPreviewElement(contentViewData) {

    var previewItem = $('<div class="contentViewPreview" '
                    +   'data-size="'+ contentViewData.contentSize +'" '
                    +   'data-type="'+ contentViewData.type +'" '
                    +   'data-fakeid="'+ fakeID +'" '
                    +   '>'
                    +   '    <div class="contentViewOptions">'
                    +   '        <button class="editContentView"><span class="icon-pencil"></span></button>'
                    +   '        <button class="deleteContentView"><span class="icon-trash"></span></button>'
                    +   '    </div>'
                    +   '    <div class="contentViewPreviewDescription">'+ contentViewData.name +' '+ contentViewData.contentSize +'</div>'
                    +   '</div>');

    previewItem.find('.editContentView').click(function() {
        
        var contentViewPreviewItem = $(this).parents('.contentViewPreview');
        
        editContentView(contentViewPreviewItem);


    });

    previewItem.find('.deleteContentView').click(function() {
        
        var contentViewTabItem = $('.contentViewTab[data-fakeid="'+ $(this).parents('.contentViewPreview').attr('data-fakeid') +'"]');

        var area = $(this).parents('.layoutArea').attr('data-area');

        $(this).parents('.contentViewPreview').remove();
        contentViewTabItem.remove();

        activateContentViewPreview( area, $('.layoutArea[data-area="'+ area +'"] .contentViewTab').eq(0).attr('data-fakeid') );

    });

    fakeID++;

    return previewItem;

}

/**
 * I update the contents of a preview element.
 *
 * @method updateContentViewPreview
 */
function updateContentViewPreview() {

    console.log('update contentview preview');

    // previewItem.attr('data-type', ...);
    // previewItem.attr('data-size', ...);
    // previewItem.find('.contentViewPreviewDescription').text(...);
    // previewItem.attr('data-size', ...);

}

/**
 * I activate a contentView (tab and preview) 
 * based on a FAKEID (later internal in contentView type).
 *
 * @method activateContentViewPreview
 * @param {String} area
 * @param {String} fakeID
 */
function activateContentViewPreview(area, fakeID) {

    if ($('.layoutArea[data-area="'+ area +'"] .contentViewPreview[data-fakeid="'+ fakeID +'"]').length == 0) {
        resizeLayoutArea(area, 'empty');
        return;
    }

    $('.layoutArea[data-area="'+ area +'"] .contentViewTab').removeClass('active');
    $('.layoutArea[data-area="'+ area +'"] .contentViewTab[data-fakeid="'+ fakeID +'"]').addClass('active');

    $('.layoutArea[data-area="'+ area +'"] .contentViewPreview').removeClass('active');
    $('.layoutArea[data-area="'+ area +'"] .contentViewPreview[data-fakeid="'+ fakeID +'"]').addClass('active');

    
    var currentSize = $('.layoutArea[data-area="'+ area +'"] .contentViewPreview[data-fakeid="'+ fakeID +'"]').attr('data-size');
    
    resizeLayoutArea(area, currentSize);
    

}

/**
 * I create an edit dialog for a given contentViewPreviewElement
 *
 * @method editContentView
 * @param {HTMLElement} contentViewPreviewElement
 */
function editContentView(contentViewPreviewElement) {

	var elementOrigin = contentViewPreviewElement,
		animationDiv = elementOrigin.clone(),
        originOffset = elementOrigin.offset(),
        finalTop = ($(window).height()/2) - 300,
        finalLeft = ($(window).width()/2) - 407,
        self = this;

    animationDiv.addClass('contentViewAnimationDiv').css({
        position: 'absolute',
        top: originOffset.top + 'px',
        left: originOffset.left + 'px',
        width: elementOrigin.width(),
        height: elementOrigin.height(),
        zIndex: 99
    }).appendTo('body');

    animationDiv.animate({
        top: finalTop + 'px',
        left: finalLeft + 'px',
        width: 814 + 'px',
        height: 600 + 'px'
    }, 300, function() {
        
        
        var editDialog   = $('<div class="editContentViewDialog" title="Edit ContentView"></div>');

        editDialog.append(renderContentViewPreviewEditingUI());

        editDialog.dialog({
            resizable: false,
            draggable: false,
            width: 814,
            height: 600,
            modal: true,
            close: function() {
                $(this).dialog('close');
                $(this).remove();
                animationDiv.animate({
                    top: originOffset.top + 'px',
                    left: originOffset.left + 'px',
                    width: elementOrigin.width(),
                    height: elementOrigin.height()
                }, 300, function() {
                    $('.contentViewAnimationDiv').remove();
                });
            },
            closeOnEscape: true,
            open: function( event, ui ) {
                $('.ui-widget-overlay').click(function() {
                    editDialog.dialog('close');
                });
            },
            buttons: [
                { text: 'OK',
                    click: function() {
                        
                        var newContentViewData = getDataFromEditingUI($(this));

                        console.log(newContentViewData);

                        updateContentViewPreview();
                        $(this).dialog( 'close' );
                    }
                }
            ]
        });

    });

}

/**
 * I render the Editing UI for a given ContentView
 *
 * @method renderContentViewPreviewEditingUI
 */
function renderContentViewPreviewEditingUI() {

    var contentViewData = sampleConfigData.areaBottom[0],
        elements = $('<div class="contentViewEditingUI">'
                    +'    <div class="contentViewData formColumn column2" data-property="type" data-value="'+ contentViewData.type +'">'
                    +'        <label>Type:</label>'
                    +'        <div '+ (contentViewData.type == 'TimedContent' ? 'class="active"' : '') +' data-value="TimedContent">Content Collection</div>'
                    +'        <div '+ (contentViewData.type == 'CustomHTML' ? 'class="active"' : '') +' data-value="CustomHTML">Custom HTML</div>'
                    +'        <div '+ (contentViewData.type == 'Transcript' ? 'class="active"' : '') +' data-value="Transcript">Text Transcript</div>'
                    +'    </div>'
                    +'    <div class="generic formColumn column2">'
                    +'        <div class="contentViewData" data-property="contentSize" data-value="'+ contentViewData.contentSize +'">'
                    +'            <label>Size:</label>'
                    +'            <div '+ (contentViewData.contentSize == 'small' ? 'class="active"' : '') +' data-value="small">Small</div>'
                    +'            <div '+ (contentViewData.contentSize == 'medium' ? 'class="active"' : '') +' data-value="medium">Medium</div>'
                    +'            <div '+ (contentViewData.contentSize == 'large' ? 'class="active"' : '') +' data-value="large">Large</div>'
                    +'        </div>'
                    +'    </div>'
                    +'    <div style="clear: both;"></div>'
                    +'    <hr>'
                    +'    <div class="generic formColumn column1">'
                    +'        <label>Name:</label>'
                    +'        <input type="text" class="contentViewData" data-property="name" data-value="'+ contentViewData.name +'" value="'+ contentViewData.name +'" placeholder="(optional)"/>'
                    +'    </div>'
                    +'    <div class="generic formColumn column3">'
                    +'        <label>Description:</label>'
                    +'        <textarea class="contentViewData" data-property="description" data-value="'+ contentViewData.description +'" placeholder="(optional)">'+ contentViewData.description +'</textarea>'
                    +'    </div>'
                    +'    <div style="clear: both;"></div>'
                    +'    <div class="generic" style="display: none;">'
                    +'        <label>CSS Class:</label>'
                    +'        <input type="text" class="contentViewData" data-property="cssClass" data-value="'+ contentViewData.cssClass +'" value="'+ contentViewData.cssClass +'" placeholder="(optional)"/>'
                    +'    </div>'
                    +'    <hr>'
                    +'    <div class="typeSpecific '+ (contentViewData.type == 'TimedContent' ? 'active' : '') +'" data-type="TimedContent">'
                    +'        <label>Content Filter:</label>'
                    +'        <div class="formColumn column1">'
                    +'            <label>Tags</label>'
                    +'            <input type="text" class="contentViewData" data-property="collectionFilter-tags" data-value="'+ contentViewData.collectionFilter.tags +'" value="'+ contentViewData.collectionFilter.tags +'" placeholder="(optional)"/>'
                    +'        </div>'
                    +'        <div class="formColumn column1">'
                    +'            <label>Types</label>'
                    +'            <input type="text" class="contentViewData" data-property="collectionFilter-types" data-value="'+ contentViewData.collectionFilter.types +'" value="'+ contentViewData.collectionFilter.types +'" placeholder="(optional)"/>'
                    +'        </div>'
                    +'        <div class="formColumn column1">'
                    +'            <label>Users</label>'
                    +'            <input type="text" class="contentViewData" data-property="collectionFilter-users" data-value="'+ contentViewData.collectionFilter.users +'" value="'+ contentViewData.collectionFilter.users +'" placeholder="(optional)"/>'
                    +'        </div>'
                    +'        <div class="formColumn column1">'
                    +'            <label>Text</label>'
                    +'            <input type="text" class="contentViewData" data-property="collectionFilter-text" data-value="'+ contentViewData.collectionFilter.text +'" value="'+ contentViewData.collectionFilter.text +'" placeholder="(optional)"/>'
                    +'        </div>'
                    +'        <div style="clear: both;"></div>'
                    +'        <hr>'
                    +'    </div>'
                    +'    <div class="typeSpecific '+ (contentViewData.type == 'TimedContent' ? 'active' : '') +'" data-type="TimedContent">'
                    +'        <div class="contentViewData formColumn column1" data-property="mode" data-value="'+ contentViewData.mode +'">'
                    +'            <label>Mode:</label>'
                    +'            <div '+ (contentViewData.mode == 'slide' ? 'class="active"' : '') +' data-value="slide">Slide</div>'
                    +'            <div '+ (contentViewData.mode == 'toggle' ? 'class="active"' : '') +' data-value="toggle">Show / Hide</div>'
                    +'            <div '+ (contentViewData.mode == 'scroll' ? 'class="active"' : '') +' data-value="scroll">Scroll</div>'
                    +'        </div>'
                    +'        <div class="contentViewData formColumn column1" data-property="axis" data-value="'+ contentViewData.axis +'">'
                    +'            <label>Direction:</label>'
                    +'            <div '+ (contentViewData.axis == 'x' ? 'class="active"' : '') +' data-value="x">Horizontal</div>'
                    +'            <div '+ (contentViewData.axis == 'y' ? 'class="active"' : '') +' data-value="y">Vertical</div>'
                    +'        </div>'
                    +'        <div class="contentViewData formColumn column1" data-property="autoSync" data-value="'+ contentViewData.autoSync +'">'
                    +'            <label>Auto Sync:</label>'
                    +'            <div '+ (contentViewData.autoSync ? 'class="active"' : '') +' data-value="true">Yes</div>'
                    +'            <div '+ (!contentViewData.autoSync ? 'class="active"' : '') +' data-value="false">No</div>'
                    +'        </div>'
                    +'        <div style="clear: both;"></div>'
                    +'        <hr>'
                    +'        <label>OnClick Content Item:</label>'
                    +'        <textarea class="contentViewData" data-property="onClickContentItem" data-value="'+ contentViewData.onClickContentItem +'" placeholder="(optional)">'+ contentViewData.onClickContentItem +'</textarea>'
                    +'    </div>'
                    +'    <div class="typeSpecific '+ (contentViewData.type == 'CustomHTML' ? 'active' : '') +'" data-type="CustomHTML">'
                    +'        <label>Custom HTML:</label>'
                    +'        <textarea class="contentViewData" data-property="html" data-value="'+ contentViewData.html +'">'+ contentViewData.html +'</textarea>'
                    +'    </div>'
                    +'    <div class="typeSpecific '+ (contentViewData.type == 'Transcript' ? 'active' : '') +'" data-type="Transcript">'
                    +'        <label>Transcript Source:</label>'
                    +'        <input type="text" class="contentViewData" data-property="transcriptSource" data-value="'+ contentViewData.transcriptSource +'" value="'+ contentViewData.transcriptSource +'" />'
                    +'    </div>'
                    +'</div>');
    
    elements.find('.contentViewData').each(function() {
        
        var datachoices = $(this).children('div[data-value]');

        if (datachoices.length != 0) {
            datachoices.click(function() {
                $(this).siblings('div[data-value]').removeClass('active');
                $(this).addClass('active');

                var parent = $(this).parent('.contentViewData');

                parent.attr('data-value', $(this).attr('data-value'));

                if (parent.attr('data-property') == 'type') {
                    elements.find('.typeSpecific').removeClass('active');
                    elements.find('.typeSpecific[data-type="'+ parent.attr('data-value') +'"]').addClass('active');
                }
            });
        }

    });

    return elements;

}

/**
 * I collect all data values from Editing UI elements
 * and return them in a data object.
 * 
 * @method getDataFromEditingUI
 * @param {HTMLElement} editingUIContainer
 */
function getDataFromEditingUI( editingUIContainer ) {

    var newDataObject = {};

    editingUIContainer.find('.contentViewData').each(function() {
        
        var newValue;
        if ( $(this).is('input') || $(this).is('textarea') ) {
            newValue = $(this).val();
        } else {
            newValue = $(this).attr('data-value');
        }

        if (newValue == 'true') {
            newValue = true;
        } else if (newValue == 'false') {
            newValue = false;
        }

        if ( $(this).attr('data-property').indexOf('-') != -1 ) {
            var splitProperty = $(this).attr('data-property').split('-'),
                subObject = splitProperty[0],
                subProperty = splitProperty[1];
            if ( !newDataObject[subObject] ) {
                newDataObject[subObject] = {};
            }
            newDataObject[subObject][subProperty] = newValue;
        } else {
            newDataObject[$(this).attr('data-property')] = newValue;
        }
    });

    return(newDataObject);    

}

