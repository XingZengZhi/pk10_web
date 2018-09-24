(function(){
    $("#score_detail").on("click", function(){
        $(".hang_detail").fadeIn(.3);
    });
    $(".close_detail").on("click", function(){
        $(".hang_detail").fadeOut(.3);
    });

    $("#integral_list").on("click", ".data_base .data_base_list .confirm_hang", function(){
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

    $("#feedBackButton").on("click", function(){
        $(".hang_detail4").fadeIn(.3);
        $(".code_tip3").show(0);
    });
    $(".close_detail4").on("click", function(){
        $(".hang_detail4").fadeOut(.3);
    });

    $("#apply_button").on("click", function(){
        $(".hang_detail5").fadeIn(.3);
        $(".code_tip4").show(0);
    });
    $(".close_detail5").on("click", function(){
        $(".hang_detail5").fadeOut(.3);
    });

    $("#gift_button").on("click", function(){
        $(".hang_detail6").fadeIn(.3);
        $(".code_tip5").show(0);
    });
    $(".close_detail6").on("click", function(){
        $(".hang_detail6").fadeOut(.3);
    });

    $(".integral_conversion_box div").on('click', function(){
        $(this).addClass("conversion_active").siblings('div').removeClass('conversion_active');
    });

    $(".conversion_button").on("click", function(){
        var idv = $(this).prop("id");
        $("." + idv).show().siblings("div:not(.conversion_button)").hide();
    });

    $("#register_core").on("click", function(){
        $("#mask").show();
        $("#selectBox").show();
    });
    
})(window, document);