/* --- Init global variable -- */
var canvas, context, askDirection = "", lastDirection = "", token;

token = 0;

var pacman = {
  x: 152,
  y: 264,
  size: 8,
  speed: 1,
  score: 0,
  direction: 1,
  mouthOpenValue: 40,
  mouthPosition: -1,
  getPositionX: function() {
      diameter = 2 * this.size;
      posX = Math.round(this.x/diameter)-1; // Array start to 0
      return posX;
  },
  getPositionY: function() {
      diameter = 2 * this.size;
      posY = Math.round(this.y/diameter)-1; // Array start to 0
      return posY;
  },
  draw: function () {

    if (lastDirection == "")
        lastDirection = askDirection;

    if (this.mouthOpenValue <= 0)
      this.mouthPosition = 1;
    else if (this.mouthOpenValue >= 40)
      this.mouthPosition = -1;

    // Change direction coefficient
    if (lastDirection == "left" || lastDirection == "top") {
      this.direction = -1;
    } else {
      this.direction = 1;
    }

    if (token == 1) { // left
        if ((this.x%(this.size*2))-this.size != 0) {
          this.x += (this.speed * this.direction);
        } else {
          token = 0;
        }
    } else if (token == 2) { // right
        if ((this.x%(this.size*2))-this.size != 0) {
          this.x += (this.speed * this.direction);
        } else {
          token = 0;
        }
    } else if (token == 3) { // top
        if ((this.y%(this.size*2))-this.size != 0) {
          this.y += (this.speed * this.direction);
        } else {
          token = 0;
        }
    } else if (token == 4) { // bottom
        if ((this.y%(this.size*2))-this.size != 0) {
          this.y += (this.speed * this.direction);
        } else {
          token = 0;
        }
    } else {
        lastDirection = askDirection;
        if(askDirection == "left" && map.grid[this.getPositionY()][this.getPositionX()-1] != 1){
          if(map.grid[this.getPositionY()][this.getPositionX()-1] == 2 || map.grid[this.getPositionY()][this.getPositionX()-1] == 4)
          {
              this.score++;
              map.grid[this.getPositionY()][this.getPositionX()-1] = 0;
              document.getElementById('score').innerHTML = this.score;
          }
          this.x += (this.speed * this.direction);
          token = 1;
        } else if (askDirection == "right" && map.grid[this.getPositionY()][this.getPositionX()+1] != 1) {

          if(map.grid[this.getPositionY()][this.getPositionX()+1] == 2 || map.grid[this.getPositionY()][this.getPositionX()+1] == 4)
          {
              this.score++;
              map.grid[this.getPositionY()][this.getPositionX()+1] = 0;
              document.getElementById('score').innerHTML = this.score;
          }
          this.x += (this.speed * this.direction);
          token = 2;
        }
        else if(askDirection == "top" && map.grid[this.getPositionY()-1][this.getPositionX()] != 1) {

          if(map.grid[this.getPositionY()-1][this.getPositionX()] == 2 || map.grid[this.getPositionY()-1][this.getPositionX()] == 4)
          {
              this.score++;
              map.grid[this.getPositionY()-1][this.getPositionX()] = 0; 
              document.getElementById('score').innerHTML = this.score;
          }

          this.y += (this.speed * this.direction);
          token = 3;
        } else if (askDirection == "bottom" && map.grid[this.getPositionY()+1][this.getPositionX()] != 1) {

          if(map.grid[this.getPositionY()+1][this.getPositionX()] == 2 || map.grid[this.getPositionY()+1][this.getPositionX()] == 4)
          {
              this.score++;
              map.grid[this.getPositionY()+1][this.getPositionX()] = 0;
              document.getElementById('score').innerHTML = this.score;
          }
          this.y += (this.speed * this.direction);
          token = 4;
        }
    }

    this.mouthOpenValue += (5 * this.mouthPosition);

    context.beginPath();

    if (this.direction === 1) {
      if (lastDirection == "right")        
        context.arc(this.x, this.y, this.size, (Math.PI / 180) * this.mouthOpenValue, (Math.PI / 180) * (360 - this.mouthOpenValue));
      else
        context.arc(this.x, this.y, this.size, (Math.PI / 180) * (this.mouthOpenValue+90), (Math.PI / 180) * (90 - this.mouthOpenValue));
    }
    else {
      if (lastDirection == "left")
        context.arc(this.x, this.y, this.size, (Math.PI / 180) * (180 - this.mouthOpenValue), (Math.PI / 180) * (180 + this.mouthOpenValue), true);
      else
        context.arc(this.x, this.y, this.size, (Math.PI / 180) * (this.mouthOpenValue-90), (Math.PI / 180) * (-90 - this.mouthOpenValue));
    }

    context.lineTo(this.x, this.y);
    context.fillStyle = '#FF0';
    context.fill();
  }
};

