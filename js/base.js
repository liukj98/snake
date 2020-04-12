// 基础库 封装一些工具方法 有三个方法 分别为 继承 扩展 单例
var tool = {
    // 继承 （圣杯模式）
    /**
     * @param {*} Target 目标对象
     * @param {*} Origin 源对象
     */
    inherit: function(Target, Origin){ 
        var F = function(){};
        F.prototype = Origin.prototype;
        Target.prototype = new F();
        Target.prototype.constructor = Target;
    },
    //扩展 根据Origin增加了一些自己的（实例）属性
    extends: function(Origin){
        var Target = function(){
            Origin.apply(this, arguments)
        }
        this.inherit(Target, Origin);
        return Target;
    },
    //单例
    single: function(Origin){
        var SingleRes = (function(){
            var instance; //单例
            return function(){
                if(typeof instance === "object"){
                    return instance;
                }
                Origin && Origin.apply(this, arguments);
                instance = this;
            }
        }())
        Origin && this.inherit(SingleRes, Origin);
        return SingleRes;
    }
}

// function Square(x, y, width, height){
//     this.x = x;
//     this.y = y;
//     this.width = width;
//     this.height = height;
// }

// var Food = tool.extends(Square);
// var food = new Food(10, 10, 100, 100);

// var Food = tool.single(Square)
// var food = new Food(10, 10, 100, 100);
// var food1 = new Food(10, 10, 100, 100);
// console.log(food == food1)


