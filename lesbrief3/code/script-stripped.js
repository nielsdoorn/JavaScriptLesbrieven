// variabelen
var canvas;
// het x coordinaat van de auto
var x = 205;
// het y coordinaat van de auto
var y = 450;
// initiele snelheid, 0 = stilstand
var speed = 3;
// achtergrondplaatje wordt onderaan getekend
var bgOffset = -640;
var bgImage = new Image();

function init() {	
	// canvas met het id "game" opvragen uit HTML
	canvas = document.getElementById("game");
	// pijltjestoetsen afhandeling regelen...
	document.onkeydown = handleKeyboardInput;
	// achtergrond plaatje inladen
	bgImage.src ="road.png";
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
		draw();
	})();
}


// het tekenen van het scherm
function draw() {
	var ctx = canvas.getContext("2d");
 	// canvas leeg maken, het canvas is 800px breed en 640px hoog
	ctx.clearRect(0, 0, 800, 640);
 	// teken de bewegende achtergrond
	drawBackground(ctx);
	// schrijf snelheid op het scherm omgerekend naar km/h op het canvas
	ctx.fillText("Snelheid: " + Math.round(speed * (300/40)) + " kmh", 1, 10);
  	// bewaar deze situatie
	ctx.save();
	// transleer de context, zodat de auto op de juiste plaats wordt getekend
	ctx.translate(x, y);
	// teken de auto
	drawCar(ctx);
	
	// artificial intelligence aanroepen (trillen van de auto)
	ai();
}

// pijltjes toetsen
function handleKeyboardInput(evt) {
    evt = evt || window.event;
    switch (evt.keyCode) {
		case 37:		// pijltje links
			left();
			break;
		case 38:		// pijltje omhoog
			up();
			break;	
		case 39:		// pijltje rechts
			right();
			break;
		case 40:		// pijltje omlaag
			down();
			break;		
    }
}

function left() {
	if (speed > 0) {
		x-=speed/4;
	}
}

function right() {
	if (speed > 0) {
		x+=speed/4;
	}
}

function up() {
	speed++;
	// nooit sneller dan 40
	if (speed > 40) {
		speed = 40;
	}
}

function down() {
	speed--;
	// snelheid is nooit negatief
	if (speed < 0) {
		speed = 0;
	}
}


// bewegende achtergrond tekenen
// de afbeelding van de auto is 1280px hoog,
// iedere keer wordt het plaatje verschoven,
// en als helemaal tot bovenaan is verschoven 
// opnieuw getekend
function drawBackground(ctx) {
	ctx.drawImage(bgImage,0 ,bgOffset);
    bgOffset += speed / 2;
    if (bgOffset > 0) {
	  bgOffset = -640;
    }
}

function ai() {
	// wat random trilling afhankelijk van de snelheid....
	if (speed > 4) {
		var trilling = speed / 10;
		x += -(trilling / 2) + Math.random() * trilling;
		y += -(trilling / 2) + Math.random() * trilling;
	}
}
	

// auto tekenen
function drawCar(ctx) {
	// teken op het canvas de auto
	// (weggelaten)
}