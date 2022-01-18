import canvasSketch from 'canvas-sketch';
//import random from 'canvas-sketch-util/random';
//import math from 'canvas-sketch-util/math';

class MirroredGrid {
    constructor() {
        this.genDimensions();
        this.genColors();
    }

    genDimensions() {
        let chance = Math.random();
        if (chance < 0.6) {
            this.rows = 10;
            this.cols = 10;
        } else if (chance < 0.9) {
            this.rows = 20;
            this.cols = 20;
            if (Math.random < 0.3) {
                this.cols = 25;
            }
        } else {
            this.rows = 30;
            this.cols = 30;
        }
    }

    genColors() {
        this.colors = ['red', 'black', 'orange'];
        /*
        this.colors = [this.genColor(), this.genColor()];
        if (Math.random < 0.5) {
            this.colors.push(this.genColor());
        }

        */
    }

    genColor() {
        // pass
    }

    chooseColor() {
        const chance = Math.random();
        if (chance < 0.35) {
            return 0
        } else if (chance < 0.9) {
            return 1
        } else {
            return 2
        }
    }

    draw(context, width, height) {
        const cellWidth = width / this.rows;
        const cellHeight = height / this.cols;

        // draw background
        context.fillStyle = this.colors[0];
        context.fillRect(0, 0, width, height);

        // draw grid
        for (let i = 0; i < this.cols; ++i) {
                let col = i;
                let columnColors = [];

            // draw first half of column
            for (let j = 0; j < this.rows / 2; ++j) {
                let row = j;

                // get cell dimensions
                const x = cellWidth * row;
                const y = cellHeight * col;


                // choose and save color
                let color = this.chooseColor();
                columnColors.push(color);

                // draw
                this.drawCell(context, x, y, cellWidth, cellHeight, this.colors[color]);

            }

            // draw mirror 2nd half of column
            columnColors.reverse();
            for (let j = this.rows / 2; j < this.rows; ++j) {
                let row = j;

                const x = cellWidth * row;
                const y = cellHeight * col;

                let color = columnColors[row % (columnColors.length)];
                this.drawCell(context, x, y, cellWidth, cellHeight, this.colors[color]);
            }
        }
    }

    drawCell(context, x, y, cellWidth, cellHeight, color) {
        this.drawSquare(context, x, y, cellWidth, cellHeight, color);
    }


    drawSquare(context, x, y, width, height, color) {
        context.save();
        context.translate(x, y);
        context.fillStyle = color;
        context.fillRect(0, 0, width+0.5, height+0.5);
        context.restore();
    }
};

// sketch settings
const settings = {
    dimensions: [ 180, 180 ],
}

// sketch
const sketch = ({context, width, height}) => {
    return ( ({context, width, height}) => {
        const grid = new MirroredGrid(20, 20);
        grid.draw(context, width, height);
    });
};

canvasSketch(sketch, settings);
