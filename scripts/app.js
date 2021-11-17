
//// Make grid Dynamically
///// Make DB and burger an image class
//// Game start by clicking
//// burger to appear on screen and be controlled back and forth by player (removed from cell when player moves it)
//// DB to appear on screen and to move down vertically(randomly +10)
// program how many DBs to appear on screen and game ends when all have appeared(also program burger 3 lives)
////player shooting from burger
//// DB shooting randomly
//// if DB is hit, DB disappears from screen
// if burger is hit, one life is lost, if all lives lost game Over
// when game ends final alert
// build in further levels to make game harder
// transition between levels


// DOM Elements
const grid = document.querySelector('.grid')
const cells = []
const startButton = document.querySelector('#start')
const overallScore = document.querySelector('#Score-Display')
// let dumbbellPosition = document.querySelector('.grid > div')

// Grid Variables
const width = 20
const gridCellCount = width * width 

// Game Variables
let burgerPosition = 370
let dumbbellPosition = [
  { index: 8, isAlive: true },
  { index: 9, isAlive: true },
  { index: 10, isAlive: true },
  { index: 11, isAlive: true },
  { index: 12, isAlive: true },
  { index: 28, isAlive: true },
  { index: 29, isAlive: true },
  { index: 30, isAlive: true },
  { index: 31, isAlive: true },
  { index: 32, isAlive: true },
  { index: 48, isAlive: true },
  { index: 49, isAlive: true },
  { index: 50, isAlive: true },
  { index: 51, isAlive: true },
  { index: 52, isAlive: true },
  { index: 68, isAlive: true },
  { index: 69, isAlive: true },
  { index: 70, isAlive: true },
  { index: 71, isAlive: true },
  { index: 72, isAlive: true }
] 
// let playerLaser =  burgerPosition - width
// let computerLaser = dumbbellPosition.map(dumbbell => {
//   return dumbbell.index += width 
// })
// console.log(computerLaser)


// let computerLaser = dumbbellPosition[dumbbellPosition.index] + width
// console.log(computerLaser)
let direction = 1
let score = 0


// Building the grid
function createGrid (){
  for (let i = 0; i < gridCellCount; i++) {
    const cell = document.createElement('div')
    cells.push(cell)
    cell.textContent = i
    grid.appendChild(cell)
  }
}
createGrid()

// Functions
function removeBurger(){
  cells[burgerPosition].classList.remove('burger')
}

function addBurger(){
  cells[burgerPosition].classList.add('burger')
}

// function addPlayerLaser(){
//   cells[playerLaser].classList.add('playerLaser')
  
// }

// function removePlayerLaser(){
//   cells[playerLaser].classList.remove('playerLaser') 

// }
// function addComputerLaser() {
//   cells[computerLaser].classList.add('computerLaser')
// }
// function removeComputerLaser(){
//   cells[computerLaser].classList.remove('computerLaser')
// }

function removeDumbbellClass() {
  dumbbellPosition.forEach((currentDumbbell) => {
    cells[currentDumbbell.index].classList.remove('dumbbell')  
  })
}
function removeDumbbell(){
  dumbbellPosition.forEach((currentDumbbell) => {
    if (!currentDumbbell.isAlive){
      cells[currentDumbbell.index].classList.remove('dumbbell')
    }
  })
  
}


function addDumbbell(){
  dumbbellPosition.forEach((currentDumbbell) => {
    if (currentDumbbell.isAlive) {
      cells[currentDumbbell.index].classList.add('dumbbell') 
    }
  })
  
}

