var ground = new Ground(positionX, positionY, td*squareWidth, tr*squareHeight)
ground.init = function(){
    var container = this.viewContent;
    container.style.position = "absolute";
    container.style.left = this.x + "px";
    container.style.top = this.y + "px";
    container.style.width = this.width + "px";
    container.style.height = this.height + "px";
    container.style.backgroundColor = "orange";
    document.body.appendChild(container);

    //将场景中小方块存储到ground对象的squaretable属性中
    //该属性为一个二维数组
    this.squaretable = [];

    /**
     * x 横轴 表示列
     * y 纵轴 表示行
     */
    for(var y = 0; y < tr; y++){
        this.squaretable[y] = new Array(td);
        for(var x = 0; x < td; x++){
            if(y == 0 || (y == tr - 1) || x == 0 || (x == td - 1)){//围墙
                var newSquare = SquareFactory.create("Wall", x, y, "rgb(141, 52, 52)")
            }else{//地板
                var newSquare = SquareFactory.create("Floor", x, y, "grey")
            }
            container.appendChild(newSquare.viewContent);
            this.squaretable[y][x] = newSquare;
        }
    }
}

//移除指定位置的方块
ground.remove = function(x, y){
    //从场景（ground）的squaretable中获取指定位置的方块对象
    var curSquare = this.squaretable[y][x];
    //在DOM中移除
    this.viewContent.removeChild(curSquare.viewContent)
    //在squaretable中移除
    this.squaretable[y][x] = null;
}

//添加指定方块（方块中已经包含了要添加到的指定位置）
ground.append = function(square){
    //在DOM中添加
    this.viewContent.appendChild(square.viewContent);
    //在squaretable中添加
    this.squaretable[square.y][square.x] = square;
}

// ground.init()
