/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Fake data taken from initial-tweets.json

const data = [
  {
    user: {
      name: "Newton",
      avatars: "https://i.imgur.com/73hZDYK.png",
      handle: "@SirIsaac",
    },
    content: {
      text:
        "If I have seen further it is by standing on the shoulders of giants",
    },
    created_at: 1461116232227,
  },
  {
    user: {
      name: "Descartes",
      avatars: "https://i.imgur.com/nlhLi3I.png",
      handle: "@rd",
    },
    content: {
      text: "Je pense , donc je suis",
    },
    created_at: 1461113959088,
  },
];

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

const renderTweets = function (tweets) {
  for (let tweet of tweets) {
    $(".tweet-container").append(createTweetElement(tweet));
  }
};

$(document).ready(() => {
  //renderTweets(data);

  $("form").on("submit", function (evt) {
    evt.preventDefault();
    // const thisObject = $(this);
    // const data = $(this).serialize();
    // console.log("thisObject:", thisObject);
    // console.log("data:", data);
    $.ajax({
      url: `/tweets`,
      method: "POST",
      // dataType: "JSON",
      data: $(this).serialize(),
    })
      .then(function () {
        console.log("hurrah");
        //$("#results").empty();
        //renderTweets(response);
      })
      .catch(function (err) {
        console.log("err:", err);
      });
  });
});
