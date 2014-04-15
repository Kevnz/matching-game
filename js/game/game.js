define(function () {
    var text_css = { 
        'font-size': '24px', 
        'font-family': 'Arial', 
        'color': 'white', 
        'text-align': 'center'
    }

    return {
    // This defines our grid's size and the size of each of its tiles
        map_grid: {
            width:  14,
            height: 16,
            tile: {
                width:  32,
                height: 32
            }
        },
        columns: 12,
        rows: 12,
        width: function() {
            return this.map_grid.width * this.map_grid.tile.width;
        },
        height: function() {
            return this.map_grid.height * this.map_grid.tile.height;
        },
        mode: function() {
            return 'Canvas';
        },
        text: text_css,
        animation_speed: 800

 
    }
});