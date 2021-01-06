



var Entity = function (x, y,id,assetType,keysUp, keysDown, keysLeft, keysRight)
{
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
    

    if(!this.isMovingY())
    {
        this.direction = Direction.DOWN;
        this.ypos += dy;
        this.image.moveY(this.duration,Entity.toPixelY(dy) , this.keysUp,onFinish);
    }

}

Entity.prototype.moveLeft = function(dx,onFinish)
{
    
    if(!this.isMovingX())
    {
        this.direction = Direction.LEFT;
        this.image.moveX(this.duration,Entity.toPixelY( -1 * dx)  ,this.keysLeft,onFinish);
        this.xpos -= dx;
    }
    
}

Entity.prototype.moveRight = function(dx,onFinish)
{
    
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




var Player  = function (x, y)
{
    Entity.call(this,x,y,"player",AssetsType.character);
}

Player.prototype = Object.create(Entity.prototype);

Player.prototype.constructor = Player.constructor;



Player.prototype.moveUp = function(onFinish)
{
    Entity.prototype.moveUp.call(this,1,onFinish);

}

Player.prototype.moveToDirection = function(direction,onFinish)
{
    Entity.prototype.moveToDirection.call(this,direction,1,onFinish);

}

Player.prototype.moveDown = function(onFinish)
{
    Entity.prototype.moveDown.call(this,1,onFinish);
}

Player.prototype.moveLeft = function(onFinish)
{
    Entity.prototype.moveLeft.call(this,1,onFinish);
}

Player.prototype.moveRight = function(onFinish)
{
    Entity.prototype.moveRight.call(this,1,onFinish);
}


// rock


var Rock  = function (x, y)
{
    Entity.call(this,x,y,"rock" + x + "-" + y,AssetsType.rock);
}

Rock.prototype = Object.create(Entity.prototype);

Rock.prototype.constructor = Rock.constructor;



Rock.prototype.moveUp = function()
{
    Entity.prototype.moveUp.call(this,1);

}

Rock.prototype.moveDown = function()
{
    Entity.prototype.moveDown.call(this,1);
}

Rock.prototype.moveLeft = function()
{
    Entity.prototype.moveLeft.call(this,1);
}

Rock.prototype.moveRight = function()
{
    Entity.prototype.moveRight.call(this,1);
}




var Diamond  = function (x, y)
{
    Entity.call(this,x,y,"diamond" + x + "-" + y,AssetsType.diamond);
}

Diamond.prototype = Object.create(Entity.prototype);

Diamond.prototype.constructor = Diamond.constructor;



Diamond.prototype.moveUp = function()
{
    Entity.prototype.moveUp.call(this,1);

}

Diamond.prototype.moveDown = function()
{
    Entity.prototype.moveDown.call(this,1);
}

Diamond.prototype.moveLeft = function()
{
    Entity.prototype.moveLeft.call(this,1);
}

Diamond.prototype.moveRight = function()
{
    Entity.prototype.moveRight.call(this,1);
}


