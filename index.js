// user greetings...
var userName;
do {
    userName = prompt("Please enter your name... ")
} while(userName ==="")

var userName_0 = userName.slice(0, 1).toUpperCase();
var userName_1 = userName.slice(1, userName.length).toLowerCase();
$(".user").text("Hello "+userName_0+userName_1)
setTimeout(() => {
    $(".user").text("")
}, 5000)

// code for the game....
var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var level = 0;

// starting the game.....
$(document).keydown(() => {  
    if(level === 0) {  
        nextSequence();
    }  
})

// getting pattern from user...
$(".btn").click(function() {

    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);

    checkAnswer(userClickedPattern.length-1);
})

// checking the answer...
function checkAnswer(currentLevel) {
    if(userClickedPattern[currentLevel] === gamePattern[currentLevel]){  
        if(userClickedPattern.length === gamePattern.length){
            setTimeout(function () {
                nextSequence();
                }, 1000);
        }
    }
    else{
        var sound = new Audio("sounds/wrong.mp3");
        sound.play();
        level = 0;
        $("#level-title").text("Game Over, Press Any Key to Restart "); 
        $("body").addClass("game-over")
        setTimeout(() => {
            $("body").removeClass("game-over")
        }, 150)
        reset();
    }  
}

// next sequence...
function nextSequence() {
    userClickedPattern = [];
    var randomNumber = Math.floor(Math.random()*4);
    gamePattern.push(buttonColours[randomNumber]);
    playSound(buttonColours[randomNumber])
    $("#level-title").text("Level " + ++level);
}

// to play sounds and animations...
function playSound(color) {
    var sound = new Audio("sounds/"+color + ".mp3");
    sound.play();
    animate(color); 
}

// show animation on buttons...
function animate(color) {
    $("#" + color).fadeIn(100).fadeOut(100).fadeIn(100).addClass("pressed");
    setTimeout(() => {
        $("#" + color).removeClass("pressed");
    }, 150)
}

// reset all... 
function reset() {
    gamePattern=[];
    userClickedPattern = [];
    currentLevel = 0;
}