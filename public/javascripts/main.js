$(document).ready(function() {
  var $urlInput = $('#url-input');

  // Search by hash
  var hashString = window.location.hash.substring(1);


  if (hashString.length > 0) {
    $urlInput.val(hashString);
    sendData(hashString);
  } else {
    $urlInput.focus();
  }

  $urlInput.keypress(function(e) {
    if (e.keyCode === 13 && $('.overlay').is(':hidden')) {
      sendData($(this).blur().val());
      window.location.hash = $(this).val();
    }
  });

  $('body').on('click keydown', function(event) {
    if (event.keyCode && event.keyCode !== 27) return;

    if ($('.image-modal').is(':visible')) {
      $('.image-modal').fadeOut('fast');
      $urlInput.focus();
    }
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
          $('.image-modal').fadeIn('fast');
        } else {
          $urlInput.focus();
          $('.middle-pane h1').removeClass('dangle').outerWidth($('.middle-pane h1').outerWidth());
          $('.middle-pane h1').addClass('dangle');
        }
      },
      error: function(jqXHR, error) {
        console.error(error);
        $urlInput.val('Error: No connection');
      },
      complete: function() {
        $('.overlay').fadeOut('fast');
      }
    })
  }

});
