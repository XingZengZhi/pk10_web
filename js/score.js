(function(){
    $("#score_detail").on("click", function(){
        $(".hang_detail").fadeIn(.3);
    });
    $(".close_detail").on("click", function(){
        $(".hang_detail").fadeOut(.3);
    });

    // $("#integral_list").on("click", ".data_base .data_base_list .confirm_hang", function(){
    //     $(".hang_detail2").fadeIn(.3);
    // });
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

    $(".close_detail7").on("click", function(){
        $(".hang_detail7").fadeOut(.3);
    });
    $(".close_detail8").on("click", function(){
        $(".hang_detail8").fadeOut(.3);
    });
    $(".close_detail10").on('click', function(){
        $(".hang_detail10").fadeOut(0);
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
    
    // 公告数据展示
    $("#bulletinList").on("click", ".div_detail", function(){
        var bulletinContent = $(this).find(".link_span").text();
        layui.use(['layer'], function(){
            var layer = layui.layer;
            layer.open({
                type:1,
                title:"公告内容",
                area:['350px', '300px'],
                shadeClose:true,
                content:bulletinContent
            });
        });
    });
})(window, document);