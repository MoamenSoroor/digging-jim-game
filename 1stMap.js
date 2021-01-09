//////////////////////////////level #1/////////////////////////////
var mapArray = new Array(20); 
  
  
// Loop to create 2D array using 1D array
for (var i = 0; i < mapArray.length; i++) { 
  mapArray[i] = new Array(30); 
} 
 /*//randomly populate the 2d array 
 function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
}*/

  
// Loop to initilize 2D array elements.
for (var i = 0; i <20; i++) { 
    for (var j = 0; j < 30; j++) { 
      //first row is walled
       mapArray[0][j] = 2
       //first col is walled
        mapArray[i][0] = 2;
        //initialize all by dirt
        mapArray[i][j] = 1;
        //last row is walled
        mapArray[19][j] = 2;
        //last col is walled
        mapArray[i][29] = 2; 
    } 
}
///blocks in innner map
  for (var j = 0; j < 25; j++) { 
    mapArray[6][j] = 2;
  }

  for (var j = 5; j < 30; j++) { 
    mapArray[12][j] = 2;
  }

  //diamonds
  y_posDiamondStMap = [1, 1, 2, 4, 4, 5, 5, 7, 7, 8, 8, 12, 13, 13, 17, 18, 20, 25, 25, 25, 26, 26, 28]
  x_posDiamondStMap = [14, 15, 15, 8, 9, 8, 9, 3, 4, 3, 4, 14, 2, 14, 7, 7, 10, 3, 8, 13, 8, 13, 16]


  for ( var i = 0; i < y_posDiamondStMap.length; i++ ){
    mapArray[x_posDiamondStMap[i]] [y_posDiamondStMap[i]] = 4;
  }

  
  /*for(var i = 0;i<diamondImages.length;i++){
  y_posDiamond.push(diamondImages[i].getAttribute("idi"))
  x_posDiamond.push(diamondImages[i].getAttribute("idj"))
  }*/

//rocks

y_posRockStMap =[1, 1, 1, 1, 2, 2, 3, 3, 9, 9, 10, 10, 12, 13, 13, 13, 14, 15, 15, 16, 16, 17, 17, 17, 17, 18, 18, 19, 19, 22, 23, 25, 25, 26, 28]
x_posRockStMap = [2, 3, 4, 10, 10, 14, 14, 15, 7, 13, 7, 13, 15, 8, 9, 15, 2, 3, 4, 3, 4, 3, 4, 10, 11, 10, 11, 10, 11, 9, 9, 2, 14, 14, 15]

for ( var i = 0; i < y_posRockStMap.length; i++ ){
  mapArray[x_posRockStMap[i]] [y_posRockStMap[i]] = 3;
}



///blocks
y_posBlockStMap = [1, 2, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13, 14, 14, 15, 15, 16, 16, 17, 17, 18, 18, 19, 19, 20, 20, 21, 21, 22, 22, 23, 23, 24, 24, 25, 25, 26, 27, 28]

x_posBlockStMap = [6, 6, 6, 6, 12, 6, 12, 6, 12, 6, 12, 6, 12, 6, 12, 6, 12, 6, 12, 6, 12, 6, 12, 6, 12, 6, 12, 6, 12, 6, 12, 6, 12, 6, 12, 6, 12, 6, 12, 6, 12, 6, 12, 6, 12, 6, 12, 12, 12, 12]

for ( var i = 0; i < y_posBlockStMap.length; i++ ){
  mapArray[x_posBlockStMap[i]] [y_posBlockStMap[i]] = 2;
}

  //hero position
  mapArray[2][2] = 5;
  //door position
  mapArray[16][26] = 6;
