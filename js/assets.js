
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
  block: 2,
  rock: 3,
  diamond: 4,
  character: 5,
  door: 6,
  openDoor: 7,
  CharR1: 8,
  CharL1: 9,
  lose: 10,
  tubeUD: 11, // up down tube
  tubeLF: 12, // left right tube
  bomb: 13,
};


const AssetsSrc = {
  0: "resources/images/black.png",
  1: "resources/images/dirtback.gif",
  2: "resources/images/wall.GIF",
  3: "resources/images/rock.gif",
  4: "resources/images/diamond.gif",
  5: "resources/images/character2.png",
  6: "resources/images/exit.gif",
  7: "resources/images/opendoor.png",
  8: "resources/images/R1.png",
  9: "resources/images/L1.png",
  10: "resources/images/lose.gif",
  11: "resources/images/tube1.png",
  12: "resources/images/tube1LR.png",
  13: "resources/images/bomb.gif",

  "resources/images/black.png": 0,
  "resources/images/dirtback.gif": 1,
  "resources/images/wall.GIF": 2,
  "resources/images/rock.gif": 3,
  "resources/images/diamond.gif": 4,
  "resources/images/character2.png": 5,
  "resources/images/door.png": 6,
  "resources/images/opendoor.png": 7,
  "resources/images/R1.png": 8,
  "resources/images/L1.png": 9,
  "resources/images/lose.gif": 10,
  "resources/images/tube1.png": 11,
  "resources/images/tube1LR.png": 12,
  "resources/images/bomb.gif": 13,
};




var Assets = function () {

}


Assets.getSrc = function (type) {

  if (AssetsSrc[type] != undefined && AssetsSrc[type] != null)
    return AssetsSrc[type];
  else
    throw new Error("Error: the Assets type is not exists, assets type: " + type);

}

Assets.getType = function (src) {
  if (AssetsSrc[type] != undefined && AssetsSrc[type] != null)
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

  this.play = function () {
    try {
      this.sound = dom.createSound(src);
      this.sound.play();
    } catch (error) {
      //console.log("warning can't play sound");
    }
  }
  this.stop = function () {
    this.sound.pause();
  }
}