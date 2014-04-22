define(['crafty', 'game/assets/loading','game/components/display', 'game/game'], function (Crafty, loading, Display, Game) {
	var playScene = function () {
		console.log('playScene');
		Crafty.scene('play');
	};
	return {
		init : function () {
			
			Crafty.scene('load', function () {
				Crafty.load(['/assets/gems.png', '/assets/play_pause.png'], function () {
					Crafty.sprite(72, '/assets/gems.png', {
						blue: [5, 0],
						red: [1,0],
						yellow: [3,0],
						green: [4,0],
						orange: [2,0],
						purple: [6,0],
						black: [7,0],
						grey: [0,0],
						power: [2.5, 0],
						blueSelected:[5,1],
						redSelected: [1,1],
						yellowSelected: [3,1],
						greenSelected: [4,1],
						orangeSelected: [2,1],
						purpleSelected: [6,1],
						blackSelected: [7,1],
						greySelected: [0,1],
						power: [2.5, 1]
					});
					Crafty.sprite(128, '/assets/play_pause.png', {
						play: [0, 0],
						pause: [1,0]
					});
					Crafty.e("2D, DOM, HTML, Mouse")
				      .attr({ w: Game.width() / 2, h: Game.height(), x: Game.width() / 2 - 155, y: Game.width() / 2})
				      .replace('<div class="btn green">START GAME</div>')
				      .bind('MouseDown', function (e) {
			           	Display.init();
                        Crafty("2D").destroy();
                        Crafty.scene('play');
			        });
				});
			});
		}
	};
});