
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
    lose: 10,
    tubeUD: 11, // up down tube
    tubeLF: 12, // left right tube
  };
  
  const AssetsSrc = {
    0: "images/background.png",
    1: "images/Sand.png",
    2: "images/block.jpg",
    3: "images/rock.png",
    4: "images/Diamond.png",
    5: "images/1.png",
    6: "images/exit.gif" ,
    7: "images/opendoor.png",
    8: "images/R1.png",
    9: "images/L1.png",
    10: "images/lose.gif",
    11: "images/tube1.png",
    12: "images/tube1LR.png",

    "images/background.png" : 0,
    "images/Sand.png" : 1,
    "images/block.jpg" : 2,
    "images/rock.png" : 3,
    "images/Diamond.png" : 4,
    "images/1.png" : 5,
    "images/exit.gif" : 6,
    "images/opendoor.png": 7,
    "images/R1.png": 8,
    "images/L1.png": 9,
    "images/lose.gif": 10,
    "images/tube1.png" : 11 ,
    "images/tube1LR.png" : 12 ,

  };

var Assets = function()
{
 
}


Assets.getSrc = function(type)
{

    if(AssetsSrc[type] != undefined && AssetsSrc[type] != null )
      return AssetsSrc[type];
    else
      throw new Error("Error: the Assets type is not exists, assets type: " + type);

}
    
Assets.getType = function (src)
{
    if(AssetsSrc[type] != undefined && AssetsSrc[type] != null )
        return AssetsSrc[src];
    else
        throw new Error("Error: the Assets src is not exists");

}


const SoundSrc = {
  moveChar: "WAVE/142.wav",
  eatCoins: "WAVE/eatcoins.mp3",
  rockFalling: "WAVE/116.wav",
  diamondFalling: "WAVE/120.wav",
  win: "WAVE/133.wav",
  lose: "WAVE/118.wav",
  tubeSound: "WAVE/141.wav",

}


function Sound(src) {
  this.sound = dom.createSound(src);
  this.sound.src = src;

  this.play = function()
  {
    try {
      this.sound.play();
    } catch (error) {
      console.log("waring can't play sound");
    }
  }
  this.stop = function()
  {
    this.sound.pause();
  }
}