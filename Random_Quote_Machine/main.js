//freecodecamp/bbsoft0

var quoteURL = 'http://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1&_jsonp=?';
var tweetURL = 'https://twitter.com/intent/tweet?hashtags=freecodecam,quotes&related=freecodecamp&text=';

function displayQuote(quote) {
  $('#author').addClass('flipOutY');
  $('#b_tweet').attr('href', tweetURL + encodeURIComponent($('#quote').text()));

  setTimeout(function() {
    $('#quote').addClass('flipInX');
    $('#quote').html(quote[0].content);
    $('#author').html(quote[0].title);
  }, 300);
  setTimeout(function() {
    $('#quote').removeClass('flipInX');
    $('#author').removeClass('flipOutY');
  }, 500);
}

function apiQuote() {
  $.ajax({
    dataType: 'jsonp',
    url: quoteURL,
  }).then(displayQuote);
}

$(document).ready(function() {
  $('#b_tweet').attr('href', tweetURL + encodeURIComponent($('#quote').text()));
  $('#b_new_quote').on('click', apiQuote);
});