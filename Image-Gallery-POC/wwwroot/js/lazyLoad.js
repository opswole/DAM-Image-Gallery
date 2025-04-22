document.addEventListener("DOMContentLoaded", function() {
    var lazyImages = document.querySelectorAll('.lazy');
    var selectedImages = [];

    var lazyLoad = function(entries) {
        console.log("Loading....")
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                var img = entry.target;
                if (img.getAttribute('data-src')) {
                    img.src = img.getAttribute('data-src');
                    img.removeAttribute('data-src');
                    img.classList.add('loaded');
                }
            }
        });
    };

    var observer = new IntersectionObserver(lazyLoad, {
        rootMargin: '0px',
        threshold: 0.1
    });

    lazyImages.forEach(function(img) {
        observer.observe(img);
    });
});
