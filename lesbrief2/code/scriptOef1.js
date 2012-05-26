// JavaScript Document

window.onload = init;

function init() {
	var container = document.getElementById('container');
	
	var blokjes = document.getElementsByClassName('blokje');
	for (var i = 0; i < blokjes.length; i++) {  
		var blokje = blokjes[i];
		console.log(blokje.id);
	} 
}