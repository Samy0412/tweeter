//Ensure de DOM had loaded
$(document).ready(function () {
  $("#tweet-text").keyup(function () {
    //Storing the length of the tweet
    const value = $(this).val().length;
    //Looking for the output element that has as parent the form
    const counter = $(this).parent("form").find("output");
    //Shows the number of characters left
    counter.val(140 - value);
    //Sets the color of the counter to red if it is negative
    counter.val() < 0
      ? counter.css("color", "red")
      : counter.css("color", "#545149");
  });
});
