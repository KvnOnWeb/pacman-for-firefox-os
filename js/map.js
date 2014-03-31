var map = {
    lines: 22,
    columns: 19,
    squareSize: 16,
    littleFoodSize: 1,
    grid: new Array(
        new Array(1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1),
        new Array(1, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 1),
        new Array(1, 2, 1, 1, 2, 1, 1, 1, 2, 1, 2, 1, 1, 1, 2, 1, 1, 2, 1),
        new Array(1, 2, 1, 1, 2, 1, 1, 1, 2, 1, 2, 1, 1, 1, 2, 1, 1, 2, 1),
        new Array(1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1),
        new Array(1, 2, 1, 1, 2, 1, 2, 1, 1, 1, 1, 1, 2, 1, 2, 1, 1, 2, 1),
        new Array(1, 2, 2, 2, 2, 1, 2, 2, 2, 1, 2, 2, 2, 1, 2, 2, 2, 2, 1),
        new Array(1, 1, 1, 1, 2, 1, 1, 1, 2, 1, 2, 1, 1, 1, 2, 1, 1, 1, 1),
        new Array(2, 2, 2, 1, 2, 1, 2, 2, 2, 2, 2, 2, 2, 1, 2, 1, 2, 2, 2),
        new Array(1, 1, 1, 1, 2, 1, 2, 1, 1, 2, 1, 1, 2, 1, 2, 1, 1, 1, 1),
        new Array(2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2),
        new Array(1, 1, 1, 1, 2, 1, 2, 1, 1, 1, 1, 1, 2, 1, 2, 1, 1, 1, 1),
        new Array(2, 2, 2, 1, 2, 1, 2, 2, 2, 2, 2, 2, 2, 1, 2, 1, 2, 2, 2),
        new Array(1, 1, 1, 1, 2, 1, 2, 1, 1, 1, 1, 1, 2, 1, 2, 1, 1, 1, 1),
        new Array(1, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 1),
        new Array(1, 2, 1, 1, 2, 1, 1, 1, 2, 1, 2, 1, 1, 1, 2, 1, 1, 2, 1),
        new Array(1, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 1),
        new Array(1, 1, 2, 1, 2, 1, 2, 1, 1, 1, 1, 1, 2, 1, 2, 1, 2, 1, 1),
        new Array(1, 2, 2, 2, 2, 1, 2, 2, 2, 1, 2, 2, 2, 1, 2, 2, 2, 2, 1),
        new Array(1, 2, 1, 1, 1, 1, 1, 1, 2, 1, 2, 1, 1, 1, 1, 1, 1, 2, 1),
        new Array(1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1),
        new Array(1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1)
    ),
    draw : function () {
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
                    context.fillStyle = "#454545"; // bg color
                    context.fillRect((this.squareSize*x)+((this.squareSize-this.littleFoodSize)/2), (this.squareSize*y)+((this.squareSize-this.littleFoodSize)/2),this.littleFoodSize,this.littleFoodSize); // draw a little food
                }  else {
                // Road
                    context.fillStyle = "#000000"; // bg color
                    context.fillRect(this.squareSize*x, this.squareSize*y,this.squareSize,this.squareSize); // draw a road
                }
            }
        }
    }
};