(function( $ ){
    $.fn.paraScroll = function(xpos, ypos, inertia) {
        var $this = $(this);

        if (typeof xpos === 'undefined') {
            xpos = "50%";
        }
        if (typeof ypos === 'undefined') {
            ypos = 0;
        }
        if (typeof inertia === 'undefined') {
            inertia = 0.1;
        }

        function newPos(xpos, height, spos, ypos, inertia){
            return xpos + Math.round((-((height + spos) - ypos) * inertia)) + "px";
        }

        function move(xpos, height, spos, ypos, inertia){
            $this.css({'background-position': newPos(xpos, height, spos, ypos, inertia)});
        }

        $(window).on('scroll', function(){
            var spos = $(window).scrollTop();

            $this.each(function(){
                var height = $this.height();
                move(xpos, height, spos, ypos, inertia);
            });
        });
    };
})( jQuery );

$(document).ready(function(){
    var repositionNav = function (){
        var windowHeight = $(window).height();
        var navHeight = $('#nav').height() / 2;
        var windowCenter = (windowHeight / 2);
        var newtop = windowCenter - navHeight;
        $('#nav').css({"top": newtop});
    };

    repositionNav();

    $(window).resize(function(){
        repositionNav();
    });

    $('#no-script').remove();
    $('#intro').paraScroll("50%", 350);
    $('#second').paraScroll("50%", 2072);
    $('#third').paraScroll("50%", 2700);
    $('#show').paraScroll("50%", 4016);
    $('#fourth').paraScroll("50%", 5238);
    $('#fifth').paraScroll("50%", 6216);
});


//BackgroundCheck.init({
//    targets: '.target'
//});