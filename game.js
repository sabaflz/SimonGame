// ["red", "blue", "yellow". "green"]

const buttonColors = ["color1", "color2", "color3", "color4"];

let gamePattern = [];
let userClickedPattern = [];

let started = false;
let level = 0;

// Start The Game
$(document).keypress(function() {

  if (!started) {
    $("#levelTitle").text("Level : " + level);
    nextSequence();
    started = true;
  }

});

// User Pressing Buttons
$(".playButton").click(function() {

  var userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);

  playSound(userChosenColor);
  animatePress(userChosenColor);

  checkAnswer(userClickedPattern.length - 1);
});

// Generating The Game Sequence Randomly
function nextSequence() {

  userClickedPattern = [];

  const randomNumber = Math.floor(Math.random() * 4);

  const randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);

  $("#" + randomChosenColor).fadeOut().fadeIn();
  playSound(randomChosenColor);

  level++;
  $("#levelTitle").text("Level : " + level);

}

// Checking User's Answer
function checkAnswer(currentLevel) {

  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function() {
        nextSequence();
      }, 1000);
      console.log("success");
    }
  } else {
    gameOver();
    console.log("wrong");
  }
}

// Adding FadeIn and FadeOut to the Buttons
function animatePress(currentColor) {

  $("#" + currentColor).addClass("pressed");

  setTimeout(function() {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

// Playing The Sound
function playSound(color) {
  const audio = new Audio("sounds/" + color + ".mp3");
  audio.play();
}

// Game Over Sound and Color and Text
function gameOver() {

  playSound("wrong");

  $("body").addClass("gameOver");
  setTimeout(function() {
    $("body").removeClass("gameOver");
  }, 200);

  $("#levelTitle").text("Game Over, Press Any Key To Restart");
  startOver();

}

// Starting The Game Over
function startOver() {

  level = 0;
  gamePattern = [];
  started = false;

}
