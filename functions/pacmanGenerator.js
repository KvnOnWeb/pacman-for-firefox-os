function pacmanGenerator(pacman, context, positionX, positionY)
{
	context.beginPath();
	context.arc(pacman.squareSize*positionX-9, pacman.squareSize*positionY-9, pacman.size, 0.25 * Math.PI, 1.25 * Math.PI, false);
	context.fillStyle = "rgb(255, 255, 0)";
	context.fill();
	context.beginPath();
	context.arc(pacman.squareSize*positionX-9, pacman.squareSize*positionY-9, pacman.size, 0.75 * Math.PI, 1.75 * Math.PI, false);
	context.fill();
	context.beginPath();
	context.arc(pacman.squareSize*positionX-9, pacman.squareSize*positionY-16, 2, 0, 2 * Math.PI, false);
	context.fillStyle = "rgb(0, 0, 0)";
	context.fill();
	context.closePath();
}