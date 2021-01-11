


var EntityManager = function (world) {
    this.world = world;
    this.timerId = 0;
    this.player = null;
    this.entities = {};

    for (let i = 0; i < world.worldMap.width; i++) {
        this.entities[i] = [];
        // console.log(this.entities);
    }

}



EntityManager.prototype.requestPlayerMove = function (direction) {
    this.player.moveToDirection(direction);
}


EntityManager.prototype.play = function ()
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
    var en = this.getEntity(xpos,ypos);
    if(en == undefined || en == null)
        return false;
    else
        return true;
}


EntityManager.prototype.checkEntityType = function(xpos,ypos,entitytype)
{
    var en = this.getEntity(xpos,ypos);
    if(en == undefined || en == null)
        return false;
    else
        {
            if(en.entityType == entitytype)
                return true;
            else
                return false;
        }
}



EntityManager.prototype.getEntity = function(xpos,ypos)
{
    if(this.entities[xpos] != undefined && this.entities[xpos] != null)
    {
        var geten =  this.entities[xpos].find(en => en.ypos == ypos);
        return geten;
    }
    else
        return null;
}



EntityManager.prototype.setPlayer = function (player) {
    this.player = player;
    //this.addEntity(this.player);
}


EntityManager.prototype.hasPlayer = function(xpos,ypos)
{
    if(this.player.xpos == xpos && this.player.ypos == ypos)
        return true;
    else
        return false;
}


EntityManager.prototype.addEntity = function(entity)
{
    this.entities[entity.xpos].unshift(entity);

    //this.entities[entity.xpos].sort((a, b) => { a.ypos - b.ypos })
}


EntityManager.prototype.eatDiamond = function (entity) {
    var index = this.entities[entity.xpos].findIndex(en => en.ypos == entity.ypos);
    if(index > -1)
    {
        
        this.player.eatCoinsSound.play();
        //console.log("to remove diamond");
        this.entities[entity.xpos].splice(index, 1);
        entity.removeEntity(50);
        this.world.onEatDiamondInternal(entity.diamondValue);

    }
}



EntityManager.prototype.transferEntity = function (entity, newDx) {
    var index = this.entities[entity.xpos].findIndex(en => en.ypos == entity.ypos);
    if(index > -1)
    {
        this.entities[entity.xpos].splice(index,1);
        if(this.entities[newDx] != undefined && this.entities[newDx] != null)
        {
            this.entities[newDx].push(entity);
            this.entities[newDx].sort((a, b) => { a.ypos - b.ypos});
        } 

    }
}

EntityManager.prototype.falling = function () {
    for (let i = 0; i < this.world.width; i++) {

        this.entities[i].forEach((value) => {
            
            switch (value.entityType) {
                case AssetsType.rock:
                    value.fallDown();
                    break;
                case AssetsType.diamond:
                    value.fallDown();
                    break;
                case AssetsType.bomb:
                    value.fallDown();
                    break;
        
                default:
                    break;
            }
            
        });
    }
}
