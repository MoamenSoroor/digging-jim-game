



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
