$(document).ready(function () {
  var picks = [];
  var matched = [];

  var checkCards = function() {
    if (picks.length >= 2) {
      if (picks[0] === picks[1]) {
        matched.push(picks[0]);
      }

      $('.card').each(function () {
        var thisPick = $(this).data('pick');
        if ($.inArray(thisPick, matched) < 0) {
          $(this).removeClass('revealed');
        }
      });
      picks = [];
    }
  }

  $('.card').click(function () {
    if (picks.length < 2) {
      var cardName = $(this).data('pick');
      picks.push(cardName);
      $(this).addClass('revealed');
    }

    setTimeout(checkCards, 500);
  });

  checkCards();
});
