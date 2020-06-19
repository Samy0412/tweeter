//HELPERS FUNCTIONS

//CREATE A TWEET FUNCTION
const createTweetElement = function(tweet) {
  //Escape function to evaluate text coming from untrusted sources
  const escape = function(str) {
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

//FUNCTION RENDERING THE TWEETS
const renderTweets = function(tweets) {
  for (let i = tweets.length - 1; i >= 0; i--) {
    $(".tweet-container").append(createTweetElement(tweets[i]));
  }
};

//ENSSURING THAT THE DOM has loaded
$(document).ready(() => {
  //Hides the error message so that is shows up only when needed
  $("#error-message").hide();

  // SENDING THE TWEET TEXT TO THE SERVER
  $("form").on("submit", function(evt) {
    $("#error-message").slideUp("slow");
    evt.preventDefault();
    const tweet = $("#tweet-text").val();
    //sends error message if the field is empty
    if (!tweet) {
      $("#error-message-text").text("The tweet cannot be empty!");
      $("#error-message").slideDown("slow");
    } else if (tweet.length > 140) {
      //sends error message if the length of the tweet is more than 140 chars
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
        .then(function() {
          loadTweets();
          //Empties the text area field after the tweets are loaded
          $("#tweet-text").val("");
          //Reset the counter to 140
          $("output").text("140");
        })
        .catch(function(err) {
          console.log("err:", err);
        });
    }
  });

  //FETCHING THE TWEETS FROM THE SERVER
  const loadTweets = function() {
    $.ajax({
      url: `/tweets`,
      method: "GET",
      dataType: "JSON",
    })
      .then(function(response) {
        //Refreshes the list of tweets
        $(".tweet-container").empty();
        renderTweets(response);
      })
      .catch(function(err) {
        console.log("err:", err);
      });
  };
});
