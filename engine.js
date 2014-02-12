window.onload = function()
{
	// Recovery of canvas
    var canvas = document.getElementById('grid');
    if(!canvas)
    {
        console.assert("Canvas recovery is impossible");
        return;
    }
    // Recovery of context
    var context = canvas.getContext('2d');
    if(!context)
    {
        console.assert("Context of cancas is impossible of recovery");
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
    var gameGrid = new Grid(gridWidth, gridHeight, linesNumber, columnsNumber, squareSize, littleFoodSize, bigFoodSize);
    var pacmanPosX = 13;
    var pacmanPosY = 23;

    // add event listener for keyboard
    window.addEventListener("keydown", pacmanDirection, true);

    function animate()
    {
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.fillStyle = "#000000"; // bg color
        context.fillRect(0, 0, gridWidth, gridHeight);

        // draw grid
        gridGenerator(gameGrid,context);
        // draw PacMan
        pacmanGenerator(pacmanObject,context,pacmanPosX,pacmanPosY);   
        // next start of animage()
        window.requestAnimFrame(function() { animate()});     
	}

    animate(); // first start

    // function called when user press key
    function pacmanDirection (e) {
        if(e.keyCode == 38 && pacmanPosY > 1) // top
        {
            if(gameGrid.tab[pacmanPosY-2][pacmanPosX-1] != 1 && pacmanPosY >= 2)
                pacmanPosY--;  
        } else if(e.keyCode == 37) // left
        {
            if(gameGrid.tab[pacmanPosY-1][pacmanPosX-2] != 1 && pacmanPosX-2 != -1)
                pacmanPosX--;            
        } else if(e.keyCode == 39) // right
        {
            if(gameGrid.tab[pacmanPosY-1][pacmanPosX] != 1 && pacmanPosX != columnsNumber)
                pacmanPosX++;
        } else if(e.keyCode == 40 && pacmanPosY <= linesNumber-1) // bottom
        {
            if(gameGrid.tab[pacmanPosY][pacmanPosX-1] != 1 && pacmanPosX+1 != linesNumber)
                pacmanPosY++;  
        }
    }
  
};

/* list of functions */
// refresh canvas for animation
window.requestAnimFrame = (function(){
    return window.requestAnimationFrame    || // La forme standardisée
        window.webkitRequestAnimationFrame || // Pour Chrome et Safari
        window.mozRequestAnimationFrame    || // Pour Firefox
        window.oRequestAnimationFrame      || // Pour Opera
        window.msRequestAnimationFrame     || // Pour Internet Explorer
        function(callback){                   // Pour les élèves du dernier rang
            window.setTimeout(callback, 1000 / 60);
        };
})();