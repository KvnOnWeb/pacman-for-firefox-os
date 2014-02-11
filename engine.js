window.onload = function()
{
	// Récupération du canvas
    var canvas = document.getElementById('grid');
    if(!canvas)
    {
        alert("Impossible de récupérer le canvas");
        return;
    }
    // Récupération du context
    var context = canvas.getContext('2d');
    if(!context)
    {
        alert("Impossible de récupérer le context du canvas");
        return;
    }

    // Set of canvas size
    canvas.width = 520;
    canvas.height = 580;

    // Variables set
    var squareSize = 20;
    var littleFoodSize = 2;
    var bigFoodSize = 4;
    var linesNumber = 29;
    var columnsNumber = 26;

    // grid initialization
    var grille = new grid(1);
    var testX = 8;
    var testY = 8;

    var myInterval = setInterval(animate, 1000/2);
    function animate()
    {
    	context.clearRect(0, 0, canvas.width, canvas.height);


	    context.fillStyle = "#000000"; // bg color
	    context.fillRect(0,0,480,480);
	    // grid generation
	    for(y=0;y<linesNumber;y++) // for each lines
	    {
	    	for (x=0;x<columnsNumber;x++) // for each columns
	    	{
	    		if (grille.tab[y][x] == 1)
	    		{
	    			context.fillStyle = "#0B3FD9"; // bg color
	    			context.fillRect(squareSize*x,squareSize*y,squareSize,squareSize); // draw a wall
	    		} else if (grille.tab[y][x] == 2)
	    		{
	    			context.fillStyle = "#000000"; // bg color
	    			context.fillRect(squareSize*x,squareSize*y,squareSize,squareSize); // draw a road
	    			context.fillStyle = "#454545"; // bg color
	    			context.fillRect((squareSize*x)+((squareSize-littleFoodSize)/2),(squareSize*y)+((squareSize-littleFoodSize)/2),littleFoodSize,littleFoodSize); // draw a little food
	    		}  else
	    		{
	    			context.fillStyle = "#000000"; // bg color
	    			context.fillRect(squareSize*x,squareSize*y,squareSize,squareSize); // draw a road
	    		}
	    	}
	    }

	    // pacman
	    context.beginPath();
		context.arc(squareSize*testX-9, squareSize*testY-9, 10, 0.25 * Math.PI, 1.25 * Math.PI, false);
		context.fillStyle = "rgb(255, 255, 0)";
		context.fill();
		context.beginPath();
		context.arc(squareSize*testX-9, squareSize*testY-9, 10, 0.75 * Math.PI, 1.75 * Math.PI, false);
		context.fill();
		context.beginPath();
		context.arc(squareSize*testX-9, squareSize*testY-16, 2, 0, 2 * Math.PI, false);
		context.fillStyle = "rgb(0, 0, 0)";
		context.fill();
		context.closePath();

		if(testX < 15)
			testX++;
	}
};