define(['crafty', 'game/game', 'game/components/display', 'game/start', 'game/scenes/submitscore', 'game/entities/scoreboard', 'game/scenes/play'], function (Crafty, Game, Display, Start, Submitscore, Scoreboard, play) {
    return {
        init : function () {
            Crafty.scene('end', function () {
                Display.init();
                var TheEnd = Crafty.e("HTML")
                    .attr({w: Game.width(), h: Game.height(), x:0, y:130})
                    .replace('<div class="gameover"><h2>GAME OVER</h2><p>Total Score</p><h1>' + Scoreboard.getScore() + '</h1></div>')
                    ;

               
                 var btnReplay = Crafty.e("HTML, Mouse")
                    .attr ({x: 220, y: 357, w: 200, h: 50})
                    .replace('<div class="btn yellow">Replay</div>')
                    .bind('MouseDown', function (e) {
                        Display.init();
                        Crafty("2D").destroy();
                        Crafty.scene('play');
                        play.init();
                    });

                var btnSubmitScore = Crafty.e("HTML, Mouse")
                    .attr ({x: 220, y: 420, w: 200, h: 50})
                    .replace('<div class="btn green">Submit Score</div>')
                    .bind('MouseDown', function (e) {
                        Crafty("2D").destroy();
                        Submitscore.init();
                    });

            });
        }
    };
});