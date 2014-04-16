define(['crafty','game/game', 'game/components/actor', 'game/components/selectable', 'game/components/adjacent'], function (Crafty, Game, Actor, Selectable, Adjacent) {

var inspect = function (e) {
    console.log(e);
    if (e.mouseButton === Crafty.mouseButtons.LEFT) {
        console.log('inspect');
        console.log(this.gridX);
        console.log(this.gridY);
        Crafty.trigger('selected', this);
        return;
    }
};

  var getBrick = function (sprite, row, column) {
      var cBuild = 'Actor, Block, Mouse, Grid, Gravity, Collision, Platform, Selectable, Adjacent, '+ sprite;
      var selectedSprite = sprite + 'Selected';
      var b = Crafty.e(cBuild).at(row, column)
          .attr({color: sprite})
          //.gravity( "Platform"   )
          //.gravityConst(0.7)
          .bind('MouseUp', inspect)
          .bind('MouseDown', function (e) {
              console.log(e);
              if(e.mouseButton === Crafty.mouseButtons.LEFT){
                  console.log('inspect');
                  console.log(this.gridX);
                  console.log(this.gridY);
              }
              console.log('click');

              this.attr('clicked', true);
              Crafty.trigger('selected', this);
              this.removeComponent(sprite);
              this.attr('clicked', false);
          })
          .bind('selected', function (e) {
              //console.log('selected');
              if (this.clicked ===  false) {
                  //determine if is a valid move
                  //if ()
                  //else it deselects
                  b.removeComponent(selectedSprite);
                  b.addComponent(sprite);
              }
          })
          .bind('EnterFrame', function () {

          });
      return b
  };
    return {
		init : function (sprite, row, column) {
			Actor.init();
			Selectable.init(); 
			Adjacent.init();
			return getBrick(sprite, row, column)
		},
        fadeIn: function (sprite, row, column) {
            var cBuild = 'Actor, Block, Mouse, Grid, Gravity, Collision, Platform, Selectable, Adjacent, '+ sprite;
            var selectedSprite = sprite + 'Selected';
            var b = Crafty.e(cBuild).at(row, column)
                .attr({color: sprite, alpha: 0})
                //.gravity( "Platform"   )
                //.gravityConst(0.7)
                .bind('MouseDown', inspect)
                .bind('Click', function (e) {
                    if(e.mouseButton === Crafty.mouseButtons.RIGHT){

                        return;
                    }

                    this.attr('clicked', true);
                    Crafty.trigger('selected', this);
                    this.addComponent(selectedSprite );
                    this.removeComponent(sprite);
                    this.attr('clicked', false);
                })
                .bind('selected', function (e) {
                    if (this.clicked ===  false) {
                        //determine if is a valid move
                        //if ()
                        //else it deselects
                        b.removeComponent(selectedSprite);
                        b.addComponent(sprite);
                    }
                })
                .bind('EnterFrame', function () {

                });
            b.tween({alpha: 1.0}, Game.animation_speed );
            return b;
        }
	};
});