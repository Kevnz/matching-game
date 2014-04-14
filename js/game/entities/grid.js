define(['crafty', 'game/game','game/entities/brick', 'sift'],
	function (Crafty, Game, Brick, sift) {
	
	const ANIMATION_SPEED = 300;
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
	var gameGrid = [cols];
    var blocks =function(){
        var results = [];

        var row,column;


        for (column = 0; column < gameGrid.length; column++) {
            for (row = 0; row < gameGrid[column].length; row++) {
                results.push(gameGrid[column][row]);
            }
        }
        return results;
    };
    var killBox = [];
	var currentSelected = null;

	var selection = function (brick){
		//console.log('selection');
		//console.log('brick', brick)
		//console.log('previousSelected', currentSelected)
		var previousSelected = currentSelected;
		currentSelected = brick; 
		if(previousSelected === null) return;

		
 		if(currentSelected.isAdjacent(previousSelected)){
 			//console.log('isAdjacent');
 			var prevX = previousSelected.gridX ;
 			var prevY = previousSelected.gridY;
 			var currX = currentSelected.gridX ;
 			var currY = currentSelected.gridY ;

 			previousSelected.tweenTo(currY, currX);
 			currentSelected.tweenTo( prevY, prevX );
 			//console.log((currX - 1) + ' ' + (currY-1));
 			//console.log(gameGrid);
 			gameGrid[currY - 1][currX - 1] = previousSelected;
 			gameGrid[prevY - 1][prevX - 1] = currentSelected;
 			var blown = siftingScan();
 			//console.log(blown);
 			if(!blown) {
 				console.log('not a valid move');
	 			previousSelected.tweenTo(prevY, prevX, ANIMATION_SPEED );
	 			currentSelected.tweenTo( currY, currX, ANIMATION_SPEED  );
	 			gameGrid[currY - 1][currX - 1] = currentSelected;
				gameGrid[prevY - 1][prevX - 1] = previousSelected;
 			} else {
                lower();

                for(var i = 0; i < 12; i++) {
                    lower()
                }

                drop();
            }
 		}				
	};

var remove = function (brick) {
    console.log('remove');
	if(!brick.gridX) return;
	var x = brick.gridX - 1;
	var y = brick.gridY - 1;
	try{
		  gameGrid[y][x] = null;
		  brick.bind('TweenEnd', function(){
		  	brick.destroy();
		  	Crafty.trigger('scored', 10);
		  })
		  brick.tween({alpha: 0.0}, ANIMATION_SPEED);
		  
	} catch(er){
		console.log(brick);
	}
};
var isEmptyBelow = function (brick) {

}
var fallDown = function (brick) { 
    console.log('fallDown');
	if(brick == null) return;
	var row = brick.gridY;
	var j = brick.gridY-1;
	var i = brick.gridX-1;
	var _brick = gameGrid[j][i]; 
	if( (j+1) > gameGrid.length ) return;
	var below = gameGrid[j+1][i] ; 

	if(below && _brick) { 
		_brick.slide();
		gameGrid[j][i] = null;
		gameGrid[j+1][i] = _brick;
		fallDown(brick);

	}
}
var goDeep = function (column, row) {
    console.log('goDeep');
	try {
		var brick = gameGrid[column][row];
        if ((brick) === null) return true;
		var below = gameGrid[column][row+1];
        if(column > zeroBasedColumnCount) return true;
		if(below == null  && brick != null) {
			gameGrid[column + 1][row] = brick;
		 	gameGrid[column][row] = null;
		 	brick.tweenTo(column+2);
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
    console.log('fall');
	var row,column;
	for (column = 0; column < gameGrid.length ; column++) {
		//for (row = gameGrid[column].length; row >= 0; row--) {
		for (row = gameGrid[column].length - 1; row >= 1 ; row--) {
			while (!goDeep(column,row)) {
				console.log('goDeep');
			};
		}
	}
    Crafty.trigger('fall_complete')
}

var siftingScan = function () {
    var bricks = blocks();
    var siftBricksOnX = function(brick){
        if(brick === null) return;
        var x = brick.gridX, y = brick.gridY, color = brick.color;
        return sift({
            gridY: function (value) {
                return value === y;
            },
            gridX: function(value) {
                return value === x || value === (x-1) || value === (x+1);
            },
            color: function (value) {
                return value === color;
            }
        },bricks);
    };

    var siftBricksOnY = function(brick){
        var x = brick.gridX, y = brick.gridY, color = brick.color;
        return sift({
            gridX: function (value) {
                return value === x;
            },
            gridY: function(value) {
                return value === y || value === (y-1) || value === (y+1);
            },
            color: function (value) {
                return value ==color;
            }
        },bricks);
    };


    var results = [];

    for(var i = 0; i< bricks.length; i++) {

        var tempOnX = siftBricksOnX(bricks[i] );
        var tempOnY = siftBricksOnY(bricks[i]);
        //console.log(tempOnX.length);
        //console.log(tempOnY.length);
        if(tempOnX.length > 2) {
            results = results.concat(tempOnX);
        }
        if(tempOnY.length > 2) {
            results =  results.concat(tempOnY);
        }

    }
    console.log(results);
    var foundMatch = results.length > 0;
    for(var j = 0; j < results.length; j++) {
        remove(results[j]);
    }

    return foundMatch;

};
var scan = function () {
    console.log('scan');
	var result;
	killBox = [];
	var brick, above, below, left, right;
	var row,column;

    var siftBricksOnX = function(x, y){
        return sift({
            gridY: function (value) {
                return value === y;
            },
            gridX: function(value) {
                return value === x || value === (x-1) || value === (x+1);
            }
        })
    };

    var siftBricksOnY = function(y, x){
        return sift({
            gridX: function (value) {
                return value === x;
            },
            gridY: function(value) {
                return value === y || value === (y-1) || value === (y+1);
            }
        })
    };
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
						//console.log('awesome sauce, a vertical line match ' + brick.color);
						killBox.push(above);
						killBox.push(above);
						killBox.push(brick);
						killBox.push(below);
					}
				} catch(cErr){
					console.log('err', brick);
				}
				

				try {
					if (brick.color === left.color && brick.color === right.color) {
						//console.log('awesome sauce, a horizontal line match ' + brick.color);
						killBox.push(left);
						killBox.push(brick);
						killBox.push(right) 
					}		 
				} catch(cErr){
					console.log('err', brick);
				}
			}
		}

	}
	result = killBox.length > 0;

    Crafty.trigger('scan_complete', result);
	return result;


};


