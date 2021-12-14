(function (window, undefined) {
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
})(window, undefined);