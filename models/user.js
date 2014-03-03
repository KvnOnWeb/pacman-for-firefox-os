function user()
{
	this.score = 0;
	this.life = 3;

	this.setScore = function (score){
		this.score = score;
	};

	this.looseLife = function ()
	{	
		if(this.life == 1)
		{
			return 0;

		} else
		{
			this.life = this.life - 1;
		}

		return this.life;
	};
}