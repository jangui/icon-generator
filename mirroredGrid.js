import hsl2rgb from './hsl2rgb.js';

const randRange = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min)
}

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
        this.colors = [this.genColor(), this.genColor(), this.genColor()];
        /*
        if (Math.random < 0.7) {
            this.colors.push(this.genColor());
        }
        */

    }

    genColor() {
      //saturation is the whole color spectrum
      const h = Math.floor(randRange(1, 360));
      //saturation goes from 40 to 100, it avoids greyish colors
      const s = randRange(40, 100);
      //lightness can be anything from 0 to 100, but probabilities are a bell curve around 50%
      const l = (randRange(1, 25) + randRange(1, 25) + randRange(1, 25) + randRange(1, 25));

      return hsl2rgb(h / 360, s / 100, l / 100);
    }

    chooseColor() {
        let colors = this.colors.length;
        const chance = Math.random();
        if (colors == 2) {
            if (chance < 0.50) {
                return 0
            } else {
                return 1
            }
        }

        if (colors == 3) {
            if (chance < 0.35) {
                return 0
            } else if (chance < 0.9) {
                return 1
            } else {
                return 2
            }
        }

    }

    getColor(colorInd) {
        const rgb = this.colors[colorInd % this.colors.length];
        return `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, ${rgb[3]})`;
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
                let colorInd = this.chooseColor();
                let color = this.getColor(colorInd);
                columnColors.push(color);

                // draw
                this.drawCell(context, x, y, cellWidth, cellHeight, color);

            }

            // draw mirror 2nd half of column
            columnColors.reverse();
            for (let j = this.rows / 2; j < this.rows; ++j) {
                let row = j;

                const x = cellWidth * row;
                const y = cellHeight * col;

                let color = columnColors[row % (columnColors.length)];
                this.drawCell(context, x, y, cellWidth, cellHeight, color);
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

export default MirroredGrid;
