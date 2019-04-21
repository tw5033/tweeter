/* global $ */
// hides the new tweet box on load, slides box down when composing new tweet and auto focuses on textarea
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