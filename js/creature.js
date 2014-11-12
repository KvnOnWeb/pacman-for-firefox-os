function Creature(_x, _y, _speed){
  this.startX = this.x = _x;
  this.startY = this.y = _y;

  this.speed = _speed;
  this.size = 8;
};

Creature.prototype.getX = function(){
    return this.x;
};

Creature.prototype.getY = function(){
    return this.y;
};

Creature.prototype.setX = function(_x){
    this.x = _x;
};

Creature.prototype.setY = function(_y){
    this.y = _y;
};

Creature.prototype.getPositionX = function() {
    return Math.round(this.getX()/map.squareSize)-1; // Array start to 0
};

Creature.prototype.getPositionY = function() {
    return Math.round(this.getY()/map.squareSize)-1; // Array start to 0
};

Creature.prototype.resetPosition = function() {
    this.x = this.startX;
    this.y = this.startY;
};

Creature.prototype.checkForTeleport = function(){
    // teleport to right
    if (this.getX() < 0) {
        this.setX(map.columns * map.squareSize - this.speed);
        this.setY(168);
    }

    // teleport to left
    if (this.getX() > map.columns * map.squareSize) {
        this.setX(0);
        this.setY(168);
    }
};
