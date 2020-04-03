//snake eat food and get bigger

//if snake touches wall it dies

//if snake touches itself it dies
let snake;
let tails = [];
let fruit;
let up = false;
let down = false;
let right = false;
let left = false;
let score = 0;

function setup() {
  createCanvas(1000, 700);
  snake = new Snake(500, 360);
  fruit = new Food();
}

function draw() {
  background("black");
  let snakeX = snake.x;
  let snakeY = snake.y;
  tails.forEach(tail => {
    tail.show();
  });

  snake.show();
  if (frameCount % 5 == 0) {
    snake.eat(fruit.x, fruit.y);
    snake.move();
    snake.diesEdge();
    snake.diesSelf()
    for (i = tails.length - 1; i >= 0; i--) {
      if (i == 0) {
        tails[i].x = snakeX;
        tails[i].y = snakeY;
      } else {
        tails[i].x = tails[i - 1].x;
        tails[i].y = tails[i - 1].y;
      }
    }
  }

  fruit.show();

  textSize(20);
  text(score + " points", 10, 30);
}

function keyPressed() {
  if (keyCode === UP_ARROW) {
    up = true;
    down = false;
    right = false;
    left = false;
  }
  if (keyCode === DOWN_ARROW) {
    down = true;
    up = false;
    right = false;
    left = false;
  }
  if (keyCode === RIGHT_ARROW) {
    down = false;
    up = false;
    right = true;
    left = false;
  }
  if (keyCode === LEFT_ARROW) {
    down = false;
    up = false;
    right = false;
    left = true;
  }
}

function Snake(x, y) {
  this.x = x;
  this.y = y;
  this.w = 20;

  this.show = function() {
    fill("blue");
    rect(this.x, this.y, this.w, this.w);
  };

  this.diesEdge = function() {
    if (this.y > 700 || this.x > 1000 || this.y < 0 || this.x < 0) {
      fill("red");
      text("Game Over Your Score Was " + score, 500, 350);
      noLoop();

  }
};
  this.diesSelf = function() {
    for(let i=0; i<tails.length-1; i++){
      for(let j=1; j<tails.length-1; j++){
        console.log(tails[i]);
        if(tails[i]===this.x && tails[j]===this.y){
          console.log('dead');
        }
      }

    }
  };
  this.move = function() {
    if (up) {
      this.y = this.y - 20;
    }
    if (down) {
      this.y = this.y + 20;
    }
    if (right) {
      this.x = this.x + 20;
    }
    if (left) {
      this.x = this.x - 20;
    }
  };
  this.eat = function(x, y) {
    if (this.x == x && this.y == y) {
      fruit = new Food();
      if (tails.length < 1) {
        console.log("head");
        let body = new Segment(snake.x - 20, snake.y);
        tails.push(body);
      } else {
        console.log("body");
        let body = new Segment(tails[tails.length - 1].x, snake.y);
        tails.push(body);
      }
      score++;
    }
  };
}

function Segment(x, y) {
  this.x = x;
  this.y = y;
  this.w = 20;

  this.show = function() {
    fill("blue");
    rect(this.x, this.y, this.w, this.w);
  };
}


function Food() {
  this.x = Math.floor(random(0, 49)) * 20;
  this.y = Math.floor(random(0, 34)) * 20;
  this.w = 20;
  this.show = function() {
    fill("red");
    rect(this.x, this.y, this.w, this.w);
  };
}
