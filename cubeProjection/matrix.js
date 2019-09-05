class Matrix {
	constructor(arr) {
		this.data = arr;
		this.rows = this.data.length;
		this.cols = this.data[0] instanceof Array ? this.data[0].length : null;
	}

	
	mult(m) {
		if (this.cols !== m.rows) throw new Error(`Cols in the first matrix need to be equal to rows second matrix`);

		let m1 = this.data,
				m2 = m.data,
				arr = [];

		if (m2[0] instanceof Array) {

			for (let i = 0; i < m1.length; i++) {
				arr[i] = [];

				for (let j = 0; j < m1[i].length; j++) {

					for (let k = 0; k < m2[0].length; k++) {

						if (typeof arr[i][k] !== 'number') arr[i][k] = 0;

						arr[i][k] += m1[i][j] * m2[j][k];
					}
				}
			}

		} else {

			for (let i = 0; i < m1.length; i++) {
				let sum = 0;

				for (let j = 0; j < m1[i].length; j++) {
					sum += m1[i][j] * m2[j];
				}

				arr.push(sum);
			}

		}


		return new Matrix(arr);
	}


	toVector() {
		if (this.rows > 4) throw new Error(`Matrix can't be larger than 4`);
		if (this.cols !== null) throw new Error(`Matrix must be a one dimentional array`);

		return new Vector(...this.data);
	}
}








