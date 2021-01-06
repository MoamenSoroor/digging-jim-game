


// map is the 2d matrix
// tileWidth is the width of one tile
// tileHeight is the height of the one tile
// playerxpos is the tile number in x axis
// playerypox is the tile number in y axis 
var World = function (worldMap1)
{
  this.worldMap = worldMap1;
  this.score = 0;
  this.player = null;
  this.diamonds = null;
  this.rocks = null;
  this.controls = controls;
  this.controls.initControls();
}

World.prototype.start = function()
{
  var self = this;
  this.worldMap.drawWorldMap();
  this.player = this.worldMap.player;
  this.diamonds = this.worldMap.diamonds;
  this.rocks = this.worldMap.rocks;

  this.controls.onKeyUp = function () {
    self.movePlayer(Direction.UP);
  }
  this.controls.onKeyDown = function () {
    self.movePlayer(Direction.DOWN);
  }

  this.controls.onKeyLeft = function () {
    self.movePlayer(Direction.LEFT);
  }
  this.controls.onKeyRight = function () {
    self.movePlayer(Direction.RIGHT);
  }

}

// pass direction ex:  Direction.UP 
World.prototype.movePlayer = function(direction)
{

  if(!this.player.isMovingX() && !this.player.isMovingY())
  {
    var tile = null;
    switch(direction)
    {
      case Direction.UP:
        tile = this.worldMap.getTile(this.player.xpos, this.player.ypos - 1);
      break;
      case Direction.DOWN:
        tile = this.worldMap.getTile(this.player.xpos, this.player.ypos + 1);
        
      break;
      case Direction.LEFT:
        tile = this.worldMap.getTile(this.player.xpos - 1, this.player.ypos);
      break;
      case Direction.RIGHT:
        tile = this.worldMap.getTile(this.player.xpos + 1, this.player.ypos);
      break;
  
      default: 
        throw new Error("Not Valid Direction");
      break;
    }
  
    console.log(tile);
    console.log(this.player);
  
    switch(tile.tileType)
    {
      case AssetsType.background:
        this.player.moveToDirection(direction);
      break;
      case AssetsType.dirt:
        this.player.moveToDirection(direction);
        this.worldMap.updateTileTo(tile.xpos,tile.ypos,AssetsType.background,50);
        
      break;
    }
  }
  

}

World.prototype.moveScrollBar = function()
{
  

  //var xp = Entity.toPixelX(this.player.xpos );

  // logic scroll bar


}











