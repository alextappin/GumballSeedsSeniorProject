/**
 * Created by ajt on 3/9/2016.
 */
var GameVariables = (function GameVariables() {
    var constants = {
        screenWidth : 1080,
        screenHeight : 720,
        enemies : 2,
        minScrollSpeed : 5.5,
        maxScrollSpeed : 7,
        scrollAcceleration : 0.005,
        currentScrollSpeed : 20,
        offScreenOffsetX : -200,
        offScreenOffsetY : 200,
        screenToShow : "Title",
        switchScreen : false,
        highScore : 0
    };

    return {
        //getters
        getWidth : function getWidth() {
            return constants.screenWidth;
        },
        getHeight : function getHeight() {
            return constants.screenHeight;
        },
        getEnemies : function getEnemies() {
            return constants.enemies;
        },
        getMinScrollSpeed : function getMinScrollSpeed() {
            return constants.minScrollSpeed;
        },
        getMaxScrollSpeed : function getMaxScrollSpeed() {
            return constants.maxScrollSpeed;
        },
        getScrollAcceleration : function getScrollAcceleration() {
            return constants.scrollAcceleration;
        },
        getCurrentScrollSpeed : function getCurrentScrollSpeed() {
            return constants.currentScrollSpeed;
        },
        getScreenOffsetX : function getScreenOffsetX() {
            return constants.offScreenOffsetX;
        },
        getScreenOffsetY : function getScreenOffsetY() {
            return constants.offScreenOffsetY;
        },
        getRandomNumber : function getRandomNumber(startRange, endRange) {
            //Will return a random number from startRange to endRange
            return Math.floor((Math.random() * endRange) + startRange);
        },
        getScreenToShow : function getScreenToShow() {
            return constants.screenToShow;
        },
        getSwitchScreen : function getSwitchScreen() {
            return constants.switchScreen;
        },
        getHighScore : function getHighScore() {
            return constants.highScore;
        },

        //setters
        setEnemies : function setEnemies(value) {
            constants.enemies = value;
        },
        setCurrentScrollSpeed : function setCurrentScrollSpeed(value) {
            constants.currentScrollSpeed = value;
        },
        setScreenTitle : function setScreenTitle() {
            constants.screenToShow = "Title";
        },
        setScreenGame : function SetScreenGame() {
            constants.screenToShow = "Game";
        },
        toggleScreenChange : function toggleScreenChange() {
            constants.switchScreen = !constants.switchScreen;
        },
        setHighScore : function setHighScore(score) {
            constants.highScore = score;
        }
    };
})();