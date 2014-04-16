define(['crafty', 'game/game', 'game/components/display'], function (Crafty, Game, Display) {
    return {
        init : function () {
            Crafty.scene('end', function () {
                Display.init();
                var TheEnd = Crafty.e('Display').text('The End').attr({x:200, y:200}).textFont({
                    family: Game.text['font-family'],
                    size: 72
                });
            });
        }
    };
});