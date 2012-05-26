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
