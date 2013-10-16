var select = function (id) {
    return document.getElementById(id); 
}
window.onload = function () {
	select("button_easy").onclick = button_easy_click;
	select("button_medium").onclick = button_medium_click;
	select("button_hard").onclick = button_hard_click;
	select("button_back").onclick = button_back_click;
	select("button_main").onclick = button_back_click;
	select("button_next").onclick = button_next_click;
}
var easy = [4,6,8];
var medium = [6,8,9,10,16];
var hard = [8,9,10,12,14,15,16];
var dec1;
var dec2;
var dec3;
var dec4;
var mode;
var red = 0;
var green = 0;
var yellow = 0;
var blue = 0;
var count = 0;
var score = 0;
var isFlower = true;
var isRobot = false;
var questions = [];

//--------game screen buttons click-------
function button_next_click() {
	red = $(".droparea > .redT").length;
	blue = $(".droparea > .blueT").length;
	yellow = $(".droparea > .yellowT").length;
	green = $(".droparea > .greenT").length;
	var total =  red + yellow + green + blue;
	var result = (mode != 3 ?
					(((dec1== red / total) && (dec2 == yellow / total) && (dec3 == green / total))) 
					 ? true :false
				   : 
					(((dec1== red / total) && (dec2 == yellow / total) && (dec3 == green / total) && (dec4 == blue / total))) 
					 ? true :false
				   );
	
	if(result)
	{
		$('#results').html("Good job! You got the last task correct!");
		//alert('correct');
		 score++;
	} else {
		$('#results').html("Sorry, you got the last task incorrect. Make sure " +
								"each color matches the fraction given!");
		//alert('incorrect');
	}
	
	resetValues();
	++count;

	$('#taskNumber').html('Task ' + (count+1) + ' / 10');
	changePicture();

	if (count>=10)
	{
		select('gameContainer').style.display="none";
		select('scoreScreen').style.display="block";
		select("score").innerHTML = score;
		
		count = 0;
		score = 0;

		$('#taskNumber').html('Task 1 / 10');
	}
	
	$(".droparea > .ss-active-child:gt(0)").remove();
	$(".droparea").trigger("ss-rearrange");
	
	switch(mode)
	{
		case 1:
		  generateEasyFractions();
		  break;
		case 2:
		  generateMediumFractions();
		  break;
		default:
		  generateHardFractions();
	}
}
//--------navigations click-------
var button_easy_click = function () {
	navigateScreen(button_easy_click);
	mode = 1;
	generateEasyFractions();
	setReward();
	changePicture();
}
var button_medium_click = function () {
	navigateScreen(button_medium_click);
	mode = 2;
	generateMediumFractions();
	setReward();
	changePicture();
}
var button_hard_click = function () {
	navigateScreen(button_hard_click);
	mode = 3;
	generateHardFractions();
	setReward();
	changePicture();
}
var button_back_click = function () {
	navigateScreen(button_back_click);
}
function navigateScreen(click) {
	if(click == button_back_click)
	{
		select('mainScreen').style.display="block";
		select('gameScreen').style.display="none";
		select('scoreScreen').style.display="none";
		$('#taskNumber').html('Task 1 / 10');
		resetValues();
	}
	else
	{
		select('gameScreen').style.display="block";
		select('mainScreen').style.display="none";
		select('gameContainer').style.display="block";
		resetValues();
		$(document).ready(function() {
		  $(".clones").shapeshift({
			  dragClone: true,
			  enableCrossDrop: false
		  });
		  $(".droparea").shapeshift({
			//colWidth: 100
		  });
		  $(".deleteContainer").shapeshift({
			autoHeight: false,
			colWidth: 80,
			enableTrash: true
		  });
		})
	}
}
//--------help methods-------
function resetValues(){
		red = 0;
		yellow = 0;
		green = 0;
		blue = 0;
		total = 0;	
}

function setReward() {
	switch($('input[name=reward]:checked').val()) {
		case "flower":
			isFlower=true;
			isRobot=false;
			break;
		case "robot":
			isFlower=false;
			isRobot=true;
			break;
		default:
			isFlower=true;
			isRobot=false;
			break;
	};
}

