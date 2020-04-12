var snake = new Snake();
snake.head = null;//存储蛇头相关的信息
snake.tail = null;//存储蛇身相关的信息

snake.init = function(){
    var snakeHead = SquareFactory.create("SnakeHead", 3, 1, "deeppink");//蛇头
    var snakeBody1 = SquareFactory.create("SnakeBody", 2, 1, "green");//蛇身
    var snakeBody2 = SquareFactory.create("SnakeBody", 1, 1, "green");//蛇身

    snake.head = snakeHead;//将蛇头信息保存到全局上，方便使用
    snake.tail = snakeBody2;//将蛇身信息保存到全局上，方便使用

    ground.remove(snakeHead.x, snakeHead.y);//在添加蛇头之前移除蛇头位置对应的地板方块
    ground.append(snakeHead);

    ground.remove(snakeBody1.x, snakeBody1.y);//在添加蛇身之前移除蛇身位置对应的地板方块
    ground.append(snakeBody1);

    ground.remove(snakeBody2.x, snakeBody2.y);//在添加蛇身之前移除蛇身位置对应的地板方块
    ground.append(snakeBody2);  
    
    //通过双向链表的数据结构建立蛇头和蛇身之间的联系
    snakeHead.next = snakeBody1;
    snakeHead.last = null;
    snakeBody1.next = snakeBody2;
    snakeBody1.last = snakeHead;
    snakeBody2.next = null;
    snakeBody2.last = snakeBody1;

    //给蛇添加一个移动的方向属性direction
    this.direction = directionNum.right;
}

//获取蛇移动的下一个方块信息 以此来判断时继续走还是死亡还是吃食物
snake.getCollideSquare = function(){
    var nextSquare = ground.squaretable[snake.head.y + this.direction.y][snake.head.x + this.direction.x]
    this.collideMethod[nextSquare.collide](nextSquare);
}

//蛇与下一个方块碰撞的方法的集合
snake.collideMethod = {
    move: function(square, boolean){
        //创建蛇身
        var newBody = SquareFactory.create("SnakeBody", snake.head.x, snake.head.y, "green");
        //更新双向链表
        newBody.next = snake.head.next;
        newBody.last = null;
        newBody.next.last = newBody;

        ground.remove(snake.head.x, snake.head.y)
        ground.append(newBody);

        //创建蛇头
        var newHead = SquareFactory.create("SnakeHead", square.x, square.y, "deeppink");
        //更新双向链表
        newHead.next = newBody;
        newHead.last = null;
        newBody.last = newHead;

        ground.remove(square.x, square.y);
        ground.append(newHead);

        snake.head = newHead;//更新一下蛇头

        if(!boolean){//删除蛇的尾巴
            var floor = SquareFactory.create("Floor", snake.tail.x, snake.tail.y, "grey");
            ground.remove(snake.tail.x, snake.tail.y);
            ground.append(floor);
            snake.tail = snake.tail.last; //更新一下蛇尾
        }
        
    },
    eat: function(square){
        this.move(square, true);
        game.score ++;
        span.innerText = game.score;
        createFood();
    },
    die: function(square){
        game.over();
    }
}

// snake.init();
// snake.getCollideSquare()