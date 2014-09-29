const LEFT = 1;
const RIGHT = 2;
const UP = 3;
const DOWN = 4;

function Ghost(color)
{
    Creature.call(this, 152, 136, 2);
    this.color = color;
    this.score = 0;
    this.eatable = false;
    this.mode = true;
    this.direction = 1;
    this.image = new Image();
    this.imageSrcGhost = "";
    this.token = 1;
    this.target = [10, 10];
};

Ghost.prototype = Object.create(Creature.prototype);
Ghost.prototype.constructor = Ghost;



Ghost.prototype.makeEatable = function(){
    this.eatable = true;
};

Ghost.prototype.goFrightened = function(){
    this.makeEatable();
    this.setMode("frightened");

    this.image.src = "img/eatable_ghost.png";

    setTimeout(function(){ this.image.src = this.imageSrcGhost; }.bind(this), 8000);
    setTimeout(function(){ this.image.src = "img/eatable_ghost.png"; }.bind(this), 8500);
    setTimeout(function(){ this.image.src = this.imageSrcGhost; }.bind(this), 9000);
    setTimeout(function(){ this.image.src = "img/eatable_ghost.png"; }.bind(this), 9500);
    setTimeout(function(){ this.image.src = this.imageSrcGhost; }.bind(this), 10000);
};

Ghost.prototype.getMode = function(){
    return this.mode;
};

Ghost.prototype.setMode = function(mode){
    console.log(mode);
    this.mode = mode;
};

Ghost.prototype.initialise = function(){
    if (this.color == "blue")
        this.imageSrcGhost = "img/blue_ghost.png";
    else if (this.color == "pink")
        this.imageSrcGhost = "img/pink_ghost.png";
    else if (this.color == "red")
        this.imageSrcGhost = "img/red_ghost.png";
    else if (this.color == "orange")
        this.imageSrcGhost = "img/orange_ghost.png";

    this.image.src = this.imageSrcGhost;
};

Ghost.prototype.chooseRandomTarget = function(){
    var randInt = Math.floor(Math.random()*4);
    switch(randInt){
    case 0:
        this.target = [0, 0];
        break;
    case 1:
        this.target = [map.lines, 0];
        break;
    case 2:
        this.target = [0, map.columns];
        break;
    case 3:
        this.target = [map.lines, map.columns];
        break;
    }
};

Ghost.prototype.getDistanceToTarget = function(_y, _x){
    var a = Math.abs(_y - this.getTarget()[0]);
    var b = Math.abs(_x - this.getTarget()[1]);

    return Math.sqrt(a*a + b*b);
};

Ghost.prototype.getTarget = function(){
    return this.target;
};

Ghost.prototype.getTileInfo = function(_y, _x, _token){
    if(map.getMapValue(_y, _x) == 1 || map.getMapValue(_y, _x) == 5){
        return null;
    }

    return {
        y: _y,
        x: _x,
        token: _token,
        dist: this.getDistanceToTarget(_y, _x)
    };
};

Ghost.prototype.getSurroundingTiles = function(){
    var tiles = [];

    switch(this.token){
    case LEFT:
        tiles.push(this.getTileInfo(this.getPositionY()-1, this.getPositionX(), UP));
        tiles.push(this.getTileInfo(this.getPositionY()+1, this.getPositionX(), DOWN));
        tiles.push(this.getTileInfo(this.getPositionY(), this.getPositionX()-1, LEFT));
        break;
    case RIGHT:
        tiles.push(this.getTileInfo(this.getPositionY()-1, this.getPositionX(), UP));
        tiles.push(this.getTileInfo(this.getPositionY(), this.getPositionX()+1, RIGHT));
        tiles.push(this.getTileInfo(this.getPositionY()+1, this.getPositionX(), DOWN));
        break;
    case UP:
        tiles.push(this.getTileInfo(this.getPositionY()-1, this.getPositionX(), UP));
        tiles.push(this.getTileInfo(this.getPositionY(), this.getPositionX()+1, RIGHT));
        tiles.push(this.getTileInfo(this.getPositionY(), this.getPositionX()-1, LEFT));
        break;
    case DOWN:
        tiles.push(this.getTileInfo(this.getPositionY(), this.getPositionX()+1, RIGHT));
        tiles.push(this.getTileInfo(this.getPositionY()+1, this.getPositionX(), DOWN));
        tiles.push(this.getTileInfo(this.getPositionY(), this.getPositionX()-1, LEFT));
        break;
    }

    return tiles;
};

Ghost.prototype.chooseNextStepCloseToTarget = function(){
    var tiles = this.getSurroundingTiles();

    var min = Infinity;
    var nextToken = 0;
    for(var i = 0; i<tiles.length; ++i){
        if(tiles[i]){
            if(tiles[i].dist < min){
                min = tiles[i].dist;
                nextToken = tiles[i].token;
            }
        }
    }

    return nextToken;
};

Ghost.prototype.move = function(){
    this.checkForTeleport();

    if((this.x%map.squareSize - map.squareSize/2 == 0) && (this.y%map.squareSize - map.squareSize/2 == 0)){
        this.token = this.chooseNextStepCloseToTarget();
    }

    if (this.token == LEFT) {
        this.x -= this.speed;
    } else if (this.token == RIGHT) {
        this.x += this.speed;
    } else if (this.token == UP) {
        this.y -= this.speed;
    } else if (this.token == DOWN) {
        this.y += this.speed;
    }


};

Ghost.prototype.draw = function(){
    this.move();

    //context.beginPath();
    /*if (this.eatable) {
        if (newTime - lastTimeEatable < 8000)
            this.image.src = "img/eatable_ghost.png";
        else if ((newTime - lastTimeEatable) % 1000 < 500 && newTime - lastTimeEatable < 10000)
            this.image.src = this.imageSrcGhost;
        else if ((newTime - lastTimeEatable) % 1000 > 500 && newTime - lastTimeEatable < 10000)
            this.image.src = "img/eatable_ghost.png";
        else {
            this.eatable = false;
            this.image.src = this.imageSrcGhost;
        }
    } else {
        this.image.src = this.imageSrcGhost;
    }*/

    context.drawImage(this.image, this.x-this.size, this.y-this.size, this.size*2, this.size*2);
};
