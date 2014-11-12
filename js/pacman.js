function Pacman(_x, _y) {
    Creature.call(this, _x, _y, 2);

    this.score = 0;
    this.life = 3;
    this.mouthOpenValue = 40;
    this.mouthPosition = -1;
    this.token = 0;
    this.lastToken = 1;
    this.nextDirection = "";
};

Pacman.prototype = Object.create(Creature.prototype);
Pacman.prototype.constructor = Pacman;



Pacman.prototype.getNextDirection = function(){
    return this.nextDirection;
};

Pacman.prototype.setNextDirection = function(direction){
    this.nextDirection = direction;
};


Pacman.prototype.getDirection = function(){
    return this.token;
};

Pacman.prototype.setScoreValue = function(position, direction) {
    if (position == 4) {
        this.eatBigFood();
    } else if (position == 7) {
        this.eatFruit();
    } else if (position == 2) {
        this.eatLittleFood();
    }

    map.setMapValue(this.getPositionY(), this.getPositionX(), 0);

    // set score in the screen
    document.getElementById('score').innerHTML = this.score;
};

Pacman.prototype.eatBigFood = function(){
    pauseModeChanger();
    //setTimeout(function(){runModeChanger(); console.log("123");}, 10000);

    for(var i = 0; i < ghostContainer.length; ++i){
        ghostContainer[i].goFrightened();
    }

    // big food
    this.score += 50;
    map.end--;

    lastTimeEatable = new Date();
    lastTimeEatable = lastTimeEatable.getTime();
};

Pacman.prototype.eatLittleFood = function(){
    map.end--;
    this.score += 10;
};

Pacman.prototype.eatFruit = function(){
    map.end--;
    this.score += 100;
};

Pacman.prototype.askForDirection = function(){
    if (this.getNextDirection() == "left" && map.getMapValue(this.getPositionY(), this.getPositionX()-1) != 1 && map.getMapValue(this.getPositionY(), this.getPositionX()-1) != 5) {
        this.x -= this.speed;
        this.token = this.lastToken = 1;

        return true;
    } else if (this.getNextDirection() == "right" && map.getMapValue(this.getPositionY(), this.getPositionX()+1) != 1 && map.getMapValue(this.getPositionY(), this.getPositionX()+1) != 5) {
        this.x += this.speed;
        this.token = this.lastToken = 2;

        return true;
    } else if(this.getNextDirection() == "up" && map.getMapValue(this.getPositionY()-1, this.getPositionX()) != 1 && map.getMapValue(this.getPositionY()-1, this.getPositionX()) != 5) {
        this.y -= this.speed;
        this.token = this.lastToken = 3;

        return true;
    } else if (this.getNextDirection() == "down" && map.getMapValue(this.getPositionY()+1, this.getPositionX()) != 1 && map.getMapValue(this.getPositionY()+1, this.getPositionX()) != 5) {
        this.y += this.speed;
        this.token = this.lastToken = 4;

        return true;
    } else {
        return false;
    }
};

Pacman.prototype.move = function(){
    this.checkForTeleport();

    if (this.token == 1) { // left
        if (this.x%map.squareSize - map.squareSize/2 == 0) {
            this.setScoreValue(map.getMapValue(this.getPositionY(), this.getPositionX()), 0);
            if(!this.askForDirection()){
                if(map.getMapValue(this.getPositionY(), this.getPositionX()-1) != 1 && map.getMapValue(this.getPositionY(), this.getPositionX()-1) != 5){
                    this.x -= this.speed;
                } else {
                    this.token = 0;
                }
            }
        } else {
            this.x -= this.speed;
        }
    } else if (this.token == 2) { // right
        if (this.x%map.squareSize - map.squareSize/2 == 0) {
            this.setScoreValue(map.getMapValue(this.getPositionY(), this.getPositionX()), 0);
            if(!this.askForDirection()){
                if(map.getMapValue(this.getPositionY(), this.getPositionX()+1) != 1 && map.getMapValue(this.getPositionY(), this.getPositionX()+1) != 5){
                    this.x += this.speed;
                } else {
                    this.token = 0;
                }
            }
        } else {
            this.x += this.speed;
        }
    } else if (this.token == 3) { // up
        if (this.y%map.squareSize - map.squareSize/2 == 0) {
            this.setScoreValue(map.getMapValue(this.getPositionY(), this.getPositionX()), 0);
            if(!this.askForDirection()){
                if(map.getMapValue(this.getPositionY()-1, this.getPositionX()) != 1 && map.getMapValue(this.getPositionY()-1, this.getPositionX()) != 5){
                    this.y -= this.speed;
                } else {
                    this.token = 0;
                }
            }
        } else {
            this.y -= this.speed;
        }
    } else if (this.token == 4) { // down
        if (this.y%map.squareSize - map.squareSize/2 == 0) {
            this.setScoreValue(map.getMapValue(this.getPositionY(), this.getPositionX()), 0);
            if(!this.askForDirection()){
                if(map.getMapValue(this.getPositionY()+1, this.getPositionX()) != 1 && map.getMapValue(this.getPositionY()+1, this.getPositionX()) != 5){
                    this.y += this.speed;
                } else {
                    this.token = 0;
                }
            }
        } else {
            this.y += this.speed;
        }

    } else {
            this.askForDirection();
    }

};

Pacman.prototype.draw = function() {
    this.move();

    if (this.mouthOpenValue <= 5)
        this.mouthPosition = 1;
    else if (this.mouthOpenValue >= 40)
        this.mouthPosition = -1;

    this.mouthOpenValue += (5 * this.mouthPosition);

    // Prepare to drawing
    context.beginPath();

    switch(this.lastToken){
    case 1:
        context.arc(this.x+1, this.y, this.size, (Math.PI / 180) * (180 - this.mouthOpenValue), (Math.PI / 180) * (180 + this.mouthOpenValue), true);
        break;
    case 2:
        context.arc(this.x+1, this.y, this.size, (Math.PI / 180) * this.mouthOpenValue, (Math.PI / 180) * (360 - this.mouthOpenValue));
        break;
    case 3:
        context.arc(this.x+1, this.y, this.size, (Math.PI / 180) * (this.mouthOpenValue-90), (Math.PI / 180) * (-90 - this.mouthOpenValue));
        break;
    case 4:
        context.arc(this.x+1, this.y, this.size, (Math.PI / 180) * (this.mouthOpenValue+90), (Math.PI / 180) * (90 - this.mouthOpenValue));
        break;
    }

    context.lineTo(this.x, this.y);
    context.fillStyle = '#FF0';
    //context.fillText(this.gameLoop(),10,90);
    context.fill();

    // Draw life of Pacman
    document.getElementById('life').innerHTML = this.life;
};

    /*,
    lastLoop: new Date(),
    lastFPS: 0,
    fpsCount: 0,
    gameLoop: function() {
        ++this.fpsCount;

        var thisLoop = new Date();
        if((thisLoop - this.lastLoop) > 1000){
            this.lastLoop = new Date();
            this.lastFPS = this.fpsCount;
            this.fpsCount = 0;
        }

        return this.lastFPS;
    }*/

var pacman = new Pacman(152, 264);