var goLower = function (column, row) {
   // console.log('goLower');

    try {
        var brick = gameGrid[column][row], b;
        if ((brick) === null) return true;
        if (row > zeroBasedRowCount) return true;
        if (column > zeroBasedColumnCount) return true;

        if(column > zeroBasedColumnCount) return true;
        //var below = gameGrid[column][row+1];

        var lowest;
        for (var i = column + 1; i <= zeroBasedColumnCount; i ++) {

            b = gameGrid[i][row];
            //console.log(b);
            if(!b) lowest = i;
            if(b) break;
        }
        if (lowest) console.log('lowest', lowest);
        if (!lowest) return true;
        var below = gameGrid[lowest][row];
        if (below == null  && brick != null) {

            gameGrid[lowest][row] = brick;

            gameGrid[column][row] = null;
            brick.tweenWithGrid(lowest, row, ANIMATION_SPEED);

            return false;
        } return true;
    } catch (err) {
        console.log(err);
        console.log('column', column);
        console.log('row', row);
        console.log('lowest', lowest);
        console.dir(gameGrid[column]);

        return true;
    }


};
var lower = function () {
    for (column = 0; column < cols ; column++) {
        for (row = 11; row >= 0 ; row--) {
            //console.log({column: column, row: row});

            while (!goLower(column, row)) {
                console.log('while going Lower');
            };
        }
    }

};
var drop = function () {
	var column, row;
	var drops = [];

    console.log('dropping in');
    var nullSpots = sift({ $exists: false }, blocks());
    console.log('nullSpots',nullSpots);
    for (var column = 0; column < cols ; column++) {
        for (var row = 0; row <  rows; row++) {
            if(gameGrid[column][row] === null) {
                console.log('null');
                gameGrid[column][row] = Brick.init(randomSprite(), row+1, column+1);
            }
        }
    }
    var nullSpotsAfter = sift({ $exists: false }, blocks());

    console.log('nullSpotsAfter',nullSpotsAfter);
    Crafty.trigger('drop_complete');
};


	return {
		init : function () { 
			for (var j = 1; j <= cols ; j++) {
				gameGrid[j-1] = [cols]			
				for (var i = 1; i <= rows; i++) { 
					gameGrid[j-1][i-1] =  Brick.init(randomSprite(), i, j );
				}
			}

			Crafty.bind('selected', selection);
            Crafty.bind('scan_complete', function (e) {

                for (var i = 0; i < killBox.length; i++) {
                    remove(killBox[i]);
                }
                for (var j = 0; j < 20; j++) {
                    fall();
                }

                drop();
                if (result) {
                    scan();
                }

            });
 
		},
		scan: scan,
        fall: function() {



            lower();

            for(var i = 0; i < 12; i++) {
                lower()
            }

            var sifting = sift({ $exists: true }, blocks());
            //var res = ;

            //console.log('res', (sift({ $exists: false }, blocks()).length > 0));
            drop();

        },
        burn:  function (start, finish) {
			if (start == undefined) {
				start = 0, finish = gameGrid.length
			}
			if (finish == undefined) {
				finish = gameGrid.length
			}
			for (var i = 0; i < finish; i++) {
				console.log(gameGrid[i][0]);
				try {
					gameGrid[i][0].tween({alpha: 0.0}, 800).destroy();
				} catch(error) {
					console.log('FAIL', i + ' | ' + 0);
				}
			}
		},
        sift: function () {
            siftingScan()
        },
		debug: function (x, y) {

			console.log('y', y);
			console.log('x', x);
            var brick = gameGrid[y][x];
			console.log('gridY', brick.gridY);
			console.log('gridX', brick.gridX);  
			brick.tween({alpha:0.0}, 500);
		}

	};
});