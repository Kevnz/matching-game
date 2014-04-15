define(['crafty', 'game/game','game/scenes/load', 'game/scenes/play','game/scenes/end'],
	function (Crafty, Game, load, play, end) {
	return {
		start : function () {
			Crafty.init(Game.width(), Game.height());
			Crafty.canvas.init();
			//Crafty.background('#E4EBEA');

			play.init();
			load.init();
            end.init();
			Crafty.scene('load');
            //final scene?
            Crafty.bind('timeup', function (){
                Crafty.scene('end');
            })
		}
	};
});