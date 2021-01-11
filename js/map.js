
var WorldMap = function (map1) {
  this.map = map1;
  this.width = map1[0].length;
  this.height = map1.length;
}



WorldMap.prototype.drawWorldMap = function (world) {
  for (let i = 0; i < this.height; i++) {
    for (let j = 0; j < this.width; j++) {

      switch (this.map[i][j]) {
        case AssetsType.background:
          ui.createTile(new Tile(j, i, this.map[i][j]));
          break;
        case AssetsType.block:
          ui.createTile(new Tile(j, i, this.map[i][j]));
          break;
        case AssetsType.dirt:
          ui.createTile(new Tile(j, i, this.map[i][j]));
          break;
        case AssetsType.door:
          ui.createTile(new Tile(j, i, AssetsType.door));
          break;
        case AssetsType.tubeLF:
          ui.createTile(new Tile(j, i, AssetsType.tubeLF, 2));
          break;
        case AssetsType.tubeUD:
          ui.createTile(new Tile(j, i, AssetsType.tubeUD, 2));
          break;
        case AssetsType.character:
          ui.createTile(new Tile(j, i, AssetsType.background));
          this.map[i][j] = AssetsType.background;
          this.player = new Player(world, j, i);
          this.player.drawEntity();
          world.entityManager.setPlayer(this.player);
          break;
        case AssetsType.rock:
          ui.createTile(new Tile(j, i, AssetsType.background));
          this.map[i][j] = AssetsType.background;
          var rock = new Rock(world, j, i);
          rock.drawEntity();
          world.entityManager.addEntity(rock);
          break;
        case AssetsType.diamond:
          ui.createTile(new Tile(j, i, AssetsType.background));
          this.map[i][j] = AssetsType.background;
          var diamond = new Diamond(world, j, i);
          diamond.drawEntity();
          world.entityManager.addEntity(diamond);
          break;
        case AssetsType.bomb:
          ui.createTile(new Tile(j, i, AssetsType.background));
          this.map[i][j] = AssetsType.background;
          var bomb = new Bomb(world, j, i);
          bomb.drawEntity();
          world.entityManager.addEntity(bomb);
          break;

        default:
          //console.log("asset type " + this.map[i][j]);
          throw new Error("Error: asset is not exists");
      }

    }
  }
}

WorldMap.prototype.eraseWorldMap = function (world) {
  for (let i in world.entityManager.entities) {
    for (let j = 0; j < world.entityManager.entities[i].length; j++) {
      dom.removeImageById(world.entityManager.entities[i][j].id);
    }
  }

  for (let i = 0; i < this.map.length; i++) {
    for (let j = 0; j < this.map[i].length; j++) {
      ui.removeTile(j, i);
    }
  }
  if(world.player !== null && world.player.id !== null){
    dom.removeImageById(world.player.id);
  }
  dom.removeImageById('lose');
  
}


WorldMap.prototype.updateTileTo = function (xpos, ypos, tileType, duration) {
  if (xpos < this.width && ypos < this.height) {

    if (duration != undefined && duration != null) {
      var self = this;
      setTimeout(() => {
        var tile = new Tile(xpos, ypos, tileType);
        self.map[ypos][xpos] = tile.tileType;
        ui.updateTile(tile);
      }, duration);
    }
    else {
      var tile = new Tile(xpos, ypos, tileType);
      this.map[ypos][xpos] = tile.tileType;
      ui.updateTile(tile);
    }



  }
  else
    throw new Error("Error: not valid location.")
}

// WorldMap.prototype.updateTileTo = function(xpos,ypos,tileType)
// {
//   if(xpos < this.width && ypos < this.height)
//   {

//     var tile = new Tile(xpos,ypos,tileType); 
//     this.map[ypos][xpos] = tile.tileType;
//     ui.updateTile(tile);

//   }
//   else 
//     throw new Error("Error: not valid location.")
// }



WorldMap.prototype.checkTileType = function (xpos, ypos, tileType) {
  if (xpos < this.width && ypos < this.height)
    return this.map[ypos][xpos] === tileType;
}


WorldMap.prototype.getTile = function (xpos, ypos) {
  //console.log(xpos, ypos);
  if (xpos < this.width && ypos < this.height && xpos >= 0 && ypos >= 0)
    return new Tile(xpos, ypos, this.map[ypos][xpos]);
  else
    return false;
}