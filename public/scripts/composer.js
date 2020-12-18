//Ensure de DOM had loaded
$(document).ready(function () {
  $(".btn").click(function() {
    $(".new-tweet").slideDown("slow");
    $("#tweet-text").focus();
  })
});