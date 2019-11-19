
/**
 * I initialize a LayoutArea Preview and trigger initialization of its ContentViews.
 *
 * @method initLayoutAreaPreview
 * @param {String} layoutArea
 * @param {Array} contentViews
 */
function initLayoutAreaPreview(layoutArea, contentViews) {
    var areaContainer = $('.layoutArea[data-area="'+ layoutArea +'"]');
    
    // LayoutAreas can't be set visible or invisible in config.
    // They're just automatically visible when they have contents.
    if (contentViews.length > 0) {
        //FrameTrail.changeState('hv_config_'+ layoutArea +'Visible', true);
    } else {
        //FrameTrail.changeState('hv_config_'+ layoutArea +'Visible', false);
    }
    
    for (var i=0; i < contentViews.length; i++) {
        renderContentViewPreview(layoutArea, contentViews[i]);
    }
    
}

/**
 * I resize a LayoutArea Preview based on a given size 
 * ('small', 'medium', 'large') derived from a ContentView size.
 *
 * @method resizeLayoutAreaPreview
 * @param {String} size
 */
function resizeLayoutAreaPreview(layoutArea, size) {
    var areaContainer = $('.layoutArea[data-area="'+ layoutArea +'"]');

    switch(size) {
        case 'empty':
            areaContainer.removeAttr('data-size');
            break;
        case 'small':
            areaContainer.attr('data-size', 'small');
            break;
        case 'medium':
            areaContainer.attr('data-size', 'medium');
            break;
        case 'large':
            areaContainer.attr('data-size', 'large');
            break;
        default:
            areaContainer.attr('data-size', 'medium');
            break;
    }
    
}