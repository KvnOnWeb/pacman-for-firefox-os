var map = {
    lines: 22,
    columns: 19,
    squareSize: 16,
    littleFoodSize: 1,
    bigFoodSize: 4,
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
        new Array(1, 1, 1, 1, 2, 1, 1, 1, 2, 1, 2, 1, 1, 1, 2, 1, 1, 1, 1),
        new Array(0, 0, 0, 1, 2, 1, 2, 2, 2, 2, 2, 2, 2, 1, 2, 1, 0, 0, 0),
        new Array(1, 1, 1, 1, 2, 1, 2, 1, 1, 5, 1, 1, 2, 1, 2, 1, 1, 1, 1),
        new Array(2, 2, 2, 2, 2, 2, 2, 1, 0, 0, 0, 1, 2, 2, 2, 2, 2, 2, 2),
        new Array(1, 1, 1, 1, 2, 1, 2, 1, 1, 1, 1, 1, 2, 1, 2, 1, 1, 1, 1),
        new Array(0, 0, 0, 1, 2, 1, 2, 2, 2, 2, 2, 2, 7, 1, 2, 1, 0, 0, 0),
        new Array(1, 1, 1, 1, 2, 1, 2, 1, 1, 1, 1, 1, 2, 1, 2, 1, 1, 1, 1),
        new Array(1, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 1),
        new Array(1, 2, 1, 1, 2, 1, 1, 1, 2, 1, 2, 1, 1, 1, 2, 1, 1, 2, 1),
        new Array(1, 4, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 4, 1),
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
    draw: function () {
        for(y=0;y<this.lines;y++) {
        // for each y lines
            for (x=0;x<this.columns;x++) {
            // for each x columns
                if (this.grid[y][x] == 1) {
                // Wall
                    context.fillStyle = "#0B3FD9"; // bg color
                    context.fillRect(this.squareSize*x, this.squareSize*y,this.squareSize,this.squareSize); // draw a wall
                } else if (this.grid[y][x] == 2) {
                // Little Food
                    context.fillStyle = "#000000"; // bg color
                    context.fillRect(this.squareSize*x, this.squareSize*y,this.squareSize,this.squareSize); // draw a road
                    context.fillStyle = "#FFF"; // bg color
                    context.fillRect((this.squareSize*x)+((this.squareSize-this.littleFoodSize)/2), (this.squareSize*y)+((this.squareSize-this.littleFoodSize)/2),this.littleFoodSize,this.littleFoodSize); // draw a little food
                }  else if (this.grid[y][x] == 4) {
                // Little Food
                    context.fillStyle = "#000000"; // bg color
                    context.fillRect(this.squareSize*x, this.squareSize*y,this.squareSize,this.squareSize); // draw a road
                    context.fillStyle = "#FFF"; // bg color
                    context.fillRect((this.squareSize*x)+((this.squareSize-this.bigFoodSize)/2), (this.squareSize*y)+((this.squareSize-this.bigFoodSize)/2),this.bigFoodSize,this.bigFoodSize); // draw a little food
                }  else if (this.grid[y][x] == 5) {
                // Little Food
                    context.fillStyle = "#000000"; // bg color
                    context.fillRect(this.squareSize*x, this.squareSize*y,this.squareSize,this.squareSize); // draw a road
                    context.fillStyle = "#FFF"; // bg color
                    context.fillRect((this.squareSize*x), (this.squareSize*y)+(this.squareSize/2)-1,this.squareSize,2); // draw a little food
                } else if (this.grid[y][x] == 7) {
                //  Fruit
                    context.fillStyle = "#000000"; // bg color
                    context.fillRect(this.squareSize*x, this.squareSize*y,this.squareSize,this.squareSize);

                    if (this.level == 1) {
                        this.fruitImage.src = 'img/cherry.png';
                    }
                    context.drawImage(this.fruitImage, (this.squareSize*x), (this.squareSize*y), 16, 16);
                } else {
                // Road
                    context.fillStyle = "#000000"; // bg color
                    context.fillRect(this.squareSize*x, this.squareSize*y,this.squareSize,this.squareSize); // draw a road
                }
            }
        }
    }
};