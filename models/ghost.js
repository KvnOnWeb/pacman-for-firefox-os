function ghost(color, size)
{
	this.size = size;
	this.positionX = 14;
	this.positionY = 15;

	this.img = new Image();
	this.etat = "normal";

	if (color == 'yellow') {
		this.img.src = 'img/yellow_ghost.png';
	} else if (color == 'red') {
		this.img.src = 'img/red_ghost.png';
	} else if (color == 'blue') {
		this.img.src = 'img/blue_ghost.png';
	}

	this.getPositionX = function () {
		return this.positionX;
	};

	this.getPositionY = function () {
		return this.positionY;
	};

	this.setPositionX = function (positionX) {
		this.positionX = positionX;
	};

	this.setPositionY = function (positionY) {
		this.positionY = positionY;
	};

	this.changeEtat = function (etat)
	{
		this.etat = etat;
	};

	this.changeImage = function ()
	{
		if(this.etat == "normal")
		{
			if (color == 'yellow')
				this.img.src = 'img/yellow_ghost.png';
			else if (color == 'red')
				this.img.src = 'img/red_ghost.png';
			else if (color == 'blue')
				this.img.src = 'img/blue_ghost.png';
		} else if (this.etat == "scared")
		{
			if (color == 'yellow')
				this.img.src = 'img/yellow_ghost.png';
			else if (color == 'red')
				this.img.src = 'img/red_ghost.png';
			else if (color == 'blue')
				this.img.src = 'img/blue_ghost.png';

		}
	};
}