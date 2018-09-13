(function(){
    $("#betSubmit").on('click', function(){
        $(".bet_box").fadeIn();
        $(this).text("确定");
    });
    $("#resetBet").on('click', function(){
        $(".bet_box").fadeOut(0);
        $("#betSubmit").text("下注");
    });
})(window, document);