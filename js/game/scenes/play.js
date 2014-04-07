define(['crafty', 'game/entities/grid'], function (Crafty, Grid) {


	return {
		init : function () {
			Crafty.scene('play', function () {
				console.log('play ball');
				Grid.init();

 			});
		}
	};
});