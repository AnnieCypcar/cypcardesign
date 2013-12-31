/*  paraScroll  version 0.2.0
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
        
        scroll_to(window, navButtonYValue[selected_button_index], 1250);

        return false;
    };

    for (var i = 0; i < buttons.length; i++) {
        buttons[i].onclick = scroll_on_click;
    }
};

function toggle_logo(scroll_position) {
    if (scroll_position > 1312 && scroll_position < 4885) {
        switch_to_dark_logo();
        return false;
    }
    switch_to_light_logo();
}

function switch_to_light_logo() {
    if ($('.light_logo').hasClass('off') && $('.dark_logo').hasClass('on')) {
        $('.light_logo, .dark_logo').toggleClass('on').toggleClass('off');
    }
}

function switch_to_dark_logo() {
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

        if (t < 1) {
            return c/2 * t * t + b;
        }

        t --;

        return -c/2 * (t * (t - 2) - 1) + b;
    };

    var start = element.pageYOffset,
        change = to - start,
        current_time = 0,
        increment = 20;

    var animate_scroll = function () {
        current_time += increment;
        var val = math_easing(current_time, start, change, duration);
        window.scrollTo(0,val);
        // console.log(current_time + ' ' + start + ' ' + change + ' ' + duration);
        if (current_time < duration) {
            setTimeout(animate_scroll, increment);
        }
    };

    animate_scroll();
}


var set_new_background_y_position = function () {
    var scroll_position = window.scrollY,
        frame_array = $('.frame');

    var calculate_new_background_y_value = function () {
        var inertia = 0.5,
            new_background_y_value = Math.round(-scroll_position * inertia);

        return new_background_y_value;
    };

    //fine tune background image placement
    for (var i = 0; i < frame_array.length; i++) {
        var adjustment = [
            0,
            560,
            1100,
            1500,
            2100,
            2600
        ];
        var adjusted_y_value = adjustment[i] + calculate_new_background_y_value();
        
        $(frame_array[i]).css({"backgroundPosition": '50% ' + adjusted_y_value + 'px'});
    
    }
    toggle_logo(scroll_position);
};

$(window).resize(function(){
    reposition_nav();
});

$(window).on('scroll', function () {
    set_new_background_y_position();
});

$('#no-script').remove();

assign_button_click_events();

reposition_nav();