function handleGameStart(){
  // window.setInterval(() => {
    addBurger()
    // addDumbbell()
    handleComputerLaser()
    handleComputerControls()
    handlePlayerControls()
    // addPlayerLaser()
  // }, 500)
}
function handlePlayerControls(e){
  // playerLaser = burgerPosition - width
  const x = burgerPosition % width
  // const y = playerLaser % width
  // console.log('x',x)
  // console.log('y',y)
  // console.log(e.code)
  
  // removeBurger()
  // removePlayerLaser()
  // addBurger()
  if (e.code === 'ArrowLeft' && x > 0) {
    removeBurger()
    burgerPosition-- 
    addBurger()
  } else if (e.code === 'ArrowRight' && x < width - 1) {
    removeBurger()
    burgerPosition++ 
    addBurger()
  } else if (e.code === 'Space') {
    // removeBurger()
    // addBurger()
    // console.log(burgerPosition, playerLaser)
    let playerLaser = burgerPosition 
    // function addPlayerLaser(){
    //   cells[playerLaser].classList.add('playerLaser')
      
    // }
    
    // function removePlayerLaser(){
    //   cells[playerLaser].classList.remove('playerLaser') 
    
    // }
    const intervalID = setInterval(() => {
      // console.log(playerLaser)
      // console.log('y', y)
      cells[playerLaser].classList.remove('playerLaser') 
      playerLaser -= width 
      cells[playerLaser].classList.add('playerLaser')
      if (cells[playerLaser].classList.contains('dumbbell') ) {
        cells[playerLaser].classList.remove('playerLaser')
        console.log(playerLaser)
        clearInterval(intervalID)
        const dumbbellIndex = dumbbellPosition.find(dumbbell => {
          return dumbbell.index === playerLaser
        })
        dumbbellIndex.isAlive = false
        cells[playerLaser].classList.remove('playerLaser')
        score += 1000
        overallScore.innerHTML = score
      
      
      } else if (playerLaser < width) { 
        cells[playerLaser].classList.remove('playerLaser')
        clearInterval(intervalID)
      }
      
    }, 200)
    
  }
  
}

function computerMoveRight() {
  removeDumbbellClass()
  dumbbellPosition = dumbbellPosition.map(dumbbell => {
    dumbbell.index += 1 
    return dumbbell
  })
  addDumbbell()
}
function computerMovesLeft () {
  removeDumbbellClass()
  dumbbellPosition = dumbbellPosition.map(dumbbell => {
    dumbbell.index -= 1
    return dumbbell
  })
  addDumbbell()
}


function handleComputerControls(){
  addDumbbell()
  setInterval(() => {
    removeDumbbell()
    const rightBorder = dumbbellPosition[dumbbellPosition.length - 1].index % width === width - 2
    const leftBorder = dumbbellPosition[0].index % width === 1
    if (direction === 1) {
      computerMoveRight()
      if (rightBorder) {
        removeDumbbellClass()
        dumbbellPosition = dumbbellPosition.map(dumbbell => {
          dumbbell.index += width
          return dumbbell
        })
        direction = -1
        addDumbbell()
      }
    } else {
      if (direction === -1)  {
        computerMovesLeft()
        if (leftBorder) {
          removeDumbbellClass()
          dumbbellPosition = dumbbellPosition.map(dumbbell => {
            dumbbell.index += width
            return dumbbell
          })
          direction = 1
          addDumbbell()
        }
      }
      addDumbbell()
    }
  
  }, 500) 
}
function handleComputerLaser(){
  // const computerLaserID = setInterval(() => {
    let isDumbbellFree = false
    const randomDumbbell = dumbbellPosition[Math.floor(Math.random() * dumbbellPosition.length)].index
    const dumbbellToShoot = dumbbellPosition.find(dumbbell => {
      console.log(dumbbell, randomDumbbell)
      return dumbbell.index === randomDumbbell
    })
    console.log(dumbbellToShoot)
    let computerLaserIndex = dumbbellToShoot.index + width

    const dbLaserMovement = setInterval(() => {
      cells[computerLaserIndex].classList.remove('computerLaser')
      computerLaserIndex += width 
      cells[computerLaserIndex].classList.add('computerLaser')
  
      if (cells[computerLaserIndex].classList.contains('burger')) {
        cells[computerLaserIndex].classList.remove('burger')
        console.log(computerLaserIndex)
        clearInterval(dbLaserMovement)
        isDumbbellFree = false
        cells[computerLaserIndex].classList.remove('computerLaser')  
      } else if (computerLaserIndex > 380){
        clearInterval(dbLaserMovement)
        cells[computerLaserIndex].classList.remove('computerLaser')
      }

      console.log(computerLaserIndex)
    }, 500)

    
  // }, 1000)
  // clearInterval(computerLaserID)
  // })
}
// handleComputerLaser()

// Events
startButton.addEventListener('click', handleGameStart)
document.addEventListener('keyup', handlePlayerControls)
// document.addEventListener('mouseenter', handleComputerControls)

