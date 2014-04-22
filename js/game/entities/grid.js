define(['crafty', 'game/game','game/entities/brick', 'sift', 'game/entities/clock'],
	function (Crafty, Game, Brick, sift, Clock) {

    var delayFactory =  function (callback, delayTime){
        return Crafty.e("Delay").delay(callback, delayTime, 0);
    };
	var isMove = false;
    var insertedPowers = [];
	const ANIMATION_SPEED = Game.animation_speed;
	var rows = Game.rows;
	var cols = Game.columns;
	var zeroBasedRowCount = rows -1;
	var zeroBasedColumnCount = cols - 1;
	var randomSprite = function () {
		var to = 5, from = 0;
		var random = Math.floor(Math.random() * (to - from + 1) + from);

		var sprites = ['red', 'blue', 'green', 'yellow','purple', 'orange', 'grey','black'];

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
                results[cols * ent.gridY + ent.gridX] = ent;
            }
        }
        return results;
    };
    var killBox = [];
	var currentSelected = null;
    var swap = function (brick1, brick2){
        console.log('SWAPPING NOW');
        console.log(brick1, brick2);
        var x1 = brick1.x, x2 = brick2.x, y1 = brick1.y, y2 = brick2.y;
        var gridX1 = brick1.gridX, gridX2 = brick2.gridX, gridY1 = brick1.gridY, gridY2 = brick2.gridY;

        gameGrid[gridY1][gridX1] = brick2;
        gameGrid[gridY2][gridX2] = brick1;
        brick1.attr({gridX:gridX2, gridY: gridY2});
        brick1.tween({x:x2, y:y2}, ANIMATION_SPEED);
        brick2.attr({gridX:gridX1, gridY: gridY1});
        brick2.tween({x:x1, y:y1}, ANIMATION_SPEED);

    };
    var swapHidden = function (brick1, brick2){
        var x1 = brick1.x, x2 = brick2.x, y1 = brick1.y, y2 = brick2.y;
        var gridX1 = brick1.gridX, gridX2 = brick2.gridX, gridY1 = brick1.gridY, gridY2 = brick2.gridY;

        gameGrid[gridY1][gridX1] = brick2;
        gameGrid[gridY2][gridX2] = brick1;
        brick1.attr({gridX:gridX2, gridY: gridY2});
        brick2.attr({gridX:gridX1, gridY: gridY1});

    };
	var selection = function (brick){
        if(isMove) return;
		var previousSelected = currentSelected;
		currentSelected = brick; 
		if(previousSelected === null) return;

		

 		if(currentSelected.isAdjacent(previousSelected)){
            isMove = true;
            swap(currentSelected, previousSelected);
            //return;
            delayFactory(function(){
                var blown = siftingScan();
                console.log('Selsction Matched? ' + blown);
                if(!blown) {
                    swap(currentSelected, previousSelected);
                    delayFactory(function (){
                        isMove = false;
                    }, ANIMATION_SPEED);
                } else {
                    falling();
                    moveDown();
                }
                currentSelected = null;
            }, ANIMATION_SPEED);
 		}
	};

var remove = function (brick, insertPowerGem) {
	//if(!brick.gridX) return;
	var x = brick.gridX;
	var y = brick.gridY;
    var locationHash = getLocationHash(brick);

    if(insertedPowers[locationHash]) return;

	try{
        if(gameGrid[y][x] === null) return;

		  gameGrid[y][x] = null;
          if(insertPowerGem) gameGrid[y][x] = Brick.fadeIn('power', x, y);
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

var removeColor = function (colorToRemove) {
    var row,column;
    for (column = 0; column < gameGrid.length; column++) {
        for (row = 0; row < gameGrid[column].length; row++) {
            var ent = gameGrid[column][row];
            if(ent && ent.color === colorToRemove) {
                remove(ent, false);
            }
        }
    }
};
var isEmptyBelow = function (brick) {

}


var siftingScan = function () {
   var results = simpleScan();//not really simple;

    var foundMatch = results.length > 0;
    insertedPowers = [];
    for(var j = 0; j < results.length; j++) {
        
        var matchGroup = results[j];
        var hasPower = false;
        var groupColor = '';
        var insertPower = matchGroup.length >= 5;
        var insertAt = Math.floor(matchGroup.length / 2);
        var locationHash = getLocationHash(matchGroup[insertAt]);
        if(insertPower){
            if(insertedPowers[locationHash]){
                insertPower = false;
            }
        }

        for (var i = 0; i < matchGroup.length; i++){
            if(matchGroup[i].color === 'power'){
                hasPower = true;
            }else{
                groupColor = matchGroup[i].color;
            }
            remove(matchGroup[i], (insertPower && i==insertAt));
        }
        if(insertPower){
            insertedPowers[locationHash] = true;
        }
            
        if(hasPower){
            removeColor(groupColor);
        }
    }

    return foundMatch;

};

var getLocationHash = function(brick){
    return brick.gridX +',' + brick.gridY;
}

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
    if(Clock.getTime() === 0){
        return;
    }
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
    if(Clock.getTime() === 0){
        return;
    }
    isMove = true;
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
                    loop();
                }else{
                    Crafty.trigger('all_falling_complete');
                    isMove = false;
                    //console.log('Moves Available?', isMovesAvailable());
                    if(!isMovesAvailable()){
                        alert('NO MORRE MOVES!!');
                    }
                }
            }, ANIMATION_SPEED)
        }, ANIMATION_SPEED);

    }, ANIMATION_SPEED);
};
var loop = function () {
  siftingScan();
  delayFactory(function () {
    falling();
  }, ANIMATION_SPEED);
};

