
  
  var Tile = function (x, y,assetType)
  {
    this.xpos = x;
    this.ypos = y;
    this.tileType = assetType;
    this.src = Assets.getSrc(assetType);
  
  }


  Tile.prototype.updateTileTypeTo = function(newTileType)
  {
    return new Tile(this.xpos, this.ypos,newTileType);
  }
  

      
  Tile.updateTileTypeTo = function (oldTile, type)
  {
    return new Tile(oldTile.xpos, oldTile.ypos,type);
  }

  Tile.tileWidth = 32;
  Tile.tileHeight = 32;
  
 
  