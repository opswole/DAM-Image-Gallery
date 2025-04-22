$(document).ready(function ($) {
    // delegate calls to data-toggle="lightbox"
    $(document).on('click', '[data-toggle="lightbox"]', function(event) {
        event.preventDefault();
        return $(this).ekkoLightbox({
            onShown: function() {
                if (window.console) {
                    return console.log('Checking our the events huh?');
                }
            },
        });
    });

});