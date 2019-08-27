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



let waveFolder = gui.addFolder('wave');

waveFolder.open();

let wave = {
	y: heightHalf,
	length: 0.02,
	amplitude: 100,
	frequency: 0.01
};


waveFolder.add(wave, 'y', 0, height);
waveFolder.add(wave, 'length', 0, 0.2);
waveFolder.add(wave, 'amplitude', -100, 300);
waveFolder.add(wave, 'frequency', -0.5, 0.5, 0.01);


let colorFolder = gui.addFolder('color');

colorFolder.open();

let color = {
	dynamic: true,
	h: 255,
	s: 50,
	l: 50
};


colorFolder.add(color, 'dynamic');
colorFolder.add(color, 'h', 0, 255);
colorFolder.add(color, 's', 0, 50);
colorFolder.add(color, 'l', 0, 100);


let backgroundFolder = gui.addFolder('background');

backgroundFolder.open();

let background = {
	clear: true,
	r: 0,
	g: 0,
	b: 0,
	a: 0.06
};


backgroundFolder.add(background, 'clear');
backgroundFolder.add(background, 'r', 0, 255);
backgroundFolder.add(background, 'g', 0, 255);
backgroundFolder.add(background, 'b', 0, 255);
backgroundFolder.add(background, 'a', 0, 1);





function loop() {
	draw();

	requestAnimationFrame(loop);
}


let frequency = 1;

function draw() {
	if (background.clear) {
		ctx.fillStyle = `rgba(${background.r}, ${background.g}, ${background.b}, ${background.a})`;
		ctx.fillRect(0, 0, width, height);
	}

	ctx.beginPath();

	for (let i = 0; i < width; i++) {
		let h;
		if (color.dynamic) {
			h = Math.abs(color.h * Math.sin(frequency));
		} else {
			h = color.h;
		}

		ctx.strokeStyle = `hsl(${h}, ${color.s}%, ${color.l}%)`;
		let y = Math.sin(i * wave.length + frequency) * wave.amplitude * Math.sin(frequency);

		ctx.lineTo(i, wave.y + y);
	}

	ctx.stroke();
	frequency += wave.frequency;
}


loop();


