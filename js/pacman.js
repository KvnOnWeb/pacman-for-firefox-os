var pacman = {
    x: 152,
    y: 264,
    size: 8,
    speed: 1,
    score: 0,
    direction: 1,
    mouthOpenValue: 40,
    mouthPosition: -1,
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

            if (lastDirection == "")
                    lastDirection = askDirection;

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
                    if(askDirection == "left" && map.grid[this.getPositionY()][this.getPositionX()-1] != 1){
                        if(map.grid[this.getPositionY()][this.getPositionX()-1] == 2 || map.grid[this.getPositionY()][this.getPositionX()-1] == 4)
                        {
                                this.score++;
                                map.grid[this.getPositionY()][this.getPositionX()-1] = 0;
                                document.getElementById('score').innerHTML = this.score;
                        }
                        this.x += (this.speed * this.direction);
                        token = 1;
                    } else if (askDirection == "right" && map.grid[this.getPositionY()][this.getPositionX()+1] != 1) {

                        if(map.grid[this.getPositionY()][this.getPositionX()+1] == 2 || map.grid[this.getPositionY()][this.getPositionX()+1] == 4)
                        {
                                this.score++;
                                map.grid[this.getPositionY()][this.getPositionX()+1] = 0;
                                document.getElementById('score').innerHTML = this.score;
                        }
                        this.x += (this.speed * this.direction);
                        token = 2;
                    }
                    else if(askDirection == "top" && map.grid[this.getPositionY()-1][this.getPositionX()] != 1) {

                        if(map.grid[this.getPositionY()-1][this.getPositionX()] == 2 || map.grid[this.getPositionY()-1][this.getPositionX()] == 4)
                        {
                                this.score++;
                                map.grid[this.getPositionY()-1][this.getPositionX()] = 0; 
                                document.getElementById('score').innerHTML = this.score;
                        }

                        this.y += (this.speed * this.direction);
                        token = 3;
                    } else if (askDirection == "bottom" && map.grid[this.getPositionY()+1][this.getPositionX()] != 1) {

                        if(map.grid[this.getPositionY()+1][this.getPositionX()] == 2 || map.grid[this.getPositionY()+1][this.getPositionX()] == 4)
                        {
                                this.score++;
                                map.grid[this.getPositionY()+1][this.getPositionX()] = 0;
                                document.getElementById('score').innerHTML = this.score;
                        }
                        this.y += (this.speed * this.direction);
                        token = 4;
                    }
            }

            this.mouthOpenValue += (5 * this.mouthPosition);

            context.beginPath();

            if (this.direction === 1) {
                if (lastDirection == "right")                
                    context.arc(this.x, this.y, this.size, (Math.PI / 180) * this.mouthOpenValue, (Math.PI / 180) * (360 - this.mouthOpenValue));
                else
                    context.arc(this.x, this.y, this.size, (Math.PI / 180) * (this.mouthOpenValue+90), (Math.PI / 180) * (90 - this.mouthOpenValue));
            }
            else {
                if (lastDirection == "left")
                    context.arc(this.x, this.y, this.size, (Math.PI / 180) * (180 - this.mouthOpenValue), (Math.PI / 180) * (180 + this.mouthOpenValue), true);
                else
                    context.arc(this.x, this.y, this.size, (Math.PI / 180) * (this.mouthOpenValue-90), (Math.PI / 180) * (-90 - this.mouthOpenValue));
            }

            context.lineTo(this.x, this.y);
            context.fillStyle = '#FF0';
            context.fill();
        }
    };