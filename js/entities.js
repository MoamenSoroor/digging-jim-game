



var Entity = function (world,x, y,id,assetType,keysUp, keysDown, keysLeft, keysRight)
{
    this.world = world;
    this.xpos = x;
    this.ypos = y;
    this.id = id;
    this.entityType = assetType;
    this.src = Assets.getSrc(assetType);
    this.keysUp = keysUp;
    this.keysDown = keysDown;
    this.keysLeft = keysLeft;
    this.keysRight = keysRight;
    this.direction = Direction.DOWN;
    this.duration = 100;
    var im = dom.createImg(this.src,this.id,Entity.toPixelX(this.xpos), Entity.toPixelY(this.ypos));
    im.style.zIndex = 1;
    this.image = new AnimatedImage(im,Entity.toPixelX(this.xpos), Entity.toPixelY(this.ypos), Entity.width,Entity.height );



}



Entity.width = 32;
Entity.height = 32;

Entity.toPixelX = function (x) {  return Entity.width * x; } 
Entity.toPixelY = function (y) {  return Entity.height * y; } 

Entity.toPosX = function (px) {  return parseInt(px / Entity.width); } 
Entity.toPosY = function (py) {  return parseInt(py / Entity.height); } 

Entity.prototype = Object.create(Tile.prototype);

Entity.prototype.constructor = Entity.constructor;


Entity.prototype.drawEntity  = function (){
    dom.addImage(this.image.domImage);
}

Entity.prototype.removeEntity  = function (after){
    if(after == undefined || after == null)
        dom.removeImage(this.image.domImage);
    else 
    {
        var self = this;
        setTimeout(function(){
            dom.removeImage(self.image.domImage);
        },after);
    }
}


Entity.prototype.onMoveFinish  = function (){
    // check direcion 
}

Entity.prototype.getX  = function (){
  return this.image.getLeft();
}


Entity.prototype.getY  = function (){
  return this.image.getTop();
}



Entity.prototype.moveToDirection = function(direction,delta,onFinish)
{
    switch (direction) {
        case Direction.UP:
            this.moveUp(delta,onFinish);
        break;
        case Direction.DOWN:
            this.moveDown(delta,onFinish);
        break;
        case Direction.LEFT:
            this.moveLeft(delta,onFinish);
        
        break;
        case Direction.RIGHT:
            this.moveRight(delta,onFinish);
        break;

        default: 
        throw new Error("Not Valid Direction");
        break;
    }
    
}


Entity.prototype.updateAsset = function(assetType)
{
    this.image.setSrc(Assets.getSrc(assetType));
}


Entity.prototype.moveUp = function(dy,onFinish)
{
    if(dy == undefined || dy == null )
        dy = 1;
    if(!this.isMovingY())
    {
        this.direction = Direction.UP;
        // console.log(this);
        this.ypos -= dy;
        this.image.moveY(this.duration, Entity.toPixelY( -1 * dy) , this.keysUp,onFinish);
    }
    
    
}


Entity.prototype.moveDown = function(dy,onFinish)
{
    
    if(dy == undefined || dy == null )
        dy = 1;
    if(!this.isMovingY())
    {
        this.direction = Direction.DOWN;
        this.ypos += dy;
        this.image.moveY(this.duration,Entity.toPixelY(dy) , this.keysDown,onFinish);
    }

}

Entity.prototype.moveLeft = function(dx,onFinish)
{
    if(dx == undefined || dx == null )
        dx = 1;
    if(!this.isMovingX())
    {
        this.direction = Direction.LEFT;
        this.image.moveX(this.duration,Entity.toPixelY( -1 * dx)  ,this.keysLeft,onFinish);
        this.xpos -= dx;
    }
    
}

Entity.prototype.moveRight = function(dx,onFinish)
{
    if(dx == undefined || dx == null )
        dx = 1;
    if(!this.isMovingX())
    {
        this.direction = Direction.RIGHT;
        this.image.moveX(this.duration, Entity.toPixelY(dx) ,this.keysRight,onFinish);
        this.xpos += dx;
    }
}


Entity.prototype.isMovingX = function()
{
    
    return this.image.isPlayX();
}

Entity.prototype.isMovingY = function()
{
    return this.image.isPlayY();
}


// rock


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

