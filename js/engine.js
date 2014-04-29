/* --- Init global variable -- */
var canvas, context, askDirection = "", lastDirection = "", token = 0;

// For red ghost
var tokenGhostRed = 0, askDirectionGhostRed = "", lastDirectionGhostRed = "";
// For blue ghost
var tokenGhostBlue = 0, askDirectionGhostBlue = "", lastDirectionGhostBlue = "";
// For orange ghost
var tokenGhostOrange = 0, askDirectionGhostOrange = "", lastDirectionGhostOrange = "";

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

    // initialize ghost
    ghostRed.initialise();
    ghostBlue.initialise();
    ghostOrange.initialise();

    // Time for ghost
    lastTime = new Date();
    lastTime = lastTime.getTime();

    // launch appli
    window.requestAnimationFrame(animate);


}, false);

/* --- List of functions --- */

// animation function
function animate() {
  newTime = new Date();
  newTime = newTime.getTime();

  context.clearRect(0, 0, canvas.width, canvas.height);
  // Draw pacman map
  map.draw();
  // Draw pacman
  pacman.draw();

  // Draw ghosts
  ghostRed.draw();
  ghostBlue.draw();

  // After 3 seconds
  if (newTime - lastTime > 3000)
    ghostOrange.draw();

  // next animation
  if (map.end < 1) {
    alert('You win !');
  } else if((pacman.getPositionX() != ghostRed.getPositionX() || pacman.getPositionY() != ghostRed.getPositionY()) && (pacman.getPositionX() != ghostBlue.getPositionX() || pacman.getPositionY() != ghostBlue.getPositionY()) && (pacman.getPositionX() != ghostOrange.getPositionX() || pacman.getPositionY() != ghostOrange.getPositionY())) {
    window.requestAnimationFrame(animate);
  } else if (pacman.life > 1) {
    if ((pacman.getPositionX() == ghostRed.getPositionX() && pacman.getPositionY() == ghostRed.getPositionY()) && ghostRed.eatable) {
      pacman.score += 200;

      ghostRed.x = 152;
      ghostRed.y = 168;

      ghostBlue.eatable = false;
    } else if ((pacman.getPositionX() == ghostBlue.getPositionX() && pacman.getPositionY() == ghostBlue.getPositionY()) && ghostBlue.eatable) {
      pacman.score += 200;

      ghostBlue.x = 152;
      ghostBlue.y = 168;

      ghostBlue.eatable = false;
    }  else if ((pacman.getPositionX() == ghostOrange.getPositionX() && pacman.getPositionY() == ghostOrange.getPositionY()) && ghostOrange.eatable) {
      pacman.score += 200;

      ghostOrange.x = 152;
      ghostOrange.y = 168;

      ghostBlue.eatable = false;
    } else {
      // Lost life
      pacman.life--;
      // reset position
      pacman.x = 152;
      pacman.y = 264;

      ghostRed.x = 152;
      ghostRed.y = 168;

      ghostBlue.x = 152;
      ghostBlue.y = 168;

      ghostOrange.x = 152;
      ghostOrange.y = 168;
    }

    // relauch animation
    window.requestAnimationFrame(animate);
  } else {
  // Loose game
      // Draw life of pacman
      document.getElementById('life').innerHTML = this.life;
      alert("You loose !");
  }
}

// function called when user press key with keyboard
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

// Drag event (for phone)
var hammer_options = {};
$("#grid")
  .hammer(hammer_options)
  .on("dragleft", function(ev) {
    askDirection = "left";
  }).on("dragright", function(ev) {
    askDirection = "right";
  }).on("dragup", function(ev) {
    askDirection = "top";
  }).on("dragdown", function(ev) {
    askDirection = "bottom";
  });

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