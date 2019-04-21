"use strict";

const {ObjectID} = require("mongodb");
// Defines helper functions for saving and getting tweets, using the database `db`
module.exports = function makeDataHelpers(db) {
  return {

    // Saves a tweet to `db`
    saveTweet: function(newTweet, callback) {
      db.collection("tweets").insertOne(newTweet);
      callback(null, true);
    },

    // Get all tweets in `db`, sorted by newest first
    getTweets: (callback) => {
      function fromDb (callback) {
        db.collection("tweets").find().toArray((err, tweets) => {
        if(err) {
          return callback(err);
        }
        callback(null, tweets);
        });
      }
      fromDb((err, tweets) => {
        if(err) throw err;
        const sortNewestFirst = (a, b) => a.created_at - b.created_at;
        callback(null, tweets.sort(sortNewestFirst));
      });

    },

    // increases tweet like count, decreases count if unliked
    likeTweet: (tweetID, colour) => {
      if(colour === 'red') {
        db.collection("tweets").findOneAndUpdate(
          { _id: ObjectID(tweetID) },
          { $inc: {num_likes: -1} }
        );
      } else {
        db.collection("tweets").findOneAndUpdate(
          { _id: ObjectID(tweetID) },
          { $inc: {num_likes: 1} }
        );
      }
    }
  }
};
