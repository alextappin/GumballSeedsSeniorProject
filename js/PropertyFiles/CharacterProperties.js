/**
 * Created by ajt on 3/10/2016.
 * this file will have the sprite filtering and specifics
 */
function CharacterProperties() {
    var props = {
        sprites : {},
        textures : [],
        jumpTextures : [],
        stopJumpAnimation : false,
        spriteCount : 0,
        jumpSpriteCount : 0,
        changeSpriteCounter : 0,
        spriteSpeed : 7,
        currentTextures : [],
        powerUpPositionVelocity : -1,
        spaceBar : new KeyboardControl(32),
        ctrlButton : new KeyboardControl(17),
        leftArrow : new KeyboardControl(37),
        rightArrow : new KeyboardControl(39)
    };

    return props;
}

CharacterProperties.constructor = CharacterProperties;