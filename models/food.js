function food(size, positionX, positionY)
{
	this.size = size;
	this.positionX = positionX;
	this.positionY = positionY;

	function changePosition(positionX, positionY)
	{
		this.positionX = positionX;
		this.positionY = positionY;
	}

	function changeSize(size)
	{
		this.size = size;
	}
}