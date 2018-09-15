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
        $(".code_tip").hide(0);
        $("#input_code").show(0);
    });
    $("#secrity_code").on("click", function(){
        $(".code_tip").show(0);
        $("#input_code").hide(0);
    });

    $("#confirm_hang2").on("click", function(){
        $(".hang_detail3").fadeIn(.3);
    });
    $(".close_detail3").on("click", function(){
        $(".hang_detail3").fadeOut(.3);
        $(".code_tip2").hide(0);
        $("#input_code2").show(0);
    });
    $("#secrity_code2").on("click", function(){
        $(".code_tip2").show(0);
        $("#input_code2").hide(0);
    });
})(window, document);