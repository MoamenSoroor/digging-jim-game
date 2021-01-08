
//////////////////////////////level #1/////////////////////////////
var mapArray = new Array(19); 
  
  
// Loop to create 2D array using 1D array
for (var i = 0; i < mapArray.length; i++) { 
  mapArray[i] = new Array(60); 
} 
 //randomly populate the 2d array 
 function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
}

  
// Loop to initilize 2D array elements.
for (var i = 0; i <19; i++) { 
    for (var j = 0; j < 60; j++) { 
      //first row is walled
       mapArray[0][j] = 2
       //first col is walled
        mapArray[i][0] = 2;
        //initialize all by dirt
        mapArray[i][j] = 1;
        //last row is walled
        mapArray[18][j] = 2;
        //last col is walled
        mapArray[i][59] = 2; 
    } 
}
///blocks in innner map
  for (var j = 0; j < 55; j++) { 
    mapArray[7][j] = 2;
  }

  for (var j = 5; j < 60; j++) { 
    mapArray[13][j] = 2;
  }
///////////diamond positions
  mapArray[3][30] = 4;
  mapArray[4][55] = 4;

  for (var j = 13; j < 16; j++) { 
    mapArray[4][j] = 4;
  }
  for (var j = 13; j < 16; j++) { 
    mapArray[3][j] = 4;
  }
  ////--------------
  for (var j = 10; j < 12; j++) { 
    mapArray[9][j] = 4;
  }
  for (var j = 10; j < 12; j++) { 
    mapArray[10][j] = 4;
  }
  for (var j = 40; j < 42; j++) { 
    mapArray[8][j] = 4;
  }
  for (var j = 55; j < 57; j++) { 
    mapArray[9][j] = 4;
  }
mapArray[11][43] = 4;

//////------------

mapArray[16][58] = 4;
mapArray[14][1] = 4;
for (var j = 1; j < 3; j++) { 
  mapArray[15][j] = 4;
}
for (var j = 29; j < 31; j++) { 
  mapArray[15][j] = 4;
}
for (var j = 55; j < 57; j++) { 
  mapArray[14][j] = 4;
}

//////////////////////////rocks////////////
for (var j = 33; j < 36; j++) { 
  mapArray[4][j] = 3;
}
for (var j = 33; j < 36; j++) { 
  mapArray[5][j] = 3;
}
for(var i = 2;i < 5;i++){
mapArray[i][1] = 3;
}
mapArray[3][32] = 3;
mapArray[2][55] = 3;

///-----------

for(var i = 17;i < 19;i++){
  mapArray[8][i] = 3;
  }
  for(var i = 2;i < 4;i++){
    mapArray[11][i] = 3;
  }
  for(var i = 9;i < 11;i++){
    mapArray[i][31] = 3;
    }
  for(var i = 53;i < 55;i++){
      mapArray[11][i] = 3;
    }
  for(var i = 40;i < 43;i++){
    mapArray[11][i] = 3;
    }
  for(var i = 40;i < 43;i++){
    mapArray[12][i] = 3;
    }

    //////---------
    for(var i = 2;i < 4;i++){
      mapArray[14][i] = 3;
    }
    for(var i = 25;i < 27;i++){
      mapArray[14][i] = 3;
      }
    
    mapArray[15][3] = 3;

    for (var j = 29; j < 31; j++) { 
      mapArray[16][j] = 3;
    }
    for (var j = 55; j < 57; j++) { 
      mapArray[15][j] = 3;
    }
    mapArray[15][58] = 3;
    /////////////////////////////--------
    //hero position
  mapArray[2][2] = 5;
  //door position
  mapArray[16][56] = 6;


  
  //for displaying the 2d array
  /*for (var i = 0; i <19; i++) { 

  var br = document.createElement("br");       
document.getElementById("parent").appendChild(br); 

    for (var j = 0; j < 60; j++) { 
      
      var elem = document.createElement("span");

      elem.className = mapArray [i][j]
      elem.innerText = mapArray [i][j]

   elem.style.border = "0.5px solid red"
   /* if (elem.classList == 2){
      elem.src = "block.jpg"
    }
    if(elem.classList == 1){
      elem.src = "sand.jpg"
    }
    if(elem.classList == 4){
      elem.src = "Diamond.png"
      elem.style.height = "7%"
    }
      document.getElementById("parent").appendChild(elem);     
  } 
}*/
///////////////////////////////////level#2////////////////////////////////////


var secondMapArray = new Array(20); 

// Loop to create 2D array using 1D array
for (var i = 0; i < secondMapArray.length; i++) { 

  secondMapArray[i] = new Array(30); 
} 
for (var i = 0; i <20; i++) { 
  for (var j = 0; j < 30; j++) { 
    //first row is walled
    secondMapArray[0][j] = 2
     //first col is walled
     secondMapArray[i][0] = 2;
      //initialize all by dirt
      secondMapArray[i][j] = 1;
      //last row is walled
      secondMapArray[19][j] = 2;
      //last col is walled
      secondMapArray[i][29] = 2; 
  } 
}
///blocks in innner map
for (var j = 0; j < 16; j++) { 
  secondMapArray[j][9] = 2;
}

