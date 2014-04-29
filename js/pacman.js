var pacman = {
    x: 152,
    y: 264,
    size: 8,
    speed: 2,
    score: 0,
    life: 3,
    direction: 1,
    mouthOpenValue: 40,
    mouthPosition: -1,
    setScoreValue: function(position, direction) {
            if (position == 4) {
            // big food
                this.score += 50;
                map.end--;
                ghostBlue.eatable = true;
                ghostRed.eatable = true;
                ghostOrange.eatable = true;

                lastTimeEatable = new Date();
                lastTimeEatable = lastTimeEatable.getTime();               
            } else if (position == 7) {
            // fruit
                map.end--;
                this.score += 100;
                this.endOfGame--;
            } else {
            // little food
                map.end--;
                this.score += 10;
                this.endOfGame--;
            }

            // set grid with empty case
            if (direction == "left") {
                map.grid[this.getPositionY()][this.getPositionX()-1] = 0;
            } else if (direction == "right") {
                map.grid[this.getPositionY()][this.getPositionX()+1] = 0;
            } else if (direction == "top") {
                map.grid[this.getPositionY()-1][this.getPositionX()] = 0;
            } else {
                map.grid[this.getPositionY()+1][this.getPositionX()] = 0;
            }

            // set score in the screen
            document.getElementById('score').innerHTML = this.score;
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

        if (lastDirection == "") {
            lastDirection = askDirection;
        }                

        if (this.mouthOpenValue <= 0)
            this.mouthPosition = 1;
        else if (this.mouthOpenValue >= 40)
            this.mouthPosition = -1;

        // Change direction coefficient
        if (lastDirection == "left" || lastDirection == "top") {
            this.direction = -1;
        } else {
            this.direction = 1;
        }

        if (token == 1) { // left
                if ((this.x%(this.size*2))-this.size != 0) {
                    this.x += (this.speed * this.direction);
                } else {
                    token = 0;
                }
        } else if (token == 2) { // right
                if ((this.x%(this.size*2))-this.size != 0) {
                    this.x += (this.speed * this.direction);
                } else {
                    token = 0;
                }
        } else if (token == 3) { // top
                if ((this.y%(this.size*2))-this.size != 0) {
                    this.y += (this.speed * this.direction);
                } else {
                    token = 0;
                }
        } else if (token == 4) { // bottom
                if ((this.y%(this.size*2))-this.size != 0) {
                    this.y += (this.speed * this.direction);
                } else {
                    token = 0;
                }
        } else {
                lastDirection = askDirection;
                if (askDirection == "left" && map.grid[this.getPositionY()][this.getPositionX()-1] != 1 && map.grid[this.getPositionY()][this.getPositionX()-1] != 5) {
                    if (map.grid[this.getPositionY()][this.getPositionX()-1] == 2 || map.grid[this.getPositionY()][this.getPositionX()-1] == 4 || map.grid[this.getPositionY()][this.getPositionX()-1] == 7) {
                        this.setScoreValue(map.grid[this.getPositionY()][this.getPositionX()-1], "left");
                    }
                    this.x += (this.speed * this.direction);
                    token = 1;
                } else if (askDirection == "right" && map.grid[this.getPositionY()][this.getPositionX()+1] != 1 && map.grid[this.getPositionY()][this.getPositionX()-1] != 5) {

                    if(map.grid[this.getPositionY()][this.getPositionX()+1] == 2 || map.grid[this.getPositionY()][this.getPositionX()+1] == 4 || map.grid[this.getPositionY()][this.getPositionX()+1] == 7)
                    {
                        this.setScoreValue(map.grid[this.getPositionY()][this.getPositionX()+1], "right");
                    }
                    this.x += (this.speed * this.direction);
                    token = 2;
                }
                else if(askDirection == "top" && map.grid[this.getPositionY()-1][this.getPositionX()] != 1 && map.grid[this.getPositionY()][this.getPositionX()-1] != 5) {

                    if(map.grid[this.getPositionY()-1][this.getPositionX()] == 2 || map.grid[this.getPositionY()-1][this.getPositionX()] == 4 || map.grid[this.getPositionY()-1][this.getPositionX()] == 7)
                    {
                        this.setScoreValue(map.grid[this.getPositionY()-1][this.getPositionX()], "top");
                    }

                    this.y += (this.speed * this.direction);
                    token = 3;
                } else if (askDirection == "bottom" && map.grid[this.getPositionY()+1][this.getPositionX()] != 1 && map.grid[this.getPositionY()][this.getPositionX()-1] != 5) {

                    if(map.grid[this.getPositionY()+1][this.getPositionX()] == 2 || map.grid[this.getPositionY()+1][this.getPositionX()] == 4 || map.grid[this.getPositionY()+1][this.getPositionX()] == 7)
                    {
                        this.setScoreValue(map.grid[this.getPositionY()+1][this.getPositionX()], "bottom");
                    }
                    this.y += (this.speed * this.direction);
                    token = 4;
                }
        }

        this.mouthOpenValue += (5 * this.mouthPosition);

        // Prepare to drawing
        context.beginPath();

        if (this.direction === 1) {
            if (lastDirection == "right") {     
            // Right          
                context.arc(this.x, this.y, this.size, (Math.PI / 180) * this.mouthOpenValue, (Math.PI / 180) * (360 - this.mouthOpenValue));
            } else {
            // Bottom
                context.arc(this.x, this.y, this.size, (Math.PI / 180) * (this.mouthOpenValue+90), (Math.PI / 180) * (90 - this.mouthOpenValue));
            }
        }
        else {
            if (lastDirection == "left") {
            // Left
                context.arc(this.x, this.y, this.size, (Math.PI / 180) * (180 - this.mouthOpenValue), (Math.PI / 180) * (180 + this.mouthOpenValue), true);
            } else {
            // Top
                context.arc(this.x, this.y, this.size, (Math.PI / 180) * (this.mouthOpenValue-90), (Math.PI / 180) * (-90 - this.mouthOpenValue));
            }
        }

        context.lineTo(this.x, this.y);
        context.fillStyle = '#FF0';
        context.fill();

        // Draw life of pacman
        document.getElementById('life').innerHTML = this.life;
    }
};