var map = {
  lines: 22,
  columns: 19,
  squareSize: 16,
  littleFoodSize: 1,
  grid: new Array(
    new Array(1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1),
    new Array(1, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 1),
    new Array(1, 2, 1, 1, 2, 1, 1, 1, 2, 1, 2, 1, 1, 1, 2, 1, 1, 2, 1),
    new Array(1, 2, 1, 1, 2, 1, 1, 1, 2, 1, 2, 1, 1, 1, 2, 1, 1, 2, 1),
    new Array(1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1),
    new Array(1, 2, 1, 1, 2, 1, 2, 1, 1, 1, 1, 1, 2, 1, 2, 1, 1, 2, 1),
    new Array(1, 2, 2, 2, 2, 1, 2, 2, 2, 1, 2, 2, 2, 1, 2, 2, 2, 2, 1),
    new Array(1, 1, 1, 1, 2, 1, 1, 1, 2, 1, 2, 1, 1, 1, 2, 1, 1, 1, 1),
    new Array(2, 2, 2, 1, 2, 1, 2, 2, 2, 2, 2, 2, 2, 1, 2, 1, 2, 2, 2),
    new Array(1, 1, 1, 1, 2, 1, 2, 1, 1, 2, 1, 1, 2, 1, 2, 1, 1, 1, 1),
    new Array(2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2),
    new Array(1, 1, 1, 1, 2, 1, 2, 1, 1, 1, 1, 1, 2, 1, 2, 1, 1, 1, 1),
    new Array(2, 2, 2, 1, 2, 1, 2, 2, 2, 2, 2, 2, 2, 1, 2, 1, 2, 2, 2),
    new Array(1, 1, 1, 1, 2, 1, 2, 1, 1, 1, 1, 1, 2, 1, 2, 1, 1, 1, 1),
    new Array(1, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 1),
    new Array(1, 2, 1, 1, 2, 1, 1, 1, 2, 1, 2, 1, 1, 1, 2, 1, 1, 2, 1),
    new Array(1, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 1),
    new Array(1, 1, 2, 1, 2, 1, 2, 1, 1, 1, 1, 1, 2, 1, 2, 1, 2, 1, 1),
    new Array(1, 2, 2, 2, 2, 1, 2, 2, 2, 1, 2, 2, 2, 1, 2, 2, 2, 2, 1),
    new Array(1, 2, 1, 1, 1, 1, 1, 1, 2, 1, 2, 1, 1, 1, 1, 1, 1, 2, 1),
    new Array(1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1),
    new Array(1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1)
  ),
  draw : function () {
    for(y=0;y<this.lines;y++) // for each lines
    {
        for (x=0;x<this.columns;x++) // for each columns
        {
            if (this.grid[y][x] == 1)
            {
                context.fillStyle = "#0B3FD9"; // bg color
                context.fillRect(this.squareSize*x, this.squareSize*y,this.squareSize,this.squareSize); // draw a wall
            } else if (this.grid[y][x] == 2)
            {
                context.fillStyle = "#000000"; // bg color
                context.fillRect(this.squareSize*x, this.squareSize*y,this.squareSize,this.squareSize); // draw a road
                context.fillStyle = "#454545"; // bg color
                context.fillRect((this.squareSize*x)+((this.squareSize-this.littleFoodSize)/2), (this.squareSize*y)+((this.squareSize-this.littleFoodSize)/2),this.littleFoodSize,this.littleFoodSize); // draw a little food
            }  else
            {
                context.fillStyle = "#000000"; // bg color
                context.fillRect(this.squareSize*x, this.squareSize*y,this.squareSize,this.squareSize); // draw a road
            }
        }
    }
  }
};



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

    // add event listener for keyboard
    window.addEventListener("keydown", pacmanDirection, true);
    window.addEventListener("keyup", pacmanDirection, true);
    // launch appli
    window.requestAnimationFrame(animate);
}, false);


/* List of functions */
// animation function
function animate() {
  //pacman.x += (-5 * pacman.direction); //It was going a bit slow. I sped it up.
  context.clearRect(0, 0, canvas.width, canvas.height);
  map.draw();
  pacman.draw();
  window.requestAnimationFrame(animate);
}
// function called when user press key
function pacmanDirection (e) {
    if(e.keyCode == 38) // top
    {
        askDirection = "top";
    } else if(e.keyCode == 37) // left
    {
        askDirection = "left";       
    } else if(e.keyCode == 39) // right
    {
        askDirection = "right";
    } else if(e.keyCode == 40) // bottom
    {
        askDirection = "bottom";
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