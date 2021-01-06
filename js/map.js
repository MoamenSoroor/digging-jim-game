
 var WorldMap = function (map1)
 {
   this.map = map1;
   this.width = map1[0].length;
   this.height = map1.length;
   this.player = null;
   this.diamonds = [];
   this.rocks = [];

 }



WorldMap.prototype.drawWorldMap = function ()
{
    for (let i = 0; i < this.height; i++) {
      for (let j = 0; j < this.width; j++) {

        switch(this.map[i][j])
        {
            case AssetsType.background: 
                ui.createTile(new Tile(j,i,this.map[i][j]));
            break;
            case AssetsType.block: 
                ui.createTile(new Tile(j,i,this.map[i][j]));
            break;
            case AssetsType.dirt: 
                ui.createTile(new Tile(j,i,this.map[i][j]));
            break;
            case AssetsType.door: 
                ui.createTile(new Tile(j,i,AssetsType.door));
            break;
            case AssetsType.character: 
                ui.createTile(new Tile(j,i,AssetsType.background));
                this.player = new Player(j,i);
                this.player.drawEntity();
            break;
            case AssetsType.rock: 
                ui.createTile(new Tile(j,i,AssetsType.background));
                var rock = new Rock(j,i);
                rock.drawEntity();
                this.rocks.push(rock);
            break;
            case AssetsType.diamond: 
                ui.createTile(new Tile(j,i,AssetsType.background));
                var diamond = new Diamond(j,i);
                diamond.drawEntity();
                this.diamonds.push(diamond);
            break;
            

            default: 
                console.log("asset type "+ this.map[i][j]);
                throw new Error("Error: asset is not exists");
        }
        
      }
      
    }

    

}

WorldMap.prototype.updateTileTo = function(xpos,ypos,tileType,duration)
{
  if(xpos < this.width && ypos < this.height)
  {

    if(duration != undefined && duration != null)
    {
      var self = this;
      var counter = 0;
      var max = duration/25;
      setTimeout(() => {
        var tile = new Tile(xpos,ypos,tileType); 
        self.map[ypos][xpos] = tile.tileType;
        ui.updateTile(tile);
      }, duration);
    }
    else
    {
      var tile = new Tile(xpos,ypos,tileType); 
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



WorldMap.prototype.checkTileType = function(xpos,ypos,tileType)
{
  return this.getTile(xpos,ypos,).tileType == tileType;
}


WorldMap.prototype.getTile = function(xpos,ypos)
{
  return new Tile(xpos,ypos, this.map[ypos][xpos]);
}