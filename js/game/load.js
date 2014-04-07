define(['crafty', 'game/assets/loading'], function (Crafty, loading) {
	return {
		init : function (scene) {
			Crafty.scene('loading', function () {
				loading.init();
				Crafty.load(['/assets/blocks.png'], function () {
					//splice the spritemap
					Crafty.sprite(16, '/assets/blocks.png', {
						blue: [0, 0],
						red: [0,1],
						yellow: [0,2],
						green: [0,3],
						selected: [0,4]
					});
				});
				Crafty.scene(scene);
			});
		}
	};
});