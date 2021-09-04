const grid = document.querySelector('.grid')
const startButton = document.getElementById('start')
const score = document.getElementById('score')
const highScore = document.getElementById("high-score")
const title = document.getElementById("title")
const width = 10
let squares = []
let currentSnake = []
let direction = 1
let appleIndex = 0
let currentScore = 0
let currentHighScore = 0
let speed = 1000
let timerId = 0

createGrid()
document.addEventListener('keydown', control)
startButton.addEventListener("click", startGame)

function createGrid() {
    for (let i=0; i < width*width; i++) {
    const square = document.createElement('div')
    square.classList.add('square')
    grid.appendChild(square)   
    squares.push(square)
    }
}

function startGame() { 
    for (let i = 0; i < squares.length; i++) {
        squares[i].classList.remove("snake")
        squares[i].classList.remove("apple")
    }
    clearInterval(timerId)
    currentScore = 0
    score.textContent = currentScore
    speed = 1000
    direction = 1
    timerId = setInterval(move, speed)
    currentSnake = [2, 1, 0]
    currentSnake.forEach(index => squares[index].classList.add('snake'))
    generateApple()
    move()
    title.textContent = "Snake Game"
}

function move() {
    if ((currentSnake[0] + width >= width*width && direction === width) || //if snake has hit bottom
        (currentSnake[0] % width === width-1 && direction === 1) || //if snake has hit right wall
        (currentSnake[0] % width === 0 && direction === -1) || //if snake has hit left wall
        (currentSnake[0] - width < 0 && direction === -width) || //if snake has hit top
        squares[currentSnake[0] + direction].classList.contains('snake')) {
            gameOver()
            return
    }
    const tail = currentSnake.pop()
    squares[tail].classList.remove('snake')
    currentSnake.unshift(currentSnake[0] + direction)
    squares[currentSnake[0]].classList.add('snake')
    if (currentSnake[0] === appleIndex) {
        squares[currentSnake[0]].classList.remove('apple')
        currentSnake.push(tail)
        generateApple()
        currentScore += 1
        score.textContent = currentScore
        if (currentScore > currentHighScore) {
            currentHighScore = currentScore
            highScore.textContent = currentScore
        }
        clearInterval(timerId)
        speed = speed * .9
        timerId = setInterval(move, speed)
    }
}

function generateApple() {
    do {
    appleIndex = Math.floor(Math.random() * squares.length)
    } while (squares[appleIndex].classList.contains('snake'))
    squares[appleIndex].classList.add('apple')
}

// 39 = right arrow
// 38 = up arrow
// 37 = left arrow
// 40 = down arrow
// e = event

function control(e) {
    if (e.keyCode === 39) {
        direction = 1
    } 
    else if (e.keyCode === 38) {
        direction = -width
    } 
    else if (e.keyCode === 37) {
        direction = -1
    } 
    else if (e.keyCode === 40) {
        direction = +width
    }
}

function gameOver() {
    clearInterval(timerId)
    title.textContent = "Game Over!"
}