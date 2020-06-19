/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

//create a new tweet
const createTweetElement = function (tweet) {
  const escape = function (str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };
  let $tweet = `
    <article>
      <header>
        <div>
          <img src = "${tweet.user.avatars}"/>
          <p>${tweet.user.name}</p>
        </div>
        <p id="handle">${tweet.user.handle}</p>
      </header>
      <div id="tweet-display">
        <p>${escape(tweet.content.text)}</p>
      </div>
      <footer>
        <p>${moment(tweet.created_at).fromNow()}</p>
        <div id="tweet-images">
          <i class="fa fa-flag" aria-hidden="true"></i>
          <i class="fa fa-retweet" aria-hidden="true"></i>
          <i class="fa fa-heart" aria-hidden="true"></i>
        </div>
      </footer>
    </article>`;

  return $tweet;
};

//render the Tweets on the page
const renderTweets = function (tweets) {
  for (let i = tweets.length - 1; i >= 0; i--) {
    $(".tweet-container").append(createTweetElement(tweets[i]));
  }
};

$(document).ready(() => {
  $("#error-message").hide();
  $("#error-message").removeClass("hidden");
  //fetching the tweets from the server
  const loadTweets = function () {
    $.ajax({
      url: `/tweets`,
      method: "GET",
      dataType: "JSON",
    })
      .then(function (response) {
        //console.log("response:", response);
        $(".tweet-container").empty();
        renderTweets(response);
      })
      .catch(function (err) {
        console.log("err:", err);
      });
  };
  // Sending the tweet text to the server
  $("form").on("submit", function (evt) {
    $("#error-message").slideUp("slow");
    evt.preventDefault();
    const tweet = $("#tweet-text").val();

    if (!tweet) {
      $("#error-message-text").text("The tweet cannot be empty!");
      $("#error-message").slideDown("slow");
    } else if (tweet.length > 140) {
      $("#error-message-text").text(
        "The tweet cannot be over 140 chars! sorry!"
      );
      $("#error-message").slideDown("slow");
    } else {
      $.ajax({
        url: `/tweets`,
        method: "POST",
        data: $(this).serialize(),
      })
        .then(function () {
          loadTweets();
        })
        .catch(function (err) {
          console.log("err:", err);
        });
    }
  });
});
