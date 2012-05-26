// JavaScript Document
window.onload = init;

var isWit = true;

function init() {
	document.getElementById('blokje').onclick=turnBlack;
}

function turnBlack() {
	var blokje = document.getElementById('blokje');
	if (isWit == true) {
		blokje.style.backgroundColor = "black";
		blokje.style.color = "white";
		blokje.style.webkitTransform = "rotate(360deg)";
		isWit = false;
	} else {
		blokje.style.backgroundColor = "white";
		blokje.style.color = "black";
		blokje.style.webkitTransform = "rotate(-360deg)";
		isWit = true;
	}
}