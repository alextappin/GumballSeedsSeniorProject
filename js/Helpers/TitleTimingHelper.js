/**
 * Created by ajt on 5/1/2016.
 */
function TitleTimingHelper() {
    var helpers = {};

    helpers.updateTitleObjects = function(bg, start) {
        if (!TimingGlobals.titleBackgoundFadeIn) {
            TimingGlobals.titleBackgoundFadeIn = true;
            bg.update(bg);
            console.log('1');
        } else if (!TimingGlobals.startButtonFadeIn && bg.alpha > TimingGlobals.startButtonAlphaCue) {
            TimingGlobals.startButtonFadeIn = true;
            start.updateOpacity(start);
            bg.update(bg);
            console.log('2');
        } else if (!TimingGlobals.startButtonFadeIn){
            bg.update(bg);
            console.log('3');
        } else {
            start.updateOpacity(start);
            bg.update(bg);
            console.log('4');
        }
    };

    return helpers;
}