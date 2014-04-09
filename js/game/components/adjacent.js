define(['crafty','game/game'], function (Crafty, Game) {
    return {
        init : function () {
            Crafty.c('Adjacent', {
                init: function() {
                    
                },
                at: function(x, y) {
                    this.attr({gridX: x, gridY: y});

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