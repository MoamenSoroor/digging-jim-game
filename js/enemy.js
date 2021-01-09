

var Enemy  = function (world, x, y)
{
    Entity.call(this,world,x,y,"Enemy",AssetsType.enemy);

    this.duration = 100;

}

Enemy.prototype = Object.create(Entity.prototype);

Enemy.prototype.constructor = Enemy.constructor;



Enemy.prototype.moveToDirection = function(direction,onFinish)
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


Enemy.prototype.moveUp = function(onFinish)
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
    }

}


Enemy.prototype.moveDown = function(onFinish)
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
    }
}

Enemy.prototype.moveLeft = function(onFinish)
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
    }
}

Enemy.prototype.moveRight = function(onFinish)
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
    }
}

Enemy.prototype.move = function () {

    console.log("move enemey here --------------------------------------------");
    switch(this.direction)
    {
        case Direction.None:
            this.direction = Direction.RIGHT;
            
        break;
        case Direction.UP:
            var en = this.world.entityManager.getEntity(this.xpos,this.ypos - 1);
            console.log(en);
            if(en == undefined || en == null)
                this.moveUp();
            else if(en.entityType == AssetsType.character)
            {
                this.world.onFailInternal();
            }
            else
                this.direction = Direction.RIGHT;
            
            
        break;

        case Direction.DOWN:
            var en = this.world.entityManager.getEntity(this.xpos,this.ypos + 1);
            if(en == undefined || en == null)
                this.moveDown();
            else if(en.entityType == AssetsType.character)
            {
                this.world.onFailInternal();
            }
            else
            this.direction = Direction.LEFT;
            
        break;

        case Direction.LEFT:
            var en = this.world.entityManager.getEntity(this.xpos - 1,this.ypos );
            if(en == undefined || en == null )
                this.moveLeft();
            else if(en.entityType == AssetsType.character)
            {
                this.world.onFailInternal();
            }
            else
                this.direction = Direction.UP;
                
        break;

        case Direction.RIGHT:
            var en = this.world.entityManager.getEntity(this.xpos + 1,this.ypos );
            if(en == undefined || en == null)
                this.moveRight();
            else if(en.entityType == AssetsType.character)
            {
                this.world.onFailInternal();
            }
            else
                this.direction = Direction.DOWN;
        break;

        default:
            console.log("default");


    }
    if(this.world.entityManager.hasEntity(this.xpos,this.ypos - 1))
    {

    }

}