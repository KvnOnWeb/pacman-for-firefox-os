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
    canvas.width = 550;
    canvas.height = 680;
    // Set of grid size
    var gridWidth = 520;
    var gridHeight = 580;

    // Variables set
    var squareSize = 20;
    var littleFoodSize = 2;
    var bigFoodSize = 4;
    var linesNumber = 29;
    var columnsNumber = 26;

    var pacmanObject = new pacman(10,20);

    // grid initialization
    var gameGrid = new grid(gridWidth, gridHeight, linesNumber, columnsNumber, squareSize, littleFoodSize, bigFoodSize);
    var testX = 8;
    var testY = 8;

    var myInterval = setInterval(animate, 1000/2);
    function animate()
    {
    	context.clearRect(0, 0, canvas.width, canvas.height);
        context.fillStyle = "#000000"; // bg color
        context.fillRect(0, 0, gridWidth, gridHeight);

        // draw grid
        gridGenerator(gameGrid,context);
        
        // draw PacMan
        pacmanGenerator(pacman,context,18,13);
	}
};