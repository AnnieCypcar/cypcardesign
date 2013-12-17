/*  paraScroll  version 0.1.0
Parallax Scrolling for Cypcar Design
© Annie Cypcar
"http://cypcardesign.com
*/

var assign_button_click_events = function () {
    var buttons = $('nav li'),
        navButtonYValue = [
        0,
        1400,
        2400,
        3500,
        4500,
        5500
        ];

    var scroll_on_click = function () {
        var selected_button_index = $('nav li').index(this);
        
        scroll_to(document.body, navButtonYValue[selected_button_index], 1250);

        return false;
    };

    for (var i = 0; i < buttons.length; i++) {
        buttons[i].onclick = scroll_on_click;
    }
};

function toggle_logo(scroll_position) {
    if (scroll_position > 1312 && scroll_position < 4885) {
        switchToDarkLogo();
        return false;
    }
    switchToLightLogo();
}

function switchToLightLogo() {
    if ($('.light_logo').hasClass('off') && $('.dark_logo').hasClass('on')) {
        $('.light_logo, .dark_logo').toggleClass('on').toggleClass('off');
    }
}

function switchToDarkLogo() {
    if ($('.light_logo').hasClass('on') && $('.dark_logo').hasClass('off')) {
        $('.light_logo, .dark_logo').toggleClass('on').toggleClass('off');
    }
}

function reposition_nav () {
    var windowHeight = $(window).height(),
    navHeight = $('nav').height() / 2,
    windowCenter = (windowHeight / 2),
    newtop = windowCenter - navHeight;

    $('nav').css({"top": newtop});
}

function scroll_to (element, to, duration) {
    //  t = current time, b = start value, c = change in value, d = duration
    var math_easing = function (t, b, c, d) {
        t /= d/2;
        if (t < 1) return c/2 * t * t + b;
        t --;
        return -c/2 * (t * (t - 2) - 1) + b;
    };
    var start = element.scrollTop,
        change = to - start,
        current_time = 0,
        increment = 20;

    var animate_scroll = function () {
        current_time += increment;
        var val = math_easing(current_time, start, change, duration);
        element.scrollTop = val;

        if (current_time < duration) {
            setTimeout(animate_scroll, increment);
        }
    };

    animate_scroll();
}

$(window).resize(function(){
    reposition_nav();
});

$(window).on('scroll', function(){
    var scroll_position = $(window).scrollTop();
    var inertia = 0.5;
    var frame_array = $('.frame');

    //fine tune background image placement
    for (var i = 0; i < frame_array.length; i++) {
        var adjustment = [
            334,
            800,
            1400,
            1800,
            2400,
            2800
        ];
        var height = $(frame_array[i]).height();
        var calculate_new_background_y_value = Math.round(-(height/2 + scroll_position) * inertia);

        $(frame_array[i]).css({"background-position-y": adjustment[i] + calculate_new_background_y_value + 'px'});
    }

    toggle_logo(scroll_position);
});

$('#no-script').remove();

assign_button_click_events();

reposition_nav();