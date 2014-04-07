define(['crafty'], function (Crafty) {

    return {
        init : function () { 
            Crafty.c('Selectable', {
                init: function() {
                    console.log('test')
                    this.requires('Mouse');
                },
            });
        }
    };
});