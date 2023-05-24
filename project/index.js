const playBoard = document.querySelector('.play-board')
const scoreElement = document.querySelector('.score')
const highScoreElement = document.querySelector('.high-score')
const controls = document.querySelectorAll('.constrols i')

// Funcionalidades do jogo

let gameOver = false 
let score = 0
let food_x, food_y // posição da comida
let snakeX = 5, snakeY = 5
let velocityX = 0, valocityY = 0
let snakeBody = [] // array do corpo da cobra 
let setInterval_id

let highScore = localStorage.getItem('high-score') || 0 // Pegando o valor do hight score do local storage
highScoreElement.innerHTML = `High Score: ${highScore}` // atualizando os dados


// Fazendo a comida se posicionar de maneira aleatoria dentro do canvas
// posição entre 1 a 30
const updateFoodPosition = () => {
    food_x =  Math.floor(Math.random() * 30) + 1
    food_y =  Math.floor(Math.random() * 30) + 1
}

const handleGameOver = () => {
    clearInterval(setInterval_id)
    alert(" Game Over! Press OK to replay. ")
}

// Movimentação do personagem
// Mudando o valor das variaveis: velocityX | valocityY 
const changeDirecition = event => {

    if (event.key === 'ArrowUp' && velocityY != 1) {

        velocityX = 0
        velocityY = -1

    } else if(event.key === 'ArrowDown' && velocityY != -1) {

        velocityX = 0
        velocityY = 1

    } else if (event.key == 'ArrowLeft' && velocityX != 1) {

        velocityX = -1
        velocityY = 0

    } else if (event.key == 'ArrowRight' && velocityX != -1) {

        velocityX = 1
        velocityY = 0
    }
}

// Mudando a direção em relação a cada tecla

controls.forEach(button => button.addEventListener('click', () => changeDirecition ({
    key: button.dataset.key })))

const initGame = () => {
    // fim de jogo
    if (gameOver) return handleGameOver()
    let html = `<div class="food" style="grid-area: ${food_y} / ${food_x}"></div>`

    // quando a cobra come a comida
    if(snakeX === food_x && snakeY === food_y) {

        updateFoodPosition()

        snakeBody.push([food_y, food_x])
        score++

        // se o score da partida atual for maior que o highcore salvo
        highScore = score >= highScore ? score : highScore 

        localStorage.setItem('high-score', highScore)
        scoreElement.innerText = `Score: ${score}`
        highScoreElement.innerText = `High Score: ${highScore}`

        // atualiza a cabeça da snake
        snakeX += velocityX
        snakeY += velocityY

        // mudando valores dos elementos da 
        // parte da frente do corpo cobra, um por um

        for(let i= snakeBody.length - 1; i > 0; i--) {
            snakeBody[i] = snakeBody[i - 1]
        }
    }

    snakeBody[0] = [snakeX, snakeY]

    // confere se o corpo não esta encostando na parede
    if(snakeX <= 0 || snakeX > 30 || snakeY <= 0 || snakeY > 30) {
        return gameOver = true
    }

    // adiciona uma `div` pra cada parte do corpo da cobra
    for(let i = 0; i < snakeBody.length; i++) {

        html += `<div class='head' style='grid-area: ${snakeBody[i][1]} / ${snakeBody[i][0]}'></div>`

        //confere se a cabeça se choca com algo ou não
        if(i !== 0 && snakeBody[0][1] === snakeBody[i][1] && 
            snakeBody[0][0] === snakeBody[i][0]) {

                gameOver = true
            }
    }

    playBoard.innerHTML = html
}

updateFoodPosition()
setInterval_id = setInterval(initGame, 100)
document.addEventListener('keyup', changeDirecition)





