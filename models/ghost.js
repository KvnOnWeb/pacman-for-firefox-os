function ghost(color, size)
{
	this.size = size;
	this.positionX = 14;
	this.positionY = 15;

	this.img = new Image();
	this.etat = "normal";

	if (color == 'yellow')
		this.img.src = 'img/yellow_ghost.png';
	else if (color == 'red')
		this.img.src = 'img/red_ghost.png';
	else if (color == 'blue')
		this.img.src = 'img/blue_ghost.png';

	//context.drawImage(this.img, positionX, positionY, size, size);

	function changeEtat(etat)
	{
		this.etat = etat;
	}

	function changeImage()
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
	}
}