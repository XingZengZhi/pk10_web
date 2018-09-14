(function(){
    $("#score_detail").on("click", function(){
        $(".hang_detail").fadeIn(.3);
    });
    $(".close_detail").on("click", function(){
        $(".hang_detail").fadeOut(.3);
    });
})(window, document);