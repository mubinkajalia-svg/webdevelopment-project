const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const scoreText = document.getElementById("score");
const highScoreText = document.getElementById("highScore");

const startBtn = document.getElementById("startBtn");
const pauseBtn = document.getElementById("pauseBtn");
const restartBtn = document.getElementById("restartBtn");

const grid = 20;
const tile = canvas.width / grid;

let snake = [];
let food = {};

let dx = 1;
let dy = 0;

let score = 0;
let highScore = localStorage.getItem("snakeHighScore") || 0;

highScoreText.innerText = highScore;

let gameLoop = null;
let running = false;

function init(){

snake=[
{x:10,y:10}
];

score=0;

scoreText.innerText=score;

dx=1;
dy=0;

spawnFood();

draw();

}

function spawnFood(){

food={

x:Math.floor(Math.random()*grid),

y:Math.floor(Math.random()*grid)

};

}

function draw(){

ctx.fillStyle="#111";
ctx.fillRect(0,0,canvas.width,canvas.height);

ctx.fillStyle="red";

ctx.fillRect(food.x*tile,food.y*tile,tile,tile);

ctx.fillStyle="lime";

snake.forEach(part=>{

ctx.fillRect(part.x*tile,part.y*tile,tile-2,tile-2);

});

}

function update(){

const head={

x:snake[0].x+dx,

y:snake[0].y+dy

};

if(
head.x<0||
head.y<0||
head.x>=grid||
head.y>=grid
){

gameOver();
return;

}

for(let s of snake){

if(head.x===s.x&&head.y===s.y){

gameOver();

return;

}

}

snake.unshift(head);

if(head.x===food.x&&head.y===food.y){

score++;

scoreText.innerText=score;

if(score>highScore){

highScore=score;

localStorage.setItem("snakeHighScore",highScore);

highScoreText.innerText=highScore;

}

spawnFood();

}else{

snake.pop();

}

draw();

}

function gameOver(){

clearInterval(gameLoop);

running=false;

alert("Game Over!");

}

document.addEventListener("keydown",(e)=>{

switch(e.key){

case "ArrowUp":
if(dy!==1){
dx=0;
dy=-1;
}
break;

case "ArrowDown":
if(dy!==-1){
dx=0;
dy=1;
}
break;

case "ArrowLeft":
if(dx!==1){
dx=-1;
dy=0;
}
break;

case "ArrowRight":
if(dx!==-1){
dx=1;
dy=0;
}
break;

}

});

document.querySelectorAll(".controls button").forEach(btn=>{

btn.onclick=()=>{

const dir=btn.dataset.dir;

if(dir==="up"&&dy!==1){

dx=0;
dy=-1;

}

if(dir==="down"&&dy!==-1){

dx=0;
dy=1;

}

if(dir==="left"&&dx!==1){

dx=-1;
dy=0;

}

if(dir==="right"&&dx!==-1){

dx=1;
dy=0;

}

};

});

startBtn.onclick=()=>{

if(running) return;

running=true;

gameLoop=setInterval(update,150);

};

pauseBtn.onclick=()=>{

if(!running)return;

clearInterval(gameLoop);

running=false;

};

restartBtn.onclick=()=>{

clearInterval(gameLoop);

running=false;

init();

};

init();
