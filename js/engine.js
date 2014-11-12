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
    ghostContainer.push(new GhostRed(152, 136, 0));
    ghostContainer.push(new GhostPink(152, 168, 1));
    ghostContainer.push(new GhostBlue(136, 168, 5));
    ghostContainer.push(new GhostOrange(168, 168, 8));

    // initialize ghost
    for(var i = 0; i < ghostContainer.length; ++i){
      ghostContainer[i].initialise();
    }

    runModeChanger();

    // Time for ghost
    lastTime = new Date();
    lastTime = lastTime.getTime();

    // launch appli
    requestAnimationFrame(step);


}, false);

/* --- List of functions --- */

//modes functions

var modeTimes = [
    { time: 0, changeTo: "scatter"},
    { time: 7, changeTo: "chase"},
    { time: 20, changeTo: "scatter"},
    { time: 7, changeTo: "chase"},
    { time: 20, changeTo: "scatter"},
    { time: 5, changeTo: "chase"},
    { time: 20, changeTo: "scatter"},
    { time: 5, changeTo: "chase"},
];

var modeChangeTimer = null;
var modeChangeTimerStartTime = null;

function runModeChanger(){
    modeChangeTimerStartTime = new Date().getSeconds();
    modeChangeTimer = setTimeout(function(){
        for(var i = 0; i < ghostContainer.length; ++i){
            if(ghostContainer[i].getMode() != "idle" && ghostContainer[i].getMode() != "leave"){
                ghostContainer[i].setMode(modeTimes[0].changeTo);
            }
        }

        modeTimes.shift();
        if(modeTimes.length > 0) {
            runModeChanger();
        }

    }, modeTimes[0].time * 1000);
}

function pauseModeChanger(){
    clearTimeout(modeChangeTimer);

    var newTime = modeTimes[0].time - (new Date().getSeconds() - modeChangeTimerStartTime);
    if(newTime >= 0){
        modeTimes[0].time = newTime;
    } else {
        modeTimes[0].time = 0;
    }
}


// animation function
var fps = 30;
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

  map.draw();
  pacman.draw();

  // Draw ghosts
  for(var i = 0; i < ghostContainer.length; ++i){
    ghostContainer[i].draw();
  }

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

          ghostContainer[i].reset();
        } else {
          // Lost life
          pacman.life--;
          pacman.resetPosition();

          for(var i = 0; i < ghostContainer.length; ++i){
            ghostContainer[i].reset();
          }
        }
      }

    }
  }

    //draw targets (test)
    /*context.fillStyle = "red";
    context.fillRect(ghostContainer[0].getTarget()[1]*16, ghostContainer[0].getTarget()[0]*16, 5, 5);

    context.fillStyle = "pink";
    context.fillRect(ghostContainer[1].getTarget()[1]*16, ghostContainer[1].getTarget()[0]*16, 5, 5);

    context.fillStyle = "cyan";
    context.fillRect(ghostContainer[2].getTarget()[1]*16, ghostContainer[2].getTarget()[0]*16, 5, 5);

    context.fillStyle = "orange";
    context.fillRect(ghostContainer[3].getTarget()[1]*16, ghostContainer[3].getTarget()[0]*16, 5, 5);
    */
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
