var domElement = $('<div id="LayoutManagerContainer">'
				+  '    <div id="LayoutManagerMain">'
				+  '        <div id="LayoutManager">'
				+  '            <div data-area="areaTop" class="layoutArea">'
				+  '                <div class="layoutAreaTabs"></div>'
				+  '                <div class="layoutAreaContent"></div>'
				+  '            </div>'
				+  '            <div class="playerWrapper">'
				+  '                <div data-area="areaLeft" class="layoutArea">'
				+  '                    <div class="layoutAreaTabs"></div>'
				+  '                    <div class="layoutAreaContent"></div>'
				+  '                </div>'
				+  '                <div class="playerArea">'
				+  '                    <span class="icon-play-1"></span>'
				+  '                </div>'
				+  '                <div data-area="areaRight" class="layoutArea">'
				+  '                    <div class="layoutAreaTabs"></div>'
				+  '                    <div class="layoutAreaContent"></div>'
				+  '                </div>'
				+  '            </div>'
				+  '            <div data-area="areaBottom" class="layoutArea">'
				+  '                <div class="layoutAreaTabs"></div>'
				+  '                <div class="layoutAreaContent"></div>'
				+  '            </div>'
				+  '        </div>'
				+  '    </div>'
				+  '    <div id="LayoutManagerOptions">'
				+  '        <div class="message active">Drag and Drop Content Views into Layout Areas</div>'
				+  '        <div class="contentViewTemplate" data-type="TimedContent" data-size="small">'
				+  '            <div class="contentViewTemplateType"><span class="icon-docs">Collection (Tile)</span></div>'
				+  '            <div class="contentViewTemplateSize"><span class="icon-coverflow"></span></div>'
				+  '        </div>'
				+  '        <div class="contentViewTemplate" data-type="TimedContent" data-size="medium">'
				+  '            <div class="contentViewTemplateType"><span class="icon-docs">Collection (Preview)</span></div>'
				+  '            <div class="contentViewTemplateSize"><span class="icon-coverflow"></span></div>'
				+  '        </div>'
				+  '        <div class="contentViewTemplate" data-type="TimedContent" data-size="large">'
				+  '            <div class="contentViewTemplateType"><span class="icon-docs">Collection (Full)</span></div>'
				+  '            <div class="contentViewTemplateSize"><span class="icon-coverflow"></span></div>'
				+  '        </div>'
				+  '        <div class="contentViewTemplate" data-type="CustomHTML" data-size="medium">'
				+  '            <div class="contentViewTemplateType"><span class="icon-file-code">Custom HTML</span></div>'
				+  '        </div>'
				+  '        <div class="contentViewTemplate" data-type="Transcript" data-size="large">'
				+  '            <div class="contentViewTemplateType"><span class="icon-doc-text">Text Transcript</span></div>'
				+  '        </div>'
				+  '    </div>'
				+  '</div>'),
	
	LayoutManager        = domElement.find('#LayoutManager'),
	LayoutManagerOptions = domElement.find('#LayoutManagerOptions');


/**
 * I initalize the ViewLayout view
 *
 * @method initView
 */
function initView() {
	
	$('#HypervideoLayoutContainer').append(domElement);

	LayoutManagerOptions.find('.contentViewTemplate').draggable({
		containment: domElement,
		snapTolerance: 10,
		appendTo: 		'body',
		helper: 		'clone',
		revert: 		'invalid',
		revertDuration: 100,
		distance: 		10,
		zIndex: 		1000,
		drag: function(event, ui) {

			

		},

		start: function(event, ui) {

			ui.helper.width($(event.target).width());

		},

		stop: function(event, ui) {

			

		}
	});

	LayoutManager.find('.layoutAreaContent').droppable({
		accept: '.contentViewTemplate, .contentViewPreview',
		activeClass: 'droppableActive',
		hoverClass: 'droppableHover',
		tolerance: 'pointer',
		over: function( event, ui ) {
			
		},

		out: function( event, ui ) {
			
		},

		drop: function( event, ui ) {
			
			var layoutArea = $(event.target).parent().data('area'),
				contentAxis = (layoutArea == 'areaTop' || layoutArea == 'areaBottom') ? 'x' : 'y',
				contentViewData = {
					'type': ui.helper.data('type'),
					'name': 'Lorem Ipsum',
					'description': '',
					'cssClass': '',
					'html': '',
					'collectionFilter': {
						'tags': [],
						'types': [],
						'text': '',
						'users': []
					},
					'transcriptSource': '',
					'mode': 'slide',
					'axis': contentAxis,
					'contentSize': ui.helper.data('size') || '',
					'autoSync': false,
					'onClickContentItem': ''
				};
			
			console.log(layoutArea, contentViewData);

			renderContentView(layoutArea, contentViewData, true);

		}


	});


	initLayoutArea('areaTop', sampleConfigData.areaTop);
	initLayoutArea('areaBottom', sampleConfigData.areaBottom);
	initLayoutArea('areaLeft', sampleConfigData.areaLeft);
	initLayoutArea('areaRight', sampleConfigData.areaRight);

}

