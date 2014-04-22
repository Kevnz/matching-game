define(['crafty', 
		'game/entities/grid', 
		'game/entities/scoreboard', 
		'game/entities/clock',
		'game/entities/platform',
		'game/game'
		], 
	function (Crafty, Grid, Scoreboard, Clock, Platform, Game) {

	return {
		init : function () {
			Crafty.scene('play', function () { 
                Scoreboard.init();
                Clock.init();
				Grid.init();

				Grid.sift();
                Grid.fall();
 			});
		}
	};
});