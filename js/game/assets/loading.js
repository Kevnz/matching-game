define(['crafty', 'game/game'], function (Crafty, Game) {
	console.log(Game);
	return {
		init : function () {
			var txt = Crafty.e('2D, Canvas, Text')
    			.text('Loading...')
    			.attr({ x:Game.width()/2 - 60, y: Game.height()/2 - 24, w: Game.width() });
    		txt.textFont({ 
    			family: Game.text['font-family'], 
    			size: Game.text['font-size']
    		});
    		return txt;
		}
	};
});