define(['crafty', 'game/game','game/scenes/load', 'game/scenes/play','game/scenes/test'], 
	function (Crafty, Game, load, play, test) {
	return {
		start : function () {
			Crafty.init(Game.width(), Game.height());
			Crafty.canvas.init();
			//Crafty.background('#E4EBEA');

			test.init();
			play.init();
			load.init();
			Crafty.scene('load');
		}
	};
});