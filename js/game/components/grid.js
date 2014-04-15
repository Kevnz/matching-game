define(['crafty','game/game'], function (Crafty, Game) {
    var ANIMATION_SPEED = Game.animation_speed;
    return {
        init : function () {
            Crafty.c('Grid', {
                init: function() {
                    this.requires('Tween');
                },
                at: function(row, column) {
                    var tempX = row + 1, tempY = column + 1;

                    this.attr({gridX: row, gridY: column });

                    if (row === undefined && column === undefined) {
                      return { x: (1+this.x)/Game.map_grid.tile.width,y: (this.y+1)/Game.map_grid.tile.height }
                    } else {
                      this.attr({ x: (row + 1) * Game.map_grid.tile.width, y: (column + 1) * Game.map_grid.tile.height });
                      return this;
                    }
                },
                isAdjacent: function (entity) {
                    var isAboveOrBelow = (this.gridX === entity.gridX -1 || this.gridX === entity.gridX + 1) && this.gridY === entity.gridY;
                    var isBeside = (this.gridY === entity.gridY -1 || this.gridY === entity.gridY + 1) && this.gridX === entity.gridX;
                    return isAboveOrBelow || isBeside;
                },
                tweenTo: function (column, row, time){
                    if(!time) time = ANIMATION_SPEED;
                    if(!row) row = this.gridX;

                    this.attr({gridX: row, gridY:column });
                    this.tween({ x: row * Game.map_grid.tile.width, y: column * Game.map_grid.tile.height }, time);
                },
                tweenWithGrid: function (column, row, time) {
                    if(!time) time = ANIMATION_SPEED;

                    this.attr({gridX: row, gridY:column });
                    this.tween({ x: (1+ row) * Game.map_grid.tile.width, y: (1+column) * Game.map_grid.tile.height }, time);

                }
            });
        }
    };
});