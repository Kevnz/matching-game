define(['crafty', 'game/game','game/entities/brick', 'sift'],
	function (Crafty, Game, Brick, sift) {

    var delayFactory =  function (callback, delayTime){
        return Crafty.e("Delay").delay(callback, delayTime, 0);
    };
	var isMove = false;
	const ANIMATION_SPEED = Game.animation_speed;
	var rows = Game.rows;
	var cols = Game.columns;
	var zeroBasedRowCount = rows -1;
	var zeroBasedColumnCount = cols - 1;
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
                var ent = gameGrid[column][row];
                if(ent) {
                    ent.hash = 'column:'+column+'|row:' + row;
                }
                //
                results.push(ent);
            }
        }
        return results;
    };
    var killBox = [];
	var currentSelected = null;
    var swap = function (brick1, brick2){

        var x1 = brick1.x, x2 = brick2.x, y1 = brick1.y, y2 = brick2.y;
        var gridX1 = brick1.gridX, gridX2 = brick2.gridX, gridY1 = brick1.gridY, gridY2 = brick2.gridY;

        gameGrid[gridY1][gridX1] = brick2;
        gameGrid[gridY2][gridX2] = brick1;
        brick1.attr({gridX:gridX2, gridY: gridY2});
        brick1.tween({x:x2, y:y2}, 500);
        brick2.attr({gridX:gridX1, gridY: gridY1});
        brick2.tween({x:x1, y:y1}, 500);

    };
	var selection = function (brick){
		var previousSelected = currentSelected;
		currentSelected = brick; 
		if(previousSelected === null) return;

		

 		if(currentSelected.isAdjacent(previousSelected)){
            swap(currentSelected, previousSelected);
            //return;
            delayFactory(function(){
                var blown = siftingScan();
                console.log(blown);
                if(!blown) {
                    swap(currentSelected, previousSelected);
                } else {
                    falling();
                    moveDown();

                }
                currentSelected = null;
            }, ANIMATION_SPEED);
 		}
	};

var remove = function (brick) {
	if(!brick.gridX) return;
	var x = brick.gridX;
	var y = brick.gridY;
	try{
		  gameGrid[y][x] = null;
		  brick.bind('TweenEnd', function(){
		  	brick.destroy();
		  	Crafty.trigger('scored', 10);
            Crafty.trigger('brick:removed', {x:x,y:y});
		  });
		  brick.tween({alpha: 0.0}, ANIMATION_SPEED);
		  
	} catch(er){
		console.log('errBrick', brick);
	}
};
var isEmptyBelow = function (brick) {

}


var siftingScan = function () {
   var results = simpleScan();//not really simple;

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

        var lowest;
        for (var i = column + 1; i <= zeroBasedColumnCount; i ++) {

            b = gameGrid[i][row];
            //console.log(b);
            if(!b) lowest = i;
            if(b) break;
        }
        //if (lowest) console.log('lowest', lowest);
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
                //console.log('while going Lower');
            };
        }
    }

};
var drop = function () {
	var column, row;
	var drops = [];

    var insertCount = 0;
    for (var column = 0; column < cols ; column++) {
        for (var row = 0; row <  rows; row++) {
            if(gameGrid[column][row] === null) {

                insertCount++;
                gameGrid[column][row] = Brick.fadeIn(randomSprite(), row, column);
            }
        }
    }
    var nullSpotsAfter = sift({ $exists: false }, blocks());


    Crafty.trigger('drop_complete');
};
var moveDown = function (){
    for(var i = 0; i < 12; i++) {
        lower();
    }
};
var falling = function() {

    delayFactory(function () {

        lower();
        //multiple lower call;
        moveDown();

        delayFactory(function () {
            drop();
            delayFactory(function (){
                var stillNeedToMove = simpleScan().length > 0;
                console.log('stillNeedToMove', stillNeedToMove);
                if(stillNeedToMove){
                    //loop();
                }
            })
        }, ANIMATION_SPEED);

    }, ANIMATION_SPEED);
};
var loop = function () {
  siftingScan();
  delayFactory(function () {
    falling();
  }, ANIMATION_SPEED);
};

var simpleScan = function () {
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
        if(bricks[i]) {
            var tempOnX = siftBricksOnX(bricks[i]);
            var tempOnY = siftBricksOnY(bricks[i]);

            if (tempOnX.length > 2) {


                results = results.concat(tempOnX);
            }
            if (tempOnY.length > 2) {

                results = results.concat(tempOnY);
            }
        }

    }
    return results;
}
	return {
		init : function () { 
			for (var column = 0; column < cols ; column++) {
				gameGrid[column] = [cols];
				for (var row = 0; row <  rows; row++) {
					gameGrid[column][row] =  Brick.init(randomSprite(), row, column );
				}
			}

			Crafty.bind('selected', selection);
            Crafty.bind('drop_complete', function (e) {



            });

            Crafty.bind('inspect', function (entity) {
                console.log('inspection time');

                console.log('entity', entity);

                var bricks = blocks();
                var results = [];

                for (var filterCount = 0; filterCount < bricks.length; filterCount++) {
                    var res = bricks.filter(function (block) {
                        if (!brick) return false;
                       return bricks[filterCount].hash == block.hash;
                    });
                    if(res.length > 1) throw new Error("doubled up");
                }



            });
 
		},
        fall: falling,
        burn:  function (start, finish) {
			if (start == undefined) {
				start = 0, finish = gameGrid.length
			}
			if (finish == undefined) {
				finish = gameGrid.length
			}
			for (var i = 0; i < finish; i++) {

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
            remove(brick);
			//brick.tween({alpha:0.0}, 500);
		}

	};
});