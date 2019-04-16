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
      "created_at": 1555455600227
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
      "created_at": 1555458483113
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
      "created_at": 1553324400000
    }
  ];

  // compares tweet timestamp and current time and displays in human readable format
  const dateConverter = function(date) {
    let now = Date.now();
    let difference = Math.floor((now - date) / 1000);
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

  const createTweetElement = function(data) {
    let time = dateConverter(data.created_at);
    // create all the html tags and add data into them
    let section = $("<section>").addClass("tweets");
    let div = $("<div>").addClass("content");
    let header = $("<header>");
    let img = $("<img>").addClass("avatar").attr("src", data.user.avatars.large);
    let span = $("<span>").addClass("user").html(data.user.name);
    let h6 = $("<h6>").addClass("handle").html(data.user.handle);
    let article = $("<article>").addClass("tweet").html(data.content.text);
    let footer = $("<footer>");
    let p = $("<p>").html(time);
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

  const renderTweets = function(tweets) {
    tweets.forEach((data) => {
      let tweet = createTweetElement(data);
      $(".container").append(tweet);
    });
  }

  renderTweets(data);

});