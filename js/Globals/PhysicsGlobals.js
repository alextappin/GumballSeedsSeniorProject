/**
 * Created by ajt on 4/30/2016.
 */
var PhysicsGlobals = (function PhysicsGlobals() {
    var constants = {};

    constants.attackingTime = 0;
    constants.characterGravity = .51;
    constants.characterJumpVelocity = -16;
    constants.characterJumpHighVelocity = -20;
    constants.characterJumpAttackVelocity = -14;
    constants.characterVelocityY = 5;
    constants.applyFallingGravity = false;
    constants.characterAirborn = true;
    constants.characterHighJumping = false;

    constants.characterRiseSpeed = MapGlobals.screenHeight * .01;
    constants.characterBoltSpeed = MapGlobals.screenWidth * .02;
    constants.characterEndSuperVelocity = -30;

    return constants;
})();