import canvasSketch from 'canvas-sketch';

import MirroredGrid from './MirroredGrid.js';

// sketch settings
const settings = {
    dimensions: [ 180, 180 ],
    animate: true,
}

// sketch
const sketch = ({context, width, height}) => {
    return ( ({context, width, height}) => {
        const grid = new MirroredGrid();
        grid.draw(context, width, height);
    });
};

canvasSketch(sketch, settings);
