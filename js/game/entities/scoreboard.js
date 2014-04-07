define(['crafty', 'game/game', 'game/components/display'], function (Crafty, Game, Display) {
	return {
		init : function () {
            Display.init(Game.width()/2 - 32, 5)

            Crafty.e('Display').text('Score: 0');
		}
	};
});