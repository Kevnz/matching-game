define(['crafty', 'game/game', 'game/components/display', 'game/entities/platform'], function (Crafty, Game, Display, Platform) {
    return {
        init : function () {
            var timerWidth = Game.width() - 220;
            var gameTime = 2 * 60;
            var timerBar = Platform.init(0);

            Display.init( Game.width() - 120, Game.height() - 65 );

            Crafty.e('Display').attr({time: gameTime}).text('3:00').bind('EnterFrame', function (f) {
                //50
                if(this.time === 0) {
                   Crafty.trigger('timeup');
                   return;     
                }
                if(f.frame % 50 === 0) {
                    
                    this.time = this.time - 1;
                    
                    timerBar.attr({w:(gameTime - this.time) * timerWidth / gameTime});

                    var displayTime = (this.time) / 60;
                    this.text(displayTime.toString().split('.')[0] + ':' + ((this.time % 60) < 10 ? '0' + (this.time % 60) : (this.time % 60))  );

                }
            });
        }
    };
});