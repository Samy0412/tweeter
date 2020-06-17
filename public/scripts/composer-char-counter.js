//Ensure de DOM had loaded
$(document).ready(function () {
  // --- our code goes here ---
  // document.addEventListener("dblclick", (event) => {
  //   console.log(event);
  // });
  // document.getElementById("tweet-text").addEventListener("keydown", (event) => {
  //   console.log(event);
  // });

  $("#tweet-text").keyup(function () {
    const value = $(this).val().length;
    // console.log(value);
    const counter = $(this).parent("form").find("output");
    counter.val(140 - value);
    // /if (counter.val() <= 0) {
    //   counter.addClass("red");
    // } else {
    //   counter.removeClass("red");
    // }

    counter.val() <= 0
      ? counter.css("color", "red")
      : counter.css("color", "#545149");
  });
});
