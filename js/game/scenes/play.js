define(['crafty', 
		'game/entities/grid', 
		'game/entities/scoreboard', 
		'game/entities/clock',
		'game/entities/platform'
		], 
	function (Crafty, Grid, Scoreboard, Clock, Platform) {


	return {
		init : function () {
			Crafty.scene('play', function () { 
                Scoreboard.init();
                Clock.init();
                var stand = Platform.init();
				Grid.init();
				Grid.newScan();
				//Grid.debug(3, 8);
				//Grid.debug(0,0);
				/*
				Crafty.bind('EnterFrame', function (data) {
					//if(data.frame % 20 === 0) Grid.scan();
				});
				Grid.scan();
				Crafty.bind('timeup', function () {
					stand.destroy();
				})
				//Grid.scan();
				*/
 			});
		}
	};
});