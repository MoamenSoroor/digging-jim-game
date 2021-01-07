


var EntityManager = function(world)
{
    this.world = world;
    this.player = null;
    this.entities = {};

    for (let i = 0; i < world.worldMap.width; i++) {
        this.entities[i] = [];
        console.log(this.entities);
    }

}

// call it when player is moved to set the logic of moving
EntityManager.prototype.onMovingPlayer = function(relativeEntity,direction)
{
    console.log(relativeEntity);
    console.log("request move player");
    if(relativeEntity == undefined || relativeEntity == null)
        this.player.moveToDirection(direction);
    else
    {
        console.log("there are entity here");
        if(relativeEntity.entityType == AssetsType.diamond)
        {
            this.player.moveToDirection(direction);
            this.eatDiamond(relativeEntity);
            console.log("diamond here man!");
        }
        else if(relativeEntity.entityType == AssetsType.rock)
        {
            console.log("rock here man!");
        }
    }
}


EntityManager.prototype.requestPlayerMove = function(direction)
{
    switch(direction)
    {
        case Direction.UP:
            var en = this.getEntity(this.player.xpos,this.player.ypos - 1)
            this.onMovingPlayer(en,direction);
            
        break;

        case Direction.DOWN:
            // DOWN logic here 
            var en = this.getEntity(this.player.xpos,this.player.ypos + 1);
            this.onMovingPlayer(en,direction);
            
        break;

        case Direction.LEFT:
            // LEFT logic here 
            var en = this.getEntity(this.player.xpos - 1,this.player.ypos)
            this.onMovingPlayer(en,direction);
                
        break;

        case Direction.RIGHT:
            // RIGHT logic here
            var en = this.getEntity(this.player.xpos + 1,this.player.ypos);
            this.onMovingPlayer(en,direction);
        break;


    }
    
}


EntityManager.prototype.initEntityManager = function ()
{
    // var self = this;
    // setInterval(() => {
        
    //     self.falling();


    // }, FrameTime* 2);
}

EntityManager.prototype.hasEntity = function(xpos,ypos)
{
    if(this.entities[xpos] != null)
        if(this.entities[xpos].find((value) => { value.ypos == ypos }) != undefined)
            return true;
        else
            return false;
    else
        return false;
}


EntityManager.prototype.getEntity = function(xpos,ypos)
{
    if(this.entities[xpos] != null)
    {
        var geten =  this.entities[xpos].find(en => en.ypos == ypos);
          console.log(this.entities[xpos]);
        console.log("get entity");
        console.log(geten);
        return geten;
    }
    else
        return null;
}



EntityManager.prototype.setPlayer = function(player)
{
    this.player = player;
}

EntityManager.prototype.addEntity = function(entity)
{
    this.entities[entity.xpos].unshift(entity);

    this.entities[entity.xpos].sort((a, b) => { a.ypos - b.ypos })
}


EntityManager.prototype.eatDiamond = function(entity)
{
    var index = this.entities[entity.xpos].findIndex(en => en.ypos == entity.ypos);
    if(index > -1)
    {
        console.log("to remove diamond");
        this.entities[entity.xpos].splice(index,1);
        entity.removeEntity();
        this.world.onEatDiamond(entity.diamondValue);

    }
}


EntityManager.prototype.falling = function()
{
    for (let i = 0; i < this.world.width; i++) {
        
        this.entities[i.toString()].forEach((value) => {
            value.moveDown();
        })
    }
}

EntityManager.prototype.checkCollision = function()
{

}
