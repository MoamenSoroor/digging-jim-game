
const keys = {
    UP: "ArrowUp",
    DOWN: "ArrowDown",
    LEFT: "ArrowLeft",
    RIGHT: "ArrowRight",
    W: "W",
    S: "S",
    A: "A",
    D: "D",
    w: "w",
    s: "s",
    a: "a",
    d: "d",
    p: "p",
    P: "P",
    ESC: "Escape",
    

}

var controls = {

    isUPPressed:false,
    isDownPressed:false,
    isLeftPressed:false,
    isRightPressed: false,

    initControls: function()
    {
        var self = this;
        // document.oncontextmenu = function (e) {e.preventDefault()  }
        
        
        document.body.onkeydown = function (e) {
            // ArrowDown
            // ArrowUp
            // ArrowRight
            // ArrowLeft

            if(e.key == keys.UP || e.key == keys.W  || e.key == keys.w )
            {
                e.preventDefault();
                // console.log(keys.UP);
                self.isUPPressed = true;
                self.onKeyUp();

            }
            else if(e.key == keys.DOWN || e.key == keys.S  || e.key == keys.s)
            {
                e.preventDefault();
                // console.log(keys.DOWN);
                self.isDownPressed = true;
                self.onKeyDown();
                
            }    
                
            else if(e.key == keys.LEFT || e.key == keys.A  || e.key == keys.a)
            {
                e.preventDefault();
                // console.log(keys.LEFT);
                self.isLeftPressed = true;
                self.onKeyLeft();
            }    
                
            else if(e.key == keys.RIGHT|| e.key == keys.D  || e.key == keys.d)
            {
                e.preventDefault();
                // console.log(keys.RIGHT);
                self.isRightPressed = true;
                self.onKeyRight();
            }    
                
            else if(e.key == keys.P|| e.key == keys.p  || e.key == keys.d) 
            {
                // console.log(e.key);
                self.onKeyPause();
                
            }    
            else if(e.key == keys.ESC) 
            {
                // console.log(e.key);
                self.onKeyESC();
                
            }  
            else
            {
                console.log(e.key);
            }
                
          }
    },

    onKeyDown: function ()
    {
        //console.log("on key down not registerd.");
    },
    onKeyUp: function ()
    {
        //console.log("on key up not registerd.");
    },
    onKeyLeft: function ()
    {
        //console.log("on key left not registerd.");
    },
    onKeyRight: function ()
    {
        //console.log("on key right not registerd.");
    },
    onKeyPause: function () 
    {
        //console.log("key pause pressed");
    },
    onKeyESC: function () 
    {
        console.log("key ESC pressed");
    },

    unRegisterControls: function ()
    {
        document.body.onkeydown = function () {
            return true;
        }
    }


}

