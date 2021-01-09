



var Player  = function (world, x, y)
{
    Entity.call(this,world,x,y,"player",AssetsType.character);

    this.moveSound = new Sound(SoundSrc.moveChar);
    this.eatCoinsSound = new Sound(SoundSrc.eatCoins);
    this.winSound = new Sound(SoundSrc.win);
    this.loseSound = new Sound(SoundSrc.lose);
    this.tubeSound = new Sound(SoundSrc.tubeSound);

    // this.keysUp = ["","",""];
    // this.keysDown = ["","",""];
    this.keysLeft   = [Assets.getSrc(AssetsType.CharL1)];
    this.keysRight = [Assets.getSrc(AssetsType.CharR1)];
    this.keysDown = [Assets.getSrc(AssetsType.character)];
    this.keysUp = [Assets.getSrc(AssetsType.character)];
}

Player.prototype = Object.create(Entity.prototype);

Player.prototype.constructor = Player.constructor;



Player.prototype.moveToDirection = function(direction,onFinish)
{
    //Entity.prototype.moveToDirection.call(this,direction,1,onFinish);

    switch(direction)
    {
      case Direction.UP:
        this.moveUp(onFinish);
      break;
      case Direction.DOWN:
        this.moveDown(onFinish);
        
      break;
      case Direction.LEFT:
        this.moveLeft(onFinish);
      break;
      case Direction.RIGHT:
        this.moveRight(onFinish);
      break;
  
      default: 
        throw new Error("Not Valid Direction");
      break;
    }
}


Player.prototype.moveUp = function(onFinish)
{
    if(this.direction == Direction.None) this.direction = Direction.UP;

    if(this.isMovingY() && (Direction.UP || Direction.DOWN))
        return;

    
    var tile = this.world.worldMap.getTile(this.xpos, this.ypos - 1);
    switch(tile.tileType)
    {
      case AssetsType.background:
        Entity.prototype.moveUp.call(this,1,onFinish);
      break;
      case AssetsType.dirt:
        this.world.worldMap.updateTileTo(tile.xpos,tile.ypos,AssetsType.background,50);    
        Entity.prototype.moveUp.call(this,1,onFinish);   
        this.moveSound.play();
      break;
      case AssetsType.tubeUD:
        if(!this.world.entityManager.hasEntity(this.xpos,this.ypos - 2))
        {
            if(this.world.worldMap.checkTileType(this.xpos,this.ypos - 2,AssetsType.background) 
                || this.world.worldMap.checkTileType(this.xpos,this.ypos - 2,AssetsType.dirt))
            {
                Entity.prototype.moveUp.call(this,2,onFinish);   
                this.world.worldMap.updateTileTo(tile.xpos,tile.ypos - 1,AssetsType.background,100);    
                this.tubeSound.play();
            }
            
        }
        else
        {
            var en = this.world.entityManager.getEntity(this.xpos,this.ypos - 2);
            if(en != undefined && en != null && en.entityType == AssetsType.diamond)
            {
                this.world.entityManager.eatDiamond(en);
                Entity.prototype.moveUp.call(this,2,onFinish);   
                this.world.worldMap.updateTileTo(tile.xpos,tile.ypos - 1,AssetsType.background,100);    
                this.tubeSound.play();
            }
            
        }
        
      break;
      case AssetsType.door:
        this.world.worldMap.updateTileTo(tile.xpos,tile.ypos,AssetsType.openDoor,50);    
        Entity.prototype.moveUp.call(this,1,onFinish);
        this.world.onWinInternal();
      break;
    }

}


Player.prototype.moveDown = function(onFinish)
{
    if(this.direction == Direction.None) this.direction = Direction.DOWN;

    if(this.isMovingY() && (Direction.UP || Direction.DOWN))
        return;

    
    var tile = this.world.worldMap.getTile(this.xpos, this.ypos + 1);
    switch(tile.tileType)
    {
      case AssetsType.background:
        Entity.prototype.moveDown.call(this,1,onFinish);
      break;
      case AssetsType.dirt:
        this.world.worldMap.updateTileTo(tile.xpos,tile.ypos,AssetsType.background,50);     
        Entity.prototype.moveDown.call(this,1,onFinish);  
        this.moveSound.play();
      break;
      case AssetsType.tubeUD:
        if(!this.world.entityManager.hasEntity(this.xpos,this.ypos + 2))
        {
            if(this.world.worldMap.checkTileType(this.xpos,this.ypos + 2,AssetsType.background) 
                || this.world.worldMap.checkTileType(this.xpos,this.ypos + 2,AssetsType.dirt))
            {
                Entity.prototype.moveDown.call(this,2,onFinish);   
                this.world.worldMap.updateTileTo(tile.xpos,tile.ypos + 1,AssetsType.background,100);    
                this.tubeSound.play();
            }
            
        }
        else
        {
            var en = this.world.entityManager.getEntity(this.xpos,this.ypos + 2);
            if(en != undefined && en != null && en.entityType == AssetsType.diamond)
            {
                this.world.entityManager.eatDiamond(en);
                Entity.prototype.moveDown.call(this,2,onFinish);   
                this.tubeSound.play();
            }
            
        }
        
      break;
      case AssetsType.door:
        this.world.worldMap.updateTileTo(tile.xpos,tile.ypos,AssetsType.openDoor,50);    
        Entity.prototype.moveDown.call(this,1,onFinish);
        this.world.onWinInternal();
      break;
    }
}

