function pacman(size, positionX, positionY)
{
	this.size = size;
	this.positionX = positionX;
	this.positionY = positionY;

	this.getPositionX = function () {
		return this.positionX;
	}

	this.getPositionY = function () {
		return this.positionY;
	}

	this.setPositionX = function (positionX) {
		this.positionX = positionX;
	}

	this.setPositionY = function (positionY) {
		this.positionY = positionY;
	}
}