define(['crafty', 'game/game'], function (Crafty, Game) {
	return {
		init : function () {
			Crafty.scene('test', function () {
				console.log('test')
				Crafty.e('2D, Canvas, blue').attr({
					x:Game.width()/2 - 60, 
					y: Game.height()/2 - 24});
			});
		}
	};
});