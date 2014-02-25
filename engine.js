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

    // Direction
    var lastDirection = "";
    var askDirection = "";

    // Timing
    var oldTime = new Date();
    var newTime = new Date();
    var pacmanSpeed = 100; // milliseconds

    // add event listener for keyboard
    window.addEventListener("keydown", pacmanDirection, true);
    window.addEventListener("keyup", pacmanDirection, true);

    function animate()
    {
        newTime = new Date();
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.fillStyle = "#000000"; // bg color
        context.fillRect(0, 0, gridWidth, gridHeight);

        // draw grid
        gridGenerator(gameGrid,context);
        // draw PacMan
        pacmanGenerator(pacmanObject,context,pacmanPosX,pacmanPosY);  

        // control pacman move
        window.requestAnimFrame(function(){pacmanControl();});

        // next start of animage()
        window.requestAnimFrame(function() { animate();});     
	}

    animate(); // first start

    // Control the direction asked by User
    function pacmanControl()
    {
        if(askDirection == "" && lastDirection == "")
        {

        } else if (askDirection != "")
        {
            lastDirection = askDirection;
            if(isPossibleToMove(askDirection))
            {
                pacmanMove(askDirection);
                //numTimeOut = setTimeout(function(){pacmanMove(askDirection);},400);
            }
            // reset askDirection
            askDirection = "";
        } else if (lastDirection != "")
        {
            if(isPossibleToMove(lastDirection))
            {
                pacmanMove(lastDirection);
                //numTimeOut = setTimeout(function(){pacmanMove(lastDirection);},400);                
            }
        }     
    }

    function pacmanMove(direction)
    {
        // numbers of milliseconds
        oldTimeTmp = oldTime.getTime();
        newTimeTmp = newTime.getTime();

        switch(direction)
        {
            case "top":
                if(gameGrid.tab[pacmanPosY-2][pacmanPosX-1] != 1 && pacmanPosY >= 2 && (newTimeTmp - oldTimeTmp) > pacmanSpeed) {
                    pacmanPosY--;
                    oldTime = new Date();
                } break;
            case "left":
                if(gameGrid.tab[pacmanPosY-1][pacmanPosX-2] != 1 && pacmanPosX-2 != -1 && (newTimeTmp - oldTimeTmp) > pacmanSpeed){
                    pacmanPosX--;
                    oldTime = new Date();
                } break;
            case "right":
                if(gameGrid.tab[pacmanPosY-1][pacmanPosX] != 1 && pacmanPosX != columnsNumber && (newTimeTmp - oldTimeTmp) > pacmanSpeed) {
                    pacmanPosX++;
                    oldTime = new Date();
                } break;
            case "bottom":
                if(gameGrid.tab[pacmanPosY][pacmanPosX-1] != 1 && pacmanPosX+1 != linesNumber && (newTimeTmp - oldTimeTmp) > pacmanSpeed) {
                    pacmanPosY++;
                    oldTime = new Date();
                } break;
            default :
            break;
        }
    }

    // function called when user press key
    function pacmanDirection (e) {
        if(e.keyCode == 38 && pacmanPosY > 1) // top
        {
            askDirection = "top";
        } else if(e.keyCode == 37) // left
        {
            askDirection = "left";       
        } else if(e.keyCode == 39) // right
        {
            askDirection = "right";
        } else if(e.keyCode == 40 && pacmanPosY <= linesNumber-1) // bottom
        {
            askDirection = "bottom";
        }
    }

    function isPossibleToMove(direction)
    {
        switch(direction)
        {
            case "top":
                if(gameGrid.tab[pacmanPosY-2][pacmanPosX-1] != 1 && pacmanPosY >= 2)
                    return true; break;
            case "left":
                if(gameGrid.tab[pacmanPosY-1][pacmanPosX-2] != 1 && pacmanPosX-2 != -1)
                    return true; break;
            case "right":
                if(gameGrid.tab[pacmanPosY-1][pacmanPosX] != 1 && pacmanPosX != columnsNumber)
                    return true; break;
            case "bottom":
                if(gameGrid.tab[pacmanPosY][pacmanPosX-1] != 1 && pacmanPosX+1 != linesNumber)
                    return true; break;
            default :
                return false;
        }
        
    }
  
};

/* list of functions */
// refresh canvas for animation
window.requestAnimFrame = (function(){
    return window.requestAnimationFrame    || // Standard
        window.webkitRequestAnimationFrame || // For Chrome and Safari
        window.mozRequestAnimationFrame    || // For Firefox
        window.oRequestAnimationFrame      || // For Opera
        window.msRequestAnimationFrame     || // For Internet Explorer
        function(callback){                   // For others
            window.setTimeout(callback, 1000 / 60);
        };
})();