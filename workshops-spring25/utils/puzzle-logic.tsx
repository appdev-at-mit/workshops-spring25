// this file contains a representation of a
// simple puzzle.
//
// will probably need refactoring in the future lmao

export type BoxColor = 'white' | 'black';

export interface Puzzle {
	
	// todo at some point: document the rest of this

	getColor(x: number, y: number): BoxColor;

	getNumber(x: number, y: number): number|undefined;

	/*
	 * Sets the box at (x, y) to `color`, where (0, 0) is the top left.
	 * @param x the x-coordinate of the box
	 * @param y the y-coordinate of the box
	 * @param color the color to assign to the box, either 'white' or 'black'
	 */
	updatePuzzle(x: number, y: number, color: BoxColor): void;

	checkCorrect(): boolean;

    copy(): Puzzle;

}


export class NurikabePuzzle implements Puzzle {

	// zeroes are blanks, all other numbers are
	// the given numbers in the puzzle
    // numbergrid is an array of rows in the puzzle, where
    // each row is a subarray of numbers
	
	private readonly colorGrid: BoxColor[][] = new Array();
	private readonly numberGrid: number[][] = new Array();

	public constructor(
	public readonly height: number,
	public readonly width: number,
	public readonly answer: ReadonlyArray<ReadonlyArray<number>>, 
	private readonly givens: Array<{x: number, y: number, value: number}>) {

		for (let r=0; r<height; r++) {
			const colorRow = new Array(width).fill('white');
			const numberRow = new Array(width).fill(0);
			this.colorGrid.push(colorRow);
			this.numberGrid.push(numberRow);
		}

		for (const {x, y, value} of givens) {
			console.log(x, y, value);
			console.log(y, this.numberGrid[y]);
			this.numberGrid[y][x] = value;
		}
	}
	

	/**
	 * @inheritdoc
	 */
	public getColor(x: number, y: number): BoxColor {
		return this.colorGrid[y][x];
	}

	/**
	 * @inheritdoc
	 */
	public getNumber(x: number, y: number): number|undefined {
		const num = this.numberGrid[y][x];
		return (num !== 0) ? num : undefined;
	}

	/**
	 * @inheritdoc
	 */
	public updatePuzzle(x: number, y: number, color: BoxColor): void {
		this.colorGrid[y][x] = color;
	}

	/**
	 * @inheritdoc
	 */
	public checkCorrect() {
		for (const [y, row] of this.colorGrid.entries()){
			for (const [x, value] of row.entries()) {
				if ((this.answer[y][x] === 1) !== ("black" === value)) {
					console.log(`mismatch at row ${y}, col ${x}`);
					return false;
				}
			}
		}
		return true;
	}
    
	/**
	 * @inheritdoc
	 */
     public copy(): NurikabePuzzle {
         const puzzle = new NurikabePuzzle(this.height, this.width, this.answer, this.givens);
         for (const [y, row] of this.colorGrid.entries()) {
             for (const [x, color] of row.entries()) {
                 puzzle.updatePuzzle(x, y, color);
             }
         }
         return puzzle;
     }


}
