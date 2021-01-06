
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
    

}

var controls = {

    initControls: function()
    {
        var self = this;
        document.oncontextmenu = function (e) {e.preventDefault()  }

        document.body.onkeydown = function (e) {
            // ArrowDown
            // ArrowUp
            // ArrowRight
            // ArrowLeft

            if(e.key == keys.UP || e.key == keys.W  || e.key == keys.w )
            {
                console.log(keys.UP);
                self.onKeyUp();

            }
            else if(e.key == keys.DOWN || e.key == keys.S  || e.key == keys.s)
            {
                console.log(keys.DOWN);
                self.onKeyDown();
                
            }    
                
            else if(e.key == keys.LEFT || e.key == keys.A  || e.key == keys.a)
            {
                console.log(keys.LEFT);
                self.onKeyLeft();
            }    
                
            else if(e.key == keys.RIGHT|| e.key == keys.D  || e.key == keys.d)
            {
                console.log(keys.RIGHT);
                self.onKeyRight();
            }    
                
            else 
            {
                console.log(e.key);
                
            }    
                
          }
    },

    onKeyDown: function ()
    {
        console.log("on key down not registerd.");
    },
    onKeyUp: function ()
    {
        console.log("on key up not registerd.");
    },
    onKeyLeft: function ()
    {
        console.log("on key left not registerd.");
    },
    onKeyRight: function ()
    {
        console.log("on key right not registerd.");
    },


}

