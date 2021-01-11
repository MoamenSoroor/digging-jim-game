


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

World.prototype.stop = function () {
  this.isWorldStop = true;
  this.entityManager.stop();
  this.onStop();
}


World.prototype.pause = function () {
  this.isWorldStop = true;
  this.entityManager.stop();
  this.onPause();
}



// this for playing world after pausing it with p key
World.prototype.play = function () {
  this.isWorldStop = false;
  this.entityManager.play();
  this.onPlay();
}

World.prototype.end = function () {
  this.controls.unRegisterControls();
  this.worldMap.eraseWorldMap(this);
}

World.prototype.start = function () {
  var self = this;
  this.worldMap.drawWorldMap(this);
  this.player = this.worldMap.player;
  this.isWorldStop = false;
  this.entityManager.play();


  this.controls.onKeyUp = function () {
    if (!self.isWorldStop) {
      self.entityManager.requestPlayerMove(Direction.UP);
      //self.moveScrollBar();
    }
  }
  this.controls.onKeyDown = function () {
    if (!self.isWorldStop) {
      self.entityManager.requestPlayerMove(Direction.DOWN);
      //self.moveScrollBar();
    }
  }

  this.controls.onKeyLeft = function () {
    if (!self.isWorldStop) {

      self.entityManager.requestPlayerMove(Direction.LEFT);
      //self.moveScrollBar();
    }
  }
  this.controls.onKeyRight = function () {
    if (!self.isWorldStop) {
      self.entityManager.requestPlayerMove(Direction.RIGHT);
      //self.moveScrollBar();
    }
  }

  this.controls.onKeyPause = function () {
    if (self.isWorldStop)
      self.play();
    else
      self.pause();
  }

  this.controls.onKeyESC = function () {
    self.onFailInternal();
  }

}


World.prototype.moveScrollBar = function () {
  if (!this.isWorldStop) {
    var tx, ty;
    var scrX = Math.floor(window.innerWidth / Entity.width);
    var scrY = Math.floor(window.innerHeight / Entity.height);;
    tx = (this.player.xpos - Math.floor(scrX / 2)) * Entity.width;
    ty = (this.player.ypos - Math.floor(scrY / 2)) * Entity.height;
    window.scrollTo(tx, ty);
  }
}



// World.prototype.checkTile = function(xpos,ypos,tileType)
// {
//   return this.worldMap.checkTileType(xpos,ypos,tileType);
// }

// World.prototype.getTile = function(xpos,ypos,tileType)
// {
//   return this.worldMap.getTile(xpos,ypos);
// }

World.prototype.onWinInternal = function () {

  this.player.removeEntity();
  this.player.winSound.play();
  this.stop();

  var self = this;
  setTimeout(function(){self.onWin();},2500);

}


World.prototype.onFailInternal = function () {
  this.worldMap.updateTileTo(this.player.xpos - 1, this.player.ypos - 1, AssetsType.background);
  this.worldMap.updateTileTo(this.player.xpos - 1, this.player.ypos, AssetsType.background);
  this.worldMap.updateTileTo(this.player.xpos - 1, this.player.ypos + 1, AssetsType.background);
  this.worldMap.updateTileTo(this.player.xpos + 1, this.player.ypos - 1, AssetsType.background);
  this.worldMap.updateTileTo(this.player.xpos + 1, this.player.ypos, AssetsType.background);
  this.worldMap.updateTileTo(this.player.xpos + 1, this.player.ypos + 1, AssetsType.background);
  this.worldMap.updateTileTo(this.player.xpos, this.player.ypos - 1, AssetsType.background);
  this.worldMap.updateTileTo(this.player.xpos, this.player.ypos + 1, AssetsType.background);


  var e1 = this.entityManager.getEntity(this.player.xpos - 1, this.player.ypos - 1)
  var e2 = this.entityManager.getEntity(this.player.xpos - 1, this.player.ypos)
  var e3 = this.entityManager.getEntity(this.player.xpos - 1, this.player.ypos + 1)
  var e4 = this.entityManager.getEntity(this.player.xpos + 1, this.player.ypos - 1)
  var e5 = this.entityManager.getEntity(this.player.xpos + 1, this.player.ypos)
  var e6 = this.entityManager.getEntity(this.player.xpos + 1, this.player.ypos + 1)
  var e7 = this.entityManager.getEntity(this.player.xpos, this.player.ypos - 1)
  var e8 = this.entityManager.getEntity(this.player.xpos, this.player.ypos + 1)
  var e9 = this.entityManager.getEntity(this.player.xpos, this.player.ypos)


  if (e1 != null) e1.removeEntity();
  if (e2 != null) e2.removeEntity();
  if (e3 != null) e3.removeEntity();
  if (e4 != null) e4.removeEntity();
  if (e5 != null) e5.removeEntity();
  if (e6 != null) e6.removeEntity();
  if (e7 != null) e7.removeEntity();
  if (e8 != null) e8.removeEntity();
  if (e9 != null) e9.removeEntity();

  var im = dom.createImg(Assets.getSrc(AssetsType.lose), "lose",
  Entity.toPixelX(this.player.xpos - 1),
  Entity.toPixelX(this.player.ypos - 1), Entity.width * 3, Entity.height * 3);
  im.style.zIndex = 3;

  dom.addImage(im);

  this.player.removeEntity();

  this.stop();
  this.player.loseSound.play();
  var self = this;
  setTimeout(function(){self.onFail();},2000);
  
}

World.prototype.onEatDiamondInternal = function (value) {
  this.onEatDiamond(value);

}


World.prototype.onStop = function () {
  //this.game.showPausedDiv();
}

World.prototype.onPlay = function () {
  this.game.hidePausedDiv();
}

World.prototype.onPause = function () {
  this.game.showPausedDiv();
}


World.prototype.onWin = function () {
  this.game.gameWon(this.score);
}


World.prototype.onFail = function () {
  this.game.gameLose();
}

World.prototype.onEatDiamond = function (value) {
  this.score += value;
  this.game.setScoreOnBar(this.score + this.game.score);
}