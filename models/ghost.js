function ghost(color, positionX, positionY)
{
	this.color = color;
	this.positionX = positionX;
	this.positionY = positionY;

	function changePosition(positionX, positionY)
	{
		this.positionX = positionX;
		this.positionY = positionY;
	}

	function changeColor(color)
	{
		this.color = color;
	}
}