// JavaScript Document

// variabelen
var canvas;
// het x coordinaat van het vliegtuig
var x = 300;
// het y coordinaat van het vliegtuig
var y = 260;

yVerplaatsing = 0.0;
xVerplaatsing = 0.0;

// initiele snelheid, 0 = stilstand
var speed = 10.0;

// achtergrondplaatje wordt onderaan getekend
var bgOffsetX = 0;
var bgOffsetY = -800;
var bgImage = new Image();

// welke toets is ingedrukt?
var up = false;
var down = false;
var right = false;
var left = false;

// de hoek van het toestel
var rotation = Math.PI / 2;

function init() {	
	console.log("init");	
	// canvas met het id "game" opvragen uit HTML
	canvas = document.getElementById("game");
	// pijltjestoetsen afhandeling regelen...
	document.onkeydown = handleKeyDown;
	document.onkeyup = handleKeyUp;
	// achtergrond plaatje inladen
	bgImage.src ="sky.jpg";
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
		
		bepaalAchtergrondPositie();
		bepaalVlieghoek();
		tekenScherm();
	})();
}

// bepaal de nieuwe positie van de achtergrond
function bepaalAchtergrondPositie() {
	beta = Math.PI - (Math.PI / 2) - rotation;
	// dus daar is die sinus functie voor...
	yVerplaatsing = Math.sin(beta) * speed;
	xVerplaatsing = Math.sin(rotation) * speed;
	
	// verplaats de achtergrond
	bgOffsetY += yVerplaatsing;
	bgOffsetX -= xVerplaatsing;	
	if (bgOffsetX < -1600) {
	  bgOffsetX = 0;
    }
	if (bgOffsetX > 0) {
	  bgOffsetX = -1600;
    }
	if (bgOffsetY > 0) {
		bgOffsetY = 0;
	} else if (bgOffsetY < -1280) {
		bgOffsetY = -1280;
	}
}

// en bepaal de nieuwe hoek van het vliegtuig
function bepaalVlieghoek() {
	if (up) {
		rotation -= 0.03;
	} 
	if (down) {
		rotation += 0.03;
	}
	// de rotatie is altijd tussen de 0 en de 2 PI
	rotation = rotation % (Math.PI * 2);
}

// het tekenen van het scherm
function tekenScherm() {
	var ctx = canvas.getContext("2d");
 	// canvas leeg maken, het canvas is 800px breed en 640px hoog
	ctx.clearRect(0, 0, 800, 640);
 	// teken de bewegende achtergrond
	drawBackground(ctx);
  	// bewaar deze situatie
	ctx.save();
	// transleer de context, zodat de vliegtuig op de juiste plaats wordt getekend
	ctx.translate(x, y);
	// roteren afhankelijk van de hoek
	ctx.rotate(rotation - Math.PI / 2);
	// nog een keer transleren om het midden van het vliegtuig te corrigeren
	ctx.translate(-50, -30);
	// teken de vliegtuig
	drawVliegtuigje(ctx);
	
	ctx.restore();
}

// pijltjes toetsen
function handleKeyDown(evt) {
    evt = evt || window.event;
    switch (evt.keyCode) {
        case 37:		// pijltje links
            left = true;
            break;
		case 38:		// pijltje omhoog
			up = true;
			break;	
        case 39:		// pijltje rechts
            right = true;
            break;
		case 40:		// pijltje omlaag
			down = true;
			break;		
    }
}

// pijltjes toetsen
function handleKeyUp(evt) {
	console.log("up");
    evt = evt || window.event;
    switch (evt.keyCode) {
        case 37:		// pijltje links
            left = false;
            break;
		case 38:		// pijltje omhoog
			up = false;
			break;	
        case 39:		// pijltje rechts
            right = false;
            break;
		case 40:		// pijltje omlaag
			down = false;
			break;		
	}
}

