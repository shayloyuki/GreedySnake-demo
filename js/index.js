// 手动将所有的模块代码要按照一定的顺序引入
// ===============Tools============================
;(function (window, undefined) {
    // 制作一个工具对象，内部添加多种工具的方法
    var Tools = {
        //获取元素对象的方法
        my$: function (id) {
            return document.getElementById(id);
        },
        // 生成随机整数的方法:范围包含最小值和最大值
        getRandom: function (min, max) {
            min = Math.ceil(min);
            max = Math.floor(max);
            return Math.floor(Math.random() * (max - min + 1)) + min;
        },
        // 生成随机颜色的方法
        colorRandom: function () {
            var r = this.getRandom(0, 255);
            var g = this.getRandom(0, 255);
            var b = this.getRandom(0, 255);
            return "rgb(" + r + "," + g + "," + b + ")";
        }
    };
    window.Tools = Tools;
})(window, undefined)
// ====================Food=======================
;(function (window, undefined) {
    //用class类，生成食物对象 
    class Food {
        //属性：宽、高、颜色、位置
        constructor(option) {
            //实参的数据类型必须是对象。用三元表达式进行判断
            option = option instanceof Object ? option : {};
            //实参有可能是类似数组等对象，因此需要进一步判断
            this.width = option.width || 20;
            this.height = option.height || 20;
            this.color = option.color || "green";
            this.x = option.x || 0;
            this.y = option.y || 0;
            //后续会删除生成的食物元素，因此需要提前存储生成的所有div元素
            this.elements = [];
        }
        //方法1：渲染一个食物元素到地图上
        render(map) {
            // 创建一个div元素
            var ele = document.createElement("div");
            // 设置样式前，随机获取x和y值以及颜色值
            //clientWidth指的是盒子的内边距
            //this指的是food
            this.x = Tools.getRandom(0, map.clientWidth / this.width - 1) * this.width;
            this.y = Tools.getRandom(0, map.clientHeight / this.height - 1) * this.height;
            this.c = Tools.colorRandom();
            // 给该元素添加样式
            ele.style.width = this.width + "px";
            ele.style.height = this.height + "px";
            ele.style.backgroundColor = this.c;
            ele.style.left = this.x + "px";
            ele.style.top = this.y + "px";
            ele.style.position = "absolute";//子绝父相，参考元素是map
            // 把该元素添加到地图中
            map.appendChild(ele);
            //后续会删除生成的食物元素，因此需要将新元素添加到数组中
            this.elements.push(ele);
        }
        //方法2：删除食物元素
        remove(map, i) {
            //获取要被删除的食物的下标i
            //将元素从html结构中删除
            //this指的是food
            map.removeChild(this.elements[i]);
            //把元素从数组中删除，splice()
            this.elements.splice(i, 1);
        }
    }
    window.Food = Food;
})(window, undefined)
// =====================Snake=======================
;(function (window, undefined) {
    //用class类，生成蛇对象
    class Snake {
        //属性：蛇头和普通蛇节的区别在于颜色不同；蛇身由1个蛇头+多个普通蛇节组成
        constructor(option) {
            //实参的数据类型必须是对象。用三元表达式进行判断
            option = option instanceof Object ? option : {};
            // 蛇节：宽度、高度
            this.width = option.width || 20;
            this.height = option.height || 20;
            // 蛇身设置为伪数组：初始位置、蛇头为红色、蛇节为蓝色
            this.body = [
                // x和y为份数
                { x: 3, y: 2, color: "red" },
                { x: 2, y: 2, color: "blue" },
                { x: 1, y: 2, color: "blue" }
            ];
            // 蛇的移动方向，初始设置为向右
            this.direction = "right";
            //后续会删除生成的蛇节元素，因此需要提前存储生成的所有div元素
            this.elements = [];
        }
        //方法1：渲染对应个数的蛇节元素到地图上，组成蛇。
        render(map) {
            // 需要用到for循环遍历蛇身数组
            for (var i = 0, len = this.body.length; i < len; i++) {
                //根据蛇身数组的每一项生成新的蛇节元素
                var piece = this.body[i];
                // 创建一个蛇节div元素
                var ele = document.createElement("div");
                // 添加样式，其中蛇身数组中每一项的位置和颜色不尽相同
                ele.style.width = this.width + "px";
                ele.style.height = this.height + "px";
                ele.style.backgroundColor = piece.color;
                ele.style.left = piece.x * this.width + "px";
                ele.style.top = piece.y * this.height + "px";
                ele.style.position = "absolute";//子绝父相，参考元素是map
                // 把这些蛇节元素添加到地图中
                map.appendChild(ele);
                //后续会删除生成的蛇节元素，因此需要将新元素添加到数组中
                this.elements.push(ele);
            }
        }
        //方法2：蛇运动
        move() {
            // 蛇头带动蛇节移动：即每一个蛇节都要变成上一节的位置
            // 用到for循环，需要从最后一项开始，为了避免前面的数据提前发生变化
            for (var i = this.body.length - 1; i > 0; i--) {
                this.body[i].x = this.body[i - 1].x;
                this.body[i].y = this.body[i - 1].y;
            }
            // 存储蛇头的数据
            var head = this.body[0];
            // 用户可控制蛇头方向，用switch语句匹配
            // 后续需要添加键盘点击事件，是添加到game.js中的
            switch (this.direction) {
                case "right":
                    head.x++;
                    break;
                case "left":
                    head.x--;
                    break;
                case "top":
                    head.y--;
                    break;
                case "bottom":
                    head.y++;
            }
        }
        //方法3：删除上一次渲染到地图中的蛇。因为蛇每吃掉一个食物，蛇身会变长一节，其实是会生成一条新蛇，原来的旧蛇会被删掉。
        remove(map) {
            // 遍历蛇节数组，删除所有的蛇节元素
            //将元素从html结构中删除
            // for循环需要从最后一项开始，为了避免前面的数据提前发生变化
            for (var i = this.elements.length - 1; i >= 0; i--) {
                map.removeChild(this.elements[i]);
            }
            // 清空蛇节数组
            this.elements = [];
        }
    }
    window.Snake = Snake;
})(window, undefined)
// ==================Game====================
;(function (window, undefined) {
    //用class类，生成游戏对象
    // 定义一个全局变量，存储 this
    var that;
    class Game {
        // 存储3个属性：地图，分别生成食物、蛇对象，
        constructor(map) {
            // this的指向是Game
            this.map = map;
            this.food = new Food();
            this.snake = new Snake();
            // 存储this指向的Game，方便后续调用
            that = this;
        }
        // 方法：游戏开始（初始化蛇和食物）
        start() {
            // 1、添加食物和蛇到地图上
            this.snake.render(this.map);
            // 游戏升级：添加3个食物
            this.food.render(this.map);
            this.food.render(this.map);
            this.food.render(this.map);
            // 2、让游戏逻辑开始
            // 2.1、让蛇自动运动
            runSnake();
            // 2.2、通过键盘箭头控制蛇的运动方向
            bindKey();
        }
    }
    // 让蛇自动运动的函数
    function runSnake() {
        // 开启一个定时器，让蛇连续运动起来
        var timer = setInterval(function () {
            // 定时器函数内部的 this 指向的是 window。应该设置为指向Game
            // 在Game属性中定义了that变量，用来存储Game对象
            // 1、让蛇运动起来
            that.snake.move();
            // 2、删除上一次的蛇
            that.snake.remove(that.map);
            // 3、渲染新位置的蛇
            that.snake.render(that.map);

            // 存储最大的位置：份数
            var maxX = that.map.offsetWidth / that.snake.width;
            var maxY = that.map.offsetHeight / that.snake.height;
            // 存储当前蛇头的位置：份数
            var headX = that.snake.body[0].x;
            var headY = that.snake.body[0].y;
            // 存储当前蛇头的具体坐标位置：px值
            var hX = headX * that.snake.width;
            var hY = headY * that.snake.height;

            // 4、蛇每移动一次，都要判断一下是否吃到食物了
            // 判断标准：食物的偏移位置是否等于蛇头的px值位置
            // 用for循环将食物数组中每一个都要进行对比，因为后续要调用食物元素的方法

            // offsetLeft和offsetTop指的是偏移位置
            for (var i = 0; i < that.food.elements.length; i++) {
                if (that.food.elements[i].offsetLeft === hX && that.food.elements[i].offsetTop === hY) {
                    // 吃到了食物时：
                    // 4.1 删除这个食物
                    that.food.remove(that.map, i);
                    // 4.2 渲染一个新的食物元素
                    that.food.render(that.map);
                    // 4.3 添加一个新的蛇节
                    var last = that.snake.body[that.snake.body.length - 1];
                    that.snake.body.push({
                        x: last.x,
                        y: last.y,
                        color: last.color
                    });
                }
            }

            // 5、蛇每移动一次，都要判断是否超出了地图，游戏是否结束
            if (headX < 0 || headX >= maxX || headY < 0 || headY >= maxY) {
                // 停止定时器
                clearInterval(timer);
                // 结束游戏
                alert("Game over");
            }
        }, 150);
    }
    // 键盘箭头控制蛇的运动方向的函数
    function bindKey() {
        // 添加键盘按下事件onkeydown
        document.onkeydown = function (e) {
            // console.log(e.keyCode);
            // 键盘的编码
            // 37 -- left
            // 38 -- top
            // 39 -- right
            // 40 -- bottom
            switch (e.keyCode) {
                case 37:
                    // 这里的this指向是document.应该设置为指向Game
                    // 在Game属性中定义了that变量，用来存储Game对象
                    that.snake.direction = "left";
                    break;
                case 38:
                    // 这里的this指向是document.应该设置为指向Game
                    // 在Game属性中定义that变量，用来存储Game对象
                    that.snake.direction = "top";
                    break;
                case 39:
                    // 这里的this指向是document.应该设置为指向Game
                    // 在Game属性中定义that变量，用来存储Game对象
                    that.snake.direction = "right";
                    break;
                case 40:
                    // 这里的this指向是document.应该设置为指向Game
                    // 在Game属性中定义that变量，用来存储Game对象
                    that.snake.direction = "bottom";
                    break;
            }
        };
    }
    window.Game = Game;
})(window, undefined)
// ===================Main===================
;(function (window, undefined) {
    // 获取元素
    var map = Tools.my$("map");
    // 生成游戏实例
    var game = new Game(map);
    // 调用开始游戏的方法
    game.start();
})(window, undefined)