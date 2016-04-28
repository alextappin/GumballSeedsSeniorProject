/**
 * Created by ajt on 3/12/2016.
 */
function TextProperties(textType) {
    var props = {
        words : {},
        type : textType,
        setValues : function() {
            if (this.type == "score") {
                this.text = "Score  " + ScoreGlobals.score;
                this.positionX = 10;
                this.positionY = 10;
                this.fill = "Green";
            }
            else if(this.type == "highscore") {
                this.text = "HighScore  " + ScoreGlobals.highScore;
                this.positionX = (MapGlobals.screenWidth - this.words.width) / 2;
                this.positionY = (MapGlobals.screenHeight / 2) + MapGlobals.screenHeight*.1;
                this.fill = "Yellow";
            }
            else if(this.type == "lives") {
                this.text = "Lives  " + ScoreGlobals.lives;
                this.positionX = 10;
                this.positionY = 40;
                this.fill = "Yellow";
            }
            else if(this.type == "loadInstructions") {
                //this.text = "Tap left side of the screen to jump \n Right side of the screen to Attack"
                this.text = "Tap left side of the screen to jump \n Right side of the screen to Attack";
                this.positionX = 10;
                this.positionY = 40;
                this.fill = "White";
                this.wordWrap = true;
                this.wordWrapWidth = MapGlobals.screenWidth/3;
            }
            else if(this.type = "loadInfo") {
                this.text = "Only five guardians called GUMBALL SEEDS can save the sweet gumball world from a dark and sour transformation led by KING SOUR and his minions of TWISTED SOURS, but first the GUMBALL SEED siblings must overcome their own sourness and reunite as a family to turn everything sour back to sweet!";
                this.positionX = MapGlobals.screenWidth - MapGlobals.screenWidth/4;
                this.positionY = 40;
                this.fill = "Red";
                this.wordWrap = true;
                this.wordWrapWidth = MapGlobals.screenWidth/4;
            }
            else {
                this.text = "DEFAULT";
                this.positionX = 0;
                this.positionY = 0;
                this.fill = "Black";
            }
        },
        getStyleProperties : function() {
            return {
                fill : this.fill,
                wordWrap : this.wordWrap,
                wordWrapWidth : this.wordWrapWidth
            }

        }
    };

    return props;
}

TextProperties.constructor = TextProperties;