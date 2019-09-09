let gui = new dat.GUI;

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
let distance = 3;
let angles = {
	XY: 0,
	XZ: 0,
	YZ: 0,
	ZW: 0
};


/////////
// GUI //
/////////


let dynamicRotate = {
	XY: true,
	XZ: false,
	YZ: false,
	ZW: true
};

let dynamicRotateFolder = gui.addFolder('dynamicRotate');
dynamicRotateFolder.open();

dynamicRotateFolder.add(dynamicRotate, 'XY');
dynamicRotateFolder.add(dynamicRotate, 'XZ');
dynamicRotateFolder.add(dynamicRotate, 'YZ');
dynamicRotateFolder.add(dynamicRotate, 'ZW');



let dynamicRotateSpeed = {
	XY: 0.008,
	XZ: 0.008,
	YZ: 0.008,
	ZW: 0.008
};

let dynamicRotateSpeedFolder = gui.addFolder('dynamicRotateSpeed');
dynamicRotateSpeedFolder.open();

dynamicRotateSpeedFolder.add(dynamicRotateSpeed, 'XY', .005, .02);
dynamicRotateSpeedFolder.add(dynamicRotateSpeed, 'XZ', .005, .02);
dynamicRotateSpeedFolder.add(dynamicRotateSpeed, 'YZ', .005, .02);
dynamicRotateSpeedFolder.add(dynamicRotateSpeed, 'ZW', .005, .02);



let staticRotate = {
	XY: 0.0,
	XZ: 5.05,
	YZ: 0.0,
	ZW: 0.0
};

let staticRotateFolder = gui.addFolder('staticRotate');
staticRotateFolder.open();

let TWO_PI = Math.PI*2;

staticRotateFolder.add(staticRotate, 'XY', 0, TWO_PI);
staticRotateFolder.add(staticRotate, 'XZ', 0, TWO_PI);
staticRotateFolder.add(staticRotate, 'YZ', 0, TWO_PI);
staticRotateFolder.add(staticRotate, 'ZW', 0, TWO_PI);




//////////
// MAIN //
//////////


function setup() {
	createCanvas(windowWidth, windowHeight, WEBGL);
}


window.onresize = () => {
	resizeCanvas(window.innerWidth, window.innerHeight, WEBGL);
};



function draw() {
	background(0);
	push();
	// translate(width/2, height/2);
	// scale(1.6);
	// rotateX(Math.PI/2);

	stroke(255);
	strokeWeight(10);


	// rotation matrices
	matrixXY = new Matrix([
		[Math.cos(angles.XY), -Math.sin(angles.XY), 0, 0],
		[Math.sin(angles.XY),  Math.cos(angles.XY), 0, 0],
		[0, 0, 1, 0],
		[0, 0, 0, 1]
	]);

	matrixXZ = new Matrix([
		[ Math.cos(angles.XZ), 0, Math.sin(angles.XZ), 0],
		[0, 1, 0, 0],
		[-Math.sin(angles.XZ), 0, Math.cos(angles.XZ), 0],
		[0, 0, 0, 1]
	]);

	matrixYZ = new Matrix([
		[1, 0, 0, 0],
		[0, Math.cos(angles.YZ), -Math.sin(angles.YZ), 0],
		[0, Math.sin(angles.YZ),  Math.cos(angles.YZ), 0],
		[0, 0, 0, 1]
	]);

	matrixZW = new Matrix([
		[1, 0, 0, 0],
		[0, 1, 0, 0],
		[0, 0, Math.cos(angles.ZW), -Math.sin(angles.ZW)],
		[0, 0, Math.sin(angles.ZW),  Math.cos(angles.ZW)]
	]);



	staticMatrixXY = new Matrix([
		[Math.cos(staticRotate.XY), -Math.sin(staticRotate.XY), 0, 0],
		[Math.sin(staticRotate.XY),  Math.cos(staticRotate.XY), 0, 0],
		[0, 0, 1, 0],
		[0, 0, 0, 1]
	]);

	staticMatrixXZ = new Matrix([
		[ Math.cos(staticRotate.XZ), 0, Math.sin(staticRotate.XZ), 0],
		[0, 1, 0, 0],
		[-Math.sin(staticRotate.XZ), 0, Math.cos(staticRotate.XZ), 0],
		[0, 0, 0, 1]
	]);

	staticMatrixYZ = new Matrix([
		[1, 0, 0, 0],
		[0, Math.cos(staticRotate.YZ), -Math.sin(staticRotate.YZ), 0],
		[0, Math.sin(staticRotate.YZ),  Math.cos(staticRotate.YZ), 0],
		[0, 0, 0, 1]
	]);

	staticMatrixZW = new Matrix([
		[1, 0, 0, 0],
		[0, 1, 0, 0],
		[0, 0, Math.cos(staticRotate.ZW), -Math.sin(staticRotate.ZW)],
		[0, 0, Math.sin(staticRotate.ZW),  Math.cos(staticRotate.ZW)]
	]);



	rotated = [];

	let i = 0;
	for (let p of points) {
		let np = p;


		// rotation
		np = matrixXY.mult(np.toMatrix()).toVector();
		np = matrixXZ.mult(np.toMatrix()).toVector();
		np = matrixYZ.mult(np.toMatrix()).toVector();
		np = matrixZW.mult(np.toMatrix()).toVector();

		np = staticMatrixXY.mult(np.toMatrix()).toVector();
		np = staticMatrixXZ.mult(np.toMatrix()).toVector();
		np = staticMatrixYZ.mult(np.toMatrix()).toVector();
		np = staticMatrixZW.mult(np.toMatrix()).toVector();


		// projection
		let w = val / (distance - np.w);

		projection = new Matrix([
			[w, 0, 0, 0],
			[0, w, 0, 0],
			[0, 0, w, 0]
		]);

		np = projection.mult(np.toMatrix()).toVector();
		np.mult(width/3.5);

		point(np.x, np.y, np.z);
		rotated.push(np);
		i++;
	}


	stroke(255);
	strokeWeight(1);
	noFill();

	// draw lines between points
	for (let i = 0; i < 4; i++) {
		drawLine(i,  i + 4);
		drawLine(i, (i + 1) % 4);
		drawLine(i + 4,  4 + (i + 1) % 4);
		drawLine(i + 8,  8 + (i + 1) % 4);
		drawLine(i + 12, 8 + (i + 1) % 4 + 4);
		drawLine(i + 8,  8 +  i + 4);
	}

	for (let i = 0; i < 8; i++) {
		drawLine(i,  i + 8);
	}


	pop();

	if (dynamicRotate.XZ === true) angles.XZ += dynamicRotateSpeed.XZ;
	if (dynamicRotate.XY === true) angles.XY += dynamicRotateSpeed.XY;
	if (dynamicRotate.YZ === true) angles.YZ += dynamicRotateSpeed.YZ;
	if (dynamicRotate.ZW === true) angles.ZW += dynamicRotateSpeed.ZW;
}




function drawLine(i, j) {
	line(rotated[i].x, rotated[i].y, rotated[i].z, rotated[j].x, rotated[j].y, rotated[j].z)
}




