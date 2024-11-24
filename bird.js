let cvs = document.querySelector('#flappybird')
let ctx = cvs.getContext('2d')

// Птица
let bird = document.createElement('img')
bird.src = 'images/karas.png'
xPos = 50
yPos = 250

// Гравитация
let grav = 0.16
let change = 4.25

// Фон
let bg = document.createElement('img')
bg.src = 'images/bg.png'

// Трубы
let upPipe = document.createElement('img')
upPipe.src = 'images/pipeUp.png'
let downPipe = document.createElement('img')
downPipe.src = 'images/pipeBottom.png'
let xPipe = cvs.width
let yPipe = 0
let gap = 110
let pipes_x = [xPipe, xPipe + cvs.width / 2 + upPipe.width / 2]
let pipes_y = [yPipe, yPipe - 100]
let score = 0
ctx.fillStyle = 'black'
ctx.font = '24px Arial'



//Пол
let fg = document.createElement('img')
fg.src = 'images/fg.png'
let xFg = 0
let yFg = 450


// Отрисовка
function draw() {
  ctx.drawImage(bg, 0, 0)
  ctx.drawImage(bird, xPos, yPos)
  yPos -= change
  change -= grav

  for(let i = 0; i < pipes_x.length; i++) {
    if(xPos + bird.width >= pipes_x[i] && // правая грань птицы за левой гранью трубы
      xPos <= pipes_x[i] + upPipe.width &&// правая грань птицы за правой гранью трубы
      (yPos <= pipes_y[i] + upPipe.height ||// столкнулись с верхней трубой
        yPos >= pipes_y[i] + upPipe.height + 
        gap // столкнулись с нижней трубой
      ) ||
      yPos + bird.height >= 450 // столнкулись с полом
    ) {
      ctx.fillText("Ваши очки: " + score, 10, 500)
      return
    }
    // let yP = Math.round(Math.random() * -100)
    ctx.drawImage(upPipe, pipes_x[i], pipes_y[i])
    ctx.drawImage(downPipe, pipes_x[i], pipes_y[i] +
      upPipe.height + gap
    )
    pipes_x[i] -= 2

    if(pipes_x[i] < -upPipe.width) {
              pipes_x[i] = cvs.width
              score += 1
          }
  }
  ctx.drawImage(fg, xFg, yFg)

  ctx.fillText("Ваши очки: " + score, 10, 500)


  requestAnimationFrame(draw)
}

draw()


document.addEventListener('click', function(){
  change = 4.25
})