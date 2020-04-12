/*
    1. 初始化一些变量(位置，格子的宽高等)
    2. 构造一个最基础的格子函数，它是游戏场景中所有元素的超类（基类）
*/

//游戏场地的位置（坐标）
var positionX = 200,
    positionY = 100;

//游戏场地的大小（单位为一个格子）
var td = 30, //列，30个格子
    tr = 30; //行，30个格子

//每个格子的大小（宽，高）
var squareWidth = 20, //宽
    squareHeight = 20; //高

//蛇移动的方向（上下左右）信息
var directionNum = {
    left: {
        x: -1,
        y: 0
    },
    right: {
        x: 1,
        y: 0
    },
    top: {
        x: 0,
        y: -1,
    },
    bottom: {
        x: 0,
        y: 1
    }
}

//蛇移动后碰撞处理的类型
var collideType = {
    move: "move",
    eat: "eat",
    die: "die"
}

//蛇移动的时间间隔
var intervalTime = 100;

//构建一个基础的格子函数 作为超类 供其它子类继承
function Square(x, y, width, height, dom){
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.viewContent = dom || document.createElement("div");
}

//用来更新蛇头的位置信息
Square.prototype.updata = function(x, y){
    this.x = x;
    this.y = y;
    this.viewContent.style.left = x*squareWidth + "px";
    this.viewContent.style.top = x*squareHeight + "px";
}

//构造整个场景的函数继承自基础格子函数，使用单例模式，因为整个场景就一个
var Ground = tool.single(Square);

var Floor = tool.extends(Square);//地板
var Wall = tool.extends(Square);//墙

var SnakeHead = tool.single(Square);//蛇头
var SnakeBody = tool.extends(Square);//蛇身
var Snake = tool.single();//蛇

var Game = tool.single();//游戏
var Food = tool.single(Square);//食物

var span = document.getElementsByTagName("span")[0]

