let val = 1;
let points = [
	new Vector(-val, -val, -val, -val),
	new Vector( val, -val, -val, -val),
	new Vector( val,  val, -val, -val),
	new Vector(-val,  val, -val, -val),
	new Vector(-val, -val,  val, -val),
	new Vector( val, -val,  val, -val),
	new Vector( val,  val,  val, -val),
	new Vector(-val,  val,  val, -val),
	new Vector(-val, -val, -val,  val),
	new Vector( val, -val, -val,  val),
	new Vector( val,  val, -val,  val),
	new Vector(-val,  val, -val,  val),
	new Vector(-val, -val,  val,  val),
	new Vector( val, -val,  val,  val),
	new Vector( val,  val,  val,  val),
	new Vector(-val,  val,  val,  val),
];



let matrixXY, matrixXZ, matrixYZ, matrixZW, projection;
let rotated = [];
let angle = 0,
		distance = 3;




function setup() {
	createCanvas(windowWidth, windowHeight, WEBGL);
}



function draw() {
	background(0);
	push();
	// translate(width/2, height/2);
	// scale(1.6);
	rotateX(Math.PI/2);

	stroke(255);
	strokeWeight(10);


	matrixXY = new Matrix([
		[Math.cos(angle), -Math.sin(angle), 0, 0],
		[Math.sin(angle),  Math.cos(angle), 0, 0],
		[0, 0, 1, 0],
		[0, 0, 0, 1]
	]);

	matrixXZ = new Matrix([
		[ Math.cos(angle), 0, Math.sin(angle), 0],
		[0, 1, 0, 0],
		[-Math.sin(angle), 0, Math.cos(angle), 0],
		[0, 0, 0, 1]
	]);

	matrixYZ = new Matrix([
		[1, 0, 0, 0],
		[0, Math.cos(angle), -Math.sin(angle), 0],
		[0, Math.sin(angle),  Math.cos(angle), 0],
		[0, 0, 0, 1]
	]);

	matrixZW = new Matrix([
		[1, 0, 0, 0],
		[0, 1, 0, 0],
		[0, 0, Math.cos(angle), -Math.sin(angle)],
		[0, 0, Math.sin(angle),  Math.cos(angle)]
	]);


	let theta = map(mouseX, 0, width, 0, TWO_PI);

	staticMatrixXY = new Matrix([
		[Math.cos(Math.PI/2), -Math.sin(Math.PI/2), 0, 0],
		[Math.sin(Math.PI/2),  Math.cos(Math.PI/2), 0, 0],
		[0, 0, 1, 0],
		[0, 0, 0, 1]
	]);

	staticMatrixXZ = new Matrix([
		[ Math.cos(theta), 0, Math.sin(theta), 0],
		[0, 1, 0, 0],
		[-Math.sin(theta), 0, Math.cos(theta), 0],
		[0, 0, 0, 1]
	]);

	staticMatrixYZ = new Matrix([
		[1, 0, 0, 0],
		[0, Math.cos(theta), -Math.sin(theta), 0],
		[0, Math.sin(theta),  Math.cos(theta), 0],
		[0, 0, 0, 1]
	]);


	rotated = [];

	let i = 0;
	for (let p of points) {
		let np = p;


		np = matrixXY.mult(np.toMatrix()).toVector();
		// np = matrixXZ.mult(np.toMatrix()).toVector();
		// np = matrixYZ.mult(np.toMatrix()).toVector();
		np = matrixZW.mult(np.toMatrix()).toVector();

		// np = staticMatrixXY.mult(np.toMatrix()).toVector();
		// np = staticMatrixXZ.mult(np.toMatrix()).toVector();
		// np = staticMatrixYZ.mult(np.toMatrix()).toVector();

		let w = val / (distance - np.w);

		projection = new Matrix([
			[w, 0, 0, 0],
			[0, w, 0, 0],
			[0, 0, w, 0]
		]);

		np = projection.mult(np.toMatrix()).toVector();
		np.mult(width/4);
		// console.log(i, np);
		// noLoop()

		point(np.x, np.y, np.z);
		// text(i, np.x, np.y, np.z);
		rotated.push(np);
		i++;
	}


	stroke(255);
	strokeWeight(1);
	noFill();

	for (let i = 0; i < 4; i++) {
		drawLine(i, (i + 1) % 4);
		drawLine(i+4, (i + 1) % 4 + 4);
		drawLine(i, i+4);
		drawLine(i + 8,  8 + (i + 1) % 4);
		drawLine(i + 12, 8 + (i + 1) % 4 + 4);
		drawLine(i + 8,  8 + i+4);
	}

	for (let i = 0; i < 8; i++) {
		drawLine(i,  i + 8);
	}


	pop();
	// angle = map(mouseX, 0, width, 0, TWO_PI);
	angle += 0.008;
}




function drawLine(i, j) {
	line(rotated[i].x, rotated[i].y, rotated[i].z, rotated[j].x, rotated[j].y, rotated[j].z)
}




