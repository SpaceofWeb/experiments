let gui = new dat.GUI();


let width = window.innerWidth;
let height = window.innerHeight;
let heightHalf = height/2;

let canvas = document.createElement('canvas');
let ctx = canvas.getContext('2d');
canvas.width = width;
canvas.height = height;

document.body.appendChild(canvas);


ctx.fillStyle = 'rgb(0, 0, 0)';
ctx.fillRect(0, 0, width, height);



window.onresize = () => {
	width = window.innerWidth;
	height = window.innerHeight;
	heightHalf = height/2;
	canvas.width = width;
	canvas.height = height;

	ctx.fillStyle = 'rgb(0, 0, 0)';
	ctx.fillRect(0, 0, width, height);
};



let canvasRotate = {
	rotating: true,
	rotatingBy: 0.01,
	rotateBy: Math.PI/2
};


let canvasRotateFolder = gui.addFolder('Canvas Rotate');
canvasRotateFolder.open();

canvasRotateFolder.add(canvasRotate, 'rotating');
canvasRotateFolder.add(canvasRotate, 'rotatingBy', 0.01, 0.1);
canvasRotateFolder.add(canvasRotate, 'rotateBy', 0, Math.PI*2);


let matrixRotate = {
	rotating: true,
	rotatingBy: 0.02,
	rotateBy: 0
};


let matrixRotateFolder = gui.addFolder('Matrix Rotate');
matrixRotateFolder.open();

matrixRotateFolder.add(matrixRotate, 'rotating');
matrixRotateFolder.add(matrixRotate, 'rotatingBy', 0.01, 0.1);
matrixRotateFolder.add(matrixRotate, 'rotateBy', 0, Math.PI*2);






let canvasRotateIterator = 0,
		matrixRotateIterator = 0;

let points = [
	[300, 300],
	[450, 300],
	[450, 400],
	[300, 400]
];


let cx = points[0][0] + (points[2][0] - points[0][0])/2;
let cy = points[0][1] + (points[2][1] - points[0][1])/2;



function rotateMatrix(a) {
	matrix = [
		[Math.cos(a), -Math.sin(a)],
		[Math.sin(a),  Math.cos(a)]
	];

	rotatePoints();
}


let matrix = [
	[0, -1],
	[1, 0]
];


let rotatedPoints = [];

function rotatePoints() {
	rotatedPoints.length = 0;

	for (let p of points) {
		rotatedPoints.push([
			cx + ((cx - p[0]) * matrix[0][0] + (cy - p[1]) * matrix[0][1]),
			cy + ((cx - p[0]) * matrix[1][0] + (cy - p[1]) * matrix[1][1])
		]);
	}
}


rotatePoints();


ctx.fillStyle = 'aqua';
ctx.strokeStyle = 'white';



function point(x, y, r) {
	ctx.beginPath();
	ctx.arc(x, y, r, 0, Math.PI*2);
	ctx.fill();
}


function loop() {
	draw();

	requestAnimationFrame(loop);
}




function draw() {
	ctx.fillStyle = 'black';
	ctx.fillRect(0, 0, width, height);

	// standart
	ctx.strokeStyle = 'white';
	ctx.beginPath();
	for (let p of points) {
		ctx.lineTo(p[0], p[1]);
	}
	ctx.closePath();
	ctx.stroke();


	// rotate by canvas
	ctx.save();
	ctx.strokeStyle = 'blue';
	ctx.fillStyle = 'aqua';

	point(cx, cy, 2);
	ctx.translate(cx, cy);
	ctx.rotate(canvasRotate.rotateBy + canvasRotateIterator);

	ctx.beginPath();
	for (let p of points) {
		ctx.lineTo(cx - p[0], cy - p[1]);
	}

	ctx.closePath();
	ctx.stroke();
	ctx.restore();


	// rotate by matrix
	ctx.strokeStyle = 'red';
	ctx.beginPath();
	for (let p of rotatedPoints) {
		ctx.lineTo(p[0], p[1]);
	}
	ctx.lineTo(rotatedPoints[0][0], rotatedPoints[0][1]);
	ctx.closePath();
	ctx.stroke();


	if (canvasRotate.rotating) {
		canvasRotateIterator += canvasRotate.rotatingBy;
	}


	if (matrixRotate.rotating) {
		matrixRotateIterator += matrixRotate.rotatingBy;
		rotateMatrix(matrixRotateIterator);
	} else {
		rotateMatrix(matrixRotate.rotateBy);
	}
}





loop();

