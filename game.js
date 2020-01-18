var colors = ["green", "red", "yellow", 'blue'];
var pressTimeout = 200;
var showTimeout = 600;
var simon = [];
var player = [];
var gameDone = true;

$(document).keypress(restartGame);

for (var i = 0; i < colors.length; i++) {
    $("#" + colors[i]).click(function () {
        play(this.id);
    })
}

function restartGame() {
    if (gameDone) {
        player = [];
        gameDone = false;
        nextLevel();
    }
}

function play(key) {
    player.push(key);
    if (simon.length === player.length) {
        if (JSON.stringify(simon) === JSON.stringify(player)) {
            tune = new Audio("sounds/" + key + ".mp3");
            tune.play();
            $("#" + key).addClass("pressed");
            setTimeout(function () {
                $("#" + key).removeClass("pressed");
            }, pressTimeout);
            setTimeout(nextLevel, showTimeout);
        }
    } else if (JSON.stringify(simon.slice(0, player.length)) === JSON.stringify(player)) {
        tune = new Audio("sounds/" + key + ".mp3");
        tune.play();
        $("#" + key).addClass("pressed");
        setTimeout(function () {
            $("#" + key).removeClass("pressed");
        }, pressTimeout);
    } else {
        wrong();
    }
}

function wrong() {
    tune = new Audio("sounds/wrong.mp3");
    tune.play();
    gameDone = true;
    simon = [];
    $("#level-title").text("Game Over, Press Any Key to Restart");
    $("body").addClass("worng")
    setTimeout(function () {
        $("body").removeClass("worng");
    }, pressTimeout);
}

function randomColor() {
    return (colors[Math.floor(Math.random() * 3)]);
}

function nextLevel() {
    player = [];
    var c = randomColor();
    tune = new Audio("sounds/" + c + ".mp3");
    tune.play();
    simon.push(c);
    $("#level-title").text("Level " + simon.length);
    $("#" + c).fadeTo(showTimeout / 2, 0);
    $("#" + c).fadeTo(showTimeout / 2, 1);
}
