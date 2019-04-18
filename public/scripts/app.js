/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
/* global $ */
/* global moment */

// creates new tweet data element to draw on clients page 
const createTweetElement = (data) => {
  // create all the html tags and add data into them
  let section = $("<section>").addClass("tweets");
  let div = $("<div>").addClass("content");
  let header = $("<header>");
  let img = $("<img>").addClass("avatar").attr("src", data.user.avatars.large);
  let span = $("<span>").addClass("user").text(data.user.name);
  let h6 = $("<h6>").addClass("handle").text(data.user.handle);
  let article = $("<article>").addClass("tweet").text(data.content.text);
  let footer = $("<footer>");
  let p = $("<p>").text(moment(data.created_at).fromNow());
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

// renders all the tweets return from database
const renderTweets = (tweets) => {
  for(let i = tweets.length - 1; i >= 0; i--) {
    let tweet = createTweetElement(tweets[i]);
    $(".tweet-container").append(tweet);

  }
}

// validates user input for new tweet
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

// loads all of the available tweets
const loadTweets = () => {
  $.get("/tweets", (data) => {
    $('.tweet-container').empty();
    renderTweets(data);
  });
}

$(() => {
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
  
  loadTweets();  
});

