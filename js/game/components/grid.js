define(['crafty','game/game'], function (Crafty, Game) {
    return {
        init : function () {
            Crafty.c('Grid', {
                init: function() {
                    this.requires('Tween');
                },
                at: function(x, y) {
                    this.attr({gridX: x, gridY:y });

                    if (x === undefined && y === undefined) {
                      return { x: this.x/Game.map_grid.tile.width, y: this.y/Game.map_grid.tile.height }
                    } else {
                      this.attr({ x: x * Game.map_grid.tile.width, y: y * Game.map_grid.tile.height });
                      return this;
                    }
                },
                isAdjacent: function (entity) {
                    var isAboveOrBelow = (this.gridX === entity.gridX -1 || this.gridX === entity.gridX + 1) && this.gridY === entity.gridY;
                    var isBeside = (this.gridY === entity.gridY -1 || this.gridY === entity.gridY + 1) && this.gridX === entity.gridX;
                    return isAboveOrBelow || isBeside;
                },
                tweenTo: function (column, row, time){
                    if(!time) time = 300
                    if(!row) row = this.gridX;

                    this.attr({gridX: row, gridY:column });
                    this.tween({ x: row * Game.map_grid.tile.width, y: column * Game.map_grid.tile.height }, time);
                },
                tweenWithGrid: function (column, row, time) {
                    this.attr({gridX: row, gridY:column });
                    this.tween({ x: (1+ row) * Game.map_grid.tile.width, y: (1+column) * Game.map_grid.tile.height }, time);

                },
                tweenSwap: function(brick1, brick2) {
                    var x1 = brick1.x, x2 = brick2.x, y1 = brick1.y, y2 = brick2.y2;

                    brick1.tween({x:x2, y:y2});
                    brick2.tween({x:x1, y:y1});
                },
                slide: function (){
                    console.log('this y', this.y);
                    this.attr({gridY:(this.y + Game.map_grid.tile.height)/Game.map_grid.tile.height })
                    this.tween({ y: this.y + Game.map_grid.tile.height }, 300)
                }
            });
        }
    };
});