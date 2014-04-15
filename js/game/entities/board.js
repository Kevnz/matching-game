define(['crafty', 'game/game'], function (Crafty, Game) {
    return {
        init : function () {
            console.log('Board');
            return Crafty.e('Board')

                .attr({})
                .color(('#FF0000'));
        }
    };
});