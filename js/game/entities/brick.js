define(['crafty', 'game/components/actor', 'game/components/selectable'], function (Crafty, Actor, Selectable) {
	return {
		init : function (sprite, x, y) {
			Actor.init();
			Selectable.init() 
			var cBuild = 'Actor, Grid, Selectable, '+ sprite;
			console.log('cBuild', cBuild);
			var selectedSprite = sprite + 'Selected';
			var b = Crafty.e(cBuild).at( x, y).bind('Click', function (e) {
				this.attr('clicked', true);
				Crafty.trigger('selected', this);
				console.log(this.clicked);
				this.addComponent(selectedSprite ).bind('unselected', function () {
					console.log('destroy');

				});
				this.removeComponent(sprite);
				this.attr('clicked', false);
			}).bind('selected', function (e) {
				//console.log('selected');
				if (this.clicked ===  false) { 
					//determine if is a valid move

					//else it deselects
					console.log('clicked to remove ' + selectedSprite);
					b.removeComponent(selectedSprite);
					b.addComponent(sprite);
				}
			});

			return b;
			// Crafty.e(cBuild).attr({x:x, 
			//y:y });
		}
	};
});