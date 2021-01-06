
const Direction = 
{
  UP: 0,
  DOWN: 1,
  LEFT: 2,
  RIGHT: 3,

}



const AssetsType = {
    background: 0,
    dirt: 1,
    block:  2,
    rock: 3,
    diamond:  4,
    character: 5,
    door: 6
  };
  
  const AssetsSrc = {
    0: "images/background.png",
    1: "images/Sand.png",
    2: "images/block.jpg",
    3: "images/rock.png",
    4: "images/Diamond.png",
    5: "images/1.png",
    6: "images/door.jpg" ,

    "images/background.png" : 0,
    "images/Sand.png" : 1,
    "images/block.jpg" : 2,
    "images/rock.png" : 3,
    "images/Diamond.png" : 4,
    "images/1.png" : 5,
    "images/door.jpg" : 6,
  };

var Assets = function()
{
 
}


Assets.getSrc = function(type)
{

    if(AssetsSrc[type] != undefined && AssetsSrc[type] != null )
    return AssetsSrc[type];
    else
    throw new Error("Error: the Assets type is not exists");

}
    
Assets.getType = function (src)
{
    if(AssetsSrc[type] != undefined && AssetsSrc[type] != null )
        return AssetsSrc[src];
    else
        throw new Error("Error: the Assets src is not exists");

}


