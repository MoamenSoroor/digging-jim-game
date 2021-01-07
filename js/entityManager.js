


var EntityManager = function(world)
{
    this.world = world;
    this.player = null;
    this.entities = {};

    for (let i = 0; i < world.worldMap.width; i++) {
        this.entities[i.toString()] = [];
        console.log(this.entities);
    }

}


EntityManager.prototype.requestPlayerMove = function(direction)
{
    this.player.moveToDirection(direction);
}


EntityManager.prototype.initEntityManager = function (world)
{

}



EntityManager.prototype.setPlayer = function(player)
{
    this.player = player;
}

EntityManager.prototype.addEntity = function(entity)
{
    this.entities[entity.xpos.toString()].push(entity);
}


EntityManager.prototype.eatDiamond = function()
{

}


EntityManager.prototype.moveAllEntites = function()
{

}

EntityManager.prototype.checkCollision = function()
{

}
