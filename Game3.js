/*
width - Ширина в пикселях.
height - Высота в пикселях.
blockSize - Размер одного блока на canvas.
widthInBlocks - Ширина в пикселях.
heightInBlocks - Высота в пикселях.
score - Счёт сколько яблок съедено.
drawBorder - Нарисовать рамку canvas.
*/
let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
let width = canvas.width;
let height = canvas.height;

let blockSize = 10;
let widthInBlocks = width / blockSize;
let heightInBlocks = height / blockSize;

let score = 0;

let drawBorder = function () {
    ctx.fillStyle = "Gray";
     ctx.fillRect(0, 0, width, blockSize);
     ctx.fillRect(0, height - blockSize, width, blockSize);
     ctx.fillRect(0, 0, blockSize, height);
     ctx.fillRect(width - blockSize, 0, blockSize, height);
};
var drawScore = function () {
    ctx.font = "20px Counter";
ctx.fillStyle = "Black";
ctx.textAlign = "Left";
ctx.textBaseline = "top";
ctx.fillText("Счёт: " + score, blockSize, blockSize);
};
drawBorder();
drawScore();