define(['crafty', 'game/game', 'game/components/display', 'game/entities/platform'], function (Crafty, Game, Display, Platform) {
    var currentTime;
    return {
        getTime: function(){
            return currentTime;
        },
        init : function () {

            var timerWidth = Game.width() - 220;
            var gameTime = 2 * 60;
            var timerBar = Platform.init(0);
            currentTime = 1;
            Display.init( Game.width() - 120, Game.height() - 65 );

            Crafty.e('Display').attr({time: gameTime}).text('2:00').bind('EnterFrame', function (f) {
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
                    currentTime = this.time;
                }
            }).bind('addTime', function (e){
                    this.time = this.time + e;
                    this.time = Math.min(this.time, gameTime);
                    console.log('Adding Time...', e);
            })
            .bind('noMoreMoves', function (){
                this.time = 2;
                Crafty.trigger('showComment', 3);
            });
        }
    };
});