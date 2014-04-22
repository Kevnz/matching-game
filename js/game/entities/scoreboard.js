define(['crafty', 'game/game', 'game/components/display'], function (Crafty, Game, Display) {
	var score = 0;
      var scoreLog = [];

	return {
            getScore: function() {
                  return score;
            },
            getScoreLog: function() {
                  return scoreLog;
            },
            uninit : function () {
                  Crafty.unbind('scored');
            },
		init : function () {
            score = 0;
            scoreLog = [];
            Display.init(Game.width()/2 - 45, 20)

            var scoreboard = Crafty.e('Display').text('Score: 0');
            Crafty.bind('scored', function (e){
            	score = (e+score);
            	scoreboard.text('Score: ' + score);
            	console.log('score')

                  var dt = new Date();
                  scoreLog.push(e + ':' + dt.getTime());

                  if(score % 500 == 0){
                        Crafty.trigger('addTime', 30);
                        Crafty.trigger('showComment', 2);
                  }
            });


		}
	};
});