for (var j = 4; j < 19; j++) { 
  secondMapArray[j][19] = 2;
}
//hero position
secondMapArray[2][2] = 5;
//door position
secondMapArray[16][25] = 6;
/////////////////////////////rocks positions//////////////////
/*
secondMapArray[1][2] = 3;
secondMapArray[2][1] = 3;
//col
for(var i = 2 ; i< 5;i++){
  secondMapArray[i][4] = 3;
}
secondMapArray[4][2] = 3;

for(var i = 1 ; i< 3;i++){
  secondMapArray[8][i] = 3;
}
for(var i = 4 ; i< 6;i++){
  secondMapArray[12][i] = 3;
}
secondMapArray[17][3] = 3;

for(var i = 14 ; i< 16;i++){
  secondMapArray[i][16] = 3;
}
for(var i = 17 ; i< 19;i++){
  secondMapArray[5][i] = 3;
}
for(var i = 17 ; i< 19;i++){
  secondMapArray[6][i] = 3;
}
for(var i = 9 ; i< 11;i++){
  secondMapArray[i][16] = 3;
}
secondMapArray[16][19] = 3;

*/



//y_positonsArrayRocks = [1, 3, 4, 4, 5, 5, 7, 7, 8, 8, 9, 10, 10, 10, 12, 13,17, 18, 18, 18,18,20, 20, 20, 20, 20, 20, 21, 21, 21, 21, 23, 25, 25, 26, 27, 28, 28, 28, 1, 1, 2, 2, 2, 3, 3, 4, 4, 4, 4, 6, 6, 6, 6, 7, 7, 8, 8, 9, 10, 10, 11, 11, 11, 12, 12, 12, 13, 13, 13, 14, 14, 14, 15, 15, 15, 16, 17, 17, 18, 18, 18, 19, 20, 20, 21, 22, 22, 22, 22, 22, 23, 23, 24, 24, 26, 26, 27, 27, 27,27,27,27]
//x_positonsArrayRocks = [12, 14, 5, 18, 8, 9, 1, 2, 1, 2, 18, 3, 8, 9, 2, 14, 7, 7, 12, 13, 18, 8, 9, 15, 16, 17, 18, 15, 16, 17, 18, 11, 8, 9, 17, 3, 1, 17, 18, 2, 9, 1, 5, 9, 13, 18, 2, 3, 4, 13, 9, 10, 15, 16, 5, 6, 5, 6, 17, 1, 2, 1, 2, 3, 1, 3, 13, 7, 8, 13, 7, 8, 15, 11, 12, 16, 6, 5, 6, 5, 6, 17, 1, 7, 14, 14, 3, 14, 15, 16, 17, 3, 4, 8, 9, 3, 14, 1, 2, 4,14,15,16]



/////////////////////diamond positions

x_positonsArrayDiamond = [1, 3, 4, 4, 5, 5, 7, 7, 8, 8, 9, 10, 10, 10, 12, 13, 17, 18, 18, 18, 18, 20, 20, 20, 20, 20, 20, 21, 21, 21, 21, 23, 25, 25, 26, 27, 28, 28, 28]
y_positonsArrayDiamond = [12, 14, 5, 18, 8, 9, 1, 2, 1, 2, 18, 3, 8, 9, 2, 14, 7, 7, 12, 13, 18, 8, 9, 15, 16, 17, 18, 15, 16, 17, 18, 11, 8, 9, 17, 3, 1, 17, 18]
  
for ( var i = 0; i < x_positonsArrayDiamond.length; i++ ){
  secondMapArray[y_positonsArrayDiamond[i]] [x_positonsArrayDiamond[i]] = 4;
}


//secondMapArray[8][20] = 3;
//secondMapArray[9][20] = 3;

/*y_posDiamond = []
x_posDiamond = []
for(var i = 0;i<rockImages.length;i++){
y_posDiamond.push(rockImages[i].getAttribute("idi"))
x_posDiamond.push(rockImages[i].getAttribute("idj"))
}*/
x_posRock = [2, 9, 1, 5, 9, 13, 18, 2, 3, 4, 13, 9, 10, 15, 16, 5, 6, 5, 6, 17, 1, 2, 1, 2, 3, 1, 3, 13, 7, 8, 13, 7, 8, 15, 11, 12, 16, 6, 5, 6, 5, 6, 17, 1, 7, 14, 14, 3, 14, 15, 16, 17, 3, 4, 8, 9, 3, 14, 1, 2, 4, 14, 15, 16]

y_posRock = [1, 1, 2, 2, 2, 3, 3, 4, 4, 4, 4, 6, 6, 6, 6, 7, 7, 8, 8, 9, 10, 10, 11, 11, 11, 12, 12, 12, 13, 13, 13, 14, 14, 14, 15, 15, 15, 16, 17, 17, 18, 18, 18, 19, 20, 20, 21, 22, 22, 22, 22, 22, 23, 23, 24, 24, 26, 26, 27, 27, 27, 27, 27, 27]

for ( var i = 0; i < x_posRock.length; i++ ){
  secondMapArray[x_posRock[i]] [y_posRock[i]] = 3
}





  //for displaying the 2d array

// for (var i = 0; i <20; i++) { 

//   var br = document.createElement("br");       
// document.getElementById("parent").appendChild(br); 

//     for (var j = 0; j < 30; j++) { 
      
//       var elem = document.createElement("span");

//       elem.className = secondMapArray [i][j]
//       elem.innerText = secondMapArray [i][j]

//    elem.style.border = "0.5px solid red"
//    /* if (elem.classList == 2){
//       elem.src = "block.jpg"
//     }
//     if(elem.classList == 1){
//       elem.src = "sand.jpg"
//     }
//     if(elem.classList == 4){
//       elem.src = "Diamond.png"
//       elem.style.height = "7%"
//     }*/
//       document.getElementById("parent").appendChild(elem);     
//   } 
// }


