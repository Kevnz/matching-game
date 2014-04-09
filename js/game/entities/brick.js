define(['crafty', 'game/components/actor', 'game/components/selectable', 'game/components/adjacent'], function (Crafty, Actor, Selectable, Adjacent) {
	return {
		init : function (sprite, x, y) {
			Actor.init();
			Selectable.init(); 
			Adjacent.init();
			var cBuild = 'Actor, Block, Grid, Gravity, Collision, Platform, Selectable, Adjacent, '+ sprite;
			var selectedSprite = sprite + 'Selected';
			var b = Crafty.e(cBuild).at( x, y)
				.attr({color: sprite})
				.gravity( "Platform"   ) 
				.gravityConst(0.7)
				.bind('Click', function (e) {
					this.attr('clicked', true);
					Crafty.trigger('selected', this);
					console.log(this.clicked);
					this.addComponent(selectedSprite );
					this.removeComponent(sprite);
					this.attr('clicked', false);
				})
				.bind('selected', function (e) {
					//console.log('selected');
					if (this.clicked ===  false) { 
						//determine if is a valid move

						//else it deselects
						console.log('clicked to remove ' + selectedSprite);
						b.removeComponent(selectedSprite);
						b.addComponent(sprite);
					}
				})
				.bind('EnterFrame', function () {

				});

			return b;
		}
	};
});