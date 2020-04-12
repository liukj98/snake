/*
    工厂模式
*/
//1. 创建管理者（构造函数）
function SquareFactory(){

}

//这个方法是用来初始化小方块的
//设置小方块的样式如背景颜色，大小，位置等
SquareFactory.prototype.initCss = function(square, color, action){
    square.viewContent.style.position = "absolute";
    square.viewContent.style.backgroundColor = color;
    square.viewContent.style.width = square.width + "px";
    square.viewContent.style.height = square.height + "px";
    square.viewContent.style.left = square.x*square.width + "px";
    square.viewContent.style.top = square.y*square.height + "px";
    square.collide = action;
}

//2. 包装创建方块的构造函数
//地板方块的构造函数
SquareFactory.prototype.Floor = function(x, y, color){
    var floor = new Floor(x, y, squareWidth, squareHeight);
    this.initCss(floor, color, collideType.move);
    return floor;
}
//墙方块的构造函数
SquareFactory.prototype.Wall = function(x, y, color){
    var wall = new Wall(x, y, squareWidth, squareHeight);
    this.initCss(wall, color, collideType.die);
    return wall;
}
//蛇头方块的构造函数
SquareFactory.prototype.SnakeHead = function(x, y, color){
    var snakeHead = new SnakeHead(x, y, squareWidth, squareHeight);
    snakeHead.updata(x, y);//更新蛇头位置信息
    this.initCss(snakeHead, color, collideType.die);
    return snakeHead;
}
//蛇身方块的构造函数
SquareFactory.prototype.SnakeBody = function(x, y, color){
    var snakeBody = new SnakeBody(x, y, squareWidth, squareHeight);
    this.initCss(snakeBody, color, collideType.die);
    return snakeBody;
}
//食物方块的构造函数
SquareFactory.prototype.Food = function(x, y, color){
    var food = new Food(x, y, squareWidth, squareHeight);
    food.updata(x, y);
    this.initCss(food, color, collideType.eat);
    return food;
}
//暴露工厂模式的接口 供用户去调用
SquareFactory.create = function(type, x, y, color){
    if(SquareFactory.prototype[type] == "undefined"){
        throw "not this type";
    }
    /**
     * 使包装创建方块的构造函数的原型为工厂模式函数对象 （圣杯模式）
     * 这样的话当你```new包装创建方块的构造函数```时，里的this就可以沿着作用域链找到initCss方法执行
     */
    SquareFactory.prototype[type].prototype = new SquareFactory();
    return new SquareFactory.prototype[type](x, y, color)
}
// var floor = SquareFactory.create("Floor", 1, 1, "grey");