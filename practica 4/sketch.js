


function setup(){
	createCanvas(windowWidth,windowHeight);
	
}

function draw(){
	stroke('red');
	bh(width/2,0,width/2,height);
	bh(0,height/2,width,height/2);
	bh(0,0,width,height);
	bh(0,height,width,0);
	/*

	stroke('blue');
	ecuPP(width/2,0,500,500);
	ecuPP(0,height/2,width,height/2);
	ecuPP(0,0,width,height);
	ecuPP(0,height,0,width,0);
	*/
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

function dda(x1, y1, x2, y2){
	let x = x1;
	let y = y1;
	

	const dx = x2-x1;
	const dy = y2-y1;
	const m = dy/dx;
	//pendiente +
	


	if(m > 0){
		if(m<=1){
			dx==1;
			while(x!=x2){
				point(x,y);
				x++;
				y=y+m
			}	
		} // pendiente -
	} else{
		while(x>x2){
			point(x,y);
			x--;
			y=y-m;
		}
	}

}

function bh(x1,y1,x2,y2){
	let x = x1;
	let y = y1;
	const dx = x2-x1;
	const dy = y2-y1;
	const dx2= dx*2;
	const dy2= dy*2;
	const m = dy/dx;
	var p;
	let i=0;

	if( m<=1){
		p=dy2-dx;
		while(i!=dx){
			if(p<0){
				x=x+1
				point(x,y);
				p=p+dy2;
				i++;	
			}else{
				x=x+1;
				y=y+1;
				point(x,y);
				p=p+dy2;
				i++
			}
		}
	}else if(m>=1){
		p=dx2-dy;
		while(i!=dy){
			if(p<0){
				y=y+1;
				point(x,y);
				p=p+dx2;
				i++;

			}else{
				x=x+1;
				y=y+1;
				point(x,y);
				p=p+(dx2-dy2);
				i++;
			}
		}
	}	
	noLoop();
}



