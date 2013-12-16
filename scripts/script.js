/*  paraScroll  version 0.1.0
    Parallax Scrolling for Cypcar Design
    © Annie Cypcar
    "http://cypcardesign.com
*/

$(document).ready(function(){
    var assign_button_click_events = function () {

        var buttons = $('nav li');

        var navButtonYValue = [
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
    assign_button_click_events();

    var frameArray = $('.frame');

    var paraScroll = function (ypos, inertia) {
        function newPos(ypos, inertia, height, spos, i){
            if (i === 0 || i === 1) {
                return Math.round((-((height + spos) - ypos) * inertia)) - 116 + "px";
            } else if (i === ($(frameArray).length - 2)) {
                return Math.round((-((height + spos) - ypos) * inertia)) + 120  + "px";
            } else if (i === ($(frameArray).length - 1)) {
                return Math.round((-((height + spos) - ypos) * inertia)) + 230  + "px";
            } else {
                return Math.round((-((height/2 + spos) - ypos) * inertia)) + "px";
            }
        }

        function toggleLogo(spos) {
            if (spos > 1312 && spos < 4885) {
                switchToDarkLogo();
            } else {
                switchToLightLogo();
            }
        }

        $(window).on('scroll', function(){
            $.each(frameArray, function(i){
                var spos = $(window).scrollTop();
                var height = $(frameArray[i]).height();

                $(frameArray[i]).css({'background-position-y': newPos(ypos, inertia, height, spos, i)});
                toggleLogo(spos);
            });
        });
    };

    function switchToLightLogo() {
        if ($('.light_logo').hasClass('off')) {
            $('.light_logo').toggleClass('on').toggleClass('off');
        }
        if ($('.dark_logo').hasClass('on')) {
            $('.dark_logo').toggleClass('off').toggleClass('on');
        }
    }

    function switchToDarkLogo() {
        if ($('.light_logo').hasClass('on')) {
            $('.light_logo').toggleClass('on').toggleClass('off');
        }
        if ($('.dark_logo').hasClass('off')) {
            $('.dark_logo').toggleClass('off').toggleClass('on');
        }
    }

    function repositionNav () {
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
            currentTime = 0,
            increment = 20;

        var animateScroll = function () {
            currentTime += increment;
            var val = math_easing(currentTime, start, change, duration);
            element.scrollTop = val;

            if(currentTime < duration) {
                setTimeout(animateScroll, increment);
            }
        };
        animateScroll();
    }

    $.each(frameArray, function (y) {
        paraScroll(y * 500, 0.1);
    });

    repositionNav();

    $(window).resize(function(){
        repositionNav();
    });

    $('#no-script').remove();
});