/*
    width - Ширина в пикселях.
    height - Высота в пикселях.
    blockSize - Размер одного блока на canvas.
    widthInBlocks - Ширина в пикселях.
    heightInBlocks - Высота в пикселях.
    score - Счёт сколько яблок съедено.
    drawBorder - Нарисовать рамку canvas.
    gameOver - Надпись которая появится после окончания игры.
    drawSquare - Функция которая рисует квадрат.
    drawCircle - Функция которая рисует круг.
    drawScore - Рисует счёт.
    Snake - Функция которая рисует змейку.
    newHead - Создает голову змейки.
    Snake.prototype.move = Функция которая передвигает змейку.
        if (this.checkCollision(newHead)) {
        gameOver();
        return;
    } = Если змейка коснется своего хвоста то игра закончится и сработает функция gameOver.
    if (newHead.equal(apple.position)) {
        score++;
        apple.move(); = Когда змейка съест яблоко то количество очков прибавится и яблоко переместится в другое место.
        leftCollision = Столкновение змейки с лева.
        topCollision = Столкновение змейки с верху.
        rightCollision = Столкновение змейки с права.
        bottomCollision = Столкновение змейки низу.
        wallCollision = Столкновение змейки со стенами (Левая, верхняя, правая, нижняя).
        selfCollision = Столкновение змейки со своим хвостом.
        directions = Направления куда будет идти змейка.
        setDirection = Проверка на движения змейки. Змейка не сможет пойти на право если она идет на лево и не может пойти
        в низ если она идет на вверх.
        clearInterval = очищает всё.
*/
let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

let width = canvas.width;
let height = canvas.height;

let blockSize = 10;
let widthInBlocks = width / blockSize;
let heightInBlocks = height / blockSize;

// Устанавливает счет 0
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
    ctx.fillText("Счёт: " + score, blockSize, blockSize);
};

let gameOver = function () {
    clearInterval(intervalId);
    ctx.font = "60px Courier";
    ctx.fillStyle = "Black";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("Конец игры", width / 2, height / 2);
};

let circle = function (x, y, radius, fillCircle) {
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2, false);
    if (fillCircle) {
        ctx.fill();
    } else {
        ctx.stroke();
    }
};

let Block = function (col, row) {
    this.col = col;
    this.row = row;
};

Block.prototype.drawSquare = function (color) {
    var x = this.col * blockSize;
    var y = this.row * blockSize;
    ctx.fillStyle = color;
    ctx.fillRect(x, y, blockSize, blockSize);
};

Block.prototype.drawCircle = function (color) {
    let centerX = this.col * blockSize + blockSize / 2;
    let centerY = this.row * blockSize + blockSize / 2;
    ctx.fillStyle = color;
    circle(centerX, centerY, blockSize / 2, true);
};

Block.prototype.equal = function (otherBlock) {
    return this.col === otherBlock.col && this.row === otherBlock.row;
};

let Snake = function () {
this.segments = [
    new Block(7, 4),
    new Block(7, 4),
    new Block(7, 5)
];
    this.direction = "right";
    this.nextDirection = "right";
};

Snake.prototype.draw = function () {
    for (let i = 0; i < this.segments.length; i++) {
        this.segments[i].drawSquare("Blue");
    }
};

/*
var Snake = new Snake();
Snake.draw();
*/

Snake.prototype.move = function () {
    let head = this.segments[0];
    let newHead;
    this.direction = this.nextDirection;
    if (this.direction === "right") {
        newHead = new Block(head.col + 1, head.row);
    } else if (this.direction === "down") {
        newHead = new Block(head.col, head.row + 1);
    } else if (this.direction === "left") {
        newHead = new Block(head.col - 1, head.row);
    } else if (this.direction === "up") {
        newHead = new Block(head.col, head.row - 1);
    }

    if (this.checkCollision(newHead)) {
        gameOver();
        return;
    }

    this.segments.unshift(newHead);
    if (newHead.equal(apple.position)) {
        score++;
        apple.move();
    } else {
        this.segments.pop();
    }
};

Snake.prototype.checkCollision = function (head) {

    let leftCollision = (head.col === 0); // Указывает где будет столкновение.
    let topCollision = (head.row === 0); // Указывает где будет столкновение.
    let rightCollision = (head.col === widthInBlocks - 1); // Указывает где будет столкновение.
    let bottomCollision = (head.row === widthInBlocks - 1); // Указывает где будет столкновение.

    let wallCollision = leftCollision || topCollision || rightCollision || bottomCollision;
    let selfCollision = false; // указано то что selfCollision пока не активен
    for (let i = 0; i < this.segments.length; i++) {
        if (head.equal(this.segments[i])) {
            selfCollision = true // Эти 3 строчки кода говорят как может сработать selfCollision.
        }
    }
    return wallCollision || selfCollision
};

Snake.prototype.setDirection = function (newDirection) {
    if (this.direction === "up" && newDirection === "down") {
        return;
    } else if (this.direction === "right" && newDirection === "left") { // Змейка не сможет пойти на лево если она идет на право.
        return;
    } else if (this.direction === "down" && newDirection === "up") { // Змейка не сможет пойти в низ если она идет вверх.
        return;
    } else if (this.direction === "left" && newDirection === "right") { // Змейка не сможет пойти на право если она идет на лево.
        return;
    }
this.nextDirection = newDirection;
};

let Apple = function () {
    this.position = new Block(10, 10);
};

Apple.prototype.draw = function () {
    this.position.drawCircle("LimeGreen");
};


Apple.prototype.move = function () {
    let randomCol = Math.floor(Math.random() * (widthInBlocks - 2)) + 1;
    let randomRow = Math.floor(Math.random() * (heightInBlocks - 2)) + 1;
    this.position = new Block(randomCol, randomRow);
};

let snake = new Snake();
let apple = new Apple();

let intervalId = setInterval(function () {
    ctx.clearRect(0, 0, width, height);
    drawScore();
    snake.move();
    snake.draw();
    apple.draw();
    drawBorder();
}, 100);

let directions = {
    37: "left", // Змейка пойдет в лево.
    38: "up", // Змейка пойдет вверх.
    39: "right", // Змейка пойдет в право.
    40: "down" // Змейка пойдет в низ.
};

$("body").keydown(function (event) {
    let newDirection = directions[event.keyCode];
    if (newDirection !== undefined) {
    snake.setDirection(newDirection); // передаем новое направление в функцию Setdirection.
    }
});