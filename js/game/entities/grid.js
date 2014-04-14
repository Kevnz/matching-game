define(['crafty', 'game/game','game/entities/brick', 'sift'],
	function (Crafty, Game, Brick, sift) {
	var isMove = false;
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
    var swap = function (brick1, brick2){

        var x1 = brick1.x, x2 = brick2.x, y1 = brick1.y, y2 = brick2.y;
        var gridX1 = brick1.gridX, gridX2 = brick2.gridX, gridY1 = brick1.gridY, gridY2 = brick2.gridY;

        console.log('x1', x1);
        console.log('x2', x2);
        console.log('y1', y1);
        console.log('y2', y2);
        brick1.attr({gridX:gridX2, gridY: gridY2});
        brick1.tween({x:x2, y:y2}, 500);
        brick2.attr({gridX:gridX1, gridY: gridY1});
        brick2.tween({x:x1, y:y1}, 500);

    }
	var selection = function (brick){

		var previousSelected = currentSelected;
		currentSelected = brick; 
		if(previousSelected === null) return;

		
 		if(currentSelected.isAdjacent(previousSelected)){
            swap(currentSelected, previousSelected);
            //return;
 			var blown = siftingScan();
 			console.log(blown);
            return;
 			if(!blown) {
 				console.log('not a valid move');
	 			previousSelected.tweenWithGrid(prevY, prevX, ANIMATION_SPEED );
	 			currentSelected.tweenWithGrid( currY, currX, ANIMATION_SPEED  );
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
};

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
                    siftingScan();
                }

            });
 
		},
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