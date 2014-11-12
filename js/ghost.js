const LEFT = 1;
const RIGHT = 2;
const UP = 3;
const DOWN = 4;

function Ghost(color, _x, _y, _idleTime)
{
    Creature.call(this, _x, _y, 2);
    this.color = color;
    this.score = 0;
    this.eatable = false;
    this.mode = "idle";
    this.direction = 1;
    this.image = new Image();
    this.imageSrcGhost = "";
    this.token = 0;
    this.target = [10, 10];

    this.idleTime = _idleTime;
};

Ghost.prototype = Object.create(Creature.prototype);
Ghost.prototype.constructor = Ghost;



Ghost.prototype.reset = function(){
    console.log("res");
    this.resetPosition();
    this.setMode("idle");
    this.token = 0;
    this.makeNotEatable();

    window.setTimeout(function(){
        this.setMode("leave");
    }.bind(this), 1000 * this.idleTime);
};

Ghost.prototype.makeEatable = function(){
    this.image.src = "img/eatable_ghost.png";
    this.eatable = true;
};

Ghost.prototype.makeNotEatable = function(){
    this.image.src = this.imageSrcGhost;
    this.eatable = false;
};

Ghost.prototype.goFrightened = function(){
    this.makeEatable();

    var lastMode = this.getMode();
    if(lastMode == "idle" || lastMode == "leave"){
        lastMode = "scatter";
    }

    this.setMode("frightened");
    this.image.src = "img/eatable_ghost.png";

    setTimeout(function(){ if(this.eatable) this.image.src = this.imageSrcGhost; }.bind(this), 8000);
    setTimeout(function(){ if(this.eatable) this.image.src = "img/eatable_ghost.png"; }.bind(this), 8500);
    setTimeout(function(){ if(this.eatable) this.image.src = this.imageSrcGhost; }.bind(this), 9000);
    setTimeout(function(){ if(this.eatable) this.image.src = "img/eatable_ghost.png"; }.bind(this), 9500);
    setTimeout(function(){
        this.makeNotEatable();
        this.setMode(lastMode);
        runModeChanger();
    }.bind(this), 10000);
};

Ghost.prototype.getMode = function(){
    return this.mode;
};

Ghost.prototype.setMode = function(mode){
    this.mode = mode;
};

Ghost.prototype.initialise = function(){
    this.reset();

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
    if(map.getMapValue(_y, _x) == 1){
        return null;
    }

    //Ghost House
    if(_token == DOWN && map.getMapValue(_y, _x) == 5){
        return null;
    }

    return {
        y: _y,
        x: _x,
        token: _token,
        dist: this.getDistanceToTarget(_y, _x)
    };
};

Ghost.prototype.getSurroundingTiles = function(token){
    var tiles = [];

    switch(token){
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
    var tiles = this.getSurroundingTiles(this.token);

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

Ghost.prototype.checkGhostHouseTargets = function(){
    if(this.getPositionX() == 9 && this.getPositionY() == 10){
        this.token = 3;
        this.target = [8, 9];

    } else if(this.getPositionX() == 8 && this.getPositionY() == 10){
        this.token = 2;
        this.target = [10, 9];

    } else if(this.getPositionX() == 10 && this.getPositionY() == 10){
        this.token = 1;
        this.target = [10, 9];

    } else if(this.getPositionX() == 9 && this.getPositionY() == 8){
        this.token = 1;
        this.target = [8, 6];
        this.setMode("scatter");

    }
};

Ghost.prototype.move = function(){
    this.checkForTeleport();

    if(this.getMode() == "idle"){
        return 0;
    }

    if((this.x%map.squareSize - map.squareSize/2 == 0) && (this.y%map.squareSize - map.squareSize/2 == 0)){
        if(this.getMode() == "leave"){
            this.checkGhostHouseTargets();
        } else {
            this.chooseTarget();
        }

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
    context.drawImage(this.image, this.x-this.size, this.y-this.size, this.size*2, this.size*2);
};
