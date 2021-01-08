


// map is the 2d matrix
// tileWidth is the width of one tile
// tileHeight is the height of the one tile
// playerxpos is the tile number in x axis
// playerypox is the tile number in y axis 
var World = function (map)
{
  this.worldMap = new WorldMap(map);
  this.score = 0;
  this.width = this.worldMap.width;
  this.height = this.worldMap.height;
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
  this.entityManager.stop();
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
  this.entityManager.initEntityManager();
  

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


World.prototype.onWinInternal = function ()
{

  this.player.removeEntity();
  this.player.winSound.play();
  this.onWin();
  this.stop();

}


World.prototype.onFailInternal = function ()
{
  this.worldMap.updateTileTo(this.player.xpos - 1,this.player.ypos - 1,AssetsType.background);
  this.worldMap.updateTileTo(this.player.xpos - 1,this.player.ypos,AssetsType.background);
  this.worldMap.updateTileTo(this.player.xpos - 1,this.player.ypos + 1,AssetsType.background);
  this.worldMap.updateTileTo(this.player.xpos + 1,this.player.ypos - 1,AssetsType.background);
  this.worldMap.updateTileTo(this.player.xpos + 1,this.player.ypos,AssetsType.background);
  this.worldMap.updateTileTo(this.player.xpos + 1,this.player.ypos + 1,AssetsType.background);
  this.worldMap.updateTileTo(this.player.xpos,this.player.ypos - 1,AssetsType.background);
  this.worldMap.updateTileTo(this.player.xpos,this.player.ypos + 1,AssetsType.background);


  var e1 =  this.entityManager.getEntity(this.player.xpos - 1,this.player.ypos - 1)
  var e2 =  this.entityManager.getEntity(this.player.xpos - 1,this.player.ypos)
  var e3 =  this.entityManager.getEntity(this.player.xpos - 1,this.player.ypos + 1)
  var e4 =  this.entityManager.getEntity(this.player.xpos + 1,this.player.ypos - 1)
  var e5 =  this.entityManager.getEntity(this.player.xpos + 1,this.player.ypos)
  var e6 =  this.entityManager.getEntity(this.player.xpos + 1,this.player.ypos + 1)
  var e7 =  this.entityManager.getEntity(this.player.xpos,this.player.ypos - 1)
  var e8 =  this.entityManager.getEntity(this.player.xpos,this.player.ypos + 1)


  if(e1 != null) e1.removeEntity();
  if(e2 != null) e2.removeEntity();
  if(e3 != null) e3.removeEntity();
  if(e4 != null) e4.removeEntity();
  if(e5 != null) e5.removeEntity();
  if(e6 != null) e6.removeEntity();
  if(e7 != null) e7.removeEntity();
  if(e8 != null) e8.removeEntity();

  dom.addImage(dom.createImg(Assets.getSrc(AssetsType.lose),"lose",
    Entity.toPixelX(this.player.xpos - 1),
      Entity.toPixelX(this.player.ypos - 1), Entity.width * 3 , Entity.height * 3));

  this.player.removeEntity();

  this.stop();
  this.onFail();
  this.player.loseSound.play();
}

World.prototype.onEatDiamondInternal = function(value)
{
  this.onEatDiamond(value);
  
} 


World.prototype.onWin = function ()
{
  console.log("-------------------- you win -------------------");
  console.log("-------------------- you score " + this.score +" -------------------");
}


World.prototype.onFail = function ()
{
  console.log("-------------------- you are loser -------------------");
}

World.prototype.onEatDiamond = function(value)
{
  console.log("diamond has been eaten");
  console.log(value);
  this.score+= value;
  
} 





