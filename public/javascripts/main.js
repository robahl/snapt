$(document).ready(function() {

  $('#url-input').focus();
  $('#url-input').keypress(function(e) {
    if (e.keyCode === 13 && $('.overlay').is(':hidden')) {
      sendData($(this).blur().val());
    }
  });

  $('body').on('click', function() {
    $('.image-modal').fadeOut('fast');
  })

});

function sendData(urlString) {
  $('.overlay').fadeIn('fast');
  $.post({
    url: '/',
    data: {webURL: urlString},
    dataType: 'json',
    timeout: 20000,
    success: function(response) {
      if (response.success) {
        $('.image-modal img').prop('src', 'data:image/png;base64,' + response.image)
        $('.image-modal').fadeIn('slow');
      } else {
        $('.middle-pane h1').removeClass('dangle').outerWidth($('.middle-pane h1').outerWidth());
        $('.middle-pane h1').addClass('dangle');
      }
    },
    error: function(jqXHR, error) {
      console.error(error);
      $('#url-input').focus();
    },
    complete: function() {
      $('.overlay').fadeOut('fast');
    }
  })
}
