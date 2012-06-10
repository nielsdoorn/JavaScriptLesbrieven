// grootte van de asteroids
const BIG = 60;
const SMALL = 10;

// snelheidsfactor van de raketten
const ROCKET_SPEED = 8;

const EXPLOSION_SPEED = 16;

// variabelen
var canvas;
// het x coordinaat van het ruimteschip
var x = 400;
// het y coordinaat van het ruimteschip
var y = 320;

// richtingsvector spaceship
var richtingsVector = [0.01, 0.4];

// de hoek van het ruimteschip
var rotation = 0;

// de versnelling bij pijltje omhoog
var acceleration = 0.09;

// welke toets is ingedrukt?
var up = false;
var down = false;
var right = false;
var left = false;
var space = false;
var shift = false;

// rockets: een lijst met afgevuurde raketten
var rockets = [];
// explosion particles
var explosions = [];
// lijst met alle asteroids
var asteroids = [];

var health = 1000;
var score = 0;

function init() {	
	console.log("init");	
	// canvas met het id "game" opvragen uit HTML
	canvas = document.getElementById("game");
	// pijltjestoetsen afhandeling regelen...
	document.onkeydown = handleKeyDown;
	document.onkeyup = handleKeyUp;
	
	// aanmaken van de grote asteroids
	asteroids = [];
	for (var i = 0; i < 5; i++) {
		var asteroid = [Math.random() * 800,
						Math.random()*640,
						(Math.random()*4) - 2,
						(Math.random()*4) - 2,
						BIG,
						Math.random()*30];
		asteroids.push(asteroid);				
	}
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
		moveShip();
		moveRockets();
		moveExplosions();
		moveAsteroids();
		detectCollisions();
		cleanUp();
		tekenScherm();
	})();
}


function moveShip() {
	if (left) {
		if (shift) {
			rotation -= 0.1;
		} else {
			rotation -= 0.03;
		}
	} 
	if (right) {
		if (shift) {
			rotation += 0.1;
		} else {
			rotation += 0.03;
		}
	}
	// de rotatie is altijd tussen de 0 en de 2 PI
	// de modulo operator (%) zorgt hiervoor
	rotation = rotation % (Math.PI * 2);
	
	if (up) {
		beta = Math.PI - (Math.PI / 2) - rotation;
		richtingsVector[0] += Math.sin(rotation) * acceleration;
		richtingsVector[1] += Math.sin(beta) * acceleration;
	} 

	if (space) {
		//if (Math.round(Math.random() * 50) % 4 == 0) {
			fire();
		//}
	}
	
	x += richtingsVector[0];
	y -= richtingsVector[1];
	
	// het ruimteschip in beeld houden
	if (x < 0) {
		x = 800;
	} else if (x > 800) {
		x = 0;
	}
	if (y < 0) {
		y = 640;
	} else if (y > 640) {
		y = 0;
	}
}

function fire() {
	if (rockets.length < 50 && health > 0) {
		score--;
		var rocketRotation = rotation + (Math.random() * 0.08) - 0.04;
		var rocket = [x, y, rocketRotation, false];
		rockets.push(rocket);
	}
}

function spread() {
	if (health > 0) {
		for (var i=0; i < 100; i++) {
			var rocketRotation = i * ((Math.PI * 2) / 100);
			var rocket = [x, y, rocketRotation, false];
			rockets.push(rocket);
		}
	}
}

function explode(explosionX, explosionY) {
	if (health > 0) {
		var NUM_OF_PARTICLES = 20;
		for (var i=0; i < NUM_OF_PARTICLES; i++) {
			var explosionRotation = i * ((Math.PI * 2) / NUM_OF_PARTICLES);
			var explosion = [explosionX, explosionY, explosionRotation, 10];
			explosions.push(explosion);
		}
	}
}

function moveRockets() {
	for (var i = 0; i < rockets.length; i++) {
		var rocket = rockets[i];
		beta = Math.PI - (Math.PI / 2) - rocket[2];
		rocket[0] += Math.sin(rocket[2]) * ROCKET_SPEED;
		rocket[1] -= Math.sin(beta) * ROCKET_SPEED;
		if (rocket[0] < 0 || rocket[0] > 800 || rocket[1] < 0 || rocket[1] > 640) {
			// the rocket left the screen...
			rocket[3] = true;
		} 
	}
}

