// mohamed alaa
// $("#main").hide();
// $("#nextMap").hide();
// $("#gameOver").hide();
// $("#footer").hide();


var valuetrue;
var valueFalse;
var continueValue;
var returnValue;
Continue.onclick=function()
{
    continueValue=true;
    playNext();
    $("#nextMap").hide();
}
Return.onclick=function()
{
    returnValue=false;
    reset();
}
Restart.onclick=function()
{
    valuetrue=true;
    playAgain();
    $("#main").hide();
}
Close.onclick=function()
{
    valueFalse=false;
    reset();
}
 

   // Lost one live
function lost(playAgain)
{
    // draw div of play again
     $("#main").show();
    // call playAgain   
}



// All lives taken
function gameOver(name, reset){
    // Draw div of game over.
    $("#gameOver").show();
    // Set score in cookies for name

    // call reset
    setTimeout(reset,5000);
}


// Draw div of next map
function nextMap(playNext) {
    $("#nextMap").show();
    // call playNext on button
}

function drawbar()
{
    $("#footer").show();
}

function setScoreOnBar(score)
{
    spans[3].innerHTML=score;
}

function setLevelOnBar(level)
{
    spans[7].innerHTML=level;
}

function setLivesOnBar(lives)
{
    spans[5].innerHTML=level;
}

