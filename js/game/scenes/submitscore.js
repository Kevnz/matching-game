define(['crafty', 'game/game', 'game/scenes/leaderboard'], function (Crafty, Game, Leaderboard) {
	return {
		init : function () {
            Crafty.defineScene("submitscore", function() {
				Crafty.background("#2ECC71");
				Crafty.e("2D, DOM, HTML, Mouse")
				      .attr({ w: Game.width() / 2, h: Game.height(), x: Game.width() / 2 - 155, y: 0})
				      .replace('<h3>Submit Score</h3><label for"email">Email Address</label><br /><input type="text" /><br /><br /><div class="btn green">Submit</div>')
				      .bind('MouseDown', function (e) {
                        Crafty("2D").destroy();
                        Leaderboard.init();
                    });
			});
			Crafty.enterScene("submitscore");
		}
	};
});