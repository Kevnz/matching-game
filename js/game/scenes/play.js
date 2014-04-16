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
                // var stand = Platform.init(Game.width() - 220);
				Grid.init();

                /*
                var reds = Grid.sift();

                for(var i = 0; i < reds.length; i++) {
                    console.log(reds[i]);
                    reds[i].tween({alpha:0.0}, 500);
                    //Grid.debug(reds[i].gridX, reds[i].gridY);
                }
                */

				Grid.sift();
                Grid.fall();
				//Grid.debug(3, 8);
                //Grid.fall();
                //Grid.debug(2, 8);
                //Grid.debug(9, 3);
                ///Grid.debug(11,11);

				//Grid.debug(0,0);
				/*
				Crafty.bind('EnterFrame', function (data) {
					//if(data.frame % 20 === 0) Grid.scan();
				});
				Grid.scan();
                 */
				// Crafty.bind('timeup', function () {

				// 	stand.destroy();

				// })
				//Grid.scan();

 			});
		}
	};
});