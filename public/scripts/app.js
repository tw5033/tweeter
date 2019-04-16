/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function() {
  // Fake data taken from tweets.json
  const data = [
    {
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
    },
    {
      "user": {
        "name": "Descartes",
        "avatars": {
          "small":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_50.png",
          "regular": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc.png",
          "large":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_200.png"
        },
        "handle": "@rd" },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1461113959088
    },
    {
      "user": {
        "name": "Johann von Goethe",
        "avatars": {
          "small":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_50.png",
          "regular": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1.png",
          "large":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_200.png"
        },
        "handle": "@johann49"
      },
      "content": {
        "text": "Es ist nichts schrecklicher als eine tätige Unwissenheit."
      },
      "created_at": 1461113796368
    }
  ];

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
    const iTwo = $("<i>").addClass("fas fa-retweet");
    const iThree = $("<i>").addClass("fas fa-flag");

    //setting data into html tags
    img.attr("src", data.user.avatars.large);
    span.html(data.user.name);
    h6.html(data.user.handle);
    article.html(data.content.text);
    p.html(data.created_at);

    // appending child tags to parent
    p.append(iOne);
    p.append(iTwo);
    p.append(iThree);
    header.append(img);
    header.append(span);
    header.append(h6);
    footer.append(p);
    div.append(header);
    div.append(article);
    div.append(footer);
    section.append(div);

    return section;
  }

  const renderTweets = function(tweets) {
    tweets.forEach((data) => {
      let tweet = createTweetElement(data);
      $(".container").append(tweet);
    });
  }

  renderTweets(data);

});