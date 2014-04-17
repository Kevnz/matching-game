define(['crafty', 'game/assets/loading'], function (Crafty, loading) {
	var playScene = function () {
		console.log('playScene');
		Crafty.scene('play');
	};
	return {
		init : function () {
			Crafty.scene('load', function () {
				loading.init();
				Crafty.load(['/assets/gems.png', '/assets/play_pause.png'], function () {
					console.log('splicing');
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
					setTimeout(playScene, 2000);
				});

				//
				//
			});
		}
	};
});