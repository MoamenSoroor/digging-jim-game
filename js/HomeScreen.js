
const HomeScreen = {
    initialize: function () {

        window.onbeforeunload = function () {
            window.scrollTo(0, 0);
        }
        document.addEventListener("DOMMouseScroll", function (eve) {
            eve.preventDefault();
        }, { passive: false });
        
        document.addEventListener("mousewheel", function (eve) {
            eve.preventDefault();
        }, { passive: false });
        
        document.addEventListener("touchmove", function (eve) {
            eve.preventDefault();
        }, { passive: false });

        var obj = this;
        document.getElementById('newgame').onclick = function () {
            obj.hideAll();
            document.getElementById("popupUserName").style.display = "block";
            document.getElementById("pName").focus();
        }

        document.getElementById("dashbord").onclick = function () {
            obj.hideAll();
            document.getElementById("olHighScore").innerHTML = "";
            var allCookies = clib.allCookieList();
            var allScores = [];
            for (ck in allCookies) {
                if (/^(sc-)/i.test(ck) == true) {
                    allScores.push({
                        key: ck.substr(3),
                        value: parseInt(allCookies[ck])
                    });
                }
            }
            allScores.sort(function (a, b) {
                return b.value - a.value;
            });
            for (var i = 0; i < allScores.length && i < 10; i++) {
                var op = document.createElement("li");
                op.innerHTML = allScores[i].key + " : " + allScores[i].value;
                document.getElementById("olHighScore").appendChild(op);
            }
            document.getElementById("highestScorePOPUP").style.display = "block";
        };

        document.getElementById("highspan").onclick = function () {
            document.getElementById("highestScorePOPUP").style.display = "none";
        };

        document.getElementById('aboutus').onclick = function () {
            obj.hideAll();
            document.getElementById("popupAboutus").style.display = "block";
        }

        document.getElementById("aboutusspan").onclick = function () {
            document.getElementById("popupAboutus").style.display = "none";
        };

        document.getElementById('exit').onclick = function () {
            obj.hideAll();
            document.getElementById("exitPopUp").style.display = "block";
            document.getElementById("no").onclick = function () { document.getElementById("exitPopUp").style.display = "none"; };
            document.getElementById("yes").onclick = function () { window.close(); };
        };

        document.getElementById("x").onclick = function () {
            document.getElementById("popupUserName").style.display = "none";
            document.getElementById("pName").style = "border: 3px solid #555";
            document.getElementById("temp").innerHTML = "";
        };

        document.getElementById("getPName").onclick = function () {
            var Name = document.getElementById("pName").value;
            var valid = obj.checkValidation(Name);
            document.getElementById("pName").focus();

            switch (valid) {
                case 0:
                    document.getElementById("temp").innerHTML = "NOT VALID!!";
                    document.getElementById("pName").style = "border: 3px solid rgb(248, 0, 0); animation: shake 0.5s; ";
                    break;
                case 1:
                    document.getElementById("popupUserName").style = "animation: goup 1s; display:none;";
                    document.getElementById("startHome").style.display = "none";
                    game.initializeGame(Name);
                    break;
                case 5:
                    document.getElementById("temp").innerHTML = "NAME SHOULD BE 5 CHARACTER AT LEAST!!";
                    document.getElementById("pName").style = "border: 3px solid rgb(248, 0, 0); animation: shake 0.5s;";
                    document.getElementById("pName").focus();
                    break;
            }
        }

        document.getElementById("pName").onclick = function () {
            document.getElementById("pName").style = "border: 3px solid #555";
            document.getElementById("temp").innerHTML = "";
        }
    },
    hideAll: function () {
        document.getElementById("popupUserName").style.display = "none";
        document.getElementById("highestScorePOPUP").style.display = "none";
        document.getElementById("popupAboutus").style.display = "none";
        document.getElementById("exitPopUp").style.display = "none";
    },
    checkValidation: function (name) {
        if (name.replace(/^\s+|\s+$/g, '').length == 0)
            return 0;
        else if (name.length < 5)
            return 5;
        else return 1;
    },
    showHomeScreen: function () {
        document.getElementById("pName").value = "";
        document.getElementById("startHome").style.display = "block";
    },
    hideHomeScreen: function () {
        document.getElementById("startHome").style.display = "none";
    }
}