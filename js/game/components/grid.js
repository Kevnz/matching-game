define(['crafty','game/game'], function (Crafty, Game) {
    return {
        init : function () {
            Crafty.c('Grid', {
                init: function() {
                    console.log('grid initter')
                },
                at: function(x, y) {
                    console.log('x,y at');
                    if (x === undefined && y === undefined) {
                      return { x: this.x/Game.map_grid.tile.width, y: this.y/Game.map_grid.tile.height }
                    } else {
                      this.attr({ x: x * Game.map_grid.tile.width, y: y * Game.map_grid.tile.height });
                      return this;
                    }
                }
});
        }
    };
});