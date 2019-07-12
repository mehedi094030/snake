/*---------Game Code-----------*/

canvas = document.querySelector("#myCanvas")
canvas.width = 900;
canvas.height = 600;
ctx = canvas.getContext("2d");

var dir, score, balls, food;


init()
setInterval(function(){
	movingSnake()
}, 200);



document.addEventListener('keydown',function (e) {
	keyCode = e.keyCode;
	if (keyCode == 37 && dir != 'right') {
		dir = 'left';
	}

	if (keyCode == 38 && dir != 'down') {
		dir = 'up';
	}

	if (keyCode == 39 && dir != 'left') {
		dir = 'right';
	}

	if (keyCode == 40 && dir != 'up') {
		dir = 'down';
	}

})



/*--------------All Function-------------*/


function init() {
	dir = 'right';
	score = 0;
	balls = [
		{x: 100, y: 80},
		{x: 120, y: 80},
		{x: 140, y: 80}
	];
	createFood()
}



function add() {
	lastBall = balls[balls.length-1];
	if (dir=='right') {
		balls.push({x: lastBall.x+20, y: lastBall.y});
	}

	if (dir=='left') {
		balls.push({x: lastBall.x-20, y: lastBall.y});
	}

	if (dir=='up') {
		balls.push({x: lastBall.x, y: lastBall.y-20});
	}

	if (dir=='down') {
		balls.push({x: lastBall.x, y: lastBall.y+20});
	}
}


function createFood() {
	let foodX = Math.floor(Math.random()*44)*20;
	let foodY = Math.floor(Math.random()*29)*20;
	food = {x:foodX, y:foodY};
		
}


function movingSnake() {
	ctx.clearRect(0,0, 900, 600);

	balls.shift();
	add();

	for (var i = 0; i < balls.length; i++) {
		ball = balls[i];
		lastBall = balls[balls.length-1];
		if (lastBall.x == ball.x && lastBall.y == ball.y) {
			ctx.fillStyle = 'red';	
		} else {
			ctx.fillStyle = 'green';
		}

		if(ball.x>880) {
			ball.x = 0;	
		}
		if(ball.x<0) {
			ball.x = 880;	
		}
		if(ball.y<0) {
			ball.y = 580;	
		}
		if(ball.y>580) {
			ball.y = 0;	
		}

		ctx.fillRect(ball.x,ball.y, 19,19);

		if (food.x==lastBall.x && food.y==lastBall.y) {
			add()
			createFood()
			score += 3;
		}

		if (lastBall.x == ball.x && lastBall.y == ball.y && i < balls.length-2) {
			alert('game over! Your Score ' + score);
			init()
		}
		
	}
	ctx.fillStyle = 'lightgreen';
	ctx.fillRect(food.x,food.y, 19,19);
	ctx.fillStyle = 'white';
	ctx.fillText('Score : ' + score, 840,10);
}