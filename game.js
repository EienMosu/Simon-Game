var buttonColours  = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var level = 0
var started = false;


$(document).keypress(function() {
    if (!started) {
      $("#level-title").text("Level " + level);
      nextSequence();
      started = true;
    }
  });


$(".btn").click(function () {
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour)
    animatePress(userChosenColour)
    checkAnswer(userClickedPattern.length-1);

    // console.log(userClickedPattern);
});


function nextSequence() {
    userClickedPattern = [];

    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour)
    $("h1").html("Level " + level)
    level++

}

function playSound(sound) {
    var audio = new Audio("sounds/" + sound + ".mp3");
    audio.play();
}

function animatePress(currentColour) {
    var activeButton = document.querySelector("." + currentColour)
    activeButton.classList.add("pressed")

    setTimeout(function() {
        activeButton.classList.remove("pressed")
    }, 100);
}


function checkAnswer(currentLevel) {

    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
      console.log("success");

      if (userClickedPattern.length === gamePattern.length){
        setTimeout(function () {
          nextSequence();
        }, 1000);
      }

    } else {
        playSound("wrong")
        $("body").addClass("game-over")
        $("#level-title").text("Game Over, Press Any Key to Restart")

        setTimeout(function() {
            $("body").removeClass("game-over")
        },100)

        console.log("wrong");
        startOver()
    }
}

function startOver() {
    level = 0
    gamePattern = []
    started = false
}