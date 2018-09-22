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
        changePage(id);
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
            topTitle.text('PK10');
            break;
            case 'recreation_platform': 
            topTitle.text('娱乐中心');
            break;
            case 'personal_data': 
            contentTop.style.transform = "translateY(45px)";
            content.style.transform = "translateY(40px)";
            topTitle.text('PK10');
            showOrHideEditButton($(this).prop('class'));
            break;
        }
    });

    // 顶部导航栏点击事件
    var isDown = true, downName = "";
    contentTop.onclick = function(e){
        var cName = "content_top_item";
        var tag = e.target, idv = tag.id;
        if(downName != idv) {
            isDown = true;
        }
        showHideTopBottom(isDown);
        isDown = !isDown;
        downName = idv;
        switch(idv) {
            case "personale_item":
            $("." + cName + "1").fadeIn().siblings("div").fadeOut(0);
            break;
            case "tradingHall":
            $("." + cName + "2").fadeIn().siblings("div").fadeOut(0);
            break;
            case "createAccount":
            $("." + cName + "3").fadeIn().siblings("div").fadeOut(0);
            break;
            case "conversion":
            $("." + cName + "4").fadeIn().siblings("div").fadeOut(0);
            break;
            case "feedBack":
            $("." + cName + "5").fadeIn().siblings("div").fadeOut(0);
            break;
            case "bulletin":
            $("." + cName + "6").fadeIn().siblings("div").fadeOut(0);
            break;
            case "missionCenter":
            $("." + cName + "7").fadeIn().siblings("div").fadeOut(0);
            break;
            default:break;
        }
    }

    // 蒙版点击事件
    mask.onclick = function(){
        hideMaskAndContentTopBottom();
    }

    $(".cancel,.select_score").on("click", function(){
        var cls = $(this).prop("class");
        if(cls === 'select_score'){
            $("#register_core input").val($(this).text());
        }else{
            $("#register_core input").val('');
        }
        hideMaskAndContentTopBottom();
    });

    // 子菜单点击事件
    contentTopBottom.onclick = function(e){
        var tag = e.target,
            tagName = tag.nodeName.toLowerCase();
        if(tagName === 'span') {
            var dataUrl = tag.dataset.url;
            switch(dataUrl){
                case 'editPass':
                topTitle.text('个人资料');
                break;
                case 'personal_data':
                topTitle.text('PK10');
                showOrHideEditButton(tag.className);
                break;
                case 'buy_integral':
                topTitle.text('购买积分');
                break;
                case 'hang_integral':
                topTitle.text('挂卖积分列表');
                break;
                case 'integral_conversion':
                topTitle.text('积分转换');
                break;
                case 'bulletin':
                topTitle.text('网站公告');
                break;
            }
            $(tag).siblings("span").addClass("yes");
            $(tag).parent().siblings().children().removeClass("yes");
            changePage(dataUrl);
            showHideTopBottom(isDown);
        }
    }

    $("#missed_details,#betting_record").on("click", function(){
        var idv = $(this).prop("id");
        changePage(idv);
    })

    // 修改小按钮点击
    $(".editText").on("click", function(){
        topTitle.text('个人资料');
        var className = $(this).prop("class");
        showOrHideEditButton(className);

    });

    // 显示或隐藏子菜单
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

    // 隐藏蒙版层
    function hideMaskAndContentTopBottom() {
        mask.style.display = "none";
        contentTop.style.zIndex = 0;
        contentTopBottom.style.display = "none";
        contentTopBottom.style.transform = "translateY(0)";
        $("#selectBox").hide(0);
    }

    // 选中当前显示的页面
    function changePage(pageId){
        $("." + pageId).fadeIn(0.3).siblings().fadeOut(0);
    }
    
    // 隐藏或显示编辑个人信息按钮
    function showOrHideEditButton(className){
        if(className.indexOf('editText') != -1) {
            $(".personal_data").find(".editUserInfo").css("display", "block");
            $(".editText").fadeOut(.3);
            $(".code_box").css("width", "65px").find("i").css("display", "block");
            $("#newUserName").fadeIn(0);
            $("#newTelphone").fadeIn(0);
            $("#newBanKName").fadeIn(0);
            $("#newBankNum").fadeIn(0);
            $("#editUsername").fadeOut(0);
            $("#editTelphone").fadeOut(0);
            $("#editBanknum").fadeOut(0);
        } else {
            $(".personal_data").find(".editUserInfo").css("display", "none");
            $(".editText").fadeIn(.3);
            $(".code_box").css("width", "45px").find("i").css("display", "none");
            $("#newUserName").fadeOut(0);
            $("#newTelphone").fadeOut(0);
            $("#newBanKName").fadeOut(0);
            $("#newBankNum").fadeOut(0);
            $("#editUsername").fadeIn(0);
            $("#editTelphone").fadeIn(0);
            $("#editBanknum").fadeIn(0);
        }
    }
}