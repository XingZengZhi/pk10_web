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
    var topTitle = $(".main_header_title"),
        contentTop = document.getElementById("data_content_top"),
        contentTopBottom = document.getElementById("data_content_top_bottom"),
        mask = document.getElementById("mask");
        content = document.getElementById("content");

    // 底部Tabar切换
    $("#index_data, #recreation_platform, #personal_data").on("click", function(){
        var id = $(this).prop("id");
        $("." + id).fadeIn(0.3).siblings().fadeOut(0.3);
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
            case 'index_data': 
            contentTop.style.transform = "translateY(0)";
            content.style.transform = "translateY(0)";
            topTitle.text('pk10');
            break;
            case 'recreation_platform': 
            topTitle.text('娱乐中心');
            break;
            case 'personal_data': 
            contentTop.style.transform = "translateY(45px)";
            content.style.transform = "translateY(40px)";
            topTitle.text('个人资料');
            break;
        }
        // 顶部导航栏点击事件
        var isDown = true, downName = "";
        contentTop.onclick = function(e){
            var tag = e.target, idv = tag.id;
            if(downName != idv) {
                isDown = true;
            }
            showHideTopBottom(isDown);
            isDown = !isDown;
            downName = idv;
            // console.log(e);
            switch(idv) {
                case "personale_item":
                
                break;
            }
        }

        // 蒙版点击事件
        mask.onclick = function(){
            hideMaskAndContentTopBottom();
        }

        function showHideTopBottom(isDown){
            if(isDown) {
                contentTopBottom.style.display = "block";
                contentTop.style.display = "block";
                contentTopBottom.style.zIndex = 999;
                contentTop.style.zIndex = 999;
                contentTopBottom.style.transform = "translateY(45px)";
                mask.style.display = "block";
            } else {
                contentTopBottom.style.display = "none";
                contentTop.style.zIndex = 0;
                contentTopBottom.style.transform = "translateY(0)";
                mask.style.display = "none";
            }
        }

        function hideMaskAndContentTopBottom() {
            mask.style.display = "none";
            contentTop.style.zIndex = 0;
            contentTopBottom.style.display = "none";
            contentTopBottom.style.transform = "translateY(0)";
        }
    });
    
}