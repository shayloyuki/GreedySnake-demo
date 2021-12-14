(function (window, undefined) {
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
})(window, undefined);