function changePicture() {
	var imgSrc = "images/";	
	if(isFlower){		
		imgSrc = imgSrc + "flower";
	}
	else if(isRobot)
	{
		imgSrc = imgSrc + "robot";
	}
	imgSrc = imgSrc + score + ".png";	
	document.getElementById("rewardPicture").src=imgSrc;
}
//--------math functions-------

//Sets the value of the decimals
function generateThreeDecimals(mode)
{
	var q;
	var denominator;
	do{
		if(mode==1)
			denominator = randomNumberEasy();
		else
			denominator = randomNumberMedium();
			
	num1 = Math.floor(((Math.random()) * (denominator-2))+1)
	num2 = Math.floor(((Math.random()) * (denominator-1-num1))+1)
	num3 = denominator - num1 - num2;
	dec1 = num1/denominator;
	dec2 = num2/denominator;
	dec3 = num3/denominator;
	q = new question(dec1,dec2,dec3,0);
	}while(!questionUnique(q))
	questions.push(q);
	}
	function generateFourDecimals()
	{
	var q;
	var denominator;
	do{
	denominator = randomNumberHard();
	
	num1 = Math.floor(((Math.random()) * (denominator-3))+1)
	num2 = Math.floor(((Math.random()) * (denominator-2-num1))+1)
	num3 = Math.floor(((Math.random()) * (denominator-1-num1-num2))+1)
	num4 = denominator - num1 - num2 - num3;
	dec1 = num1/denominator;
	dec2 = num2/denominator;
	dec3 = num3/denominator;
	dec4 = num4/denominator;
	q = new question(dec1,dec2,dec3,dec4);
	}while(!questionUnique(q))
	questions.push(q);
}

//These three print out the fractions in the textboxes
function generateEasyFractions()
{
	generateThreeDecimals(1);
	
	select("task").innerHTML = "Red: " + fraction(dec1) + ", Yellow: " + fraction(dec2) + ", Green: " + fraction(dec3);
}
function generateMediumFractions()
{
	generateThreeDecimals(2);
	
	select("task").innerHTML = "Red: " + fraction(dec1) + ", Yellow: " + fraction(dec2) + ", Green: " + fraction(dec3);
}
function generateHardFractions()
{
	generateFourDecimals();
	
	select("task").innerHTML = "Red: " + fraction(dec1) + ", Yellow: " + fraction(dec2) + ", Green: " + fraction(dec3) + ", Blue: " + fraction(dec4);
}

//These functions create the random numbers for the arrays.
function randomNumberEasy()
{
	var randomNum;
	
	random=Math.floor(Math.random() * 3);
	
	return easy[random];
}

function randomNumberMedium()
{
	var randomNum;
	
	random=Math.floor(Math.random() * 5);
	
	return medium[random];
}

function randomNumberHard()
{
	var randomNum;
	
	random=Math.floor(Math.random() * 7);
	
	return hard[random];
}

//taken from http://jonisalonen.com/2012/converting-decimal-numbers-to-ratios/
function fraction(x) {
    var tolerance = 1.0E-6;
    var h1=1; var h2=0;
    var k1=0; var k2=1;
    var b = x;
    do {
        var a = Math.floor(b);
        var aux = h1; h1 = a*h1+h2; h2 = aux;
        aux = k1; k1 = a*k1+k2; k2 = aux;
        b = 1/(b-a);
    } while (Math.abs(x-h1/k1) > x*tolerance);
    
    return h1+"/"+k1;
}

function question(dec1,dec2,dec3,dec4)
{
	this.dec1 = dec1;
	this.dec2 = dec2;
	this.dec3 = dec3;
	this.dec4 = dec4;
}

function questionUnique(q1)
{
	if(questions.length%10 == 0)
		questions = [];
		
	var unique = true;
	for(var i=0; i<questions.length; i++)
	{
	if(q1.dec1 == questions[i].dec1)
		if(q1.dec2 == questions[i].dec2)
		if(q1.dec3 == questions[i].dec3)
		if(q1.dec4 == questions[i].dec4)
		{
			unique = false;
			break;
		}
	}
	return unique;
}

