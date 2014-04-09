define(['crafty', 'game/components/grid'], function (Crafty, Grid) {

    return {
        init : function () {
            Grid.init();
            Crafty.c('Actor', {
                init: function() { 
                    this.requires('2D, Canvas, Grid, Collision');
                }
            });
        }
    };
});