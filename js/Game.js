function Game(maps) {



    this.world = null;
    this.maps = maps;
    this.mapId = -1;
    this.score = 0;
    this.playerName = "";
    HomeScreen.inititalize();

    (function (obj) {
        var Continue = document.getElementById("Continue");
        Continue.onclick = function () {
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
        var Restart = document.getElementById("Restart");
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

    this.gameWon = function (score) {
        this.world.stop();
        this.mapId++;
        this.score += score;
        if (this.mapId == this.maps.length) {
            this.wonAllDiv(this.name, this.score);
        } else {
            this.nextMapDiv();
        }
    }

    this.gameLose = function () {
        this.lives--;
        this.setLivesOnBar(this.lives);
        if (this.lives == 0) {
            this.gameOverDiv(this.name, this.score);
        } else {
            this.playAgainDiv();
        }
    }



    this.playAgainDiv = function () {
        $("#gameLost").show();
    }

    this.nextMapDiv = function () {
        $("#nextMap").show();
    }

    this.gameOverDiv = function (score) {
        $("#gameOver").show();
    }

    this.wonAllDiv = function (score) {
        $("#gameOver").show();
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