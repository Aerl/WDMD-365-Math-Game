var $ = function (id) {
    return document.getElementById(id); 
}
window.onload = function () {
	$("button_easy").onclick = button_easy_click;
	$("button_medium").onclick = button_medium_click;
	$("button_hard").onclick = button_hard_click;
	$("button_back").onclick = button_back_click;
	$("button_main").onclick = button_back_click;
	$("button_addRed").onclick = button_addRed_click;
	$("button_addYellow").onclick = button_addYellow_click;
	$("button_addGreen").onclick = button_addGreen_click;
	$("button_addBlue").onclick = button_addBlue_click;
	$("button_removeRed").onclick = button_removeRed_click;
	$("button_removeYellow").onclick = button_removeYellow_click;
	$("button_removeGreen").onclick = button_removGreen_click;
	$("button_removeBlue").onclick = button_removBlue_click;
	$("button_next").onclick = button_next_click;
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

//--------game screen buttons click-------
var button_addRed_click = function() {
	red++;
	$("redTiles").value = red; 
	updateTotalTiles();
}
var button_addYellow_click = function() {
	yellow++;
	$("yellowTiles").value = yellow; 
	updateTotalTiles();
}
var button_addGreen_click = function() {
	green++;
	$("greenTiles").value = green; 
	updateTotalTiles();
}
var button_addBlue_click = function() {
	blue++;
	$("blueTiles").value = blue; 
	updateTotalTiles();
}
var button_removeRed_click = function() {
	red--;
	$("redTiles").value = red; 
	updateTotalTiles();
}
var button_removeYellow_click = function() {
	yellow--;
	$("yellowTiles").value = yellow; 
	updateTotalTiles();
}
var button_removGreen_click = function() {
	green--;
	$("greenTiles").value = green; 
	updateTotalTiles();
}
var button_removBlue_click = function() {
	blue--;
	$("blueTiles").value = blue; 
	updateTotalTiles();
}
function updateTotalTiles(){
	var total =  red + yellow + green + blue;
	$("rTotalTiles").value = total;
	$("yTotalTiles").value = total;
	$("gTotalTiles").value = total;
	$("bTotalTiles").value = total;
}
function button_next_click() {
	var total =  red + yellow + green + blue;
	var result = (mode != 3 ?
					(((dec1== red / total) && (dec2 == yellow / total) && (dec3 == green / total)) 
					 && (red == $("redNumerator").value && yellow == $("yellowNumerator").value && green == $("greenNumerator").value)) 
					 ? true :false
				   : 
					(((dec1== red / total) && (dec2 == yellow / total) && (dec3 == green / total) && (dec4 == blue / total)) 
					 && (red == $("redNumerator").value && yellow == $("yellowNumerator").value && green == $("greenNumerator").value && blue == $("blueNumerator").value)) 
					 ? true :false
				   );
	
	if(result)
	{
		 score++;
	}
	
	resetValues();
	++count;
	if (count>=10)
	{
		//$('mainScreen').style.visibility="hidden";
		//$('gameScreen').style.visibility="hidden";
		//$('blue').style.visibility="hidden";
		$('gameContainer').remove();

		$('scoreScreen').style.display="block";
		$("score").innerHTML = score;
		count = 0;
		score = 0 ;
	}
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
	changePicture();
}
//--------navigations click-------
var button_easy_click = function () {
	navigateScreen(button_easy_click);
	mode = 1;
	generateEasyFractions();
	changePicture();
}
var button_medium_click = function () {
	navigateScreen(button_medium_click);
	mode = 2;
	generateMediumFractions();
	changePicture();
}
var button_hard_click = function () {
	navigateScreen(button_hard_click);
	mode = 3;
	generateHardFractions();
	changePicture();
}
var button_back_click = function () {
	navigateScreen(button_back_click);
}
function navigateScreen(click) {
	if(click == button_back_click)
	{
		$('mainScreen').style.display="block";
		$('gameScreen').style.display="none";
		$('scoreScreen').style.display="none";
		$('blue').style.display="none";
		resetValues();
	}
	else
	{
		$('gameScreen').style.display="block";
		$('mainScreen').style.display="none";
		$('blue').style.display = click == button_hard_click ? "block" : "none";
		resetValues();
	}
}
//--------help methods-------
function resetValues(){
		red = 0;
		yellow = 0;
		green = 0;
		blue = 0;
		total = 0;
		$("redNumerator").value = 0;
		$("yellowNumerator").value = 0;
		$("greenNumerator").value = 0;
		$("blueNumerator").value = 0;
		$("redTiles").value = 0; 
		$("yellowTiles").value = 0;
		$("greenTiles").value = 0; 
		$("blueTiles").value = 0;
		$("rTotalTiles").value = 0;
		$("yTotalTiles").value = 0;
		$("gTotalTiles").value = 0;
		$("bTotalTiles").value = 0;
}
//--------math functions-------

//Sets the value of the decimals
function generateThreeDecimals(denominator)
{
	num1 = Math.floor(((Math.random()) * (denominator-2))+1)
	num2 = Math.floor(((Math.random()) * (denominator-1-num1))+1)
	num3 = denominator - num1 - num2;
	dec1 = num1/denominator;
	dec2 = num2/denominator;
	dec3 = num3/denominator;
}
function generateFourDecimals(denominator)
{
	num1 = Math.floor(((Math.random()) * (denominator-3))+1)
	num2 = Math.floor(((Math.random()) * (denominator-2-num1))+1)
	num3 = Math.floor(((Math.random()) * (denominator-1-num1-num2))+1)
	num4 = denominator - num1 - num2 - num3;
	dec1 = num1/denominator;
	dec2 = num2/denominator;
	dec3 = num3/denominator;
	dec4 = num4/denominator;
}

//These three print out the fractions in the textboxes
function generateEasyFractions()
{
	generateThreeDecimals(randomNumberEasy());
	
	$("task").innerHTML = "Red: " + fraction(dec1) + ", Yellow: " + fraction(dec2) + ", Green: " + fraction(dec3);
}
function generateMediumFractions()
{
	generateThreeDecimals(randomNumberMedium());
	
	$("task").innerHTML = "Red: " + fraction(dec1) + ", Yellow: " + fraction(dec2) + ", Green: " + fraction(dec3);
}
function generateHardFractions()
{
	generateFourDecimals(randomNumberHard());
	
	$("task").innerHTML = "Red: " + fraction(dec1) + ", Yellow: " + fraction(dec2) + ", Green: " + fraction(dec3) + ", Blue: " + fraction(dec4);
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
