// Constants
let inputDir={x:0, y:0};
let speed=16;
let lastPaintTime=0;
let score=0;
let snakeArray=[{x:13, y:15}];
let food={x:14, y:12};
const board=document.getElementById('board');
const scoreDisplay=document.getElementById('score');

//functions
function main(ctime)
{
    window.requestAnimationFrame(main);
    if((ctime-lastPaintTime)/1000<(1/speed)){
        return;
    }
    lastPaintTime=ctime;
    gameEngine();
}

function gameEngine(){

    //Part 1 : Updating the snake component & food component
    if(collision(snakeArray)){
        inputDir={x:0,y:0};
        alert('Game over. Press any key to restart');
        snakeArray=[{x:13, y:15}];
        score=0;

    }

    //If snake has eaten the food, then reset the food to a new coordinate
    if(snakeArray[0].y===food.y && snakeArray[0].x===food.x){
        ++score;
        scoreDisplay.innerHTML="Score: "+score;
        snakeArray.unshift({x:snakeArray[0].x+inputDir.x, y:snakeArray[0].y+inputDir.y});
        let a=2;
        let b=16;
        food={x:Math.round(a+(b-a)*Math.random()),y:Math.round(a+(b-a)*Math.random())};
    }

    //Moving the snake
    for(let i=snakeArray.length-2;i>=0;i--){
        const element=snakeArray[i];
        snakeArray[i+1]={...snakeArray[i]};
    }

    snakeArray[0].x+=inputDir.x;
    snakeArray[0].y+=inputDir.y;

    //Part 2 : Rendering the snake 
    board.innerHTML="";
    snakeArray.forEach((e,index)=>{
        snakeElement=document.createElement('div');
        snakeElement.style.gridRowStart=e.y;
        snakeElement.style.gridColumnStart=e.x;
        if(index===0)
        snakeElement.classList.add('head');
        else
        snakeElement.classList.add('snake');
        board.appendChild(snakeElement);
    })

    //Part 3 : Rendering the food
    foodElement=document.createElement('div');
    foodElement.style.gridRowStart=food.y;
    foodElement.style.gridColumnStart=food.x;
    foodElement.classList.add('food');
    board.appendChild(foodElement);
}

function collision(sarr){
    //If collision with itself

    for(let i=1;i<snakeArray.length;i++){
        if(snakeArray[i].x===snakeArray[0].x && snakeArray[i].y===snakeArray[0].y){
            return true;
        }
    }

    //Collision with boundaries
    if(snakeArray[0].x<=0 || snakeArray[0].x>=36 || snakeArray[0].y<=0 || snakeArray[0].y>=46)
    return true;

}

//Game entry point
window.requestAnimationFrame(main);
window.addEventListener('keydown',e=>{
    inputDir={x:0,y:1}; // start game
    switch(e.key)
    {
        case 'ArrowUp':
            console.log('Arrow Up');
            inputDir.x=0;
            inputDir.y=-1;
            break;

        case 'ArrowDown':
            console.log('Arrow Down');
            inputDir.x=0;
            inputDir.y=1;
            break;
        
        case 'ArrowRight':
            console.log('ArrowRight');
            inputDir.x=1;
            inputDir.y=0;
            break;
        
        case 'ArrowLeft':
            console.log('ArrowLeft');
            inputDir.x=-1;
            inputDir.y=0;
            break;
    }
});