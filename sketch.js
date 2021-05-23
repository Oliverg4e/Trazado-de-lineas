
var c1;
var c2;
var c3;
function setup(){
	createCanvas(windowWidth,windowHeight);
	stroke('red');
	strokeWeight(4);
	c1 = new Cuadro(250,500,200);
	c2 = new Cuadro(c1.x+255,500,200);
	c3 = new Cuadro(c2.x+255,500,200);
	
}

function draw(){
	
	
	//bh(0,height/2,width,height/2); horizontal
	//bh(0,0,width,height);
	//bh(0,height,width,0);
	
	c1.display();
	c2.display();
	c3.display();


	textSize(32);
	text('Bresenham', c1.x+100, c1.y-100);

	bh(c1.x,c1.y+c1.tam,c1.x+c1.tam,c1.y);

	bh(c1.x,c1.y,c1.x+c1.tam,c1.y+c1.tam);
	//ecuPP(width/2,0,width/2,height); vertical
	bh(c1.x,c1.y+c1.tam/2,c1.x+c1.tam,c1.y+c1.tam/2)

	bh(c1.x+c1.tam/2,c1.y,c1.x+c1.tam/2,c1.y+c1.tam);
	




	textSize(32);
	text('DDA', c2.x+150, c2.y-100);

	//dda(c2.x,c2.y+c2.tam,c2.x+c2.tam,c2.y); error diagonal

	dda(c2.x,c2.y,c2.x+c2.tam,c2.y+c2.tam);

	dda(c2.x,c2.y+c2.tam/2,c2.x+c2.tam,c2.y+c2.tam/2)

	dda(c2.x+c2.tam/2,c2.y,c2.x+c2.tam/2,c2.y+c2.tam);



	textSize(32);
	text('Punto pendiente', c3.x+100, c3.y-100);

	ecuPP(c3.x,c3.y+c3.tam,c3.x+c3.tam,c3.y);

	ecuPP(c3.x,c3.y,c3.x+c3.tam,c3.y+c3.tam);
	
	ecuPP(c3.x,c3.y+c3.tam/2,c3.x+c3.tam,c3.y+c3.tam/2)

	ecuPP(600,600,60,60); //error
	


	

	noLoop();
}

function ecuPP(x1, y1, x2, y2){
	let x = x1;
	let y = y1;
	let stepX=1;
	let stepY=1;
	const dx = x2-x1;
	const dy = y2-y1;

	if(dx==0){
		if(dy<0){
			stepY=-1
			while(y!=y2){
				point(x,y);
				y+=stepY;
			}
		}
	} else{
		const m = dy/dx;
		const b = y1-m*x1;

		if(dx<0){
			stepX=-1;
		}
		while(x!=x2){
			point(x,y);
			x+=stepX;
			y=m*x+b;
		}
	}
}

function dda(x1, y1, x2, y2) {
	let x = x1;
  	let y = y1;
  	const dx = x2 - x1;
 	const dy = y2 - y1;
  	const m = dy / dx;
  	const s = m >= 0 ? 1 : -1;
  //pendiente +
  	if (m <= s) {
    	while (x != x2) {
      	point(x,y);
      	x += s;
      	y = y + m * s;
    	}
  	} else { //pendiente -
    	while (y != y2) {
      	point(x,y);
      	y += s;
      	x = x + s / m;
    	}
  	}
  
}


function bh(x1, y1, x2, y2){
	var dx = Math.abs(x2 - x1);
    var sx = x1 < x2 ? 1 : -1;
    var dy = Math.abs(y2 - y1);
    var sy = y1 < y2 ? 1 : -1;
    var err = dx > dy ? dx : -dy;

	  while (x1 != x2 || y1 != y2) {
	      point(x1, y1);
	      var e2 = err;
	      if (e2 > -dx * 2) {
	          err -= dy;
	          x1 += sx;
	     }
	     if (e2 < dy * 2) {
	         err += dx;
	         y1 += sy;
	    }
	  }

}



