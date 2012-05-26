// JavaScript Document

window.onload = drawSomething;

function drawSomething() {
	var canvas = document.getElementById('speelplaats');
	
	var ctx = canvas.getContext("2d");  
	
	// hartje
	ctx.fillStyle='red';
	ctx.strokeStyle='red';
	ctx.beginPath();
	ctx.moveTo(75,40);
	ctx.bezierCurveTo(75,37,70,25,50,25);
	ctx.bezierCurveTo(20,25,20,62.5,20,62.5);
	ctx.bezierCurveTo(20,80,40,102,75,120);
	ctx.bezierCurveTo(110,102,130,80,130,62.5);
	ctx.bezierCurveTo(130,62.5,130,25,100,25);
	ctx.bezierCurveTo(85,25,75,37,75,40);
	ctx.fill();
	ctx.stroke();
	 
	// rechthoekjes 
	ctx.fillStyle = "rgb(200,0,0)";  
 	ctx.fillRect (200, 200, 55, 50);  
 	ctx.fillStyle = "rgba(0, 0, 200, 0.5)";  
	ctx.fillRect (210, 210, 55, 50); 
	
	// rondje
	
	ctx.fillStyle='white';
	ctx.strokeStyle='black';
	ctx.beginPath();
	ctx.moveTo(340,300);
	ctx.arc(300,300,40,0,Math.PI*2,false);
	ctx.stroke();
	ctx.fill();
}