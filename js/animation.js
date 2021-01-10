
const FrameTime = 25;

// note that left and top is in pixels not in tile xpos and ypos
function AnimatedImage (domImage,left,top,width,height)
{
    this.width = width; 
    this.height = height;
    this.domImage = domImage;
    this.domImage.width = this.width;
    this.domImage.height = this.height;
    this.setTop(top);
    this.setLeft(left);
    this.moveAnime = new AnimateMove(this);
    this.srcAnime = new AnimateSrc(this);
    this.duringAnime = function () {}

    
}


AnimatedImage.prototype.setZIndex = function(value)
{
    this.domImage.style.zIndex = value || 0;
}



AnimatedImage.prototype.setLeft = function (val)
{
    this.domImage.style.left = val + "px";
}
AnimatedImage.prototype.setTop = function (val)
{
    this.domImage.style.top = val + "px";
}
AnimatedImage.prototype.getTop = function ()
{
    return parseInt(this.domImage.style.top);
}
AnimatedImage.prototype.getLeft = function ()
{
    return parseInt(this.domImage.style.left);
}

AnimatedImage.prototype.setSrc = function(src)
{
    this.domImage.src = src;
}

AnimatedImage.prototype.getSrc = function()
{
    return this.domImage.src;
}

AnimatedImage.prototype.move = function(duration,dx,dy, keys,onFinishX,onFinishY)
{
    
    
    if(keys != null && keys != undefined && keys.length > 0)
    {
        if(keys.length == 1)
            this.setSrc(keys[0]);
        else
            this.srcAnime.play(keys,duration);
    }
    
    this.moveAnime.playX(dx,duration,onFinishX);
    this.moveAnime.playY(dy,duration,onFinishY);
}

AnimatedImage.prototype.moveX = function(duration,dx,keys,onFinish)
{
    if(keys != null && keys != undefined && keys.length > 0)
    {
        if(keys.length == 1)
            this.setSrc(keys[0]);
        else
            this.srcAnime.play(keys,duration);
    }
    
    this.moveAnime.playX(dx,duration,onFinish);
}

AnimatedImage.prototype.moveY = function(duration,dy,keys,onFinish)
{
    if(keys != null && keys != undefined && keys.length > 0)
    {
        if(keys.length == 1)
            this.setSrc(keys[0]);
        else
            this.srcAnime.play(keys,duration);
    }
    
    this.moveAnime.playY(dy,duration,onFinish);
}


AnimatedImage.prototype.isPlayX =  function(){
    return this.moveAnime.isPlayX;
}

AnimatedImage.prototype.isPlayY =  function(){
    return this.moveAnime.isPlayY;
}
// ----------------------------------------------------------------------------------
// animation of the src of animated image
var AnimateSrc = function (image)
{
    this.animeTimer = null;
    this.image = image;
    this.animeCounter = 0;
    this.animeRepeat = 0;
    this.duration = 0;

    
}

AnimateSrc.prototype.stop = function () {
    clearInterval(this.animeTimer);
}

AnimateSrc.prototype.onPlay = function (){

}

AnimateSrc.prototype.duringPlay = function (){
}


AnimateSrc.prototype.onFinish = function() {
    //console.log("finish anime");
}

AnimateSrc.prototype.play = function(keys,duration,onFinish){

    //this.onPlay();
    this.animeCounter = 0;
    this.animeRepeat = keys.length;
    this.duration = duration;
    this.onFinish = onFinish;
    //console.log(this);

    var self = this;
    this.animeTimer = setInterval(function () {
        if(self.animeCounter < self.animeRepeat)
        {
            self.duringPlay();
            self.image.setSrc(keys[self.animeCounter++]);
            //console.log(self.image);
        }
        else
        {
            self.stop();
            // if(onFinish != undefined && onFinish != null)
            //     self.onFinish();
        }
    },self.duration/self.animeRepeat );

}


var AnimateMove = function (image)
{
    this.moveTimerX = 0;
    this.moveTimerY = 0;
    this.isPlayX = false;
    this.isPlayY = false;
    this.image = image;
    this.targetX = 0;
    this.targetY = 0;
    this.durationX = 0;
    this.durationY = 0;
    this.speedX = 0;
    this.speedY = 0;
    //this.onFinish = function () {  }

}

AnimateMove.prototype.stopX = function () {

    clearInterval(this.moveTimerX);
    this.image.setLeft(this.targetX);
    this.isPlayX = false;
}

AnimateMove.prototype.stopY = function () {
    clearInterval(this.moveTimerY);
    this.image.setTop(this.targetY);
    this.isPlayY = false;
}





AnimateMove.prototype.playX = function(dx,durationX,onFinish){
    // move
    if(!this.isPlayX)
    {
        this.isPlayX = true;
        this.targetX = this.image.getLeft() + dx;
        this.durationX = durationX;
        this.speedX = parseInt((dx/this.durationX) * 25);

        //console.log(this);
        //this.onFinish = onFinish;
        var self = this;
        this.moveTimerX = setInterval(function () {
            if(self.speedX > 0 && self.image.getLeft() < self.targetX - self.speedX)
            {
                self.image.setLeft(self.image.getLeft() + self.speedX);
                self.image.duringAnime(self.speedX,0);
            }
            else if (self.speedX < 0 && self.image.getLeft() > self.targetX - self.speedX)
            {
                self.image.setLeft(self.image.getLeft() + self.speedX);
                self.image.duringAnime(self.speedX,0);
            }
            else
            {
                
                //self.stopX();
                clearInterval(self.moveTimerX);
                self.image.setLeft(self.targetX);
                self.isPlayX = false;
                if(onFinish != undefined && onFinish != null)
                    onFinish();
                // else
                //     console.log("on finish is null ");
            }

        }, FrameTime,onFinish);
    }
    
}

AnimateMove.prototype.playY = function(dy,durationY,onFinish){

    if(!this.isPlayY)
    {
        this.isPlayY = true;
        this.targetY =  this.image.getTop() + dy;
        this.durationY = durationY;
        this.speedY = parseInt((dy/this.durationY) * 25);
        //console.log(this);
        var self = this;
        this.moveTimerY = setInterval(function () {
            if(self.speedY > 0 && self.image.getTop() < self.targetY - self.speedY)
            {
                self.image.setTop(self.image.getTop() + self.speedY );
                self.image.duringAnime(0,self.speedY);
            }
            else if(self.speedY < 0 && self.image.getTop() > self.targetY - self.speedY)
            {
                self.image.setTop(self.image.getTop() + self.speedY );
                self.image.duringAnime(0,self.speedY);
            }
            else
            {
                //self.stopY();
                clearInterval(self.moveTimerY);
                self.image.setTop(self.targetY);
                self.isPlayY = false;
                if(onFinish != undefined && onFinish != null)
                    onFinish();
                //else
                //console.log("on finish is null ");
            }

        }, FrameTime,onFinish);
    }


}


//var animeImage = new AnimatedImage("mydomImage",50,100,64,64);

//animeImage.move(["images/1.png","images/block.jpg","images/Diamond.png"],1000,64,64);