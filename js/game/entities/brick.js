define(['crafty', 'game/components/actor'], function (Crafty, Actor) {
	return {
		init : function (sprite, x, y) {
			Actor.init();
			console.log('sprite', sprite);
			console.log('x', x);
			console.log('y', y);
			var cBuild = 'Actor, '+ sprite;
			console.log('cBuild', cBuild);
			return Crafty.e(cBuild).at( x, y);
			// Crafty.e(cBuild).attr({x:x, 
			//y:y });
		}
	};
});