var pacman = {
    x: 152,
    y: 264,
    size: 8,
    speed: 2,
    score: 0,
    life: 3,
    mouthOpenValue: 40,
    mouthPosition: -1,
    token: 1,
    lastToken: 1,
    setScoreValue: function(position, direction) {
            if (position == 4) {
                this.eatBigFood();
            } else if (position == 7) {
                this.eatFruit();
            } else if (position == 2){
                this.eatLittleFood();
            }

            // set grid with empty case
            if (direction == "left") {
                map.setMapValue(this.getPositionY(), this.getPositionX()-1, 0);
            } else if (direction == "right") {
                map.setMapValue(this.getPositionY(), this.getPositionX()+1, 0);
            } else if (direction == "top") {
                map.setMapValue(this.getPositionY()-1, this.getPositionX(), 0);
            } else if (direction == "bottom") {
                map.setMapValue(this.getPositionY()+1, this.getPositionX(), 0);
            }

            // set score in the screen
            document.getElementById('score').innerHTML = this.score;
    },
    getPositionX: function() {
            return Math.round(this.x/map.squareSize)-1; // Array start to 0
    },
    getPositionY: function() {
            return Math.round(this.y/map.squareSize)-1; // Array start to 0
    },
    eatBigFood: function(){
        // big food
        this.score += 50;
        map.end--;

        for(var i = 0; i < ghostContainer.length; ++i){
            ghostContainer[i].makeEatable();
        }

        lastTimeEatable = new Date();
        lastTimeEatable = lastTimeEatable.getTime();
    },
    eatLittleFood: function(){
        map.end--;
        this.score += 10;
    },
    eatFruit: function(){
        map.end--;
        this.score += 100;
    },
    checkForTeleport: function(){
        // teleport to right
        if (this.getPositionX() < -1) {
            this.x = 312;
            this.y = 168;
        }

        // teleport to left
        if (this.getPositionX() > 19) {
            this.x = 0;
            this.y = 168;
        }
    },
    askForDirection: function(){
        if (askDirection == "left" && map.getMapValue(this.getPositionY(), this.getPositionX()-1) != 1 && map.getMapValue(this.getPositionY(), this.getPositionX()-1) != 5) {
            this.setScoreValue(map.getMapValue(this.getPositionY(), this.getPositionX()-1), "left");
            this.x -= this.speed;
            this.token = this.lastToken = 1;

            return true;
        } else if (askDirection == "right" && map.getMapValue(this.getPositionY(), this.getPositionX()+1) != 1 && map.getMapValue(this.getPositionY(), this.getPositionX()-1) != 5) {
            this.setScoreValue(map.getMapValue(this.getPositionY(), this.getPositionX()+1), "right");
            this.x += this.speed;
            this.token = this.lastToken = 2;

            return true;
        } else if(askDirection == "top" && map.getMapValue(this.getPositionY()-1, this.getPositionX()) != 1 && map.getMapValue(this.getPositionY(), this.getPositionX()-1) != 5) {
            this.setScoreValue(map.getMapValue(this.getPositionY()-1, this.getPositionX()), "top");
            this.y -= this.speed;
            this.token = this.lastToken = 3;

            return true;
        } else if (askDirection == "bottom" && map.getMapValue(this.getPositionY()+1, this.getPositionX()) != 1 && map.getMapValue(this.getPositionY(), this.getPositionX()-1) != 5) {
            if(map.getMapValue(this.getPositionY()+1, this.getPositionX()) == 2 || map.getMapValue(this.getPositionY()+1, this.getPositionX()) == 4 || map.getMapValue(this.getPositionY()+1, this.getPositionX()) == 7)
            this.setScoreValue(map.getMapValue(this.getPositionY()+1, this.getPositionX()), "bottom");
            this.y += this.speed;
            this.token = this.lastToken = 4;

            return true;
        } else {
            return false;
        }
    },
    move: function(){
        this.checkForTeleport();

        if (this.token == 1) { // left
            if (this.x%map.squareSize - map.squareSize/2 == 0) {
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
        } else if (this.token == 3) { // top
            if (this.y%map.squareSize - map.squareSize/2 == 0) {
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
        } else if (this.token == 4) { // bottom
            if (this.y%map.squareSize - map.squareSize/2 == 0) {
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

    },
    draw: function() {
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
            context.arc(this.x, this.y, this.size, (Math.PI / 180) * (180 - this.mouthOpenValue), (Math.PI / 180) * (180 + this.mouthOpenValue), true);
            break;
        case 2:
            context.arc(this.x, this.y, this.size, (Math.PI / 180) * this.mouthOpenValue, (Math.PI / 180) * (360 - this.mouthOpenValue));
            break;
        case 3:
            context.arc(this.x, this.y, this.size, (Math.PI / 180) * (this.mouthOpenValue-90), (Math.PI / 180) * (-90 - this.mouthOpenValue));
            break;
        case 4:
            context.arc(this.x, this.y, this.size, (Math.PI / 180) * (this.mouthOpenValue+90), (Math.PI / 180) * (90 - this.mouthOpenValue));
            break;
        }

        context.lineTo(this.x, this.y);
        context.fillStyle = '#FF0';
        //context.fillText(this.gameLoop(),10,90);
        context.fill();

        // Draw life of pacman
        document.getElementById('life').innerHTML = this.life;
    }
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
};
