define(['crafty', 'game/game','game/entities/brick'], 
	function (Crafty, Game, Brick) {
	
	var rows = 12;
	var cols = 14;
	var randomSprite = function () {
		var to = 7, from = 0;
		var random = Math.floor(Math.random() * (to - from + 1) + from);

		var sprites = ['red', 'blue', 'green', 'yellow','black', 'purple', 'orange', 'grey'];

		return sprites[random];
	}

	return {
		init : function () {
			var tile = 16; 
			for (var j = 1; j <= rows ; j++) {			
				for (var i = 1; i <= cols; i++) { 
					Brick.init(randomSprite(), i, j );
				};
			};
 
		}

	};
});