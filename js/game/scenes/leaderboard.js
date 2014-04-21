define(['crafty', 'game/game'], function (Crafty, Game) {
	return {
		init : function () {
            Crafty.defineScene("leaderboard", function() {
				Crafty.background("#2ECC71");
				Crafty.e("2D, DOM, HTML")
				      .attr({ w: Game.width(), h: Game.height(), x: 0, y: 0})
				      .replace('<h3>Leaderboard</h3><table cellpadding="0" cellspacing="0"><tr><td class="position"><h4>1</h4></td><td><span class="name">Barry</span><br />12345</td></tr><tr><td class="position"><h4>2</h4></td><td><span class="name">John</span><br />1234</td></tr><tr><td class="position"><h4>3</h4></td><td><span class="name">Emma</span><br />123</td></tr></table>')
			});
			Crafty.enterScene("leaderboard");
		}
	};
});