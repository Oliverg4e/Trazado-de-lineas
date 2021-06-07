var c1;
var c2;
var c3;
var x;
var y;
function setup(){
	createCanvas(windowWidth,windowHeight);
	stroke('red');
	strokeWeight(4);
	c1 = new Cuadro(width/3,200,200);
	c2 = new Cuadro(c1.x+255,200,200);
	c3 = new Cuadro(c2.x+255,200,200);
	
	
}

function draw(){
	
	
	//ecuPP(0,height/2,width,height/2); 
	//bh(0,0,width,height);
	//dda(0,height,width,0);
	
	c1.display();
	c2.display();
	c3.display();

	textSize(25);
	text('Bresenham', c1.x+50, c1.y-100);

	bh(c1.x,c1.y+c1.tam,c1.x+c1.tam,c1.y);

	bh(c1.x,c1.y,c1.x+c1.tam,c1.y+c1.tam);
	//ecuPP(width/2,0,width/2,height); vertical
	bh(c1.x,c1.y+c1.tam/2,c1.x+c1.tam,c1.y+c1.tam/2)

	bh(c1.x+c1.tam/2,c1.y,c1.x+c1.tam/2,c1.y+c1.tam);
	




	textSize(25);
	text('DDA', c2.x+75, c2.y-100);

	line(c2.x,c2.y+c2.tam,c2.x+c2.tam,c2.y);

	//dda(c2.x,c2.y+c2.tam,c2.x+c2.tam,c2.y); 	 //error en diagonal inferior izquierda

	dda(c2.x,c2.y,c2.x+c2.tam,c2.y+c2.tam);

	dda(c2.x,c2.y+c2.tam/2,c2.x+c2.tam,c2.y+c2.tam/2)

	dda(c2.x+c2.tam/2,c2.y,c2.x+c2.tam/2,c2.y+c2.tam);



	textSize(25);
	text('Punto pendiente', c3.x+10, c3.y-100);

	ecuPP(c3.x,c3.y+c3.tam,c3.x+c3.tam,c3.y);

	ecuPP(c3.x,c3.y,c3.x+c3.tam,c3.y+c3.tam);
	
	ecuPP(c3.x,c3.y+c3.tam/2,c3.x+c3.tam,c3.y+c3.tam/2);

	//ecuPP(c3.x+c3.tam/2,c3.y,c3.x+c3.tam/2,c3.y+c3.tam);  por alguna razon nomfunciona la linea vertical , hay un problema con x2

	line(c3.x+c3.tam/2,c3.y,c3.x+c3.tam/2,c3.y+c3.tam)

	circulo(width/2,height/2+100,100);
	ellip(width/2+300,height/2+100,100,50);

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

function circulo( xc, yc, r){

let  p = Math.round(5/4-r);
let x=0;
let y=r;


printO(xc,x,yc,y);
while(x<y){
	x++
	if(p<0){
		p=p+2*x+1;
	}else{
		y--;
		p=p+2*(x-y)+1;
	}
	printO(xc,x,yc,y);

}
	

}

function printO(xc,x,yc,y){
  point(xc + x, yc + y);
  point(xc + x, yc - y);
  point(xc - x, yc + y);
  point(xc - x, yc - y);
  point(xc + y, yc + x);
  point(xc + y, yc - x);
  point(xc - y, yc + x);
  point(xc - y, yc - x);
}



 function ellip(xc, yc, rx, ry) {
    let x = 0;
    let y = ry;
    let px, py;
    const ry2 = ry * ry;
    const rx2 = rx * rx;
 
    let p = Math.round(ry2 - rx2 * ry + 0.25 * rx2);
    point(xc + x, yc + y);
    point(xc + x, yc - y);
    point(xc - x, yc - y);
    point(xc - x, yc + y);
  
  
    px = 0;
    py = 2 * rx2 * y;
    while (px < py) {
      x++;
      px += 2 * ry2;
      if (p < 0) {
        p += ry2 + px;
      } else {
        y--;
        py -= 2 * rx2;
        p += ry2 + px - py;
      }
    point(xc + x, yc + y);
    point(xc + x, yc - y);
    point(xc - x, yc - y);
    point(xc - x, yc + y);
    }
    p = Math.round(
      ry2 * (x + 0.5) * (x + 0.5) + rx2 * (y - 1) * (y - 1) - rx2 * ry2
    );
    while (y >= 0) {
      y--;
      py -= 2 * rx2;
      if (p > 0) {
        p = p - 2 * rx2 * y + rx2;
      } else {
        x++;
        p += 2 * ry2 * x - 2 * rx2 * y + rx2;
      }
    point(xc + x, yc + y);
    point(xc + x, yc - y);
    point(xc - x, yc - y);
    point(xc - x, yc + y);
    }
  }




