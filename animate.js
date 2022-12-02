import canvasSketch from 'canvas-sketch';

import MirroredGrid from './MirroredGrid.js';

// sketch settings
const settings = {
    dimensions: [ 180, 180 ],
}

// sketch
const sketch = ({context, width, height}) => {
    return ( ({context, width, height}) => {
        const grid = new MirroredGrid();
        grid.draw(context, width, height);
        console.log(grid.colors);
    });
};

let manager;

const timeout = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const animate = async () => {
    manager = await canvasSketch(sketch, settings);

    await renderMany(50, 50);
    await renderMany(10, 100);
    await renderMany(5, 250);
    await renderMany(3, 500);
    await renderMany(3, 750);
    await renderMany(2, 1000);
    render();
};

const renderMany = async (amount, delay) => {
    for (let i = 0; i < amount; ++i) {
        await timeout(delay);
        requestAnimationFrame(render);
    }
}

const render = () => {
    manager.render();
}

animate();
