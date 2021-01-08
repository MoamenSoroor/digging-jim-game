
const Direction =
{
  UP: 0,
  DOWN: 1,
  LEFT: 2,
  RIGHT: 3,
  None: 4

}



const AssetsType = {
<<<<<<< HEAD
  background: 0,
  dirt: 1,
  block: 2,
  rock: 3,
  diamond: 4,
  character: 5,
  door: 6
};

const AssetsSrc = {
  0: "resources/images/black.png",
  1: "resources/images/dirtback.gif",
  2: "resources/images/wall.GIF",
  3: "resources/images/rock.gif",
  4: "resources/images/diamond.gif",
  5: "resources/images/character2.png",
  6: "resources/images/door.png",

  "resources/images/black.png": 0,
  "resources/images/dirtback.gif": 1,
  "resources/images/wall.GIF": 2,
  "resources/images/rock.gif": 3,
  "resources/images/diamond.gif": 4,
  "resources/images/character2.png": 5,
  "resources/images/door.png": 6,
};


const AudioType = {
  move: 0,
  rockMove: 1,
  rockFall: 2,
  takeCoin: 3
};

const AudioSrc = {
  0: "resources/sounds/movingjim.wav",
  1: "resources/sounds/rockstart.wav",
  2: "resources/sounds/rockfall.wav",
  3: "resources/sounds/takeCoin3.mp3",

  "resources/sounds/movingjim.wav": 0,
  "resources/sounds/rockstart.wav": 1,
  "resources/sounds/rockfall.wav": 2,
  "resources/sounds/takeCoin3.mp3": 3,
=======
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
 
>>>>>>> moamen-branch
}



var Assets = function () {

}


Assets.getSrc = function (type) {

  if (AssetsSrc[type] != undefined && AssetsSrc[type] != null)
    return AssetsSrc[type];
  else
    throw new Error("Error: the Assets type is not exists");

}

Assets.getType = function (src) {
  if (AssetsSrc[type] != undefined && AssetsSrc[type] != null)
    return AssetsSrc[src];
  else
    throw new Error("Error: the Assets src is not exists");

}


