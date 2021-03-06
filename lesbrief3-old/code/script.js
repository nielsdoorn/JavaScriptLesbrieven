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
	if (speed > 40) {
		speed = 40;
	}
}

function down() {
	speed--;
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
      ctx.beginPath();
      ctx.moveTo(30.5, 99.5);
      ctx.lineTo(39.8, 99.5);
      ctx.lineJoin = "miter";
      ctx.miterLimit = 4.0;
      ctx.stroke();

      // layer1/Path
      ctx.beginPath();
      ctx.moveTo(21.2, 80.3);
      ctx.lineTo(13.4, 80.3);
      ctx.stroke();

      // layer1/Path
      ctx.beginPath();
      ctx.moveTo(26.2, 23.8);
      ctx.lineTo(16.2, 23.8);
      ctx.stroke();

      // layer1/Path
      ctx.beginPath();
      ctx.moveTo(16.3, 11.7);
      ctx.lineTo(8.4, 11.7);
      ctx.lineTo(8.4, 36.0);
      ctx.lineTo(16.3, 36.0);
      ctx.lineTo(16.3, 11.7);
      ctx.closePath();
      ctx.stroke();

      // layer1/Path
      ctx.beginPath();
      ctx.moveTo(13.4, 61.0);
      ctx.lineTo(0.5, 61.0);
      ctx.lineTo(0.5, 99.5);
      ctx.lineTo(13.4, 99.5);
      ctx.lineTo(13.4, 61.0);
      ctx.closePath();
      ctx.stroke();

      // layer1/Path
      ctx.beginPath();
      ctx.moveTo(39.8, 99.5);
      ctx.lineTo(49.1, 99.5);
      ctx.lineTo(57.6, 88.1);
      ctx.lineTo(57.6, 71.0);
      ctx.lineTo(52.6, 63.1);
      ctx.lineTo(52.6, 27.7);
      ctx.lineTo(52.6, 15.6);
      ctx.lineTo(48.7, 4.7);
      ctx.lineTo(39.6, 0.5);
      ctx.lineTo(39.9, 0.5);
      ctx.lineTo(30.9, 4.7);
      ctx.lineTo(27.0, 15.6);
      ctx.lineTo(27.0, 27.7);
      ctx.lineTo(26.9, 63.1);
      ctx.lineTo(21.9, 71.0);
      ctx.lineTo(21.9, 88.1);
      ctx.lineTo(30.5, 99.5);
      ctx.fillStyle = "rgb(247, 174, 0)";
      ctx.fill();
      ctx.stroke();

      // layer1/Path
      ctx.beginPath();
      ctx.moveTo(58.4, 80.3);
      ctx.lineTo(66.2, 80.3);
      ctx.stroke();

      // layer1/Path
      ctx.beginPath();
      ctx.moveTo(53.4, 23.8);
      ctx.lineTo(63.4, 23.8);
      ctx.stroke();

      // layer1/Path
      ctx.beginPath();
      ctx.moveTo(63.3, 36.0);
      ctx.lineTo(71.1, 36.0);
      ctx.lineTo(71.1, 11.7);
      ctx.lineTo(63.3, 11.7);
      ctx.lineTo(63.3, 36.0);
      ctx.closePath();
      ctx.stroke();

      // layer1/Path
      ctx.beginPath();
      ctx.moveTo(66.2, 99.5);
      ctx.lineTo(79.1, 99.5);
      ctx.lineTo(79.1, 61.0);
      ctx.lineTo(66.2, 61.0);
      ctx.lineTo(66.2, 99.5);
      ctx.closePath();
      ctx.stroke();

      // layer1/Path
      ctx.beginPath();
      ctx.moveTo(49.3, 68.7);
      ctx.lineTo(39.9, 63.5);
      ctx.lineTo(30.6, 68.7);
      ctx.lineTo(30.6, 86.6);
      ctx.lineTo(49.3, 86.6);
      ctx.lineTo(49.3, 68.7);
      ctx.closePath();
      ctx.fillStyle = "rgb(105, 175, 34)";
      ctx.fill();
      ctx.stroke();

      // layer1/Path
      ctx.beginPath();
      ctx.moveTo(40.2, 71.9);
      ctx.bezierCurveTo(36.8, 71.9, 34.0, 74.7, 34.0, 78.1);
      ctx.bezierCurveTo(34.0, 81.6, 36.8, 84.4, 40.2, 84.4);
      ctx.bezierCurveTo(43.6, 84.4, 46.3, 81.6, 46.3, 78.1);
      ctx.bezierCurveTo(46.3, 74.7, 43.6, 71.9, 40.2, 71.9);
      ctx.closePath();
      ctx.fillStyle = "rgb(52, 71, 148)";
      ctx.fill();
      ctx.stroke();

      // layer1/Path
      ctx.beginPath();
      ctx.moveTo(37.7, 72.6);
      ctx.lineTo(37.7, 83.7);
      ctx.stroke();

      // layer1/Path
      ctx.beginPath();
      ctx.moveTo(42.7, 72.6);
      ctx.lineTo(42.7, 83.7);
      ctx.stroke();

      // layer1/Path
      ctx.beginPath();
      ctx.moveTo(13.0, 98.8);
      ctx.lineTo(0.5, 98.8);
      ctx.lineTo(0.5, 61.0);
      ctx.lineTo(13.0, 61.0);
      ctx.lineTo(13.0, 98.8);
      ctx.closePath();
      ctx.fillStyle = "rgb(230, 75, 46)";
      ctx.fill();
      ctx.stroke();

      // layer1/Path
      ctx.beginPath();
      ctx.moveTo(79.1, 99.5);
      ctx.lineTo(66.2, 99.5);
      ctx.lineTo(66.2, 61.0);
      ctx.lineTo(79.1, 61.0);
      ctx.lineTo(79.1, 99.5);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      // layer1/Path
      ctx.beginPath();
      ctx.moveTo(8.4, 11.7);
      ctx.lineTo(16.3, 11.7);
      ctx.lineTo(16.3, 36.0);
      ctx.lineTo(8.4, 36.0);
      ctx.lineTo(8.4, 11.7);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      // layer1/Path
      ctx.beginPath();
      ctx.moveTo(71.1, 35.4);
      ctx.lineTo(63.3, 35.4);
      ctx.lineTo(63.3, 11.7);
      ctx.lineTo(71.1, 11.7);
      ctx.lineTo(71.1, 35.4);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      // layer1/Path
      ctx.beginPath();
      ctx.moveTo(52.9, 52.1);
      ctx.lineTo(27.0, 58.7);
      ctx.lineTo(26.8, 53.6);
      ctx.lineTo(52.9, 47.2);
      ctx.lineTo(52.9, 52.1);
      ctx.closePath();
      ctx.fill();

      // layer1/Path
      ctx.beginPath();
      ctx.moveTo(52.9, 45.1);
      ctx.lineTo(27.0, 51.7);
      ctx.lineTo(26.8, 46.6);
      ctx.lineTo(52.9, 40.2);
      ctx.lineTo(52.9, 45.1);
      ctx.closePath();
      ctx.fill();

	  if (speed > 20) {
		  // layer1/Path
		  ctx.beginPath();
		  ctx.moveTo(35.2, 114.5);
		  ctx.bezierCurveTo(35.2, 121.3, 34.2, 126.8, 33.0, 126.8);
		  ctx.bezierCurveTo(31.8, 126.8, 30.9, 121.3, 30.9, 114.5);
		  ctx.bezierCurveTo(30.9, 107.7, 31.8, 102.2, 33.0, 102.2);
		  ctx.bezierCurveTo(34.2, 102.2, 35.2, 107.7, 35.2, 114.5);
		  ctx.closePath();
		  gradient = ctx.createRadialGradient(33.0, 109.2, 0.0, 33.0, 109.2, 8.8);
		  gradient.addColorStop(0.00, "rgb(231, 81, 30)");
		  gradient.addColorStop(1.00, "rgb(255, 236, 0)");
		  ctx.fillStyle = gradient;
		  ctx.fill();
	
		  // layer1/Path
		  ctx.beginPath();
		  ctx.moveTo(49.3, 114.7);
		  ctx.bezierCurveTo(49.3, 121.5, 48.3, 127.0, 47.1, 127.0);
		  ctx.bezierCurveTo(45.9, 127.0, 44.9, 121.5, 44.9, 114.7);
		  ctx.bezierCurveTo(44.9, 107.9, 45.9, 102.4, 47.1, 102.4);
		  ctx.bezierCurveTo(48.3, 102.4, 49.3, 107.9, 49.3, 114.7);
		  ctx.closePath();
		  gradient = ctx.createRadialGradient(47.1, 109.4, 0.0, 47.1, 109.4, 8.8);
		  gradient.addColorStop(0.00, "rgb(231, 81, 30)");
		  gradient.addColorStop(1.00, "rgb(255, 236, 0)");
		  ctx.fillStyle = gradient;
		  ctx.fill();
	  }
      ctx.restore();
}

