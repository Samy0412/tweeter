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
  renderTweets(data);

  $("form").on("submit", (evt) => {
    evt.preventDefault();
    // How do I get the value of what i typed INTO my search URL?
    // How do i bundle the data i need to send to the user  ( hint hint serilize? )
    $.ajax({
      url: `http://api.tvmaze.com/search/shows?q=${evt.target.search.value}`,
      method: "GET",
      dataType: "JSON",
    }).then(function (response) {
      console.log(response);
      // const item = createItem(response[0])
      $("#results").empty();
      createItems(response);
    });
  });
});
