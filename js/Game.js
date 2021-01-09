function Game(maps) {



    this.world = null;
    this.maps = maps;
    this.mapId = -1;
    this.score = 0;
    this.playerName = "";
    HomeScreen.initialize();

    (function (obj) {
        window.onresize = function () {
            if (obj.world !== null && obj.world.player !== null && !obj.world.isWorldStop) {
                obj.world.moveScrollBar();
            }
        }
    })(this);

    (function (obj) {
        var Continue = document.getElementById("Continue");
        Continue.onclick = function () {
            obj.setLevelOnBar(obj.mapId + 1);
            $("#nextMap").hide();
            obj.world.end();
            obj.startGame();
        }
    })(this);

    (function (obj) {
        var Return = document.getElementById("CloseWin");
        Return.onclick = function () {
            $("#nextMap").hide();
            obj.reset();
        }
    })(this);

    (function (obj) {
        var Restart = document.getElementById("Restart2");
        Restart.onclick = function () {
            $("#gameLost").hide();
            obj.world.end();
            obj.startGame();
        }
    })(this);


    (function (obj) {
        var Close = document.getElementById("CloseLost");
        Close.onclick = function () {
            $("#gameLost").hide();
            obj.reset();
        }
    })(this);


    (function (obj) {
        var exitGame = document.getElementById("exitGame");
        exitGame.onclick = function () {
            window.close();
        }
    })(this);

    (function (obj) {
        var exitGame_01 = document.getElementById("exitGame_01");
        exitGame_01.onclick = function () {
            window.close();
        }
    })(this);

    (function (obj) {
        var restartAtGameOver = document.getElementById("restart");
        restartAtGameOver.onclick = function () {
            $("#gameOver").hide();
            obj.reset();
        }
    })(this);


    (function (obj) {
        var restartAtGameOver_01 = document.getElementById("restart_01");
        restartAtGameOver_01.onclick = function () {
            $("#winAll").hide();
            obj.reset();
        }
    })(this);


    this.showHomeScreen = function () {
        HomeScreen.showHomeScreen();
    }

    this.reset = function () {
        // if(this.world != null)
        this.world.end();
        this.world = null;
        this.mapId = 0;
        this.score = 0;
        this.playerName = "";
        this.hidebar();
        HomeScreen.showHomeScreen();
    }


    this.initializeGame = function (playerName) {
        this.drawbar();
        this.mapId = 0;
        this.lives = 3;
        this.score = 0;
        this.setScoreOnBar(this.score);
        this.setLevelOnBar(this.mapId + 1);
        this.setLivesOnBar(this.lives)
        this.drawbar();
        this.playerName = playerName;
        this.startGame();

    }

    this.startGame = function () {
        let tmap = JSON.parse(JSON.stringify(this.maps[this.mapId]));;
        this.world = new World(tmap, game);
        this.world.start();
    }

    this.gameWon = function (score = 0) {
        this.world.stop();
        this.mapId++;
        this.score += score;
        this.setScoreOnBar(this.score);
        if (this.mapId == this.maps.length) {
            window.clib.setCookie(`sc-${this.playerName}`, this.score);
            this.wonAllDiv(this.score);
        } else {
            this.nextMapDiv();
        }
    }

    this.gameLose = function () {
        this.lives--;
        this.setLivesOnBar(this.lives);
        this.setScoreOnBar(this.score);
        if (this.lives == 0) {
            window.clib.setCookie(`sc-${this.playerName}`, this.score);
            this.gameOverDiv(this.playerName, this.score);
        } else {
            this.playAgainDiv();
        }
    }



    this.playAgainDiv = function () {
        window.scrollTo(0, 0);
        $("#gameLost").show();
    }

    this.nextMapDiv = function () {
        $("#nextMap").show();
        window.scrollTo(0, 0);
    }

    this.gameOverDiv = function (nm, score) {
        window.scrollTo(0, 0);
        document.getElementById("Gname").innerHTML = nm;
        document.getElementById("score").innerHTML = score;
        $("#gameOver").show();
    }

    this.wonAllDiv = function (score) {
        window.scrollTo(0, 0);
        $("#winAll").show();
        document.getElementById("span6").innerHTML = score;
    }

    this.showPausedDiv = function() {
        $("#paused").show();
    }

    this.hidePausedDiv = function() {
        $("#paused").hide();
    }

    this.hidebar = function () {
        $("#footer").hide();
    }

    this.drawbar = function () {
        $("#footer").show();
    }

    this.setScoreOnBar = function (score) {
        document.getElementsByClassName("badge")[1].innerHTML = score;
    }

    this.setLevelOnBar = function (level) {
        document.getElementsByClassName("badge")[5].innerHTML = level;
    }

    this.setLivesOnBar = function (lives) {
        document.getElementsByClassName("badge")[3].innerHTML = lives;
    }


}