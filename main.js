let rows = 15;
let cols = 15;
let directionS = 'RIGHT';
let nextDirection = 'RIGHT';  // Temporäre Variable für die nächste Richtung
let canv = document.getElementById('canvas');
let count = document.getElementById('count');
let Bild = document.getElementById('Pfeiltasten');
let cnt = 0;
let c = canv.getContext('2d');
let snakeCords = [];
let größeFeldX = canv.width / cols;
let größeFeldY = canv.height / rows;
let eingesammelt = false;
let interval = false;
let foodX, foodY;
const GAME_SPEED = 300;  // Geschwindigkeit des Spiels in Millisekunden

function setup() {
  snakeCords = [{ x: 0, y: 2 }];
  directionS = 'RIGHT';
  nextDirection = 'RIGHT';  // Startzustand der Richtung
  document.addEventListener('keydown', direction);
  if (!interval) {
    interval = setInterval(loop, GAME_SPEED);
  }
  randomFood();
  Bild.style.opacity = 0;
}

function draw() {
  c.fillStyle = 'black';
  c.fillRect(0, 0, canv.width, canv.height);
  food();
  snakeCords.forEach(part => snakePice(part.x, part.y));
}

function snakePice(x, y) {
  c.fillStyle = 'white';
  c.fillRect(x * größeFeldX, y * größeFeldY, größeFeldX - 2, größeFeldY - 2);
}

function food() {
  c.fillStyle = "yellow";
  c.fillRect(foodX * größeFeldX, foodY * größeFeldY, größeFeldX - 2, größeFeldY - 2);
}

function loop() {
  // Setze die aktuelle Richtung auf die neue Richtung, die der Spieler gewählt hat
  directionS = nextDirection;
  
  count.innerHTML = "count: " + cnt;
  checkCollisionWithSelf();
  checkCollisionWithWall();
  draw();
  
  if (eingesammelt) {
    snakeCords = [{ x: snakeCords[0].x, y: snakeCords[0].y }, ...snakeCords];
    eingesammelt = false;
  } else {
    updateSnake();
  }

  moveSnake();
  
  if (snakeCords[0].x === foodX && snakeCords[0].y === foodY) {
    randomFood();
    eingesammelt = true;
    incrementCounter();
  }
}

function moveSnake() {
  if (directionS === 'LEFT') snakeCords[0].x--;
  if (directionS === 'DOWN') snakeCords[0].y++;
  if (directionS === 'RIGHT') snakeCords[0].x++;
  if (directionS === 'UP') snakeCords[0].y--;
}

function checkCollisionWithSelf() {
  for (let i = 1; i < snakeCords.length; i++) {
    if (snakeCords[0].x === snakeCords[i].x && snakeCords[0].y === snakeCords[i].y) {
      resetGame();
    }
  }
}

function checkCollisionWithWall() {
  if (
    snakeCords[0].x < 0 ||
    snakeCords[0].x >= cols ||
    snakeCords[0].y < 0 ||
    snakeCords[0].y >= rows
  ) {
    resetGame();
  }
}

function updateSnake() {
  for (let i = snakeCords.length - 1; i > 0; i--) {
    snakeCords[i].x = snakeCords[i - 1].x;
    snakeCords[i].y = snakeCords[i - 1].y;
  }
}

function resetGame() {
  randomFood();
  snakeCords = [{ x: 0, y: 2 }];
  directionS = 'RIGHT';
  nextDirection = 'RIGHT';  // Reset der Richtung
  cnt = 0;
}

function direction(e) {
  // Wenn eine Pfeiltaste gedrückt wird, aktualisiere `nextDirection`, aber führe keine Bewegung direkt aus
  if (e.key === 'ArrowLeft' && directionS !== 'RIGHT') {
    nextDirection = 'LEFT';
  } else if (e.key === 'ArrowUp' && directionS !== 'DOWN') {
    nextDirection = 'UP';
  } else if (e.key === 'ArrowRight' && directionS !== 'LEFT') {
    nextDirection = 'RIGHT';
  } else if (e.key === 'ArrowDown' && directionS !== 'UP') {
    nextDirection = 'DOWN';
  }
}

function randomFood() {
  foodX = Math.floor(Math.random() * cols);
  foodY = Math.floor(Math.random() * rows);
  // Stelle sicher, dass das Essen nicht auf der Schlange liegt
  for (let i = 0; i < snakeCords.length; i++) {
    if (foodX === snakeCords[i].x && foodY === snakeCords[i].y) {
      randomFood();
    }
  }
}

function incrementCounter() {
  cnt += 1;
}

function pfeilOben() {
    if (directionS !== 'DOWN') {
        nextDirection = 'UP';
      }
}

function pfeilLinks() {
    if (directionS !== 'RIGHT') {
        nextDirection = 'LEFT';
      }
}

function pfeilUnten() {
    if (directionS !== 'UP') {
        nextDirection = 'DOWN';
      }
}

function pfeilRechts() {
    if (directionS !== 'LEFT') {
        nextDirection = 'RIGHT';
      }
}