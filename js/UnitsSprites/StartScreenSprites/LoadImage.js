/**
 * Created by ajt on 4/27/2016.
 */
function LoadImage() {
    PIXI.Container.call(this);
    this.constructLoadImage();
}

LoadImage.constructor = LoadImage;
LoadImage.prototype = Object.create(PIXI.Container.prototype);

LoadImage.prototype.constructLoadImage = function() {
    this.Properties = new LoadImageProperties();
    this.Properties.textures = [];
    this.Properties.testCount = 0;
    this.initiateLoadImageSprites();
};
LoadImage.prototype.setPositionAndScale = function(obj) {
    MainGlobals.Scaling.loadScale = HelperFunctions().getScreenRatioUsingHeight(obj.height, MainGlobals.Scaling.loadPercent);

    console.log(MainGlobals.Scaling.loadScale);
    obj.scale = HelperFunctions().getNewPoint(MainGlobals.Scaling.loadScale,MainGlobals.Scaling.loadScale);
    obj.position =  HelperFunctions().getNewPoint(HelperFunctions().getScreenPositionMiddleWidth(obj.width), HelperFunctions().getScreenPositionMiddleHeight(obj.height));
    obj.alpha = this.Properties.alphaStart;
    //no scale yet...
};
LoadImage.prototype.initiateLoadImageSprites = function() {
    this.Properties.sprite = new PIXI.Sprite(PIXI.Texture.fromFrame("loadScreen"));
    this.addChild(this.Properties.sprite);

    //load all the lagging sprites into the texture cache by using them!
    this.addChild(new PIXI.Sprite(PIXI.Texture.fromFrame("loadScreen")));
    this.children[1].scale = HelperFunctions().getNewPoint(0,0);

    this.Properties.textures.push(
        PIXI.Texture.fromFrame("titleBG"),
        PIXI.Texture.fromFrame("titleWords"),
        PIXI.Texture.fromFrame("startbutton1"),
        PIXI.Texture.fromFrame("startbutton2"),
        PIXI.Texture.fromFrame("startbutton3"),
        PIXI.Texture.fromFrame("startbutton4"),
        PIXI.Texture.fromFrame("startrainbowanimation3"),
        PIXI.Texture.fromFrame("startrainbowanimation1"),
        PIXI.Texture.fromFrame("startrainbowanimation2"),
        PIXI.Texture.fromFrame("gbs run1"),
        PIXI.Texture.fromFrame("gbs run2"),
        PIXI.Texture.fromFrame("gbs run3"),
        PIXI.Texture.fromFrame("gbs a1"),
        PIXI.Texture.fromFrame("gbs a2"),
        PIXI.Texture.fromFrame("gbs a1"),
        PIXI.Texture.fromFrame("gbs run1"),
        PIXI.Texture.fromFrame("gbs run2"),
        PIXI.Texture.fromFrame("gbs run3"),
        PIXI.Texture.fromFrame("gbs j1"),
        PIXI.Texture.fromFrame("gbs j2"),
        PIXI.Texture.fromFrame("gbs j3"),
        PIXI.Texture.fromFrame("gbs j4"),
        PIXI.Texture.fromFrame("gbs j5"),
        PIXI.Texture.fromFrame("gbs j6"),
        PIXI.Texture.fromFrame("gbs j7"),
        PIXI.Texture.fromFrame("gbs ja1"),
        PIXI.Texture.fromFrame("gbs ja2"),
        PIXI.Texture.fromFrame("gbs ja3"),
        PIXI.Texture.fromFrame("gbs ja4"),
        PIXI.Texture.fromFrame("gbs super1"),
        PIXI.Texture.fromFrame("gbs super1"),
        PIXI.Texture.fromFrame("gbs super2"),
        PIXI.Texture.fromFrame("gbs super3"),
        PIXI.Texture.fromFrame("gbs super4"),
        PIXI.Texture.fromFrame("gbs super5"),
        PIXI.Texture.fromFrame("gbs super6"),
        PIXI.Texture.fromFrame("rainbowband gumballstart"),
        PIXI.Texture.fromFrame("1 super powerup"),
        PIXI.Texture.fromFrame("1 super powerup"),
        PIXI.Texture.fromFrame("2 super powerup"),
        PIXI.Texture.fromFrame("3 super powerup"),
        PIXI.Texture.fromFrame("4 super powerup"),
        PIXI.Texture.fromFrame("5 super powerup"),
        PIXI.Texture.fromFrame("rainbowband 1start"),
        PIXI.Texture.fromFrame("rainbowband 2straight"),
        PIXI.Texture.fromFrame("rainbowband 3straight"),
        PIXI.Texture.fromFrame("rainbowband down1a"),
        PIXI.Texture.fromFrame("rainbowband down1b"),
        PIXI.Texture.fromFrame("rainbowband down2a"),
        PIXI.Texture.fromFrame("rainbowband down2b"),
        PIXI.Texture.fromFrame("rainbowband down3a"),
        PIXI.Texture.fromFrame("rainbowband down3b"),
        PIXI.Texture.fromFrame("rainbowband up1a"),
        PIXI.Texture.fromFrame("rainbowband up1b"),
        PIXI.Texture.fromFrame("rainbowband up2a"),
        PIXI.Texture.fromFrame("rainbowband up2b"),
        PIXI.Texture.fromFrame("rainbowband up3a"),
        PIXI.Texture.fromFrame("rainbowband up3b"),
        PIXI.Texture.fromFrame("rainbowband gumball1"),
        PIXI.Texture.fromFrame("rainbowband gumball2")
    );
};
LoadImage.prototype.setSpriteToCurrentTexture = function() {
    this.Properties.sprite.texture = this.Properties.textures[this.Properties.spriteCount];
};
LoadImage.prototype.update = function(imageObj) {
    this.updateSprites(imageObj);
};
LoadImage.prototype.updateSprites = function(imageObj) {
    if (imageObj.Properties.testCount < imageObj.Properties.textures.length) {
        imageObj.children[1].texture = imageObj.Properties.textures[imageObj.Properties.testCount];
        imageObj.Properties.testCount++;
        imageObj.alpha += this.Properties.alphaIncrement/5;
    } else {
        if (imageObj.alpha + this.Properties.alphaIncrement > 1) {
            this.Properties.alphaIncrement = 0 - this.Properties.alphaIncrement;
        }

        imageObj.alpha += this.Properties.alphaIncrement;

        if (MainGlobals.Map.soundLoaded && imageObj.alpha < this.Properties.alphaStart) {
            HelperFunctions().switchToTitle();
            HelperFunctions().switchScreenToggle();
        }
    }
};