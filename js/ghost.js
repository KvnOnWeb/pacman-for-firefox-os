function Ghost(color)
{
	this.x = 152;
    this.y = 168;
    this.size = 8;
    this.color = color;
    this.speed = 1;
    this.score = 0;
    this.eatable = false;
    this.direction = 1;
    this.directionTab = ["left", "right", "top", "bottom"];
    this.image = new Image();
    this.imageSrcGhost = "";
    this.lastDirection = "";
    this.askDirection = "";
    this.token = 0;
    this.getX = function() {
        return this.x;
    };
    this.getY = function() {
        return this.y;
    };
    this.getPositionX = function() {
        diameter = 2 * this.size;
        posX = Math.round(this.x/diameter)-1; // Array start to 0

        return posX;
    };
    this.getPositionY = function() {
        diameter = 2 * this.size;
        posY = Math.round(this.y/diameter)-1; // Array start to 0

        return posY;
    };
    this.makeEatable = function() {
        this.eatable = true;
    };
    this.initialise = function(){
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
    
    this.draw = function () {
        // teleport to right
        if (this.getPositionX() < 1 && this.lastDirection == "left") {
            this.x = 280;
            this.y = 168;
        }

        // teleport to left
        if (this.getPositionX() > 19 && this.lastDirection == "right") {
            this.x = 0;
            this.y = 168;
        }

        if (this.lastDirection == "") {
            this.lastDirection = this.askDirection;
        }

        // Change direction coefficient
        if (this.lastDirection == "left" || this.lastDirection == "top") {
            this.direction = -1;
        } else {
            this.direction = 1;
        }

        if (this.token == 1) { // left
            if ((this.x%(this.size*2))-this.size != 0) {
                this.x += (this.speed * this.direction);
            } else {
                this.token = 0;
            }
        } else if (this.token == 2) { // right
            if ((this.x%(this.size*2))-this.size != 0) {
                this.x += (this.speed * this.direction);
            } else {
                this.token = 0;
            }
        } else if (this.token == 3) { // top
            if ((this.y%(this.size*2))-this.size != 0) {
                this.y += (this.speed * this.direction);
            } else {
                this.token = 0;
            }
        } else if (this.token == 4) { // bottom
            if ((this.y%(this.size*2))-this.size != 0) {
                this.y += (this.speed * this.direction);
            } else {
                this.token = 0;
            }
        } else {
            randomNumber = Math.floor((Math.random()*4));
            this.askDirection = this.directionTab[randomNumber];
            this.lastDirection = this.askDirection;
            if(this.askDirection == "left" && map.grid[this.getPositionY()][this.getPositionX()-1] != 1){
                this.x += (this.speed * this.direction);
                this.token = 1;
            } else if (this.askDirection == "right" && map.grid[this.getPositionY()][this.getPositionX()+1] != 1) {
                this.x += (this.speed * this.direction);
                this.token = 2;
            }
            else if(this.askDirection == "top" && map.grid[this.getPositionY()-1][this.getPositionX()] != 1) {
                this.y += (this.speed * this.direction);
                this.token = 3;
            } else if (this.askDirection == "bottom" && map.grid[this.getPositionY()+1][this.getPositionX()] != 1 && map.grid[this.getPositionY()+1][this.getPositionX()] != 5) {
                this.y += (this.speed * this.direction);
                this.token = 4;
            }
        }
        
        //context.beginPath();
        if (this.eatable) {
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
        }

        context.drawImage(this.image, this.x-this.size, this.y-this.size, this.size*2, this.size*2);

        if (this.y == 168 ) {
            this.y = 136;
        }
        
    };
}