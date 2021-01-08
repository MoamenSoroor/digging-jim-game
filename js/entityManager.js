


var EntityManager = function(world)
{
    this.world = world;
    this.timerId = 0;
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
    //console.log(relativeEntity);
    //console.log("request move player");
    if(relativeEntity == undefined || relativeEntity == null)
        this.player.moveToDirection(direction);
    else
    {
        //console.log("there are entity here");
        if(relativeEntity.entityType == AssetsType.diamond)
        {
            this.player.moveToDirection(direction);
            this.eatDiamond(relativeEntity);
            this.player.eatCoinsSound.play();
            //console.log("diamond here man!");
        }
        else if(relativeEntity.entityType == AssetsType.rock)
        {
            //console.log("rock here man!");
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
    //return;
    var self = this;
    this.timerId = setInterval(() => {
        
        self.falling();


    }, FrameTime* 2);
}


EntityManager.prototype.stop = function () {
    clearInterval(this.timerId);
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
        //   console.log(this.entities[xpos]);
        // console.log("get entity");
        // console.log(geten);
        return geten;
    }
    else
        return null;
}



EntityManager.prototype.setPlayer = function(player)
{
    this.player = player;
    //this.addEntity(this.player);
}

EntityManager.prototype.addEntity = function(entity)
{
    this.entities[entity.xpos].unshift(entity);

    //this.entities[entity.xpos].sort((a, b) => { a.ypos - b.ypos })
}


EntityManager.prototype.eatDiamond = function(entity)
{
    var index = this.entities[entity.xpos].findIndex(en => en.ypos == entity.ypos);
    if(index > -1)
    {
        //console.log("to remove diamond");
        this.entities[entity.xpos].splice(index,1);
        entity.removeEntity();
        this.world.onEatDiamondInternal(entity.diamondValue);

    }
}

// EntityManager.prototype.onEntityFalling = function(entity)
// {
    

// }


EntityManager.prototype.transferEntity = function(entity,newDx)
{
    var index = this.entities[entity.xpos].findIndex(en => en.ypos == entity.ypos);
    if(index > -1)
    {
        this.entities[entity.xpos].splice(index,1);
        if(this.entities[newDx] != undefined && this.entities[newDx] != null)
        {
            this.entities[newDx].unshift(entity);
        } 

    }
}

EntityManager.prototype.falling = function()
{
    for (let i = 0; i < this.world.width; i++) {
        
        this.entities[i].forEach((value) => {

            
            var en = this.getEntity(value.xpos,value.ypos + 1);
            if(en == undefined || en == null)
            {
                
                value.moveDown();
            }
            else
            {
                value.isFalling = false;
                console.log("not falling");
                // var right = this.getEntity(value.xpos + 1, value.ypos);
                // var left = this.getEntity(value.xpos - 1, value.ypos);
                
                // if(right == undefined || right == null)
                // {

                //     var rightTop = this.getEntity(value.xpos + 1, value.ypos - 1);
                //     var rightDown = this.getEntity(value.xpos + 1, value.ypos + 1);

                //     if((rightTop == undefined || rightTop == null) 
                //     && (rightDown == undefined || rightDown == null))
                //     {
                //         this.transferEntity(value,value.xpos + 1);
                //         value.moveRight();
                //         value.moveDown();
                //     }

                    
                // }
                // else if(left == undefined || left == null)
                // {

                //     var leftTop = this.getEntity(value.xpos - 1, value.ypos - 1);
                //     var leftDown = this.getEntity(value.xpos - 1, value.ypos + 1);

                //     if((leftTop == undefined || leftTop == null) 
                //         && (leftDown == undefined || leftDown == null))
                //         {
                //             this.transferEntity(value,value.xpos - 1);
                //             value.moveLeft();
                //             value.moveDown();
                //         }

                    
                // }

                
                
            }
        })
    }
}

EntityManager.prototype.checkCollision = function()
{

}
