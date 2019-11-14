class Curve {
	constructor() {
		this.path = new Set;
		this.current = createVector(0, 0);
		this.filled = false;
	}



	set(x, y) {
		this.current = {x, y};
		this.path.add(this.current);
	}


	reset() {
		this.path.clear();
	}


	draw() {
		strokeWeight(1);
		beginShape();
		for (let p of this.path) {
			vertex(p.x, p.y);
		}
		endShape();
		strokeWeight(6);
		point(this.current.x, this.current.y);
	}
}