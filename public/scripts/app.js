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
  let likeCount = $("<div>").addClass("likes").text(data.num_likes).data("countID", data._id);
  let iOne = $("<i>").addClass("fas fa-heart").data("id", data._id);
  let iTwo = $("<i>").addClass("fas fa-retweet");
  let iThree = $("<i>").addClass("fas fa-flag");

  // appending child tags to parent
  p.append(likeCount)
   .append(iOne)
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

// renders all the tweets returned from database, newest displayed at the top of the document
const renderTweets = (tweets) => {
  for(let i = tweets.length - 1; i >= 0; i--) {
    let tweet = createTweetElement(tweets[i]);
    $(".tweet-container").append(tweet);

  }
}

// validates user input for new tweet, shows an error box if the input is empty or over 140 characters
const validateTweet = () => {
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

// redraws the like count on click
const redrawCount = (id, counter) => {
  $.get("/tweets", (tweets) => {
    tweets.forEach((tweet) => {
      if(id === tweet._id) {
        counter.parent().find("div").text(tweet.num_likes);
      }
    });
  });
}

// likes a tweet when the heart icon is clicked
const likeTweet = () => {
  event.preventDefault();
  let target = $(event.target);
  let id = target.data("id");
  if(target.css("color") === "rgb(255, 0, 0)") {
    $.ajax(
      { url: "/tweets", 
        method: "PUT" ,
        data: { id: id, colour: "red" }
      });
    target.css("color", "#00a087"); 
    redrawCount(id, target);
  } else  {
      $.ajax(
        { url: "/tweets", 
          method: "PUT" ,
          data: { id: id, colour: "other" }
        });
      target.css("color", "red"); 
      redrawCount(id, target);
   }
 }

 // posts a new tweet, slides error box up if displayed, redraws tweets and resets input field and counter;
const postTweet = function() {
  event.preventDefault();
  $(".isa_error").slideUp();
  let $field = $(this).serialize();
  if(validateTweet()) {
    $.post("/tweets", $field, () => {
      loadTweets();
      $("#tweet").val("");
      $(".counter").text(140);
    });
  }
}


$(() => {
  loadTweets();
  $(".new_tweet").on("submit", postTweet);
 
  $(".tweet-container").on("click", ".fa-heart", likeTweet);
});

