/**
 * Created by ajt on 4/25/2016.
 */
function BalanceGlobals() {
    var constants = {};

    constants.enemies = 2;
    constants.enemiesPositionChance = 2;
    constants.gumballs = 1;
    constants.createNewEnemiesCounter = 50;
    constants.loopScoreIncrementTime = 60;
    constants.enemyPoints = 1;
    constants.runningScore = 1;
    constants.pickupGumballScore = 1;
    constants.enemyDamage = 1;
    constants.enemiesToAdd = 1;
    constants.gumballsToAdd = 1;
    constants.continueGame = true;

    constants.maxLives = 22;

    //Character Specific
    constants.isAttacking = false;
    constants.attackTime = 21;
    constants.jumpAttackTime = 39;

    return constants;
}