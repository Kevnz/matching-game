define(['crafty', 'game/game', 'game/components/display'], function (Crafty, Game, Display) {
	var score = 0;

	return {
            getScore: function() {
                  return score;
            },
		init : function () {
            score = 0;
            Display.init(Game.width()/2 - 45, 20)

            var scoreboard = Crafty.e('Display').text('Score: 0');
            Crafty.bind('scored', function (e){
            	score = (e+score);
            	scoreboard.text('Score: ' + score);
            	console.log('score')

                  if(score % 500 == 0)
                        Crafty.trigger('addTime', 30);

            });


		}
	};
});