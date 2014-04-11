define(['crafty', 'game/game','game/entities/brick'], 
	function (Crafty, Game, Brick) {
	
	var rows = 12;
	var cols = 12;
	var zeroBasedRowCount = 11;
	var zeroBasedColumnCount = 11;
	var randomSprite = function () {
		var to = 7, from = 0;
		var random = Math.floor(Math.random() * (to - from + 1) + from);

		var sprites = ['red', 'blue', 'green', 'yellow','black', 'purple', 'orange', 'grey'];

		return sprites[random];
	}
	var gameGrid = [rows];
	var currentSelected = null;
	var scan = function () {
			//console.log('scan');
			var whammo = false;
			//console.dir(gameGrid);
			for (var j = 0; j <  rows ; j++) {
				 		
				for (var i = 0; i < cols; i++) { 
					var arrX = j + 1, arrY = i + 1;
					var brick = gameGrid[j][i]; 
					var above = gameGrid[j-1] ? gameGrid[j-1][i] : { color:'NONE', destroy: function(){}  }; 
					var toLeft = gameGrid[j][i-1];
					var toRight = gameGrid[j][i+1];
					var below = gameGrid[j+1] ? gameGrid[j+1][i] : { color:'NONE', destroy: function(){}  };
					if(!above) {
						above = { color:'NONE', destroy: function(){} };
					}
					if(!below) {
						below = { color:'NONE', destroy: function(){}  };
					}
					if(!toLeft) {
						toLeft = { color:'NONE', destroy: function(){}  };
					}
					if(!toRight) {
						toRight = { color:'NONE', destroy: function(){}  };
					}
					if(!brick) {
						brick = { color:'NONE', destroy: function(){}  };
					}
					if( above.color === brick.color && brick.color === below.color && brick.color !== 'NONE') {
						console.log('match above below');
						remove(above)
						remove(brick)
						remove(below) 
						whammo = true;

					} else if( toLeft.color === brick.color && brick.color === toRight.color && brick.color !== 'NONE') {
						console.log('match left right');
						remove(toLeft);
						remove(toRight);
						remove(brick);

						whammo = true;	
					} else { 
					}

				};
			};
			fall();
			return whammo;
		}
	var selection = function (brick){
		//console.log('selection');
		//console.log('brick', brick)
		//console.log('previousSelected', currentSelected)
		var previousSelected = currentSelected;
		currentSelected = brick; 
		if(previousSelected === null) return;

		
 		if(currentSelected.isAdjacent(previousSelected)){
 			console.log('isAdjacent');
 			var prevX = previousSelected.gridX ;
 			var prevY = previousSelected.gridY;
 			var currX = currentSelected.gridX ;
 			var currY = currentSelected.gridY ;

 			previousSelected.tweenTo(currY, currX);
 			currentSelected.tweenTo( prevY, prevX );
 			console.log((currX - 1) + ' ' + (currY-1));
 			//console.log(gameGrid);
 			gameGrid[currY - 1][currX - 1] = previousSelected;
 			gameGrid[prevY - 1][prevX - 1] = currentSelected;
 			var blown = newScan();
 			console.log(blown);
 			if(!blown) {
 				console.log('that did not work');

	 			previousSelected.tweenTo(prevY, prevX, 900 );
	 			currentSelected.tweenTo( currY, currX, 900  );
 
 
	 			gameGrid[currY - 1][currX - 1] = currentSelected;
				gameGrid[prevY - 1][prevX - 1] = previousSelected;
 			}
 		}				
	};

var remove = function (brick) {
	if(!brick.gridX) return;
	var x = brick.gridX - 1;
	var y = brick.gridY - 1;
	try{
		  gameGrid[y][x] = null;
		  brick.bind('TweenEnd', function(){
		  	brick.destroy();
		  	Crafty.trigger('scored', 10);
		  })
		  brick.tween({alpha: 0.0}, 600);
		  
	} catch(er){
		console.log(brick);
	}
};
var isEmptyBelow = function (brick) {

}
var fallDown = function (brick) {
	//console.log(brick)

	if(brick == null) return;
	var row = brick.gridY
	var j = brick.gridY-1;
	var i = brick.gridX-1;
	var _brick = gameGrid[j][i]; 
	if( (j+1) > gameGrid.length ) return;
	var below = gameGrid[j+1][i] ;
	console.log('below below', !below && _brick);

	if(below && _brick) {
		console.log('fall way down, go boom');
		_brick.slide();
		gameGrid[j][i] = null;
		gameGrid[j+1][i] = _brick;
		fallDown(brick);

	}
}
var goDeep = function (column, row) {
	try {
		var brick = gameGrid[column][row];
		var below = gameGrid[column + 1][row];
		if(below == null) {
			gameGrid[column + 1][row] = brick;
		 	gameGrid[column][row] = null;
		 	brick.tweenTo(column+2)
		 	return false;
		} return true;
	} catch (err) {
		console.log(err);
		console.log('column', column);
		console.log('row', row);
		console.dir(gameGrid[column]);
		return true;
	}


}
var fall = function () {
	var row,column;
	for (column = 0; column < gameGrid.length ; column++) {
		//for (row = gameGrid[column].length; row >= 0; row--) {
		for (row = gameGrid[column].length - 1; row >= 0 ; row--) {	 
			while (!goDeep(column,row)) {

			};
		}
	}
	
 		
}


var newScan = function () {
	var result;
	var killBox = [];
	var brick, above, below, left, right;
	var row,column;
	for (column = 0; column < gameGrid.length; column++) {
		for (row = 0; row < gameGrid[column].length; row++) {		
			brick = gameGrid[column][row];
			if (brick) {
				if (column !== 0) {
					above = gameGrid[column-1][row];
				} else {
					above = { color: false }
				}
				if (column < zeroBasedColumnCount) {
					below = gameGrid[column+1][row];
				} else {
					below = { color: false }
				}
				if (row > 0) {
					left = gameGrid[column][row-1];
				} else {
					left = { color: false }
				}
				if (row < zeroBasedRowCount) {
					right = gameGrid[column][row+1];
				} else {
					right = { color: false }
				}
				try {
					if (brick.color === above.color && brick.color === below.color) {
						console.log('awesome sauce, a vertical line match ' + brick.color);
						killBox.push(above);
						killBox.push(above)
						killBox.push(brick)
						killBox.push(below) 
					}
				} catch(cErr){
					console.log('err', brick);
				}
				

				try {
					if (brick.color === left.color && brick.color === right.color) {
						console.log('awesome sauce, a horizontal line match ' + brick.color);
						killBox.push(left)
						killBox.push(brick)
						killBox.push(right) 
					}		 
				} catch(cErr){
					console.log('err', brick);
				}
			}
		};

	};
	result = killBox.length > 0;
	for (var i = 0; i < killBox.length; i++) {
		remove(killBox[i]);
	};
	for (var j = 0; j < 20; j++) {
		fall();
	}
	drop();
	return result;


};

var drop = function () {
	var column, row;
	var drops = [];

	for (column = 0; column < gameGrid.length ; column++) { 
		for (row = gameGrid[column].length - 1; row >= 0 ; row--) {	 
			if(!gameGrid[column][row]) Brick.init(randomSprite(), row+1, column+1 );
		}
	}
}
	return {
		init : function () { 
			for (var j = 1; j <= cols ; j++) {
				gameGrid[j-1] = [cols]			
				for (var i = 1; i <= rows; i++) { 
					gameGrid[j-1][i-1] =  Brick.init(randomSprite(), i, j );
				};
			};

			Crafty.bind('selected', selection);
 
		},
		scan: scan,
		burn: function (start, finish) {
			if (start == undefined) {
				start = 0, finish = gameGrid.length
			}
			if (finish == undefined) {
				finish = gameGrid.length
			}
			for (var i = 0; i < finish; i++) {
				console.log(gameGrid[i][0])
				try {
					gameGrid[i][0].tween({alpha: 0.0}, 800).destroy();
				} catch(error) {
					console.log('FAIL', i + ' | ' + 0);
				}
			};
		},
		debug: function (x, y) {
			var brick = gameGrid[y][x];
			console.log('y', y);
			console.log('x', x);
			console.log('gridY', brick.gridY);
			console.log('gridX', brick.gridX);  
			brick.tween({alpha:0.0}, 500);
		},
		newScan : function () {
			newScan();
		}

	};
});