/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(() => {

  // compares tweet timestamp and current time and displays in human readable format
  const dateConverter = (date) => {
    let now = Date.now();
    let difference = Math.floor((now - date) / 1000);
    console.log(`now: ${now}`);
    console.log(`date: ${date}`);
    if(difference < 60) {
      return `${difference} seconds ago`;
    } else if (difference < 3600) {
      difference = Math.floor(difference / 60);
      return `${difference} minutes ago`;
    } else if (difference < 86400) {
      difference = Math.floor(difference / 3600);
      return `${difference} hours ago`;
    }
    difference = Math.floor(difference / 86400);
    return `${Math.floor(difference)} days ago`;
  }

  const createTweetElement = (data) => {
    let time = dateConverter(data.created_at);
    // create all the html tags and add data into them
    let section = $("<section>").addClass("tweets");
    let div = $("<div>").addClass("content");
    let header = $("<header>");
    let img = $("<img>").addClass("avatar").attr("src", data.user.avatars.large);
    let span = $("<span>").addClass("user").text(data.user.name);
    let h6 = $("<h6>").addClass("handle").text(data.user.handle);
    let article = $("<article>").addClass("tweet").text(data.content.text);
    let footer = $("<footer>");
    let p = $("<p>").text(time);
    let iOne = $("<i>").addClass("fas fa-heart");
    let iTwo = $("<i>").addClass("fas fa-retweet");
    let iThree = $("<i>").addClass("fas fa-flag");

    // appending child tags to parent
    p.append(iOne)
     .append(iTwo)
     .append(iThree);
    header.append(img)
          .append(span)
          .append(h6);
    footer.append(p);
    div.append(header)
       .append(article)
       .append(footer);
    section.append(div);

    return section;
  }

  const renderTweets = (tweets) => {
    for(let i = tweets.length - 1; i >= 0; i--) {
      let tweet = createTweetElement(tweets[i]);
      $(".tweet-container").append(tweet);

    }
  }

  const validateTweet = function() {
    let input = $("#tweet").val();
    let error = $(".isa_error");
    let icon = $("<i>").addClass("fas fa-times-circle");
    if(input === "" || input === null) {
      error.text('Your tweet cannot be empty!');
      error.prepend(icon);
      error.slideDown();
    } else if(input.length > 140) {
      error.text('Your tweet cannot be over 140 characters!');
      error.prepend(icon);
      error.slideDown();
    } else {
      return true;
    }
  }

  const loadTweets = () => {
    $.get("/tweets", (data) => {
      $('.tweet-container').empty();
      renderTweets(data);
    });
  }

  loadTweets();

   // ajax post form
  const form = $(".new_tweet");
  form.on("submit", function() {
    event.preventDefault();
    $(".isa_error").slideUp();
    let $field = $(this).serialize();
    if(validateTweet()) {
      $.post("/tweets", $field, () => {
        loadTweets();
      });
    }
  });
});