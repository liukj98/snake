var game = new Game();
game.timer = null;//定时器
game.score = 0;//分数

game.init = function(){
    ground.init();
    snake.init();
    createFood();

    document.onkeydown = function(e){
        if(e.which == 37 && snake.direction !== directionNum.right){//向左 并且蛇此时移动的方向不为右
            snake.direction = directionNum.left;
        }else if(e.which == 39 && snake.direction !== directionNum.left){//向右 并且蛇此时移动的方向不为左
            snake.direction = directionNum.right;
        }else if(e.which == 38 && snake.direction !== directionNum.bottom){//向上 并且蛇此时移动的方向不为下
            snake.direction = directionNum.top;
        }else if(e.which == 40 && snake.direction !== directionNum.top){//向下 并且蛇移动的方向不为上
            snake.direction = directionNum.bottom;
        }
    }
    var btn = document.getElementsByClassName("btn")[0];
    span.innerText = this.score;
    btn.onclick = function(){
        game.start();
    }

}

game.start = function(){
    this.timer = setInterval(() => {
        snake.getCollideSquare();
    }, intervalTime)
}

game.over = function(){
    clearInterval(this.timer);
    alert("Game Over");
    game.init();
    span.innerText = 0;
    game.score = 0;
}

/**
 * 该函数主要用来产生一个随机食物
 */
function createFood(){
    var x = null;
    var y = null;

    var flag = true;
    while(flag){

        x = Math.round(Math.random()*(td - 3) + 1);//食物的横坐标
        y = Math.round(Math.random()*(tr - 3) + 1);//食物的纵坐标

        var ok = true;
        for(var node = snake.head; node; node = node.next){
            if(x == node.x && y == node.y){//食物的坐标在蛇身上就终止循环 然后重新生成食物的坐标
                ok = false;
                break;
            }
        }   
        if(ok){
            flag = false;//终止产生食物坐标的循环
        }
    }
    var food = SquareFactory.create("Food", x, y, "red");
    ground.remove(x, y);
    ground.append(food);
}

game.init();