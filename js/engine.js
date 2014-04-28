/* --- Init global variable -- */
var canvas, context, askDirection = "", lastDirection = "", token = 0;

// Load event
window.addEventListener('load', function () {
    // Recovery of canvas
    canvas = document.getElementById('grid');
    if (!canvas) {
        console.assert("Canvas recovery is impossible");
        return;
    }
    // Recovery of context
    context = canvas.getContext('2d');
    if (!context) {
        console.assert("Context of cancas is impossible of recovery");
        return;
    }

    // Set of canvas size
    canvas.width = 305;
    canvas.height = 480;

    // add events listener
    window.addEventListener("keydown", pacmanDirection, true);
    window.addEventListener("keyup", pacmanDirection, true);

    // launch appli
    window.requestAnimationFrame(animate);
}, false);


/* --- List of functions --- */

// animation function
function animate() {
  context.clearRect(0, 0, canvas.width, canvas.height);
  // Draw pacman map
  map.draw();
  // Draw pacman
  pacman.draw();

  var gameTime = new Date();
  var gameStart = new Date();
  gameStart = Date.now();

  // next animation
  window.requestAnimationFrame(animate);
}

// function called when user press key
function pacmanDirection (e) {
    if(e.keyCode == 38) {
        askDirection = "top";
    } else if(e.keyCode == 37) {
        askDirection = "left";       
    } else if(e.keyCode == 39) {
        askDirection = "right";
    } else if(e.keyCode == 40) {
        askDirection = "bottom";
    }
}

// Fruits spawn in the map
  function spawnFruit (t){
    var fruit = 0;
    var fruitTime = Math.floor((7-2)*Math.random())+2
    if ((gameTime-gameStart) > fruitTime && fruit == 0){
      fruitTime = 1;
    }
  }


// refresh function for animation
window.requestAnimationFrame = (function () {
  return window.requestAnimationFrame ||
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame ||
          window.oRequestAnimationFrame ||
          window.msRequestAnimationFrame ||
          function (callback) {
            window.setTimeout(callback, 1000 / 60);
          };
})();