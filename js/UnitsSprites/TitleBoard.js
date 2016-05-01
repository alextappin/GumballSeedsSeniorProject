/**
 * Created by ajt on 3/11/2016.
 */
function TitleBoard() {
    PIXI.Container.call(this);
    this.constructTitleBoard();
}

TitleBoard.constructor = TitleBoard;
TitleBoard.prototype = Object.create(PIXI.Container.prototype);

TitleBoard.prototype.constructTitleBoard = function() {
    this.Properties = new TitleBoardProperties();
    this.initiateTitleBoardSprites();
};

TitleBoard.prototype.setPositionAndScale = function(obj) {
    ScalingGlobals.titleScreenScaleX = HelperFunctions().getCorrectScaleWidth(obj.width);
    ScalingGlobals.titleScreenScaleY = HelperFunctions().getCorrectScaleHeight(obj.height);
    obj.scale = HelperFunctions().getNewPoint(ScalingGlobals.titleScreenScaleX,ScalingGlobals.titleScreenScaleY);
    obj.position =  HelperFunctions().getNewPoint((MapGlobals.screenWidth - obj.width)/2, (MapGlobals.screenHeight - obj.height)/2);
    obj.alpha = this.Properties.alphaStart;
};

TitleBoard.prototype.initiateTitleBoardSprites = function() {
    this.Properties.textures.push(
        PIXI.Texture.fromFrame("titleBG")
    );
    this.addChild(new PIXI.Sprite(this.Properties.textures[this.Properties.spriteCount]));
};

TitleBoard.prototype.setSpriteToCurrentTexture = function(titleBoardObj) {
    titleBoardObj.children[0].texture = this.Properties.textures[this.Properties.spriteCount];
};

TitleBoard.prototype.update = function(titleBoardObj) {
    if (titleBoardObj.alpha + this.Properties.alphaIncrement > 1) {
        titleBoardObj.alpha = 1;
    } else {
        titleBoardObj.alpha += this.Properties.alphaIncrement;
    }
};