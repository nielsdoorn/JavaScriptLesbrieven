// variabelen
var canvas;

var x,y,rotatie,xVerplaatsing,yVerplaatsing;

function init() {	
	console.log("init");	
	// canvas met het id "game" opvragen uit HTML
	canvas = document.getElementById("game");
	
	x = canvas.width / 2;
	y = canvas.height / 2;
	rotatie = 0;
	xVerplaatsing = 1;
	yVerplaatsing = 1;
}

function initAnimation() {
	// animatie
	// vraag aan de browser om maximaal 60 fps te animeren
	window.requestAnimFrame = (function(callback){
		return window.requestAnimationFrame ||
		window.webkitRequestAnimationFrame ||
		window.mozRequestAnimationFrame ||
		window.oRequestAnimationFrame ||
		window.msRequestAnimationFrame ||
		function(callback){
			window.setTimeout(callback, 1000 / 60);
		};
	})();
	
	(function animloop(){
		requestAnimFrame(animloop);

		verplaatsBlokje();
		tekenScherm();
	})();
}

function verplaatsBlokje() {
	x = x + xVerplaatsing;
	y = y + yVerplaatsing;
	if (x < 0 || x > canvas.width) {
		xVerplaatsing = 0-xVerplaatsing;
	} 
	if (y < 0 || y > canvas.height) {
		yVerplaatsing = 0-yVerplaatsing;
	}
	rotatie = rotatie + 0.01;
	rotatie = rotatie % (Math.PI * 2);
}

// het tekenen van het scherm
function tekenScherm() {
	var ctx = canvas.getContext("2d");
 	// canvas leeg maken, het canvas is 800px breed en 640px hoog
	ctx.clearRect(0, 0, 800, 640);
	ctx.save();
	ctx.translate(x,y);
	ctx.rotate(rotatie);
	tekenBlokje(ctx);
	ctx.restore();
}

function tekenBlokje(ctx) {
	ctx.fillStyle = "red";
	ctx.fillRect(-20,-20,40,40);
}