    $('a[href^="#"]').on("click", function (e) {
        const anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: $(anchor.attr('href')).offset().top - header.offsetHeight
        }, 800);
        e.preventDefault();
        return false;
    });

    $(window).scroll(function () {
        const height = $(window).scrollTop();
        if (height > 1) {
            $('header').addClass('header-fixed');
        } else {
            $('header').removeClass('header-fixed');
        }
    });