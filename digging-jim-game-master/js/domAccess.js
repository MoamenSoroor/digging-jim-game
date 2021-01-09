
var idManager =
{

    createId: function (x, y) {
        return "id" + x + "-" + y;
    },

    parseId: function (str) {

        var arr = str.split("-");
        return { xpos: parseInt(arr[0].substring(2)), ypos: parseInt(arr[1]) };
    },

    generateIds: function (w, h) {
        var ids = [];

        for (let i = 0; i < w; i++) {
            for (let j = 0; j < h; j++) {
                ids.push(createId(i, j));
            }
        }

        return ids;
    },

    isValidId: function (id) {
        return /id[0-9]+-[0-9]+/.test(id);
    },


}


var dom = {

    imgClass: "",
    createImg: function (src, nid, pixelX, pixelY, width, height) {
        var elem = window.document.createElement("img");

        elem.setAttribute("id", nid);
        elem.setAttribute("class", this.imgClass);
        elem.style.position = "absolute";
        elem.style.left = pixelX + "px";
        elem.style.top = pixelY + "px";
        elem.style.width = width + "px";
        elem.style.height = height + "px";
        elem.src = src;
        //this.addImage(elem);
        return elem;
    },


    addImage: function (im) {
        document.body.appendChild(im);
    },

    getImage: function (id) {
        return document.getElementById(id);
    },
    removeImage: function (im) {
        document.body.removeChild(im);
    },
    removeImageById: function (id) {
        var elem = document.getElementById(id);
        if(elem){
            elem.remove();
        }     
    },
    createSound: function (src) {
        var sound = window.document.createElement("audio");
        sound.src = src;
        sound.setAttribute("preload", "auto");
        sound.setAttribute("controls", "none");
        sound.setAttribute("muted", "false");
        sound.style.display = "none";
        document.body.appendChild(sound);
        return sound;
      }
}


const ui =
{
    positionToPixels: function (tile) {
        return { pixelX: tile.xpos * Tile.tileWidth, pixelY: tile.ypos * Tile.tileHeight };
    },

    // tile is {xpos,ypox,src}
    createTile: function (tile) {
        var id = idManager.createId(tile.xpos, tile.ypos);
        var pos = this.positionToPixels(tile);
        // console.log(pos);
        var im = dom.createImg(tile.src, id, pos.pixelX, pos.pixelY,Tile.tileWidth, Tile.tileHeight);
        if(tile.zindex != null && tile.zindex != undefined)
            im.style.zIndex = tile.zindex;
        dom.addImage(im);
    },

    updateTile: function (tile) {
        // console.log(tile);
        var id = idManager.createId(tile.xpos, tile.ypos);
        // console.log("id = " + id);
        dom.getImage(id).src = tile.src;
    },

    getTile: function (x, y) {
        var id = idManager.createId(x, y);
        return new Tile(x, y, Tile.getTileType(dom.getImage(id)));
    },

    removeTile: function (x, y) {
        var id = idManager.createId(x, y);
        dom.getImage(id).remove();
    }
}

