
function grid (width, height, linesNumber, columnsNumber, squareSize, littleFoodSize, bigFoodSize)
{
	this.width = width;
	this.height = height;
	this.squareSize = squareSize;
	this.littleFoodSize = littleFoodSize;
	this.bigFoodSize = bigFoodSize;
	this.linesNumber = linesNumber;
	this.columnsNumber = columnsNumber;

	this.tab = new Array();

	this.tab[0]  = new Array(2,2,2,2,2,2,2,2,2,2,2,2,1,1,2,2,2,2,2,2,2,2,2,2,2,2); // line 1
	this.tab[1]  = new Array(2,1,1,1,1,2,1,1,1,1,1,2,1,1,2,1,1,1,1,1,2,1,1,1,1,2); // line 2
	this.tab[2]  = new Array(2,1,1,1,1,2,1,1,1,1,1,2,1,1,2,1,1,1,1,1,2,1,1,1,1,2); // line 3
    this.tab[3]  = new Array(2,1,1,1,1,2,1,1,1,1,1,2,1,1,2,1,1,1,1,1,2,1,1,1,1,2); // line 4
	this.tab[4]  = new Array(2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2); // line 5
	this.tab[5]  = new Array(2,1,1,1,1,2,1,1,2,1,1,1,1,1,1,1,1,2,1,1,2,1,1,1,1,2); // line 6
	this.tab[6]  = new Array(2,1,1,1,1,2,1,1,2,1,1,1,1,1,1,1,1,2,1,1,2,1,1,1,1,2); // line 7
	this.tab[7]  = new Array(2,2,2,2,2,2,1,1,2,2,2,2,1,1,2,2,2,2,1,1,2,2,2,2,2,2); // line 8
	this.tab[8]  = new Array(1,1,1,1,1,2,1,1,1,1,1,2,1,1,2,1,1,1,1,1,2,1,1,1,1,1); // line 9 
	this.tab[9]  = new Array(1,1,1,1,1,2,1,1,1,1,1,2,1,1,2,1,1,1,1,1,2,1,1,1,1,1); // line 10
	this.tab[10] = new Array(1,1,1,1,1,2,1,1,2,2,2,2,2,2,2,2,2,2,1,1,2,1,1,1,1,1); // line 11
	this.tab[11] = new Array(1,1,1,1,1,2,1,1,2,2,2,2,2,2,2,2,2,2,1,1,2,1,1,1,1,1); // line 12
	this.tab[12] = new Array(1,1,1,1,1,2,1,1,2,1,1,1,2,2,1,1,1,2,1,1,2,1,1,1,1,1); // line 13
	this.tab[13] = new Array(1,1,1,1,1,2,1,1,2,1,2,2,2,2,2,2,1,2,1,1,2,1,1,1,1,1); // line 14
	this.tab[14] = new Array(2,2,2,2,2,2,2,2,2,1,2,2,2,2,2,2,1,2,2,2,2,2,2,2,2,2); // line 15
	this.tab[15] = new Array(1,1,1,1,1,2,1,1,2,1,1,1,1,1,1,1,1,2,1,1,2,1,1,1,1,1); // line 16
	this.tab[16] = new Array(1,1,1,1,1,2,1,1,2,1,1,1,1,1,1,1,1,2,1,1,2,1,1,1,1,1); // line 17
	this.tab[17] = new Array(1,1,1,1,1,2,1,1,2,2,2,2,2,2,2,2,2,2,1,1,2,1,1,1,1,1); // line 18
	this.tab[18] = new Array(1,1,1,1,1,2,1,1,2,1,1,1,1,1,1,1,1,2,1,1,2,1,1,1,1,1); // line 19
    this.tab[19] = new Array(2,2,2,2,2,2,2,2,2,2,2,2,1,1,2,2,2,2,2,2,2,2,2,2,2,2); // line 20
	this.tab[20] = new Array(2,1,1,1,1,2,1,1,1,1,1,2,1,1,2,1,1,1,1,1,2,1,1,1,1,2); // line 21
    this.tab[21] = new Array(2,1,1,1,1,2,1,1,1,1,1,2,1,1,2,1,1,1,1,1,2,1,1,1,1,2); // line 22
    this.tab[22] = new Array(2,2,2,1,1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1,1,2,2,2); // line 23
    this.tab[23] = new Array(1,1,2,1,1,2,1,1,2,1,1,1,1,1,1,1,1,2,1,1,2,1,1,2,1,1); // line 24
    this.tab[24] = new Array(1,1,2,1,1,2,1,1,2,1,1,1,1,1,1,1,1,2,1,1,2,1,1,2,1,1); // line 25
    this.tab[25] = new Array(2,2,2,2,2,2,1,1,2,2,2,2,1,1,2,2,2,2,1,1,2,2,2,2,2,2); // line 26
    this.tab[26] = new Array(2,1,1,1,1,1,1,1,1,1,1,2,1,1,2,1,1,1,1,1,1,1,1,1,1,2); // line 27
    this.tab[27] = new Array(2,1,1,1,1,1,1,1,1,1,1,2,1,1,2,1,1,1,1,1,1,1,1,1,1,2); // line 28
    this.tab[28] = new Array(2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2); // line 29
}

