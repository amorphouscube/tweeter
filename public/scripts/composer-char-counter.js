$(document).ready(function() {
  const $tweet = $('main section form textarea');

  $tweet.on('keydown', function() {
    let textLength = $(this).val().length;
    $(this).parent().children(".counter").html(140 - textLength);
    if (textLength > 140) {
      $(this).parent().children(".counter").addClass("red");
    } else {
      $(this).parent().children(".counter").removeClass("red");
    }
  });

  $tweet.on('keyup', function() {
    let textLength = $(this).val().length;
    $(this).parent().children(".counter").html(140 - textLength);
    if (textLength > 140) {
      $(this).parent().children(".counter").addClass("red");
    } else {
      $(this).parent().children(".counter").removeClass("red");
    }
  });
});
