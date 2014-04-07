define(['crafty', 'game/game','game/scenes/load', 'game/scenes/play','game/scenes/test'], 
	function (Crafty, Game, load, play, test) {
	return {
		start : function () {
			Crafty.init(Game.width(), Game.height(), document.getElementById('game'));
			Crafty.canvas.init();
			Crafty.background('#E4EBEA');
			Crafty.sprite(16, '/assets/blocks.png', {
				blue: [0, 0],
				red: [1,0],
				yellow: [2,0],
				green: [3,0],
				orange: [4,0],
				purple: [5,0],
				black: [6,0],
				grey: [7,0],
				selector: [8,0]

			});
			test.init();
			play.init();
			load.init('play');
			Crafty.scene('loading')
		}
	};
});