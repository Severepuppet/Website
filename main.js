

let rows = 15;
let cols = 15;
let directionS = 'RIGHT';
let canv = document.getElementById('canvas');
let count = document.getElementById('count');
let Bild = document.getElementById('Pfeiltasten');
let cnt = 0;
let c = canv.getContext('2d');
let snakeCords = [];
let größeFeldX = canv.width/cols;
let größeFeldY = canv.height/rows;
let eingesammelt = false;
let interval = false;


function setup() {
snakeCords = [{x:0,y:2}];
directionS = 'RIGHT';
document.addEventListener('keydown',direction);     // immer wenn eine Taste gedrückt wird ...
if (!interval) {setInterval(loop,300);interval=true;}      // alle 300ms ... ausführen
randomFood();
Bild.style.opacity = 0;
}

function draw() {           // in loop immer wiederhohlt
  c.fillStyle = 'black';
  c.fillRect(0,0,canv.width,canv.height);
  food();
  snakeCords.forEach(part => snakePice(part.x,part.y));      // zum zeichnen der ganzen Schlange
 
}

function snakePice(x,y){    // zum Zeichnen des Schlangenstücks 
    c.fillStyle = 'white';   
    c.fillRect(x * größeFeldX,y * größeFeldY,größeFeldX-2,größeFeldY-2); 
}

function food(){            // zum Zeichnen des essens
    c.fillStyle = "yellow"; 
    c.fillRect(foodX * größeFeldX,foodY * größeFeldY,größeFeldX-2,größeFeldY-2);
}

function loop(){            // immer alle 300ms ausgeführt
    count.innerHTML = "count: " + cnt;
    spielende1();
    spielende2();
    draw();
    
       if (eingesammelt) {
        snakeCords = [ {
            x: snakeCords[0].x,
            y: snakeCords[0].y
        }, ...snakeCords];
        eingesammelt = false;
        }
    else{
        updateSnake();
    }

       if (directionS == 'LEFT') snakeCords[0].x--;
       if (directionS == 'DOWN') snakeCords[0].y++;
       if (directionS == 'RIGHT') snakeCords[0].x++;
       if (directionS == 'UP') snakeCords[0].y--;
       
       if (snakeCords[0].x==foodX && snakeCords[0].y == foodY) {     // wenn Essen auf der gleichen stelle ist
   randomFood();
   eingesammelt=true;
   counterhöhen();
  }
  
}

function spielende1 (){     // wenn man gegen sich selbst fährt
    for (let i = 1; i < snakeCords.length; i++) {
        if (snakeCords[0].x==snakeCords[i].x && snakeCords[0].y==snakeCords[i].y)
        {
            beenden();
        }
    }
}

function spielende2(){          //wenn man gegen den Rand fährt
    if (snakeCords[0].x < 0      ||
        snakeCords[0].x > cols-1 || 
        snakeCords[0].y < 0      || 
        snakeCords[0].y > rows-1)
        {
            beenden();
        }
}

function updateSnake(){
    for (let i = snakeCords.length -1; i >0; i--) {
        snakeCords[i].x = snakeCords[i-1].x;
        snakeCords[i].y = snakeCords[i-1].y;
    }
}

function beenden(){
    randomFood();
    snakeCords = [{x:0,y:2}];
    directionS = 'RIGHT';  
    cnt = 0;
}
   

function direction(e){      // wenn ein pfeil gedrückt wird
    if(e.keyCode == 37){
        directionS = 'LEFT';
    }
    if(e.keyCode == 38){
        directionS = 'UP';
    }
    if(e.keyCode == 39){
        directionS = 'RIGHT';
    }
    if(e.keyCode == 40){
        directionS = 'DOWN';
    }
}

function randomFood(){                          // koordinaten das Essen zufällig verändern
    foodX = Math.floor(Math.random()*cols) ;
    foodY = Math.floor(Math.random()*rows) ;
    for (let i = 0; i < snakeCords.length; i++) {
        if (foodX == snakeCords[i].x && foodY == snakeCords[i].y)
        {
            randomFood();
        }
        
    }
}

function counterhöhen() {
    cnt += 1;
}