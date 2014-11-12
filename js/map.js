var map = {
    lines: 22,
    columns: 19,
    squareSize: 16,
    littleFoodSize: 2,
    bigFoodRadius: 5,
    bigFoodPosition: 1,
    end: 191,
    level: 1,
    fruitImage: new Image(),
    grid: new Array(
        new Array(1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1),
        new Array(1, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 1),
        new Array(1, 2, 1, 1, 2, 1, 1, 1, 2, 1, 2, 1, 1, 1, 2, 1, 1, 2, 1),
        new Array(1, 4, 1, 1, 2, 1, 1, 1, 2, 1, 2, 1, 1, 1, 2, 1, 1, 4, 1),
        new Array(1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1),
        new Array(1, 2, 1, 1, 2, 1, 2, 1, 1, 1, 1, 1, 2, 1, 2, 1, 1, 2, 1),
        new Array(1, 2, 2, 2, 2, 1, 2, 2, 2, 1, 2, 2, 2, 1, 2, 2, 2, 2, 1),
        new Array(1, 1, 1, 1, 2, 1, 1, 1, 0, 1, 0, 1, 1, 1, 2, 1, 1, 1, 1),
        new Array(0, 0, 0, 1, 2, 1, 0, 0, 0, 0, 0, 0, 0, 1, 2, 1, 0, 0, 0),
        new Array(1, 1, 1, 1, 2, 1, 0, 1, 1, 5, 1, 1, 0, 1, 2, 1, 1, 1, 1),
        new Array(0, 0, 0, 0, 2, 0, 0, 1, 0, 0, 0, 1, 0, 0, 2, 0, 0, 0, 0),
        new Array(1, 1, 1, 1, 2, 1, 0, 1, 1, 1, 1, 1, 0, 1, 2, 1, 1, 1, 1),
        new Array(0, 0, 0, 1, 2, 1, 0, 0, 0, 7, 0, 0, 0, 1, 2, 1, 0, 0, 0),
        new Array(1, 1, 1, 1, 2, 1, 0, 1, 1, 1, 1, 1, 0, 1, 2, 1, 1, 1, 1),
        new Array(1, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 1),
        new Array(1, 2, 1, 1, 2, 1, 1, 1, 2, 1, 2, 1, 1, 1, 2, 1, 1, 2, 1),
        new Array(1, 4, 2, 1, 2, 2, 2, 2, 2, 0, 2, 2, 2, 2, 2, 1, 2, 4, 1),
        new Array(1, 1, 2, 1, 2, 1, 2, 1, 1, 1, 1, 1, 2, 1, 2, 1, 2, 1, 1),
        new Array(1, 2, 2, 2, 2, 1, 2, 2, 2, 1, 2, 2, 2, 1, 2, 2, 2, 2, 1),
        new Array(1, 2, 1, 1, 1, 1, 1, 1, 2, 1, 2, 1, 1, 1, 1, 1, 1, 2, 1),
        new Array(1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1),
        new Array(1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1)
    ),
    getMapValue: function(y, x){
        try{
            return this.grid[y][x];
        } catch (err){
            return null;
        }
    },
    setMapValue: function(y, x, val){
        try{
            this.grid[y][x] = val;
        } catch (err){}
    },
    drawWallBlock: function(x, y){
        context.beginPath();

        var padding = 3;
        var adjacentBlocks = []; // 1 if there is not a wall;
        adjacentBlocks[0] = this.getMapValue(y - 1, x) != 1;
        adjacentBlocks[1] = this.getMapValue(y, x + 1) != 1;
        adjacentBlocks[2] = this.getMapValue(y + 1, x) != 1;
        adjacentBlocks[3] = this.getMapValue(y, x - 1) != 1;


        if(adjacentBlocks[0]){
            context.moveTo(this.squareSize*x + padding, this.squareSize*y);
            context.lineTo(this.squareSize*(x+1) - padding, this.squareSize*y);

        } else {
            if(adjacentBlocks[1]){
                context.moveTo(this.squareSize*(x+1), this.squareSize*(y));
                context.lineTo(this.squareSize*(x+1), this.squareSize*(y) + padding);
            }

            if(adjacentBlocks[3]){
                context.moveTo(this.squareSize*(x), this.squareSize*(y));
                context.lineTo(this.squareSize*(x), this.squareSize*(y) + padding);
            }
        }

        if(adjacentBlocks[1]){
            context.moveTo(this.squareSize*(x+1), this.squareSize*y + padding);
            context.lineTo(this.squareSize*(x+1), this.squareSize*(y+1) - padding);
        } else {
            if(adjacentBlocks[0]){
                context.moveTo(this.squareSize*(x+1) - padding, this.squareSize*(y));
                context.lineTo(this.squareSize*(x+1), this.squareSize*(y));
            }

            if(adjacentBlocks[2]){
                context.moveTo(this.squareSize*(x+1) - padding, this.squareSize*(y+1));
                context.lineTo(this.squareSize*(x+1), this.squareSize*(y+1));
            }
        }

        if(adjacentBlocks[2]){
            context.moveTo(this.squareSize*(x+1) - padding, this.squareSize*(y+1));
            context.lineTo(this.squareSize*(x) + padding, this.squareSize*(y+1));
        } else {
            if(adjacentBlocks[3]){
                context.moveTo(this.squareSize*(x), this.squareSize*(y+1) - padding);
                context.lineTo(this.squareSize*(x), this.squareSize*(y+1));
            }

            if(adjacentBlocks[1]){
                context.moveTo(this.squareSize*(x+1), this.squareSize*(y+1) - padding);
                context.lineTo(this.squareSize*(x+1), this.squareSize*(y+1));
            }
        }

        if(adjacentBlocks[3]){
            context.moveTo(this.squareSize*(x), this.squareSize*(y+1) - padding);
            context.lineTo(this.squareSize*(x), this.squareSize*(y) + padding);
        } else {
            if(adjacentBlocks[0]){
                context.moveTo(this.squareSize*(x) + padding, this.squareSize*(y));
                context.lineTo(this.squareSize*(x), this.squareSize*(y));
            }

            if(adjacentBlocks[2]){
                context.moveTo(this.squareSize*(x) + padding, this.squareSize*(y+1));
                context.lineTo(this.squareSize*(x), this.squareSize*(y+1));
            }
        }

        // rounding
        if(adjacentBlocks[0] && adjacentBlocks[1]){
            context.moveTo(this.squareSize*(x+1) - padding, this.squareSize*(y));
            context.lineTo(this.squareSize*(x+1), this.squareSize*(y) + padding);
        }

        if(adjacentBlocks[1] && adjacentBlocks[2]){
            context.moveTo(this.squareSize*(x+1), this.squareSize*(y+1) - padding);
            context.lineTo(this.squareSize*(x+1) - padding, this.squareSize*(y+1));
        }

        if(adjacentBlocks[2] && adjacentBlocks[3]){
            context.moveTo(this.squareSize*(x) + padding, this.squareSize*(y+1));
            context.lineTo(this.squareSize*(x), this.squareSize*(y+1) - padding);
        }

        if(adjacentBlocks[3] && adjacentBlocks[0]){
            context.moveTo(this.squareSize*(x), this.squareSize*(y) + padding);
            context.lineTo(this.squareSize*(x) + padding, this.squareSize*(y));
        }


        context.lineWidth = 2;
        context.strokeStyle = '#0037ff';
        context.stroke();
    },
    draw: function(){

        this.bigFoodRadius += this.bigFoodPosition;
        if(this.bigFoodRadius > 5)
            this.bigFoodPosition = -0.5;

        if(this.bigFoodRadius < 3)
            this.bigFoodPosition = 0.5;

        for(y=0; y < this.lines; y++) {
            for (x=0; x < this.columns; x++) {

                if (this.grid[y][x] == 1) {
                    // Wall
                    this.drawWallBlock(x, y);

                } else if (this.grid[y][x] == 2) {
                    // Little Food
                    context.fillStyle = "#FFF";
                    context.fillRect((this.squareSize*x) + ((this.squareSize-this.littleFoodSize)/2), (this.squareSize*y)+((this.squareSize-this.littleFoodSize)/2), this.littleFoodSize, this.littleFoodSize);

                } else if (this.grid[y][x] == 4) {
                    // Big Food
                    var centerX = (this.squareSize*x) + ((this.squareSize)/2);
                    var centerY = (this.squareSize*y) + ((this.squareSize)/2);

                    context.beginPath();
                    context.arc(centerX, centerY, this.bigFoodRadius, 0, 2 * Math.PI, false);
                    context.fillStyle = '#FFF';
                    context.fill();

                }  else if (this.grid[y][x] == 5) {
                    // Little Food
                    context.fillStyle = "#000000";
                    context.fillRect(this.squareSize*x, this.squareSize*y,this.squareSize,this.squareSize);
                    context.fillStyle = "#FFF";
                    context.fillRect((this.squareSize*x), (this.squareSize*y)+(this.squareSize/2)-1,this.squareSize,2);

                } else if (this.grid[y][x] == 7) {
                    // Fruit
                    if (this.level == 1) {
                        this.fruitImage.src = 'img/cherry.png';
                    }
                    context.drawImage(this.fruitImage, (this.squareSize*x) + 1, (this.squareSize*y) + 1, 14, 14);

                }
            }
        }
    }
};