

var mymap = [
    [ 2 , 2 ,  2 , 2 ,  2 , 2 ,  2 , 2 ,  2 , 2 ,  2 , 2 ,  2 , 2 ,  2 , 2 ,  2 , 2 ,  2]  , 
    [ 2 , 1 ,  1 , 1 ,  3 , 3 ,  1 , 1 ,  1 , 1 ,  1 , 1 ,  1 , 1 ,  1 , 1 ,  1 , 1 ,  2]  , 
    [ 2 , 1 ,  5 , 1 ,  1 , 3 ,  1 , 1 ,  1 , 1 ,  4 , 4 ,  1 , 1 ,  1 , 1 ,  1 , 1 ,  2]  , 
    [ 2 , 1 ,  1 , 1 ,  1 , 1 ,  1 , 1 ,  1 , 1 ,  1 , 1 ,  1 , 4 ,  1 , 1 ,  1 , 1 ,  2]  , 
    [ 2 , 1 ,  1 , 1 ,  1 , 1 ,  1 , 1 ,  1 , 2 ,  1 , 1 ,  4 , 1 ,  1 , 1 ,  1 , 1 ,  2]  , 
    [ 2 , 1 ,  4 , 3 ,  1 , 1 ,  1 , 1 ,  1 , 2 ,  1 , 1 ,  1 , 1 ,  1 , 1 ,  1 , 1 ,  2]  , 
    [ 2 , 1 ,  3 , 3 ,  4 , 4 ,  1 , 1 ,  1 , 2 ,  1 , 1 ,  1 , 1 ,  1 , 1 ,  1 , 1 ,  2]  , 
    [ 2 , 1 ,  3 , 3 ,  1 , 1 ,  4 , 1 ,  1 , 2 ,  1 , 1 ,  1 , 1 ,  1 , 1 ,  1 , 1 ,  2]  , 
    [ 2 , 1 ,  1 , 1 ,  1 , 1 ,  1 , 1 ,  4 , 2 ,  1 , 1 ,  1 , 1 ,  1 , 1 ,  1 , 1 ,  2]  , 
    [ 2 , 1 ,  1 , 1 ,  1 , 1 ,  2 , 2 ,  2 , 2 ,  2 , 2 ,  2 , 2 ,  2 , 2 ,  2 , 2 ,  2]  , 
    [ 2 , 1 ,  1 , 1 ,  1 , 1 ,  1 , 1 ,  1 , 1 ,  1 , 1 ,  1 , 1 ,  1 , 1 ,  1 , 1 ,  2]  , 
    [ 2 , 1 ,  1 , 1 ,  1 , 1 ,  1 , 1 ,  1 , 1 ,  1 , 1 ,  1 , 1 ,  1 , 1 ,  1 , 1 ,  2]  , 
    [ 2 , 1 ,  1 , 1 ,  1 , 1 ,  1 , 1 ,  1 , 1 ,  1 , 1 ,  1 , 1 ,  1 , 1 ,  1 , 1 ,  2]  , 
    [ 2 , 1 ,  1 , 1 ,  1 , 1 ,  1 , 1 ,  1 , 1 ,  1 , 1 ,  1 , 1 ,  1 , 1 ,  1 , 1 ,  2]  , 
    [ 2 , 1 ,  1 , 1 ,  1 , 1 ,  1 , 1 ,  1 , 1 ,  1 , 1 ,  1 , 1 ,  1 , 6 ,  1 , 1 ,  2]  , 
    [ 2 , 1 ,  1 , 1 ,  1 , 1 ,  1 , 1 ,  1 , 1 ,  1 , 1 ,  1 , 1 ,  1 , 1 ,  1 , 1 ,  2]  , 
    [ 2 , 2 ,  2 , 2 ,  2 , 2 ,  2 , 2 ,  2 , 2 ,  2 , 2 ,  2 , 2 ,  2 , 2 ,  2 , 2 ,  2]
 ];

var worldmap = new WorldMap(mymap);

var world = new World(worldmap);

world.start();


var onTopKey = function ()
{
    console.log("i am top key handler.");
    var top = world.getTop(world.player);
    console.log("top in handelr")
    console.log(top);

    if(top.tileType == TileType.background || top.tileType == TileType.dirt )
    {
        
    }
    else if (top.tileType == TileType.diamond)
    {
        
    }
}


var onDownKey = function ()
{
    console.log("i am down key handler.");
    var down = world.getDown(world.player);
    console.log("down in handelr")
    console.log(down);

    if(down.tileType == TileType.background || down.tileType == TileType.dirt )
    {
        
    }
    else if (down.tileType == TileType.diamond)
    {
        

        world.score += 1;
    }
}


var onLeftKey = function ()
{
    console.log("i am left key handler.");
    var left = world.getLeft(world.player);
    console.log("left in handelr")
    console.log(left);

    if(left.tileType == TileType.background || left.tileType == TileType.dirt )
    {
        world.player.moveLeft();

    }
    else if (left.tileType == TileType.diamond)
    {
        
        world.player.moveLeft();
        world.score += 1;
    }

}


var onRightKey = function ()
{
    console.log("i am right key handler.");
    var right = world.getRight(world.player);
    console.log("right in handelr")
    console.log(right);

    if(right.tileType == TileType.background || right.tileType == TileType.dirt )
    {
        
    }
    else if (right.tileType == TileType.diamond)
    {
        

        world.score += 1;
    }
}





//controls.initControls(onTopKey,onDownKey,onLeftKey,onRightKey);