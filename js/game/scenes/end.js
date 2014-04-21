define(['crafty', 'game/game', 'game/components/display', 'game/start'], function (Crafty, Game, Display, Start) {
    return {
        init : function () {
            Crafty.scene('end', function () {
                Display.init();
                var TheEnd = Crafty.e('Display').text('The End').attr({x:280, y:200}).textFont({
                    family: Game.text['font-family'],
                    size: 800
                });

                
                var btnReplay = Crafty.e("HTML, Mouse")
                    .attr ({x: 230, y: 327, w: 200, h: 50})
                    .replace('<div class="btn yellow">Replay</div>')
                    .bind('MouseDown', function (e) {
                        Display.init();
                        Crafty("2D").destroy();
                        Crafty.scene('load');
                    });

                // var btnSubmitScore = Crafty.e("HTML, Mouse")
                //     .attr ({x: 230, y: 390, w: 200, h: 50})
                //     .replace('<div class="btn green">Submit Score</div>')
                //     .bind('MouseDown', function (e) {
                //         Display.submitForm();
                //     });


            });
        }
    };
});