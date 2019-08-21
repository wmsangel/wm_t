$(document).ready(function(){

    $(".js-range-slider").ionRangeSlider({
        skin: "modern",
        grid_num: 4,
        min: 1,
        max: 5,
        grid: false,
        from: 1,
        onChange: function (data) {
            if (data.from_percent == 75) {
                //...
            }
        },
    });

    $('.mobile-menu').on('click', function () {
        $('header nav ul').toggle();
    });

    if ($(window).width() <= 768) {
        $('nav ul li a').on('click', function(){
            $('nav ul li a').removeClass('active');
            $(this).addClass('active');
        })
    }

});


$(window).scroll(function(){
    if ($(window).width() > 768) {
        if ($(window).scrollTop() >= 700) {
            $('nav ul li a').removeClass('active');
            $('.exp-menu__link').addClass('active');

            if ($(window).scrollTop() >= 950) {
                $('nav ul li a').removeClass('active');
                $('.js-menu__link').addClass('active');

                if ($(window).scrollTop() >= 1100) {
                    $('nav ul li a').removeClass('active');
                    $('.about-menu__link').addClass('active');
                }
            }
        } else {
            $('nav ul li a').removeClass('active');
            $('.personal-menu__link').addClass('active');
        }
    }
});
