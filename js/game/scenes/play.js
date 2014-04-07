define(['crafty', 'game/entities/grid', 'game/entities/scoreboard', 'game/entities/clock'], function (Crafty, Grid, Scoreboard, Clock) {


	return {
		init : function () {
			Crafty.scene('play', function () {
				console.log('play ball');
                Scoreboard.init();
                Clock.init();
				Grid.init();

 			});
		}
	};
});