// teken de achtergrond
function drawBackground(ctx) {
	ctx.drawImage(bgImage, bgOffsetX, bgOffsetY);
}

// vliegtuig tekenen
function drawVliegtuigje(ctx) {
	  var gradient;

      // layer1/Group
      ctx.save();

      // layer1/Group/Path
      ctx.save();
	  
      ctx.beginPath();
      ctx.moveTo(0.8, 22.0);
      ctx.lineTo(5.4, 17.3);
      ctx.lineTo(3.6, 0.6);
      ctx.lineTo(12.6, 1.8);
      ctx.lineTo(19.4, 15.5);
      ctx.lineTo(35.8, 14.2);
      ctx.lineTo(41.7, 7.4);
      ctx.lineTo(53.5, 5.5);
      ctx.lineTo(60.0, 13.1);
      ctx.lineTo(82.7, 17.5);
      ctx.lineTo(86.4, 22.1);
      ctx.lineTo(83.6, 26.8);
      ctx.lineTo(59.4, 27.3);
      ctx.lineTo(28.7, 28.0);
      ctx.lineTo(5.7, 25.4);
      ctx.lineTo(0.8, 22.0);
      ctx.closePath();
      ctx.fillStyle = "rgb(236, 236, 237)";
      ctx.fill();
      ctx.stroke();

      // layer1/Group/Path
      ctx.beginPath();
      ctx.moveTo(36.3, 23.7);
      ctx.lineTo(34.6, 20.8);
      ctx.lineTo(36.3, 17.8);
      ctx.lineTo(54.1, 18.0);
      ctx.lineTo(57.9, 20.8);
      ctx.lineTo(54.1, 23.5);
      ctx.lineTo(36.3, 23.7);
      ctx.closePath();
      ctx.fillStyle = "rgb(245, 245, 246)";
      ctx.fill();
      ctx.stroke();

      // layer1/Group/Path
      ctx.beginPath();
      ctx.moveTo(89.4, 22.6);
      ctx.bezierCurveTo(89.4, 29.5, 88.8, 35.1, 88.0, 35.1);
      ctx.bezierCurveTo(87.2, 35.1, 86.6, 29.5, 86.6, 22.6);
      ctx.bezierCurveTo(86.6, 15.6, 87.2, 10.0, 88.0, 10.0);
      ctx.bezierCurveTo(88.8, 10.0, 89.4, 15.6, 89.4, 22.6);
      ctx.closePath();
      gradient = ctx.createLinearGradient(86.6, 22.6, 89.4, 22.6);
      gradient.addColorStop(0.00, "rgb(0, 0, 0)");
      gradient.addColorStop(0.25, "rgb(0, 0, 0)");
      gradient.addColorStop(1.00, "rgb(0, 0, 0)");
      ctx.fillStyle = gradient;
      ctx.fill();
      ctx.stroke();

      // layer1/Group/Path
      ctx.beginPath();
      ctx.moveTo(40.2, 13.9);
      ctx.lineTo(43.0, 9.9);
      ctx.lineTo(53.2, 8.6);
      ctx.lineTo(57.9, 13.3);
      ctx.lineTo(40.2, 13.9);
      ctx.closePath();
      ctx.fillStyle = "rgb(0, 157, 224)";
      ctx.fill();
      ctx.stroke();

      // layer1/Group/Path
      ctx.beginPath();
      ctx.moveTo(45.5, 13.6);
      ctx.lineTo(45.5, 9.3);
      ctx.stroke();

      // layer1/Group/Path
      ctx.beginPath();
      ctx.moveTo(53.2, 13.3);
      ctx.lineTo(50.7, 8.6);
      ctx.stroke();

      // layer1/Group/ND0
      ctx.font = "5.0px 'Myriad Pro'";
      ctx.fillStyle = "rgb(0, 0, 0)";
      ctx.fillText("ND0", 6.7, 13.0);
	  
	  
      ctx.restore();
	 
      ctx.restore();
}

