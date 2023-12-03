/*
width - Ширина в пикселях.
height - Высота в пикселях.
blockSize - Размер одного блока на canvas.
widthInBlocks - Ширина в пикселях.
heightInBlocks - Высота в пикселях.
score - Счёт сколько яблок съедено.
drawBorder - Нарисовать рамку canvas.
gameOver - Надпись которая появится после окончания игры.
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
let drawScore = function () {
    ctx.font = "20px Counter";
ctx.fillStyle = "Black";
ctx.textAlign = "Left";
ctx.textBaseline = "top";
ctx.fillText("Счёт: " + score, 50, blockSize);
};
let gameOver = function () {
    ctx.font = "60px Courier";
    ctx.fillStyle = "Black";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("Конец игры", width / 2, height / 2);
};
setInterval(function (){
ctx.clearRect(0, 0, width, height);
drawBorder();
drawScore();
score++;
}, 100);
drawBorder();
drawScore();
gameOver();