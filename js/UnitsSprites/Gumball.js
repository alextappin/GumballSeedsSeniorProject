/**
 * Created by ajt on 3/12/2016.
 */
function Gumball() {
    PIXI.Container.call(this);
    this.constructGumball();
}

Gumball.constructor = Gumball;
Gumball.prototype = Object.create(PIXI.Container.prototype);

Gumball.prototype.constructGumball = function() {
    this.Properties = new GumballProperties();
    this.initiateGumballSprites();
};
Gumball.prototype.setPositionAndScale = function(obj) {
    for (var i = 0; i < this.Properties.numberOfSprites; i++) {
        obj.children[i].position =  GameVariables.getNewPoint(this.Properties.startingX, this.Properties.startingY);
        obj.children[i].scale = GameVariables.getNewPoint(.35,.35);
    }
    //no scale yet...
};
Gumball.prototype.initiateGumballSprites = function() {
    this.Properties.textures.push(
        PIXI.Texture.fromFrame("Gumballs")
    );
    for (var i = 0; i < this.Properties.numberStartingSprites; i++) {
        this.createSprite();
    }
};
Gumball.prototype.createSprite = function() {
    this.Properties.sprites.push(new PIXI.Sprite(this.Properties.textures[0]));
    this.Properties.numberOfSprites++;
    this.addChild(this.Properties.sprites[this.Properties.numberOfSprites-1]);
};
Gumball.prototype.setSpriteToCurrentTexture = function() {
    this.Properties.sprite.texture = this.Properties.textures[this.Properties.spriteCount];
};
Gumball.prototype.update = function(gumballObj, groundObj) {
    this.updateSprites(gumballObj, groundObj);
};
Gumball.prototype.updateSprites = function(gumballObj, groundObj) {
    for (var i = 0; i < this.Properties.numberOfSprites; i++) {
        if (gumballObj.children[i].position.x < (0-gumballObj.children[i].width)) {
            gumballObj.children[i].position = this.getNewPosition(groundObj, this.Properties.startingX);
        }
        gumballObj.children[i].position.x -= groundObj.Properties.speed;
    }
};
Gumball.prototype.getNewPosition = function(groundObj, gumballX) {
    var groundHeight = groundObj.getHeightAtPositionX(gumballX);
    if (groundHeight) {
        return GameVariables.getNewPoint(gumballX, groundHeight);
    }
    //recursion. If there is a gap, check another X
    return this.getNewPosition(groundObj, gumballX + 500);
};