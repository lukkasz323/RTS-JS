'use strict';

const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d', {alpha: false}, {antialias: false});
const width = 400;
const height = 400;

function renderBackground() {
    context.fillStyle = 'green';
    context.fillRect(0, 0, width, height);
}

renderBackground();

// setInterval(() => {
//     renderBackground();
// }, 1000 / 60)