


// map is the 2d matrix
// tileWidth is the width of one tile
// tileHeight is the height of the one tile
// playerxpos is the tile number in x axis
// playerypox is the tile number in y axis 
var World = function (map, game) {
  this.game = game;
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

World.prototype.continue = function () {
  this.isWorldStop = false;
}

World.prototype.end = function () {
  this.controls.unRegisterControls();
  this.worldMap.eraseWorldMap(this);
}

World.prototype.start = function () {
  var self = this;
  this.worldMap.drawWorldMap(this);
  this.player = this.worldMap.player;
  this.entityManager.initEntityManager();


  this.controls.onKeyUp = function () {
    if (!self.isWorldStop) {
      self.entityManager.requestPlayerMove(Direction.UP);
      self.moveScrollBar();
    }
  }
  this.controls.onKeyDown = function () {
    if (!self.isWorldStop) {
      self.entityManager.requestPlayerMove(Direction.DOWN);
      self.moveScrollBar();
    }
  }

  this.controls.onKeyLeft = function () {
    if (!self.isWorldStop) {

      self.entityManager.requestPlayerMove(Direction.LEFT);
      self.moveScrollBar();
    }
  }
  this.controls.onKeyRight = function () {
    if (!self.isWorldStop) {
      self.entityManager.requestPlayerMove(Direction.RIGHT);
      self.moveScrollBar();
    }
  }

}


World.prototype.moveScrollBar = function () {
  var tx, ty;
  var scrX = Math.floor(window.innerWidth / Entity.width);
  var scrY = Math.floor(window.innerHeight / Entity.height);;
  tx = (this.player.xpos - Math.floor(scrX / 2)) * Entity.width;
  ty = (this.player.ypos - Math.floor(scrY / 2)) * Entity.height;
  window.scrollTo(tx, ty);
}



World.prototype.onWin = function () {
  this.game.gameWon(this.score);
}


World.prototype.onFail = function () {
  this.game.lose();
}

World.prototype.onEatDiamond = function (value) {
  console.log("diamond has been eaten");
  console.log(value);
  this.score += value;
  this.game.setScoreOnBar(this.score + this.game.score);
  audio(AudioType.takeCoin);

}