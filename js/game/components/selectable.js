define(['crafty'], function (Crafty) {

    return {
        init : function () { 
            Crafty.c('Selectable', {
                init: function() { 
                    this.requires('Mouse');
                }
            });
        }
    };
});