/* --- Init global variable -- */
var canvas, context;

// For time
var lastTimeEatable, newTime, lastTime;


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

    // add events listener for keyboard
    window.addEventListener("keydown", pacmanDirection, true);
    window.addEventListener("keyup", pacmanDirection, true);

    // create ghosts
    ghostContainer = new Array();
    ghostContainer.push(new Ghost("red"));
    ghostContainer.push(new Ghost("blue"));
    ghostContainer.push(new Ghost("orange"));
    ghostContainer.push(new Ghost("pink"));

    // initialize ghost
    for(var i = 0; i < ghostContainer.length; ++i){
      ghostContainer[i].initialise();
    }

    // Time for ghost
    lastTime = new Date();
    lastTime = lastTime.getTime();

    // launch appli
    requestAnimationFrame(step);


}, false);

/* --- List of functions --- */

// animation function
var fps = 60;
var now, delta;
var then = Date.now();
var interval = 1000/fps;

function step(){
  window.requestAnimationFrame(step);

    now = Date.now();
    delta = now - then;

    if (delta > interval) {
        then = now - (delta % interval);

        animate();
    }
}

function animate() {
  newTime = new Date();
  newTime = newTime.getTime();

  context.clearRect(0, 0, canvas.width, canvas.height);
  // Draw pacman map
  map.draw();
  // Draw pacman
  pacman.draw();

  // Draw ghosts
  ghostContainer[0].draw();
  ghostContainer[1].draw();

  // After 3 seconds
  if (newTime - lastTime > 3000)
    ghostContainer[2].draw();

  // After 6 seconds
  if (newTime - lastTime > 6000)
    ghostContainer[3].draw();

  // next animation
  if (map.end < 1) {
    alert('You win !');
  } else if (pacman.life <= 0) {
    // Loose game
    // Draw life of pacman
    document.getElementById('life').innerHTML = this.life;
    alert("You loose !");
  } else {
    for(var i = 0; i < ghostContainer.length; ++i){
      if ((pacman.getPositionX() == ghostContainer[i].getPositionX() && pacman.getPositionY() == ghostContainer[i].getPositionY())) {
        if(ghostContainer[i].eatable){
          pacman.score += 200;

          ghostContainer[i].x = 152;
          ghostContainer[i].y = 168;

          ghostContainer[i].eatable = false;
        } else {
          // Lost life
          pacman.life--;
          // reset position
          pacman.x = 152;
          pacman.y = 264;

          for(var i = 0; i < ghostContainer.length; ++i){
            ghostContainer[i].x = 152;
            ghostContainer[i].y = 168;
          }
        }
      }

    }
  }

}

// function called when user press key with keyboard
function pacmanDirection (e) {
    if(e.keyCode == 38) {
        pacman.setNextDirection("up");
    } else if(e.keyCode == 37) {
        pacman.setNextDirection("left");
    } else if(e.keyCode == 39) {
        pacman.setNextDirection("right");
    } else if(e.keyCode == 40) {
        pacman.setNextDirection("down");
    }
}

// Drag event (for phone)
var hammer_options = {};
$("#grid")
  .hammer(hammer_options)
  .on("dragleft", function(ev) {
    pacman.setNextDirection("left");
  }).on("dragright", function(ev) {
    pacman.setNextDirection("right");
  }).on("dragup", function(ev) {
    pacman.setNextDirection("up");
  }).on("dragdown", function(ev) {
    pacman.setNextDirection("down");
  });

// refresh function for animation
window.requestAnimationFrame = (function () {
  return (
          window.requestAnimationFrame ||
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame ||
          window.oRequestAnimationFrame ||
          window.msRequestAnimationFrame ||
          function (callback) {
            window.setTimeout(callback, 1000 / 60);
          }
    );
})();
