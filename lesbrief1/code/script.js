// JavaScript Document

window.onload = init;

function init() {
	console.log("Hallo!");
	document.getElementById('blokje').onclick=turnBlack;
}

function turnBlack() {
	console.log("klikkerdeklik");
	var blokje = document.getElementById('blokje');
	blokje.style.backgroundColor="black";
	blokje.style.color="white";
	blokje.style.top='100px';
}