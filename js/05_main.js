// index主页的js代码
(function (window, undefined) {
    // 获取元素
    var map = Tools.my$("map");
    // 生成游戏实例
    var game = new Game(map);
    // 调用开始游戏的方法
    game.start();
})(window, undefined);