var ghostRed = {
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
            this.image.src = "img/red_ghost.png";
        },
        draw: function () {

            if (lastDirectionGhostRed == "") {
                this.y = 136;
                lastDirectionGhostRed = askDirectionGhostRed;
            }

            if (this.mouthOpenValue <= 0)
                this.mouthPosition = 1;
            else if (this.mouthOpenValue >= 40)
                this.mouthPosition = -1;

            // Change direction coefficient
            if (lastDirectionGhostRed == "left" || lastDirectionGhostRed == "top") {
                this.direction = -1;
            } else {
                this.direction = 1;
            }

            if (tokenGhostRed == 1) { // left
                if ((this.x%(this.size*2))-this.size != 0) {
                    this.x += (this.speed * this.direction);
                } else {
                    tokenGhostRed = 0;
                }
            } else if (tokenGhostRed == 2) { // right
                if ((this.x%(this.size*2))-this.size != 0) {
                    this.x += (this.speed * this.direction);
                } else {
                    tokenGhostRed = 0;
                }
            } else if (tokenGhostRed == 3) { // top
                if ((this.y%(this.size*2))-this.size != 0) {
                    this.y += (this.speed * this.direction);
                } else {
                    tokenGhostRed = 0;
                }
            } else if (tokenGhostRed == 4) { // bottom
                if ((this.y%(this.size*2))-this.size != 0) {
                    this.y += (this.speed * this.direction);
                } else {
                    tokenGhostRed = 0;
                }
            } else {
                randomNumber = Math.floor((Math.random()*4));
                askDirectionGhostRed = this.directionTab[randomNumber];
                lastDirectionGhostRed = askDirectionGhostRed;
                if (askDirectionGhostRed == "left" && map.grid[this.getPositionY()][this.getPositionX()-1] != 1){
                    this.x += (this.speed * this.direction);
                    tokenGhostRed = 1;
                } else if (askDirectionGhostRed == "right" && map.grid[this.getPositionY()][this.getPositionX()+1] != 1) {
                    this.x += (this.speed * this.direction);
                    tokenGhostRed = 2;
                } else if (askDirectionGhostRed == "top" && map.grid[this.getPositionY()-1][this.getPositionX()] != 1) {
                    this.y += (this.speed * this.direction);
                    tokenGhostRed = 3;
                } else if (askDirectionGhostRed == "bottom" && map.grid[this.getPositionY()+1][this.getPositionX()] != 1 && map.grid[this.getPositionY()+1][this.getPositionX()] != 5) {
                    this.y += (this.speed * this.direction);
                    tokenGhostRed = 4;
                }
            }

            this.mouthOpenValue += (5 * this.mouthPosition);

            if (this.eatable) {
                if (newTime - lastTimeEatable < 8000)
                    this.image.src = "img/eatable_ghost.png";
                else if ((newTime - lastTimeEatable) % 1000 < 500 && newTime - lastTimeEatable < 10000)
                    this.image.src = "img/red_ghost.png";
                else if ((newTime - lastTimeEatable) % 1000 > 500 && newTime - lastTimeEatable < 10000)
                    this.image.src = "img/eatable_ghost.png";
                else {
                    this.eatable = false;
                    this.image.src = "img/red_ghost.png";
                }
            } else {
                this.image.src = "img/red_ghost.png";
            }

            context.drawImage(this.image, this.x-this.size, this.y-this.size, this.size*2, this.size*2);

            if (this.y == 168 ) {
                this.y = 136;
            }
        }
    };