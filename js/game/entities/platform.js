define(['crafty', 'game/game'], function (Crafty, Game) {
	return {
		init : function () {
			console.log('Platform')
            return Crafty.e('Stand, Platform, Collision, Color, Canvas, WiredHitBox')
            	.attr({x:0, y:Game.height()- 72, w: Game.width(), h:25})
            	.color(('#FF0000'));
		}
	};
});