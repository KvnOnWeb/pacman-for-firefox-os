function gridGenerator(elements, context)
{
    grid = elements['grid'];
    gridX = grid.gridX;
    gridY = grid.gridY;

    ghost = elements['ghost'];
    context.fillStyle = "#000000"; // bg color
    context.fillRect(gridX, gridY, grid.width, grid.height);

    // grid generation
    for(y=0;y<grid.linesNumber;y++) // for each lines
    {
        for (x=0;x<grid.columnsNumber;x++) // for each columns
        {
            if (grid.tab[y][x] == 1)
            {
                context.fillStyle = "#0B3FD9"; // bg color
                context.fillRect(gridX + grid.squareSize*x, gridY + grid.squareSize*y,grid.squareSize,grid.squareSize); // draw a wall
            } else if (grid.tab[y][x] == 2)
            {
                context.fillStyle = "#000000"; // bg color
                context.fillRect(gridX + grid.squareSize*x, gridY + grid.squareSize*y,grid.squareSize,grid.squareSize); // draw a road
                context.fillStyle = "#454545"; // bg color
                context.fillRect(gridX + (grid.squareSize*x)+((grid.squareSize-grid.littleFoodSize)/2), gridY + (grid.squareSize*y)+((grid.squareSize-grid.littleFoodSize)/2),grid.littleFoodSize,grid.littleFoodSize); // draw a little food
            }  else
            {
                context.fillStyle = "#000000"; // bg color
                context.fillRect(gridX + grid.squareSize*x, gridY + grid.squareSize*y,grid.squareSize,grid.squareSize); // draw a road
            }
        }
    }

    context.drawImage(ghost.img, gridX + grid.squareSize*ghost.positionX-ghost.size, gridY + grid.squareSize*ghost.positionY-ghost.size, ghost.size, ghost.size);
}