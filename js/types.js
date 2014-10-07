function GhostRed(_x, _y, idleTime)
{
    Ghost.call(this, "red", _x, _y, idleTime);

    this.scatterTarget = [-2, 17];
};

GhostRed.prototype = Object.create(Ghost.prototype);
GhostRed.prototype.constructor = GhostRed;

GhostRed.prototype.chooseTarget = function(){
    if(this.getMode() == "scatter"){
        this.target = this.scatterTarget;
    } else if(this.getMode() == "chase"){
        this.target = [pacman.getPositionY(), pacman.getPositionX()];
    } else if(this.getMode() == "frightened"){
        this.chooseRandomTarget();
    }

};





function GhostPink(_x, _y, idleTime)
{
    Ghost.call(this, "pink", _x, _y, idleTime);

    this.scatterTarget = [-2, 2];
};

GhostPink.prototype = Object.create(Ghost.prototype);
GhostPink.prototype.constructor = GhostPink;

GhostPink.prototype.chooseTarget = function(){
    if(this.getMode() == "scatter"){
        this.target = this.scatterTarget;
    } else if(this.getMode() == "chase"){
        this.target = [pacman.getPositionY(), pacman.getPositionX()];
        switch(pacman.getDirection()){
        case LEFT:
        	this.target[1] -= 4;
        	break;
        case RIGHT:
        	this.target[1] += 4;
        	break;
        case UP:
        	this.target[0] -= 4;
        	break;
        case DOWN:
        	this.target[0] += 4;
        	break;
        }
    } else if(this.getMode() == "frightened"){
        this.chooseRandomTarget();
    }

};




function GhostBlue(_x, _y, idleTime)
{
    Ghost.call(this, "blue", _x, _y, idleTime);

    this.scatterTarget = [23, 18];
};

GhostBlue.prototype = Object.create(Ghost.prototype);
GhostBlue.prototype.constructor = GhostBlue;

GhostBlue.prototype.chooseTarget = function(){
    if(this.getMode() == "scatter"){
        this.target = this.scatterTarget;
    } else if(this.getMode() == "chase"){
        var point = [pacman.getPositionY(), pacman.getPositionX()];
        switch(pacman.getDirection()){
        case LEFT:
        	point[1] -= 2;
        	break;
        case RIGHT:
        	point[1] += 2;
        	break;
        case UP:
        	point[0] -= 2;
        	break;
        case DOWN:
        	point[0] += 2;
        	break;
        }

        var u1 = point[0] - ghostContainer[0].getPositionY();
        var u2 = point[1] - ghostContainer[0].getPositionX();

        this.target = [
        	ghostContainer[0].getPositionY() + 2*u1,
        	ghostContainer[0].getPositionX() + 2*u2
        ];

    } else if(this.getMode() == "frightened"){
        this.chooseRandomTarget();
    }

};




function GhostOrange(_x, _y, idleTime)
{
    Ghost.call(this, "orange", _x, _y, idleTime);

    this.chaseOn = true;
    this.scatterTarget = [23, 0];
};

GhostOrange.prototype = Object.create(Ghost.prototype);
GhostOrange.prototype.constructor = GhostOrange;

GhostOrange.prototype.getDistanceToPacman = function(){
	var a = Math.abs(pacman.getPositionY() - this.getPositionY());
	var b = Math.abs(pacman.getPositionX() - this.getPositionX());

	return Math.sqrt(a*a + b*b);
};

GhostOrange.prototype.chooseTarget = function(){
    if(this.getMode() == "scatter"){
        this.target = this.scatterTarget;
    } else if(this.getMode() == "chase"){
    	if(this.getDistanceToPacman() > 8){
    		this.target = [pacman.getPositionY(), pacman.getPositionX()];
    	} else {
    		this.target = this.scatterTarget;
    	}

    } else if(this.getMode() == "frightened"){
        this.chooseRandomTarget();
    }

};
