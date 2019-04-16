$(document).ready(function() {
  const maxCount = 140;
  let currentLength = maxCount;
  $('textarea').on("input", function() {
    currentLength = maxCount - $(this).val().length;
    $('.counter').text(currentLength);
    if(currentLength < 0) {
      $('.counter').css('color', 'red');
    } else {
      $('.counter').css('color', 'black');
    }
  });
  $('.counter').text(currentLength);
});