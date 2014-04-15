Match 3 Game
============

The concept. Match 3 (or more blocks)

The Engine
----------
[Crafty](http://craftyjs.com/) is the JS engine that powers the game. Further details about the game can be found at the site. In addition a tutorial is available at [Building New Games](http://buildnewgames.com/introduction-to-crafty/)

The Layout
----------

The layout structure is

*   assets (for images)
*   js
*   -- libs (3rd party files)
*   -- game
*   ------- assets (helper files)
*   ------- components (pieces that make up game parts)
*   ------- entities (items used in the game)
*   ------- scenes (self contained portions of the game)

Game Concepts
-------------
The blocks are stored in an array[columns][rows] called gameGrid. When a user selects one game piece, then clicks on an adjacent piece they are swapped around to see if anything matches. When pieces match they are removed and a the score is increased.


The important bits
------------------

The loading scene is simply a scene that loads the assets so they can be used later.

The main scene loads the grid, initializes the game pieces and initiates the first scan for matching pieces.

The end scene is triggered when the timeup event is fired. 

### Components

The components are used to make up bigger pieces of the game
#### Actor
This component simply brings in required Crafty components.
#### Adjacent
This component provides nothing
#### Display 
This component provides the base for text displayed in the game.
#### Grid
This component is mixed into a game piece and provides several functions. Including placement for the block corresponding to a place in a gameGrid. The methods it provides are at (for placement). isAdjacent to check if block is adjacent to the block. tweenWithGrid moves a block to a new location on the grid.
#### Selectable
This component is currently not used

### Entities

#### Brick
This entity is the playing piece for the game. The init function generates a brick to be displayed when given a sprite color (provided in loading scene), a column and a row. The brick has a click handler attached to it.
#### Clock 
This entity shows the time ticking down (based on the internal game loop not actual time) and when the time is up it fires at timeup event that is then triggers the end of the game
#### Scoreboard
This entity displays the current score and listens to a score event and increments the score when it fires.
#### Grid
This is the main game playing piece. It generates the initial pieces on the board and keeps them in the gameArray. The main functions that make up the game mechanics are as follows
##### delayFactory 
This is a function that executes a callback after a certain period of time using the built in behaviour of Crafty.
##### randomSprite
This is a function that returns a random color from an array that corresponds to the assets loaded in the loading scene.
##### gameGrid
The multidimensional array that holds the game pieces
##### blocks
returns a flattened array used in some of the scanning functions
##### SiftingScan
This function calls simpleScan that returns all adjacent gems. If gems are returned then those gems are removed  
##### currentSelected
This variable holds the current game piece that is selected so a user can move
##### swap
Swaps two game pieces
##### selection
This is the method called when a game piece is clicked. It checks if the game has a current selected piece then if it does, swaps the previous and current pieces around and moves them in the gameGrid. Then calls a scan. If the scan has removed pieces it the drops the game pieces down (if required) and drops in new pieces
##### remove
This function fades out a piece and removes it from the gameGrid
##### siftingScan
This scan finds matching bricks, and if found removes them.
##### goLower
This takes a column and a row and checks if a piece needs to go lower (after pieces have been removed) Since used in a while it returns true when can go no further, or false if it can move.
##### lower
This method scans all rows and columns up and calls the goLower function on them
##### drop
this method scans the gameGrid and inserts new game pieces into empty spots
##### moveDown
calls lower for each row
##### falling
this stages the lowering of the game pieces and then after a slight delay (to compensate for the game animations the drop is called and puts new pieces into place. Then a simple scan runs if any pieces match now and if so it loops, otherwise it ends
##### loop
The siftingScan and delay of the falling.
#### simpleScan
Scans the grid using [sift](https://github.com/crcn/sift.js) looking for adjacent bricks. Determines the ones that match and returns all pieces that match


### The Returned Object
#### init
This sets up the grid and events are bound
#### sift
This scans the entire grid, provides public access to the siftingScan method
#### fall
This provides public access to the falling method
#### debug
Removes a piece based on column/row coordinates


#### Others
##### Game.js
This object contains the configuration elements of the game. Width, height, columns, rows. Anything configurable should be put into this object

