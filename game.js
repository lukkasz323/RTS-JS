'use strict';

const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d', {alpha: false}, {antialias: false});

const verdict = document.getElementById('verdict');
const objective = document.getElementById('objective');
const menuHunter = document.getElementById('menu-hunter');
const menuAxe = document.getElementById('menu-woodcutter');
const menuSwordsman = document.getElementById('menu-swordsman');
const menuArcher = document.getElementById('menu-archer');

const width = 480;
const height = 480;

const produce = {
    wood: 0,
    food: 0
};
const army = {
    swordsman: 0,
    archer: 0
};
const questList = {
    unitType: [0, 1, 2],
    quantity: [6, 4, 2],
    timeLimit: [30, 25, 20]
};
let wood = 0;
let food = 10;
let units = 0;
let limit = 10;
let quest = 1;
let questMax = 3;
let questTimeLimit = questList.timeLimit[quest - 1];


function renderBackground() {
    context.fillStyle = 'green';
    context.fillRect(0, 0, width, width);
}

function renderStatus() {
    context.fillStyle = 'black';
    context.fillText('Food: ' + food, 4, 24);
    context.fillText('Wood: ' + wood, 4, 48);
    context.fillText('Hunters: ' + produce.food, 4, 96);
    context.fillText('Woodcutters: ' + produce.wood, 4, 120);
    context.fillText('Swordsmen: ' + army.swordsman, 4, 168);
    context.fillText('Archers: ' + army.archer, 4, 192);
    context.fillText('Units: ' + units, 4, 240);
    context.fillText('Limit: ' + limit, 4, 264);
}

function logClick(e) {
    if (units >= limit) return;

    switch (e.target.id) {
        case 'menu-hunter':
            if (food >= 10) {
                food -= 10;
                produce.food += 1;
                units++;
            }
            break;
        case 'menu-woodcutter':
            if (food >= 10) {
                food -= 10;
                produce.wood += 1;
                units++;
            }
            break;
        case 'menu-swordsman':
            if (food >= 10 && wood >= 20) {
                food -= 10;
                wood -= 20;
                army.swordsman += 1;
                units++;
            }
            break;
        case 'menu-archer':
            if (food >= 10 && wood >= 50) {
                food -= 10;
                wood -= 50;
                army.archer += 1;
                units++;
            }
    }
}

function questUpdate() {
    if (questTimeLimit < 0) return;
    if (quest > questMax) {
        objective.innerHTML = 'You completed all quests!';
        return;
    }

    const quantity = questList.quantity[quest - 1];
    let unitType;

    switch (questList.unitType[quest - 1]) {
        case 0:
            unitType = 'Hunters';
            break;
        case 1:
            unitType = 'Woodcutters';
            break;
        case 2:
            unitType = 'Swordsmen';
            break;
        case 3:
            unitType = 'Archers';
    }
    objective.innerHTML = quest + '. Train ' + quantity + ' ' + unitType + ' in ' + questTimeLimit + ' seconds.';
}

function questFail() {
    verdict.style = 'color: red;';
    verdict.innerHTML = 'Failed.';
    setTimeout(() => {
        questTimeLimit = questList.timeLimit[quest - 1];
        verdict.innerHTML = '';
    }, 1000);
}

function questSuccess() {
    verdict.style = 'color: green;';
    verdict.innerHTML = 'Success!';
    setTimeout(() => {
        quest++;
        questTimeLimit = questList.timeLimit[quest - 1];
        verdict.innerHTML = '';
    }, 1000);
}

function questRestart() {
    for (const i in produce) {
        produce[i] = 0;
    }
    for (const i in army) {
        army[i] = 0;
    }
    food = 10;
    wood = 0;
    units = 0;
}

function isQuestCompleted() {
    let unitType;

    switch (questList.unitType[quest - 1]) {
        case 0:
            unitType = produce.food;
            break;
        case 1:
            unitType = produce.wood;
            break;
        case 2:
            unitType = army.swordsman;
            break;
        case 3:
            unitType = army.archer;
    }
    if (unitType >= questList.quantity[quest - 1]) {
        return true;
    }
}

canvas.setAttribute('width', width);
canvas.setAttribute('height', height);
context.font = '24px Arial';

questUpdate();

setInterval(() => { // for updates every frame
    renderBackground();
    renderStatus();
    questUpdate();
}, 1000 / 50)

setInterval(() => { // for production
    wood += produce.wood;
    food += produce.food;
}, 500);

setInterval(() => { // for quests
    questTimeLimit--;
    if (questTimeLimit === 0) {
        questFail();
        questRestart();
    } else if (isQuestCompleted()) {
        questSuccess();
        questRestart();
    }
}, 1000);

menuHunter.addEventListener('click', logClick);
menuAxe.addEventListener('click', logClick);
menuSwordsman.addEventListener('click', logClick);
menuArcher.addEventListener('click', logClick);