function moveExplosions() {
	for (var i = 0; i < explosions.length; i++) {
		var explosion = explosions[i];
		beta = Math.PI - (Math.PI / 2) - explosion[2];
		explosion[0] += Math.sin(explosion[2]) * EXPLOSION_SPEED;
		explosion[1] -= Math.sin(beta) * EXPLOSION_SPEED;
		explosion[3]--;
	}
}

function moveAsteroids() {
	for (var i=0; i < asteroids.length; i++) {
		var asteroid = asteroids[i];
		//	 				   x, y, xV, yV, size
		// var asteroids = [[200,200,10,10,30]];
		asteroid[0] += asteroid[2];
		asteroid[1] += asteroid[3];
		if (asteroid[0] - asteroid[4] > 800) {
			asteroid[0] = 0;
		} else if (asteroid[0] + asteroid[4] < 0) {
			asteroid[0] = 800;
		}
		if (asteroid[1] - asteroid[4] > 640) {
			asteroid[1] = 0;
		} else if (asteroid[1] + asteroid[4] < 0) {
			asteroid[1] = 640;
		}
	}
}

function detectCollisions() {
	var newAsteroids = [];
	for (var i=0; i < asteroids.length; i++) {
		var asteroid = asteroids[i];
		
		if (health > 0) {
			var distanceToSpaceShip = distance(asteroid[0], asteroid[1], x, y);
			if (distanceToSpaceShip < asteroid[4] + 10) {
				health -= 99;
				score -= 30000;
				asteroid[5]--;
			}
		}
		
		for (var j = 0; j < rockets.length; j++) {
			var rocket = rockets[j];	
			// bepaal afstand tussen rocket en asteroid
			// als kleiner dan straal: BOEM!
			var distanceToRocket = distance(asteroid[0], asteroid[1], rocket[0], rocket[1]);
			if (distanceToRocket < asteroid[4]) {
				score += 1000;
				rocket[3] = true;
				asteroid[5]--;
			}
		}
	}
}

function cleanUp() {
	var newAsteroids = [];
	for (var i=0; i < asteroids.length; i++) {
		var asteroid = asteroids[i];
		if (asteroid[5] > 0) {
			newAsteroids.push(asteroid);
		} else if (asteroid[4] == BIG) {
			// voeg nieuwe, kleine asteroids toe
			for (var j = 0; j < 40; j++) {
				var newAsteroid = [asteroid[0],
								asteroid[1],
								(Math.random()*2) - 1,
								(Math.random()*2) - 1,
								SMALL,
								Math.random() * 8];				
				newAsteroids.push(newAsteroid);				
			}
		} else {
			explode(asteroid[0], asteroid[1]);
		}
	}
	asteroids = newAsteroids;
	var newRockets = [];
	for (var i=0; i < rockets.length; i++) {
		var rocket = rockets[i];
		if (!rocket[3]) {
			newRockets.push(rocket);
		}
	}
	rockets = newRockets;
	
	var newExplosions = [];
	for (var i=0; i < explosions.length; i++) {
		var explosion = explosions[i];
		if (explosion[3] > 0) {
			newExplosions.push(explosion);
		}
	}
	explosions = newExplosions;
}

// het tekenen van het scherm
function tekenScherm() {
	var ctx = canvas.getContext("2d");
 	// canvas leeg maken, het canvas is 800px breed en 640px hoog
	ctx.clearRect(0, 0, 800, 640);
	drawRockets(ctx);
	drawExplosions(ctx);
	drawAsteroids(ctx);
	// teken de vliegtuig
	if (health > 0) {
		drawSpaceship(ctx);
	}
	ctx.fillStyle = "black";
	ctx.fillText("Score: " + score, 1, 10);
	ctx.fillText("Health: " + health, 1, 20);
}

function drawRockets(ctx) {
	for (var i = 0; i < rockets.length; i++) {
		var rocket = rockets[i];
		ctx.save();
		ctx.fillStyle = "red";
		ctx.translate(rocket[0], rocket[1]);
		ctx.rotate(rocket[2]);
		roundRect(ctx, -1, 0, 2, 14, 2);
		//ctx.stroke();
		ctx.fill();
		ctx.restore();
	}
}

