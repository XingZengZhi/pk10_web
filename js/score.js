(function(){
    $("#score_detail").on("click", function(){
        $(".hang_detail").fadeIn(.3);
    });
    $(".close_detail").on("click", function(){
        $(".hang_detail").fadeOut(.3);
    });
    $("#confirm_hang").on("click", function(){
        $(".hang_detail2").fadeIn(.3);
    });
    $(".close_detail2").on("click", function(){
        $(".hang_detail2").fadeOut(.3);
    });
})(window, document);