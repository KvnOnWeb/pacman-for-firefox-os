function user()
{
	this.score = 0;
	this.life = 3;
	this.positionX = 0;
	this.positionY = 0;

	function changeScore(score)
	{
		this.score = score;
	}

	function looseLife()
	{	
		if(this.life == 1)
		{
			this.life = this.life - 1;

		} else
		{
			this.life = this.life - 1;
		}

		return this.life;
	}
}