//  paraScroll  version 0.1.0
//  Parallax Scrolling for Cypcar Design
//  © Annie Cypcar
//  "http://cypcardesign.com/

$(document).ready(function(){
    var frameArray = $('.frame');

    var paraScroll = function (ypos, inertia) {
        function newPos(ypos, inertia, height, spos, i){
            if (i === 0 || i === 1) {
                return Math.round((-((height + spos) - ypos) * inertia)) - 116 + "px";
            } else if (i === ($(frameArray).length - 1)) {
                return Math.round((-((height + spos) - ypos) * inertia)) + 170  + "px";
            } else {
                return Math.round((-((height/2 + spos) - ypos) * inertia)) + "px";
            }
        }

        $(window).on('scroll', function(){
            $.each(frameArray, function(i){
                var spos = $(window).scrollTop();
                var height = $(frameArray[i]).height();

                $(frameArray[i]).css({'background-position-y': newPos(ypos, inertia, height, spos, i)});
            });
        });
    };

    document.getElementsByClassName('navbtns')[0].onclick = function (e) {
        e.preventDefault();
        scrollTo(document.body, 0, 1250);
    };

    document.getElementsByClassName('navbtns')[1].onclick = function (e) {
        e.preventDefault();
        scrollTo(document.body, 1500, 1250);
    };

    document.getElementsByClassName('navbtns')[2].onclick = function (e) {
        e.preventDefault();
        scrollTo(document.body, 2500, 1250);
    };

    document.getElementsByClassName('navbtns')[3].onclick = function (e) {
        e.preventDefault();
        scrollTo(document.body, 3630, 1250);
    };

    document.getElementsByClassName('navbtns')[4].onclick = function (e) {
        e.preventDefault();
        scrollTo(document.body, 4600, 1250);
    };

    document.getElementsByClassName('navbtns')[5].onclick = function (e) {
        e.preventDefault();
        scrollTo(document.body, 5700, 1250);
    };

    function repositionNav () {
        var windowHeight = $(window).height(),
        navHeight = $('#nav').height() / 2,
        windowCenter = (windowHeight / 2),
        newtop = windowCenter - navHeight;

        $('#nav').css({"top": newtop});
    }

    function scrollTo (element, to, duration) {
        var start = element.scrollTop,
            change = to - start,
            currentTime = 0,
            increment = 20;

        var animateScroll = function () {
            currentTime += increment;
            var val = Math.easeInOutQuad(currentTime, start, change, duration);
            element.scrollTop = val;

            if(currentTime < duration) {
                setTimeout(animateScroll, increment);
            }
        };
        animateScroll();
    }

//  t = current time, b = start value, c = change in value, d = duration
    Math.easeInOutQuad = function (t, b, c, d) {
        t /= d/2;
        if (t < 1) return c/2 * t * t + b;
        t --;
        return -c/2 * (t * (t - 2) - 1) + b;
    };

    $.each(frameArray, function (y) {
        paraScroll(y * 500, 0.1);
    });

    repositionNav();

    $(window).resize(function(){
        repositionNav();
    });

    $('#no-script').remove();
});