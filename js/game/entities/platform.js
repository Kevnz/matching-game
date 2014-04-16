define(['crafty', 'game/game'], function (Crafty, Game) {
	return {
		init : function (width) {
            return Crafty.e('2D, Stand, Platform, Collision, Color, Canvas, WiredHitBox')
            	.attr({x:70, y:Game.height()- 72, w: width, h:40})
            	.color(('#FF0000'));
		}
	};
});