$(document).ready(function() {
  const maxCount = 140;
  let currentLength = maxCount;
  let output = $('.counter');
  $('textarea').on("input", function() {
    currentLength = maxCount - $(this).val().length;
    output.text(currentLength);
    if(currentLength < 0) {
      output.css('color', 'red');
    } else {
      output.css('color', 'black');
    }
  });
  output.text(currentLength);
});