var isMovesAvailable = function(){

    var row,column;
    for (column = 0; column < gameGrid.length; column++) {
        for (row = 0; row < gameGrid[column].length; row++) {
            var brick = gameGrid[column][row];
            if(brick && getBrickMoves(brick).length) {
                return true
            }
        }
    }
    return false;

};

var showHint = function(){

    var row,column, results = [];
    for (column = 0; column < gameGrid.length; column++) {
        for (row = 0; row < gameGrid[column].length; row++) {
            var brick = gameGrid[column][row];
            if(brick) {
                brick.attr({alpha: 1.0});
                if(!results.length)
                    results = getBrickMoves(brick);
            }
        }
    }

    if(results.length){
        for(var j = 0; j < results.length; j++) {
            var matchGroup = results[j];
            for (var i = 0; i < matchGroup.length; i++){
                matchGroup[i].attr({alpha: 0.5});
            }
        }
    }

};


var getBrickMoves = function(brick){
    var x = brick.gridX,
        y = brick.gridY;

    var topY    = y - 1,
        bottomY = y + 1,
        leftX   = x - 1,
        rightX  = x + 1;

    var results = [];

    if(topY >= 0){
        var topBrick = gameGrid[topY][x];

        swapHidden(brick, topBrick);

        results = results.concat(siftBricks(getCol(y)));
        results = results.concat(siftBricks(getRow(x)));

        swapHidden(brick, topBrick);
    }
    if(bottomY < rows){
        var bottomBrick = gameGrid[bottomY][x];

        swapHidden(brick, bottomBrick);

        results = results.concat(siftBricks(getCol(y)));
        results = results.concat(siftBricks(getRow(x)));

        swapHidden(brick, bottomBrick);
    }
    if(leftX >= 0){
        var leftBrick = gameGrid[y][leftX];

        swapHidden(brick, leftBrick);

        results = results.concat(siftBricks(getCol(y)));
        results = results.concat(siftBricks(getRow(x)));

        swapHidden(brick, leftBrick);
    }
    if(rightX < cols){
        var rightBrick = gameGrid[y][rightX];

        swapHidden(brick, rightBrick);

        results = results.concat(siftBricks(getCol(y)));
        results = results.concat(siftBricks(getRow(x)));

        swapHidden(brick, rightBrick);
    }
    return results;
};

var getCol = function(col){
    return gameGrid[col];
};

var getRow = function(row){
    var results = [];
    for (var i = 0; i < gameGrid.length; i++) {
        results.push(gameGrid[i][row]);
    };
    return results;
};


var siftBricks = function(brickLine){

    var currentColor = brickLine[0].color;
    var tempMatch = [];
    var matches = [];
    for(var i = 0; i< brickLine.length; i++) {
        var brick = brickLine[i];

        if(currentColor === 'power') {
            currentColor = brick.color;
        }

        if(brick.color === currentColor || brick.color === 'power') {
            tempMatch.push(brick);
        }
        else{
            if(tempMatch.length > 2){
                matches.push(tempMatch.slice(0));
                tempMatch = [brick];
            } else if(tempMatch[tempMatch.length-1].color === 'power'){
                tempMatch = [tempMatch[tempMatch.length-1], brick];
            } else{
                tempMatch = [brick];
            }

            currentColor = brick.color;
        }
    }
    if(tempMatch.length > 2){
        matches.push(tempMatch.slice(0));
    }

    return matches;
};


var simpleScan = function () {
    //var bricks = blocks();
    if(Clock.getTime() === 0){
        return [];
    }
    var results = [];
    
    for(var i = 0; i< cols; i++) {
        var myCol = getCol(i);
        var tempResults = siftBricks(myCol);
        results = results.concat(tempResults);
    }

    for(var j = 0; j< rows; j++) {
        var myRow = getRow(j);
        var tempResultsRow = siftBricks(myRow);
        results = results.concat(tempResultsRow);
    }
    console.log('RESULTS:::');
    console.log(results);
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
                console.log('drop_complete');
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