window.onload = function(){
    // 侧边动态
    // var leftBar = document.getElementById("leftBar"),
    //     mainContent = document.getElementById("main_content");
    //     navlist = document.getElementById("navlist");
    // leftBar.onclick = function() {
    //     var isShow = this.getAttribute("data-isshow");
    //     if(isShow === 'false') {
    //         navlist.style.transform = "translateX(250px)";
    //         mainContent.style.marginLeft = "250px";
    //         this.dataset.isshow = 'true';
    //     } else {
    //         navlist.style.transform = "translateX(-250px)";
    //         mainContent.style.marginLeft = "0px";
    //         this.dataset.isshow = 'false';
    //     }
    // }

    // 底部icon图标地址
    var tabarIcon = {
        "index_data":[
            "/imgs/index1.png",
            "/imgs/index2.png"
        ],
        "recreation_platform":[
            "/imgs/recreation1.png",
            "/imgs/recreation2.png",
        ],
        "personal_data":[
            "/imgs/user1.png",
            "/imgs/user2.png",
        ]
    }

    // 头部标题
    var topTitle = $(".main_header_title");

    // 底部Tabar切换
    $("#index_data, #recreation_platform, #personal_data").on("click", function(){
        var id = $(this).prop("id");
        $("." + id).fadeIn(0).siblings().fadeOut(0);
        // 改变选中字体颜色
        $(this).css('color', '#EA4758').siblings().css('color', '#535353');
        // 改变icon图标
        $.each($(".footer a"), function(i, n){
            var id_item_v = $(n).prop('id');
            if(id === id_item_v) {
                $(n).children("i").css("backgroundImage", "url(" + tabarIcon[id_item_v][1] + ")");
            } else {
                $(n).children("i").css("backgroundImage", "url(" + tabarIcon[id_item_v][0] + ")");
            }
        });
        // 切换顶部标题
        switch(id) {
            case 'index_data': topTitle.text('pk10');break;
            case 'recreation_platform': topTitle.text('娱乐中心');break;
            case 'personal_data': topTitle.text('个人资料');break;
        }
    });
    
}