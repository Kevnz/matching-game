define(['crafty', 'game/assets/loading'], function (Crafty, loading) {
	return {
		init : function (scene) {
			Crafty.scene('loading', function () {
				loading.init();
				Crafty.load(['/assets/blocks.png'], function () {
					//splice the spritemap

				});
				Crafty.scene(scene);
			});
		}
	};
});