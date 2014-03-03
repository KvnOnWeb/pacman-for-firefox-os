function pacmanGenerator(elements, context, positionX, positionY)
{
	pacman = elements['pacman'];
	grid = elements['grid'];
    gridX = grid.gridX;
    gridY = grid.gridY;

	context.beginPath();
	context.arc(grid.gridX + grid.squareSize*positionX-6, grid.gridY + grid.squareSize*positionY-6.5, pacman.size, 0.25 * Math.PI, 1.25 * Math.PI, false);
	context.fillStyle = "rgb(255, 255, 0)";
	context.fill();
	context.beginPath();
	context.arc(grid.gridX + grid.squareSize*positionX-6, grid.gridY + grid.squareSize*positionY-6.5, pacman.size, 0.75 * Math.PI, 1.75 * Math.PI, false);
	context.fill();
	context.beginPath();
	context.arc(grid.gridX + grid.squareSize*positionX-7, grid.gridY + grid.squareSize*positionY-9.5, 2, 0, 2 * Math.PI, false);
	context.fillStyle = "rgb(0, 0, 0)";
	context.fill();
	context.closePath();
}