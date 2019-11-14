let d, cols, rows,
		circlesRow,
		circlesCol,
		curves,
		angle,
		canv,
		saved;



function setup() {
	canv = createCanvas(windowWidth, windowHeight);
	let p = prompt('Save table as jpg at the end?', 'yes');
	saved = p === 'yes' ? true : false;
	alert(saved)
	d = 50;
	angle = 0;
	cols = Math.floor(width / d) - 1;
	rows = Math.floor(height / d) - 1;

	circlesRow = [];
	circlesCol = [];
	curves = [];

	for (let i = 0; i < cols; i++) {
		curves[i] = [];
		for (let j = 0; j < rows; j++) {
			curves[i][j] = new Curve();
		}
	}

	for (let i = 0; i < cols; i++) {
		circlesCol.push(new Circle(i*d + d*1.5, d/2, d-10, 1+i, 'col'));
	}

	for (let i = 0; i < rows; i++) {
		circlesRow.push(new Circle(d/2, i*d + d*1.5, d-10, 1+i, 'row'));
	}

	noFill();
}



function draw() {
	background(0);

	for (let c of circlesCol) c.update();
	for (let c of circlesRow) c.update();

	for (let c of circlesCol) c.draw();
	for (let c of circlesRow) c.draw();

	for (let i = 0; i < cols; i++) {
		let x = circlesCol[i].px;
		for (let j = 0; j < rows; j++) {
			let y = circlesRow[j].py;
			curves[i][j].set(x, y);
		}
	}

	for (let c of curves)
		for (let r of c)
			r.draw();


	angle += .01;
	if (angle >= TAU) {
		noLoop();
		angle = 0;
		for (let c of curves) {
			for (let r of c) {
				r.reset();
			}
		}
		if (!saved) {
			saved = true;
			saveCanvas(canv, 'lisajure_curve_table', 'jpg');
		}
	}
}
