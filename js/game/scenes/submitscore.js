define(['crafty', 'game/game', 'game/scenes/leaderboard', 'game/entities/scoreboard'], function (Crafty, Game, Leaderboard, Scoreboard) {
	return {
		init : function () {
            Crafty.defineScene("submitscore", function() {
				Crafty.background("#2ECC71");
				Crafty.e("2D, DOM, HTML, Mouse")
				      .attr({ w: Game.width() / 2, h: Game.height(), x: Game.width() / 2 - 155, y: 0})
				      .replace('<h3>Submit Score</h3><label for"email">Email Address</label><br /><input type="text" id="email"/>');

				Crafty.e("2D, DOM, HTML, Mouse")
					.attr({ w: Game.width() / 2, h: 50, x: Game.width() / 2 - 155, y: 200})
					.replace('<div class="btn green">Submit</div>')
					.bind('MouseDown', function (e) {
						var userEmail = $('#email').val();
						sendScore(Scoreboard.getScore(), Scoreboard.getScoreLog(), userEmail, function(data){
							console.log(data);
							Crafty("2D").destroy();
							Leaderboard.init();
						});
					});
			});
			Crafty.enterScene("submitscore");

			var sendScore = function(score, scoreLog, userEmail, callback){

				callback = callback || function (data) {};

				var scorelogString = scoreLog.join(',');
				var encodedScoreLog = btoa(scorelogString);

				$.ajax({
					type: "GET",
					//type: "POST",
					url: "gamesubmit.php",
					//url: "index.html",
					data: { score: score, scoreLog: encodedScoreLog, email: userEmail }
				})
				.done(function( msg ) {
					callback(msg);
				})
				.fail(function( msg ) {
					//Still need do deal with error....
					callback(msg);
				});

			}
		}
	};
});