var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];

var userClickedPattern = [];

var level = 0;

var started = false;


function nextSequence() {

  userClickedPattern = [];

  var randomNumber = Math.floor(Math.random() * 4);

  var randomChosenColour = buttonColours[randomNumber];

  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

  playSound(randomChosenColour);

  level++;
  $("#level-title").text("Level " + level);

    };


  $(".btn").click(function(event) {
      userChosenColour = $(this).attr("id");

      userClickedPattern.push(userChosenColour);

      playSound(userChosenColour);

      animatePress(userChosenColour);

      checkAnswer(userClickedPattern.length -1);

  });


  function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
  }


  function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed");

    setTimeout(function(){
      $("#" + currentColour).removeClass("pressed");
    }, 100);
  }

  $("body").keypress(function() {

    if (!started) {
     nextSequence();
    $("#level-title").text("Level " + level);
    started = true;
    };
  });
    function startOver() {
  level = [];
  gamePattern = [];
  started = false;
}
    function checkAnswer(currentLevel) {

        if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

                if (gamePattern.length === userClickedPattern.length) {
                    setTimeout(function(){
                      nextSequence()}, 1000);
              }

        } else {

          var wrong = new Audio("sounds/wrong.mp3");
          wrong.play();

          $("body").addClass("game-over");
          setTimeout(function(){
            $("body").removeClass("game-over");
          }, 200);
          $("h1").text("Game Over, Press Any Key to Restart");
          startOver();
        }
  };
