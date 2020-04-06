var userClickedPattern = [];
var gamePattern = [];


var buttonColours = ["red", "blue", "green", "yellow"];

function nextSequence() {
  userClickedPattern = [];
  level++;
  $("h1").text("Level " + level+" 🏁");
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  playSound(randomChosenColour);

}


$(".btn").click(function() {
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length - 1);
});


function playSound(name) {

  $("#" + name).fadeIn(100).fadeOut(100).fadeIn(100);
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  // document.querySelector("."+currentColour).classList.add("pressed");
  setTimeout(function() {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}

var init = 0;
var level = 0;
$(".start").click(function() {
  $("button").attr("id", "hid");
  if (init === 0) {
    $("h1").text("Level " + level+" 🏁");
    nextSequence();
    init = 1;

  }
});

function checkAnswer(currentLevel) {

  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    console.log("success");

    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function() {
        nextSequence();

      }, 1000);
    }
  } else {
    var wrong_audio = new Audio("sounds/wrong.mp3");
    wrong_audio.play();
    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);
    $("h1").text("Game Over!☹");
    startOver();
  }
  $(".myButton").click(function() {
    location.reload();
  });



}

function startOver() {
  $("button").attr("id", "hid");
  $("a").attr("id", "vib");
  level = 0;
  gamePattern = [];
  init = 0;

}



//
// $(".btn").click(function(event) {
//   $("#" + randomChosenColour).fadeOut(100).fadeIn(100);
//   var audio = new Audio("sounds/" + randomChosenColour + ".mp3");
//   audio.play();
//   handler(event);
// });
//
// function handler(item) {
//   var userChosenColour = item;
//   userClickedPattern.push(userChosenColour);
// }
