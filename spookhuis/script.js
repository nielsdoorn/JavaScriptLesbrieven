
const U = 1;
const R = 2;
const D = 4;
const L = 8;

// variabelen
var canvas;

var spookjeX = 400;
var spookjeY = 310;

var spookjeXRichting = 2;
var spookjeYRichting = 2;

var spelerX = 700;
var spelerY = 510;

// welke toets is ingedrukt?
var up = false;
var down = false;
var right = false;
var left = false;

var smell = false;


var bgImage = new Image();

function init() {
	canvas = document.getElementById("game");
	document.onkeydown = handleKeyDown;
	document.onkeyup = handleKeyUp;
	bgImage.src = "speelveld.png";
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

		tekenScherm();
	})();
}


function verplaatsSpeler(ctx) {
	if (left && !detectCollision(ctx, spelerX, spelerY, L)) {
		spelerX -= 3;
	} else if (right && !detectCollision(ctx, spelerX, spelerY, R)) {
		spelerX += 3
	}
	if (up && !detectCollision(ctx, spelerX, spelerY, U)) {
		spelerY -= 3;
	} else if (down && !detectCollision(ctx, spelerX, spelerY, D)) {
		spelerY += 3;
	}
	spelerX = spelerX > canvas.width-10 ? canvas.width-10 : spelerX;
	spelerY = spelerY > canvas.height-10 ? canvas.height-10 : spelerY;
	spelerX = spelerX < 10 ? 10 : spelerX;
	spelerY = spelerY < 10 ? 10 : spelerY;
}

function verplaatsSpookje(ctx) {
	if (distance(spelerX, spelerY, spookjeX, spookjeY) < 150) {
		smell = true;
		if (spelerX < spookjeX) {
			spookjeXRichting = -2;
		} else if (spelerX > spookjeX) {
			spookjeXRichting = 2;
		} else {
			spookjeXRichting = 0;
		}
		if (spelerY < spookjeY) {
			spookjeYRichting = -2;
		} else if (spelerY > spookjeY) {
			spookjeYRichting = 2;
		} else {
			spookjeYRichting = 0;
		}	
	} else {
		smell = false;	
	}
	if (Math.round(Math.random() * 600) == 42) {
		spookjeXRichting *= -1;
	} 
	if (Math.round(Math.random() * 600) == 42) {
		spookjeYRichting *= -1;
	}
	if (spookjeXRichting > 0 && !detectCollision(ctx, spookjeX, spookjeY, R)) {
		spookjeX += spookjeXRichting;
	} else if (spookjeXRichting < 0 && !detectCollision(ctx, spookjeX, spookjeY, L)) {
		spookjeX += spookjeXRichting;
	} else {
		spookjeXRichting *= -1;
	}
	if (spookjeYRichting > 0 && !detectCollision(ctx, spookjeX, spookjeY, D)) {
		spookjeY += spookjeYRichting;
	} else if (spookjeYRichting < 0 && !detectCollision(ctx, spookjeX, spookjeY, U)) {
		spookjeY += spookjeYRichting;
	} else {
		spookjeYRichting *= -1;
	}
	spookjeX = spookjeX > canvas.width-10 ? canvas.width-10 : spookjeX;
	spookjeY = spookjeY > canvas.height-10 ? canvas.height-10 : spookjeY;
	spookjeX = spookjeX < 10 ? 10 : spookjeX;
	spookjeY = spookjeY < 10 ? 10 : spookjeY;
}

// het tekenen van het scherm
function tekenScherm() {
	var ctx = canvas.getContext("2d");
 	// canvas leeg maken, het canvas is 800px breed en 640px hoog
	ctx.clearRect(0, 0, 800, 640);
	ctx.drawImage(bgImage, 0, 0);
	verplaatsSpeler(ctx);
	verplaatsSpookje(ctx);
	tekenSpeler(ctx);
	tekenSpookje(ctx);
}

function tekenSpeler(ctx) {
	ctx.save();
	ctx.fillStyle = "blue";
	ctx.translate(spelerX, spelerY);
	ctx.fillRect(-10,-10,20,20);
	ctx.restore();
}

function tekenSpookje(ctx) {
	ctx.save();
	if (smell) {
		ctx.fillStyle = "red";
	} else {
		ctx.fillStyle = "white";
	}
	ctx.translate(spookjeX, spookjeY);
	ctx.fillRect(-10,-10,20,20);
	ctx.restore();
}

function detectCollision(ctx, x, y, richting) {
	if (richting == U) {
		var pix = ctx.getImageData(x, y-11, 1, 1).data;
		if (pix[1] > 140) {
			return true;
		}
	}
	if (richting == R) {
		var pix = ctx.getImageData(x+11, y, 1, 1).data;
		if (pix[1] > 140) {
			return true;
		}
	}
	if (richting == D) {
		var pix = ctx.getImageData(x, y+11, 1, 1).data;
		if (pix[1] > 140) {
			return true;
		}
	}
	if (richting == L) {
		var pix = ctx.getImageData(x-11, y, 1, 1).data;
		if (pix[1] > 140) {
			return true;
		}
	}
	return false;
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
	}
}

function distance(x1, y1, x2, y2) {
	// stelling van pythagoras a^2 = b^2 + c^2
	var a = Math.abs(x1 - x2);
	var b = Math.abs(y1 - y2);
	var c = Math.sqrt(Math.pow(a,2) + Math.pow(b,2));
	return c;
}
