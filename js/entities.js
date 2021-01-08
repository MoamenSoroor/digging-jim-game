



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

Entity.prototype.removeEntity  = function (){
    dom.removeImage(this.image.domImage);
}


Entity.prototype.onMoveFinish  = function (){
    // check direcion 
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
        console.log(this);
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
        this.image.moveY(this.duration,Entity.toPixelY(dy) , this.keysUp,onFinish);
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
        this.image.moveX(this.duration, Entity.toPixelY(dx) ,this.keysLeft,onFinish);
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




var Player  = function (world, x, y)
{
    Entity.call(this,world,x,y,"player",AssetsType.character);

    // this.keysUp = ["","",""];
    // this.keysDown = ["","",""];
    // this.keyLeft = ["","",""];
    // this.keysRight= ["","",""];
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
        audio(AudioType.move); 
        Entity.prototype.moveUp.call(this,1,onFinish);   
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
        audio(AudioType.move);     
        Entity.prototype.moveDown.call(this,1,onFinish);  
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
          audio(AudioType.move);       
          Entity.prototype.moveLeft.call(this,1,onFinish);
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
        audio(AudioType.move);
        Entity.prototype.moveRight.call(this,1,onFinish); 
      break;
    }
}


// rock


var FallingEntity = function(world,x, y,id,assetType,keysUp, keysDown, keysLeft, keysRight) 
{
    Entity.call(this,world,x, y,id,assetType,keysUp, keysDown, keysLeft, keysRight);



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
        Entity.prototype.moveDown.call(this,1);
      break;
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
        Entity.prototype.moveRight.call(this,1);
      break;
    }
}




var Rock  = function (world, x, y)
{
    FallingEntity.call(this,world,x,y,"rock" + x + "-" + y,AssetsType.rock);
}

Rock.prototype = Object.create(FallingEntity.prototype);

Rock.prototype.constructor = Rock.constructor;



var Diamond  = function (world, x, y)
{
    FallingEntity.call(this,world,x,y,"diamond" + x + "-" + y,AssetsType.diamond);
    this.diamondValue = 1;
}

Diamond.prototype = Object.create(FallingEntity.prototype);

Diamond.prototype.constructor = Diamond.constructor;

