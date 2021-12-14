(function (window, undefined) {
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
})(window, undefined);

