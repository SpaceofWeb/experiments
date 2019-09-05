class Vector {
	constructor(x=0, y=0, z=0, w=0) {
		this.x = x;
		this.y = y;
		this.z = z;
		this.w = w;
	}



	add(x=0, y=0, z=0, w=0) {
		if (x instanceof Vector) {
			this.x += x.x;
			this.y += x.y;
			this.z += x.z;
			this.w += x.w;
		} else {
			this.x += x;
			this.y += y;
			this.z += z;
			this.w += w;
		}

		return this;
	}


	sub(x=0, y=0, z=0, w=0) {
		if (x instanceof Vector) {
			this.x -= x.x;
			this.y -= x.y;
			this.z -= x.z;
			this.w -= x.w;
		} else {
			this.x -= x;
			this.y -= y;
			this.z -= z;
			this.w -= w;
		}

		return this;
	}


	mult(n=1) {
		this.x *= n;
		this.y *= n;
		this.z *= n;
		this.w *= n;

		return this;
	}


	div(n=1) {
		this.x /= n;
		this.y /= n;
		this.z /= n;
		this.w /= n;

		return this;
	}


	mag() {
		return Math.sqrt(this.magSq());
	}


	magSq() {
		return this.x**2 + this.y**2 + this.z**2 + this.w**2;
	}


	copy() {
		return new Vector(this.x, this.y, this.z, this.w);
	}


	set(x=null, y=null, z=null, w=null) {
		this.x = x !== null ? x : this.x;
		this.y = y !== null ? y : this.y;
		this.z = z !== null ? z : this.z;
		this.w = w !== null ? w : this.w;

		return this;
	}


	dist(v) {
		return v.copy().sub(this).mag();
	}


	normalize() {
		let len = this.mag();

		if (len !== 0) this.mult(1 / len);

		return this;
	}


	limit(max=1) {
		let magSq = this.magSq();

		if (magSq > max**2)
			this.normalize().mult(max);

		return this;
	}


	setMag(n=1) {
		this.normalize().mult(max);

		return this;
	}


	dot(v) {
		return this.x * v.x + this.y * v.y + this.z * v.z + this.w * v.w;
	}


	toMatrix(d=4) {
		switch(d) {
			case 2:
				return new Matrix([this.x, this.y]);
				break;
			case 3:
				return new Matrix([this.x, this.y, this.z]);
				break;
			case 4:
				return new Matrix([this.x, this.y, this.z, this.w]);
				break;
		}
	}
}

