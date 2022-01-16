import canvasSketch from 'canvas-sketch';
//import random from 'canvas-sketch-util/random';
//import math from 'canvas-sketch-util/math';

class MirroredGrid {
    constructor(rows, cols) {
        this.rows = rows;
        this.cols = cols;
    }

    draw(context, width, height) {
        const cellWidth = width / this.rows;
        const cellHeight = height / this.cols;

        for (let i = 0; i < this.cols; ++i) {
                let col = i;
                let columnColors = [];

            // draw first half of column
            for (let j = 0; j < this.rows / 2; ++j) {
                let row = j;

                const x = cellWidth * row;
                const y = cellHeight * col;

                let cellColor = Math.random() > 0.5 ? 'black' : 'red';
                columnColors.push(cellColor);

                this.drawSquare(context, x, y, cellWidth, cellHeight, cellColor);

            }
            columnColors.reverse();
            // mirror 2nd half
            for (let j = this.rows / 2; j < this.rows; ++j) {
                let row = j;

                const x = cellWidth * row;
                const y = cellHeight * col;

                let cellColor = columnColors[row % (columnColors.length)];
                this.drawSquare(context, x, y, cellWidth, cellHeight, cellColor);
            }
        }
    }

    drawSquare(context, x, y, width, height, color) {
        context.save();
        context.translate(x, y);
        context.fillStyle = color;
        context.fillRect(0, 0, width, height);
        context.restore();
    }
};

// sketch settings
const settings = {
    dimensions: [ 1080, 1080 ],
}

// sketch
const sketch = ({context, width, height}) => {
    return ( ({context, width, height}) => {
        const grid = new MirroredGrid(20, 25);
        grid.draw(context, width, height);
    });
};

canvasSketch(sketch, settings);
