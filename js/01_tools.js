(function (window, undefined) {
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
})(window, undefined);