function drawExplosions(ctx) {
	for (var i = 0; i < explosions.length; i++) {
		var explosion = explosions[i];
		ctx.save();
		ctx.fillStyle = "yellow";
		ctx.translate(explosion[0], explosion[1]);
		ctx.beginPath();
        ctx.moveTo(5,0);
		ctx.arc(0,0,5,0,Math.PI*2,false);
		ctx.closePath();
		ctx.stroke();
		ctx.fill();
		ctx.restore();
	}
}

// spaceship tekenen
function drawSpaceship(ctx) {
	ctx.save();
	// transleer de context, zodat de ruimteschip op de juiste plaats wordt getekend
	ctx.translate(x, y);
	
	ctx.rotate(rotation);
	// nog een keer transleren om het midden van het ruimteschip te corrigeren
	
	ctx.translate(-10, -10);
    ctx.save();
	
	ctx.save();
	ctx.beginPath();
	ctx.moveTo(0.9, 16.0);
	ctx.lineTo(9.5, 1.0);
	ctx.lineTo(18.2, 16.0);
	ctx.lineTo(0.9, 16.0);
	ctx.closePath();
	ctx.fillStyle = "orange";
	ctx.strokeStyle = "black";
	ctx.fill();
	ctx.stroke();
	
	if (up) {
	  ctx.fillStyle = "red";
	  
	  ctx.beginPath();
	  ctx.moveTo(2.8, 19.4);
	  ctx.lineTo(0.9, 16.0);
	  ctx.lineTo(4.7, 16.0);
	  ctx.lineTo(2.8, 19.4);
	  ctx.closePath();
	  ctx.fill();
	  ctx.stroke();

	  ctx.beginPath();
	  ctx.moveTo(16.3, 19.4);
	  ctx.lineTo(14.4, 16.0);
	  ctx.lineTo(18.3, 16.0);
	  ctx.lineTo(16.3, 19.4);
	  ctx.closePath();
	  ctx.fill();
	  ctx.stroke();
	}
	
	ctx.beginPath();
	ctx.moveTo(4.9, 9.0);
	ctx.bezierCurveTo(4.9, 9.0, 9.7, 1.7, 14.1, 9.0);
	ctx.stroke();
	ctx.restore();
	ctx.restore();
	
	ctx.restore();
}

function drawAsteroids(ctx) {
	for (var i=0; i < asteroids.length; i++) {
		var asteroid = asteroids[i];
		ctx.save();
		ctx.translate(asteroid[0], asteroid[1]);
		ctx.save();

		ctx.beginPath();
        ctx.moveTo(asteroid[4],0);
		ctx.arc(0,0,asteroid[4],0,Math.PI*2,false);
		ctx.stroke();
		ctx.closePath();
		if (asteroid[5] < 5) {
			ctx.fillStyle = "rgba(240,240,240,0.8)";
		} else {
			ctx.fillStyle = "rgba(120,120,120,0.8)";
		}
		ctx.fill();
		ctx.stroke();
		ctx.restore();	
		ctx.restore();
	}
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
		case 32:		// spatie
			space = true;
			break;	
		case 16:		// shift
			shift = true;
			break;	
		case 17:		// ctrl
			spread();
			break;	
    }
}

// pijltjes toetsen
function handleKeyUp(evt) {
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
		case 32:		// spatie
			space = false;
			break;
		case 16:		// shift
			shift = false;
			break;
	}
}

function distance(x1, y1, x2, y2) {
	var a = Math.abs(x1 - x2);
	var b = Math.abs(y1 - y2);
	var c = Math.sqrt(Math.pow(a,2) + Math.pow(b,2));
	return c;
}

function roundRect(ctx, x, y, width, height, radius) {
	ctx.beginPath();
	ctx.moveTo(x + radius, y);
	ctx.lineTo(x + width - radius, y);
	ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
	ctx.lineTo(x + width, y + height - radius);
	ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
	ctx.lineTo(x + radius, y + height);
	ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
	ctx.lineTo(x, y + radius);
	ctx.quadraticCurveTo(x, y, x + radius, y);
	ctx.closePath();     
}