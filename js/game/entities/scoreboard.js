define(['crafty', 'game/game', 'game/components/display'], function (Crafty, Game, Display) {
	var score = 0;
	return {
		init : function () {
            Display.init(Game.width()/2 - 32, 5)

            var scoreboard = Crafty.e('Display').text('Score: 0');
            Crafty.bind('scored', function (e){
            	score = (e+score);
            	scoreboard.text('Score: ' + score);
            	console.log('score')
            });

		}
	};
});