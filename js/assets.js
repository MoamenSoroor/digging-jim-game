
const Direction = 
{
  UP: 0,
  DOWN: 1,
  LEFT: 2,
  RIGHT: 3,
  None: 4

}



const AssetsType = {
    background: 0,
    dirt: 1,
    block:  2,
    rock: 3,
    diamond:  4,
    character: 5,
    door: 6,
    openDoor: 7,
    CharR1: 8,
    CharL1: 9,
  };
  
  const AssetsSrc = {
    0: "images/background.png",
    1: "images/Sand.png",
    2: "images/block.jpg",
    3: "images/rock.png",
    4: "images/Diamond.png",
    5: "images/1.png",
    6: "images/door.jpg" ,
    7: "images/openDoor.jpg",
    8: "images/R1.png",
    9: "images/L1.png",

    "images/background.png" : 0,
    "images/Sand.png" : 1,
    "images/block.jpg" : 2,
    "images/rock.png" : 3,
    "images/Diamond.png" : 4,
    "images/1.png" : 5,
    "images/door.jpg" : 6,
    "images/openDoor.jpg": 7,
    "images/R1.png": 8,
    "images/L1.png": 9,

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


