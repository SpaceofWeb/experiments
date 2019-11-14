class Circle {
	constructor(x, y, d, vel, type) {
		this.cx = x;
		this.cy = y;
		this.d = d;
		this.r = d/2;
		this.px = 0;
		this.py = 0;
		this.vel = vel;
		this.type = type;
		this.filled = false;
	}



	update() {
		let a = angle * this.vel;
		this.px = this.cx + Math.cos(-HALF_PI + a) * this.r;
		this.py = this.cy + Math.sin(-HALF_PI + a) * this.r;
	}


	draw() {
		strokeWeight(1);
		stroke(255);
		ellipse(this.cx, this.cy, this.d, this.d);
		stroke(255);
		if (this.type === 'col') {
			line(this.px, 0, this.px, height);
		} else {
			line(0, this.py, width, this.py);
		}
		strokeWeight(6);
		point(this.px, this.py);
	}
}