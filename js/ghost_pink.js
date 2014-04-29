var ghostPink = {
    x: 152,
    y: 168,
    size: 8,
    speed: 2,
    score: 0,
    eatable: false,
    direction: 1,
    mouthOpenValue: 40,
    mouthPosition: -1,
    directionTab: ["left", "right", "top", "bottom"],
    image: new Image(),
        getX: function() {
            return this.x;
        },
        getY: function() {
            return this.y;
        },
        getPositionX: function() {
                diameter = 2 * this.size;
                posX = Math.round(this.x/diameter)-1; // Array start to 0
                return posX;
        },
        getPositionY: function() {
                diameter = 2 * this.size;
                posY = Math.round(this.y/diameter)-1; // Array start to 0
                return posY;
        },
        initialise: function(){
            this.image.src = "img/pink_ghost.png";
            context.drawImage(this.image, this.x-this.size, this.y-this.size, this.size*2, this.size*2);
        },
        draw: function () {

            // teleport to right
            if (this.getPositionX() < 1 && lastDirection == "left") {
                this.x = 280;
                this.y = 168;
            }

            // teleport to left
            if (this.getPositionX() > 19 && lastDirection == "right") {
                this.x = 0;
                this.y = 168;
            }
            
            if (lastDirectionGhostPink == "") {
                lastDirectionGhostPink = askDirectionGhostPink;
            }

            if (this.mouthOpenValue <= 0)
                this.mouthPosition = 1;
            else if (this.mouthOpenValue >= 40)
                this.mouthPosition = -1;

            // Change direction coefficient
            if (lastDirectionGhostPink == "left" || lastDirectionGhostPink == "top") {
                this.direction = -1;
            } else {
                this.direction = 1;
            }

            if (tokenGhostPink == 1) { // left
                    if ((this.x%(this.size*2))-this.size != 0) {
                        this.x += (this.speed * this.direction);
                    } else {
                        tokenGhostPink = 0;
                    }
            } else if (tokenGhostPink == 2) { // right
                    if ((this.x%(this.size*2))-this.size != 0) {
                        this.x += (this.speed * this.direction);
                    } else {
                        tokenGhostPink = 0;
                    }
            } else if (tokenGhostPink == 3) { // top
                    if ((this.y%(this.size*2))-this.size != 0) {
                        this.y += (this.speed * this.direction);
                    } else {
                        tokenGhostPink = 0;
                    }
            } else if (tokenGhostPink == 4) { // bottom
                    if ((this.y%(this.size*2))-this.size != 0) {
                        this.y += (this.speed * this.direction);
                    } else {
                        tokenGhostPink = 0;
                    }
            } else {
                    randomNumber = Math.floor((Math.random()*4));
                    askDirectionGhostPink = this.directionTab[randomNumber];
                    lastDirectionGhostPink = askDirectionGhostPink;
                    if(askDirectionGhostPink == "left" && map.grid[this.getPositionY()][this.getPositionX()-1] != 1 ){
                        this.x += (this.speed * this.direction);
                        tokenGhostPink = 1;
                    } else if (askDirectionGhostPink == "right" && map.grid[this.getPositionY()][this.getPositionX()+1] != 1) {
                        this.x += (this.speed * this.direction);
                        tokenGhostPink = 2;
                    }
                    else if(askDirectionGhostPink == "top" && map.grid[this.getPositionY()-1][this.getPositionX()] != 1) {
                        this.y += (this.speed * this.direction);
                        tokenGhostPink = 3;
                    } else if (askDirectionGhostPink == "bottom" && map.grid[this.getPositionY()+1][this.getPositionX()] != 1 && map.grid[this.getPositionY()+1][this.getPositionX()] != 5) {
                        this.y += (this.speed * this.direction);
                        tokenGhostPink = 4;
                    }
            }

            this.mouthOpenValue += (5 * this.mouthPosition);

            //context.beginPath();
            if (this.eatable) {
                if (newTime - lastTimeEatable < 8000)
                    this.image.src = "img/eatable_ghost.png";
                else if ((newTime - lastTimeEatable) % 1000 < 500 && newTime - lastTimeEatable < 10000)
                    this.image.src = "img/pink_ghost.png";
                else if ((newTime - lastTimeEatable) % 1000 > 500 && newTime - lastTimeEatable < 10000)
                    this.image.src = "img/eatable_ghost.png";
                else {
                    this.eatable = false;
                    this.image.src = "img/pink_ghost.png";
                }
            } else {
                this.image.src = "img/pink_ghost.png";
            }

            context.drawImage(this.image, this.x-this.size, this.y-this.size, this.size*2, this.size*2);

            if (this.y == 168 ) {
                this.y = 136;
            }
        }
    };