
// falling entity is any entity that is falldown
var FallingEntity = function(world,x, y,id,assetType,keysUp, keysDown, keysLeft, keysRight) 
{
    Entity.call(this,world,x, y,id,assetType,keysUp, keysDown, keysLeft, keysRight);

    this.isFalling = false;

    this.fallingSound = null;



}

FallingEntity.prototype = Object.create(Entity.prototype);

FallingEntity.prototype.constructor = FallingEntity.constructor;




FallingEntity.prototype.isDownBackground = function(){
    return this.world.worldMap.checkTileType(this.xpos, this.ypos + 1);
}

FallingEntity.prototype.moveDown = function()
{

    if(this.isMovingY())
        return;

    
    var tile = this.world.worldMap.getTile(this.xpos, this.ypos + 1);
    switch(tile.tileType)
    {
      case AssetsType.background:
        if(this.world.player.xpos == this.xpos && this.world.player.ypos == this.ypos + 1)
        {
          if(this.isFalling)
          {
            // game over here
            this.world.onFailInternal();
            

          }

        }
        else
        {
          var self = this;
          Entity.prototype.moveDown.call(this,1,function () {
              if(self.world.worldMap.checkTileType(self.xpos,self.ypos + 1,AssetsType.dirt))
                  self.fallingSound.play();
            });
          this.isFalling = true;

          

        }
      break;
      default:
        this.isFalling = false;
    }
}





FallingEntity.prototype.moveLeft = function()
{

    if(this.isMovingX())
        return;

    
    var tile = this.world.worldMap.getTile(this.xpos - 1, this.ypos);
    switch(tile.tileType)
    {
      case AssetsType.background:
        this.world.entityManager.transferEntity(this,this.xpos - 1);
        Entity.prototype.moveLeft.call(this,1);
      break;
    }
}


FallingEntity.prototype.moveRight = function()
{

    if(this.isMovingX())
        return;

    
    var tile = this.world.worldMap.getTile(this.xpos +1 , this.ypos);
    switch(tile.tileType)
    {
      case AssetsType.background:
        this.world.entityManager.transferEntity(this,this.xpos + 1);
        Entity.prototype.moveRight.call(this,1);
      break;
    }
}



FallingEntity.prototype.fallDown = function()
{

    if(!this.world.entityManager.hasEntity(this.xpos,this.ypos + 1))
    {
        this.moveDown();
        // console.log("move down ");

    }
    else {
        this.isFalling = false;
        // console.log("not falling");
        
        // right
        if(!this.world.entityManager.hasEntity(this.xpos + 1,this.ypos) 
            && !this.world.entityManager.hasPlayer(this.xpos + 1, this.ypos)
            && this.world.worldMap.checkTileType(this.xpos + 1,this.ypos,AssetsType.background)
            && !this.world.entityManager.hasEntity(this.xpos + 1,this.ypos + 1) 
            && !this.world.entityManager.hasPlayer(this.xpos + 1, this.ypos+1)
            && this.world.worldMap.checkTileType(this.xpos + 1,this.ypos + 1,AssetsType.background)
          )
          {
            this.moveRight();
          }
        //left
        else if(!this.world.entityManager.hasEntity(this.xpos - 1,this.ypos) 
            && !this.world.entityManager.hasPlayer(this.xpos - 1, this.ypos)
            && this.world.worldMap.checkTileType(this.xpos - 1,this.ypos + 1,AssetsType.background)
            && !this.world.entityManager.hasEntity(this.xpos - 1,this.ypos + 1)
            && !this.world.entityManager.hasPlayer(this.xpos - 1, this.ypos+1)
            && this.world.worldMap.checkTileType(this.xpos - 1,this.ypos + 1,AssetsType.background)
          )
          {
            this.moveLeft();
          }

        



    }
}



var Rock  = function (world, x, y)
{
    FallingEntity.call(this,world,x,y,"rock" + x + "-" + y,AssetsType.rock);

    this.fallingSound = new Sound(SoundSrc.rockFalling);
}

Rock.prototype = Object.create(FallingEntity.prototype);

Rock.prototype.constructor = Rock.constructor;



var Diamond  = function (world, x, y,value)
{
    FallingEntity.call(this,world,x,y,"diamond" + x + "-" + y,AssetsType.diamond);
    this.diamondValue = value || 1;

    this.fallingSound = new Sound(SoundSrc.diamondFalling);
}

Diamond.prototype = Object.create(FallingEntity.prototype);

Diamond.prototype.constructor = Diamond.constructor;



var Bomb  = function (world, x, y)
{
    FallingEntity.call(this,world,x,y,"bomb" + x + "-" + y,AssetsType.bomb);
    this.fallingSound = new Sound(SoundSrc.rockFalling);
}

Bomb.prototype = Object.create(FallingEntity.prototype);

Bomb.prototype.constructor = Bomb.constructor;