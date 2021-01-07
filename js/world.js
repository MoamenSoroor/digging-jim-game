


// map is the 2d matrix
// tileWidth is the width of one tile
// tileHeight is the height of the one tile
// playerxpos is the tile number in x axis
// playerypox is the tile number in y axis 
var World = function (map)
{
  this.worldMap = new WorldMap(map);
  this.score = 0;
  this.player = null;
  this.entityManager = null;
  this.controls = controls;
  this.controls.initControls();
  this.entityManager = new EntityManager(this);

  this.isWorldStop = false;
  

}

World.prototype.stop = function ()
{
  this.isWorldStop = true; 
}

World.prototype.continue = function()
{
  this.isWorldStop = false; 
}

World.prototype.start = function()
{
  var self = this;
  this.worldMap.drawWorldMap(this);
  this.player = this.worldMap.player;
  

  this.controls.onKeyUp = function () {
    if(!self.isWorldStop)
    {
      self.entityManager.requestPlayerMove(Direction.UP);
    }
  }
  this.controls.onKeyDown = function () {
    if(!self.isWorldStop)
    {
      self.entityManager.requestPlayerMove(Direction.DOWN);
    }
  }

  this.controls.onKeyLeft = function () {
    if(!self.isWorldStop)
    {

      self.entityManager.requestPlayerMove(Direction.LEFT);
    }
  }
  this.controls.onKeyRight = function () {
    if(!self.isWorldStop)
    {
      self.entityManager.requestPlayerMove(Direction.RIGHT);
    }
  }

}


World.prototype.moveScrollBar = function()
{
 
}



World.prototype.onWin = function ()
{

}


World.prototype.onFail = function ()
{
  
}