Player.prototype.moveLeft = function(onFinish)
{
    if(this.isMovingX() && (Direction.LEFT || Direction.RIGHT))
        return;
    if(this.direction == Direction.None) this.direction = Direction.LEFT;
    
    var tile = this.world.worldMap.getTile(this.xpos - 1, this.ypos );
    switch(tile.tileType)
    {
      case AssetsType.background:
        Entity.prototype.moveLeft.call(this,1,onFinish);
      break;
      case AssetsType.dirt:
          this.world.worldMap.updateTileTo(tile.xpos,tile.ypos,AssetsType.background,50);       
          Entity.prototype.moveLeft.call(this,1,onFinish);
          this.moveSound.play();
      break;
      case AssetsType.tubeLF:
        if(!this.world.entityManager.hasEntity(this.xpos - 2,this.ypos))
        {
            if(this.world.worldMap.checkTileType(this.xpos - 2,this.ypos,AssetsType.background) 
                || this.world.worldMap.checkTileType(this.xpos - 2,this.ypos,AssetsType.dirt))
            {
                Entity.prototype.moveLeft.call(this,2,onFinish);   
                this.tubeSound.play();
            }
            
        }
        else
        {
            var en = this.world.entityManager.getEntity(this.xpos - 2,this.ypos);
            if(en != undefined && en != null && en.entityType == AssetsType.diamond)
            {
                this.world.entityManager.eatDiamond(en);
                Entity.prototype.moveLeft.call(this,2,onFinish);   
                this.tubeSound.play();
            }
            
        }
        
      break;
      case AssetsType.door:
        this.world.worldMap.updateTileTo(tile.xpos,tile.ypos,AssetsType.openDoor,50);    
        Entity.prototype.moveLeft.call(this,1,onFinish);
        this.world.onWinInternal();
      break;
    }
}

Player.prototype.moveRight = function(onFinish)
{
    if(this.direction == Direction.None) this.direction = Direction.RIGHT;
    if(this.isMovingX() && (Direction.LEFT || Direction.RIGHT))
        return;
    
    var tile = this.world.worldMap.getTile(this.xpos + 1, this.ypos );
    switch(tile.tileType)
    {
      case AssetsType.background:
        Entity.prototype.moveRight.call(this,1,onFinish);
      break;
      case AssetsType.dirt:
        this.world.worldMap.updateTileTo(tile.xpos,tile.ypos,AssetsType.background,50);      
        Entity.prototype.moveRight.call(this,1,onFinish); 
        this.moveSound.play();
      break;
      case AssetsType.tubeLF:
        if(!this.world.entityManager.hasEntity(this.xpos + 2,this.ypos))
        {
            if(this.world.worldMap.checkTileType(this.xpos + 2,this.ypos,AssetsType.background) 
                || this.world.worldMap.checkTileType(this.xpos + 2,this.ypos,AssetsType.dirt))
            {
                Entity.prototype.moveRight.call(this,2,onFinish);   
                this.world.worldMap.updateTileTo(tile.xpos + 1,tile.ypos,AssetsType.background,100);    
                this.tubeSound.play();
            }
            
        }
        else
        {
            var en = this.world.entityManager.getEntity(this.xpos + 2,this.ypos);
            if(en != undefined && en != null && en.entityType == AssetsType.diamond)
            {
                this.world.entityManager.eatDiamond(en,Direction.RIGHT);
                Entity.prototype.moveRight.call(this,2,onFinish);   
                this.tubeSound.play();
            }
            
        }
        
      break;
      case AssetsType.door:
        this.world.worldMap.updateTileTo(tile.xpos,tile.ypos,AssetsType.openDoor,50);    
        Entity.prototype.moveRight.call(this,1,onFinish);
        this.world.onWinInternal();
      break;
    }
}
