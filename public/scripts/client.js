/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

//create a new tweet
const createTweetElement = function (tweet) {
  let $tweet = `
    <article>
      <header>
        <div>
          <img src = "${tweet.user.avatars}"/>
          <p>${tweet.user.name}</p>
        </div>
        <p id="tweet-recipient">${tweet.user.handle}</p>
      </header>
      <div id="tweet-display">
        <p>${tweet.content.text}</p>
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
  for (let tweet of tweets) {
    $(".tweet-container").append(createTweetElement(tweet));
  }
};

$(document).ready(() => {
  //fetching the tweets from the server
  const loadTweets = function () {
    $.ajax({
      url: `/tweets`,
      method: "GET",
      dataType: "JSON",
    }).then(function (response) {
      //console.log("response:", response);
      $("#tweet-container").empty();
      renderTweets(response);
    });
  };
  // Sending the tweet text to the server
  $("form").on("submit", function (evt) {
    evt.preventDefault();
    const tweet = $("#tweet-text").val();
    if (tweet && tweet.length < 140) {
      $.ajax({
        url: `/tweets`,
        method: "POST",
        // dataType: "JSON",
        data: $(this).serialize(),
      })
        .then(function () {
          $("#tweet-container").empty();
          loadTweets();
        })
        .catch(function (err) {
          console.log("err:", err);
        });
    } else {
      alert("Invalid input!");
    }
  });
});
