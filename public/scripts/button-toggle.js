/* global $ */

$(() => {
  const button = $('.compose');
  const newTweet = $(".new-tweet");
  newTweet.hide();
  button.on("click", () => {
    let input = $("[name=text]");
    newTweet.slideToggle(() => {
      input.focus();
    });
  });
});