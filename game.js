'use strict';

const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d', {alpha: false}, {antialias: false});

const board = document.getElementById('board');
const menu = document.getElementById('menu');

const width = 800;
const height = 640;

canvas.setAttribute('width', width);
canvas.setAttribute('height', height);

context.fillStyle = 'green';
context.fillRect(0, 0, width, height);
context.fillStyle = 'brown';
context.fillRect(0, 0, 160, height);

function createButtonsFor(location, quantity) {
    console.log(location);
    for (let i = 0; i < quantity; i++) {
        const node = document.createElement('input');
        node.setAttribute('type', 'button');
        // node.setAttribute('class', prefix);
        node.setAttribute('id', location + '-' + (i + 1));
        node.addEventListener('click', logClick);
        location.insertBefore(node, null);
    }
}

function logClick(e) {
    console.log(e.target.id);
}

createButtonsFor(board, 16);
createButtonsFor(menu, 2);

// for (let i = 1; i <= 2; i++) {
//     const node = document.getElementById('m' + i);
//     node.addEventListener('click', logClick);
// }