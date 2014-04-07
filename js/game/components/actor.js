define(['crafty', 'game/components/grid'], function (Crafty, Grid) {

    return {
        init : function () {
            Grid.init();
            Crafty.c('Actor', {
                init: function() {
                    console.log('test')
                    this.requires('2D, Canvas, Grid');
                },
            });
        }
    };
});