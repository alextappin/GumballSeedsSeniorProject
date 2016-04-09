/**
 * Created by t_tappa on 11/30/2015.
 */
function Character() {
    PIXI.Container.call(this);
    this.constructCharacter();
}

Character.constructor = Character;
Character.prototype = Object.create(PIXI.Container.prototype);

Character.prototype.constructCharacter = function() {
    this.CharacterProperties = new CharacterProperties();
    this.initiateCharacterSprites();
    this.listenForJumpTrigger();
    this.listenForAttackTrigger();
    this.listenForMoveLeftTrigger();
    this.listenForMoveRightTrigger();
};
Character.prototype.setPositionAndScale = function(obj) {
    obj.position =  new GameVariables.getNewPoint(this.CharacterProperties.startPosX, this.CharacterProperties.startPosY);
    obj.scale = new GameVariables.getNewPoint(this.CharacterProperties.scaleX, this.CharacterProperties.scaleY);
};
Character.prototype.initiateCharacterSprites = function() {
    this.CharacterProperties.textures.push(
        PIXI.Texture.fromFrame("sprite1"),
        PIXI.Texture.fromFrame("sprite2"),
        PIXI.Texture.fromFrame("sprite3"),
        PIXI.Texture.fromFrame("sprite4"),
        PIXI.Texture.fromFrame("sprite5"),
        PIXI.Texture.fromFrame("sprite6")
    );
    this.CharacterProperties.sprite = new PIXI.Sprite(this.CharacterProperties.textures[this.CharacterProperties.spriteCount]);
    this.addChild(this.CharacterProperties.sprite);
};
Character.prototype.setSpriteToCurrentTexture = function() {
    this.CharacterProperties.sprite.texture = this.CharacterProperties.textures[this.CharacterProperties.spriteCount];
};
Character.prototype.update = function(characterObj, frontObj) {
    this.updateSprites();
    this.jumpCharacter(characterObj, frontObj);
    this.attackCharacter();
    this.applyFallingGravityToCharacter(characterObj, frontObj);
};
Character.prototype.updateSprites = function() {
    if (this.CharacterProperties.changeSpriteCounter == this.CharacterProperties.spriteSpeed) {
        this.CharacterProperties.changeSpriteCounter = 0;
        this.nextSprite();
    }
    else {
        this.CharacterProperties.changeSpriteCounter++;
    }
};
Character.prototype.nextSprite = function() {
    //Set ternary
    if (this.CharacterProperties.spriteCount == 5) {
        this.CharacterProperties.spriteCount = 0;
    }
    else {
        this.CharacterProperties.spriteCount++;
    }
    this.setSpriteToCurrentTexture();
};
Character.prototype.jumpCharacter = function(characterObj, frontObj){
    if (this.charIsJumping()) {
        characterObj.position.y = this.moveHeightJumping(characterObj.position.y,
            frontObj.getCurrentSliceHeight(characterObj.position.x), frontObj.getNextSliceHeight(characterObj.position.x));
    }
    else {
        this.endJumping();
    }
};
Character.prototype.attackCharacter = function() {
    if (this.CharacterProperties.isAttacking) {
        this.CharacterProperties.attackingTime -= 1;
        if (this.CharacterProperties.attackingTime == 0) {
            this.stopAttacking();
        }
    }
};
Character.prototype.applyFallingGravityToCharacter = function(characterObj, frontObj) {
    this.checkIfFalling(frontObj.getCurrentSliceHeight(), frontObj.getNextSliceHeight());
};
Character.prototype.startJumpAnimation = function() {
    if (!this.charIsJumping()) {
        this.CharacterProperties.jumping = true;
        this.CharacterProperties.velocityY = -15.0;
    }
};
Character.prototype.moveHeightJumping = function(posY, currentSlicePosY, nextSlicePosY) {
    return this.simulateGravity(posY, this.calculateMapToCharacterHeightOffset(currentSlicePosY), this.calculateMapToCharacterHeightOffset(nextSlicePosY));
};
Character.prototype.listenForJumpTrigger = function() {
    var that = this;
    this.CharacterProperties.spaceBar.press = function () {
        if (!that.CharacterProperties.jumping) {
            that.startJumpAnimation();
        }
    }
};
Character.prototype.simulateGravity = function(posY, currentSlicePosY, nextSlicePosY) {
    this.CharacterProperties.velocityY += this.CharacterProperties.gravity;
    posY += this.CharacterProperties.velocityY;

    //TODO put these numbers in a config file. This number signifies the lowest wall
    //if the character isnt moving up and the next slice is taller than the character...
    //if the character is lower than the next slice, the character is travelling down and they are over a gap (99976) then the game is over
    if (posY > nextSlicePosY && this.CharacterProperties.velocityY > 0 && currentSlicePosY == 99976) {
        this.CharacterProperties.continueGame = false;
        GameVariables.toggleScreenChange();
        GameVariables.setScreenTitle();
    }
    //TODO psyY > currentSlicePos & velocity is positive(negative...)
    if (posY >= currentSlicePosY && this.CharacterProperties.continueGame) {
        this.CharacterProperties.velocityY = 0.0;
        this.CharacterProperties.jumping = false;
        posY = currentSlicePosY;
    }
    return posY;
};
Character.prototype.endJumping = function() {
    this.CharacterProperties.jumping = false;
};
Character.prototype.charIsJumping = function() {
    return (this.CharacterProperties.jumping);
};
Character.prototype.calculateMapToCharacterHeightOffset = function(wallPos) {
    return wallPos - 24;
};
Character.prototype.checkIfFalling = function(currentSliceHeight, nextSliceHeight) {
    if (!this.CharacterProperties.jumping && this.calculateMapToCharacterHeightOffset(currentSliceHeight) > this.position.y) {
        this.CharacterProperties.jumping = true;
        this.simulateGravity(this.position.y, this.calculateMapToCharacterHeightOffset(currentSliceHeight), this.calculateMapToCharacterHeightOffset(nextSliceHeight));
    }
};
Character.prototype.listenForAttackTrigger = function() {
    var that = this;
    this.CharacterProperties.ctrlButton.press = function () {
        if (!that.CharacterProperties.isAttacking) {
            that.startAttackAnimation();
        }
    }
};
Character.prototype.startAttackAnimation = function() {
    this.CharacterProperties.isAttacking = true;
    this.removeChild(this.text);
    this.text = new PIXI.Text("Attacking", {font:"40px Arial", fill:"#228869"});
    this.text.position.x = 20;
    this.addChild(this.text);

    this.CharacterProperties.attackingTime = 20;
};
Character.prototype.stopAttacking = function() {
    this.CharacterProperties.isAttacking = false;
    this.removeChild(this.text);

    this.CharacterProperties.attackingTime = 0;
};
Character.prototype.listenForMoveRightTrigger = function() {
    var that = this;
    this.CharacterProperties.rightArrow.press = function () {
        if (!that.CharacterProperties.isMovingRight) {
            that.startMoveRightAnimation();
        }
    };

    this.CharacterProperties.rightArrow.release = function () {
        if (that.CharacterProperties.isMovingRight) {
            that.stopMoveRightAnimation();
        }
    }
};
Character.prototype.listenForMoveLeftTrigger = function() {
    var that = this;
    this.CharacterProperties.leftArrow.press = function () {
        if (!that.CharacterProperties.isMovingLeft) {
            that.startMoveLeftAnimation();
        }
    };

    this.CharacterProperties.leftArrow.release = function () {
        if (that.CharacterProperties.isMovingLeft) {
            that.stopMoveLeftAnimation();
        }
    };
};
//set the moving to false so you cant move now
Character.prototype.startMoveRightAnimation = function() {
    this.CharacterProperties.isMovingRight = false;
};
//set the moving to false so you cant move now
Character.prototype.startMoveLeftAnimation = function() {
    this.CharacterProperties.isMovingLeft = false;
};
Character.prototype.stopMoveRightAnimation = function() {
    this.CharacterProperties.isMovingRight = false;
};
Character.prototype.stopMoveLeftAnimation = function() {
    this.CharacterProperties.isMovingLeft = false;
};