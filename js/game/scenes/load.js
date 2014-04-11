define(['crafty', 'game/assets/loading'], function (Crafty, loading) {
	var playScene = function () {
		console.log('playScene');
		Crafty.scene('play');
	};
	return {
		init : function () {
			Crafty.scene('load', function () {
				loading.init();
				Crafty.load(['/assets/blocks.png', '/assets/play_pause.png'], function () {
					console.log('splicing');
					Crafty.sprite(32, '/assets/blocks.png', {
						blue: [0, 0],
						red: [1,0],
						yellow: [2,0],
						green: [3,0],
						orange: [4,0],
						purple: [5,0],
						black: [6,0],
						grey: [7,0],						
						blueSelected:[0,1],
						redSelected: [1,1],
						yellowSelected: [2,1],
						greenSelected: [3,1],
						orangeSelected: [4,1],
						purpleSelected: [5,1],
						blackSelected: [6,1],
						greySelected: [7,1]
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