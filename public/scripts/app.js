/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function() {
  const tweetData = {
    "user": {
      "name": "Newton",
      "avatars": {
        "small":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
        "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
        "large":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
      },
      "handle": "@SirIsaac"
      },
      "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
      "created_at": 1461116232227
  }

  const createTweetElement = function(data) {
    // create all the html tags
    const section = $("<section>").addClass("tweets");
    const div = $("<div>").addClass("content");
    const header = $("<header>");
    const img = $("<img>").addClass("avatar");
    const span = $("<span>").addClass("user");
    const h6 = $("<h6>").addClass("handle");
    const article = $("<article>").addClass("tweet");
    const footer = $("<footer>");
    const p = $("<p>");
    const iOne = $("<i>").addClass("fas fa-heart");
    const iTwo = $("<i>").addClass("fas fa-flag");
    const iThree = $("<i>").addClass("fas fa-retweet");

    // setting data into html tags
    img.attr("src", data.user.avatars.large);
    span.html(data.user.name);
    h6.html(data.user.handle);
    article.html()

    // appending child tags to parent
    header.append(img);
    header.append(span);
    header.append(h6);
    div.append(header);
    section.append(div);

    return section;
  }

  var $tweet = createTweetElement(tweetData);

  // Test / driver code (temporary)
  console.log($tweet); // to see what it looks like
  $('.container').append($tweet); // to add it to the page so we can make sure it's got all the right elements, classes, etc.
});