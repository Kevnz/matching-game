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
	var gameGrid = [rows];
	return {
		init : function () { 
			for (var j = 1; j <= rows ; j++) {
				gameGrid[j-1] = [cols]			
				for (var i = 1; i <= cols; i++) { 
					gameGrid[j-1][i-1] =  Brick.init(randomSprite(), i, j );
				};
			};


 
		},
		scan: function () {
			//console.log('scan');
			console.dir(gameGrid);
			for (var j = 0; j <  rows ; j++) {
				 		
				for (var i = 0; i < cols; i++) { 
					var brick = gameGrid[j][i]; 
					var above = gameGrid[j-1] ? gameGrid[j-1][i] : { color:'NONE' }; 
					var toLeft = gameGrid[j][i-1];
					var toRight = gameGrid[j][i+1];
					var below = gameGrid[j+1] ? gameGrid[j+1][i] : { color:'NONE' };
					if(!above) {
						above = { color:'NONE' };
					}
					if(!below) {
						below = { color:'NONE' };
					}
					if(!toLeft) {
						toLeft = { color:'NONE' };
					}
					if(!toRight) {
						toRight = { color:'NONE' };
					}
					if(!brick) {
						brick = { color:'NONE' };
					}
					//console.log(above.color == brick.color && brick.color == below.color) 
					//console.log(toLeft.color == brick.color && brick.color == toRight.color)

					if( above.color == brick.color && brick.color == below.color) {
						console.log('match above below');
						//console.log(above)
						//console.log(brick)
						//console.log(below)
						above.destroy();
						brick.destroy();
						below.destroy();

					} else if( toLeft.color == brick.color && brick.color == toRight.color) {
						//console.log('match left right');
						//console.log(toLeft);
						//console.log(toRight);
						//console.log(brick);
						toLeft.destroy();
						brick.destroy();
						toRight.destroy();	
					} else { 
					}

				};
			};
		}

	};
});