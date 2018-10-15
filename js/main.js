window.onload = function(){
    // 头部标题
    var topTitle = $(".main_header_title"),
        contentTop = document.getElementById("data_content_top"),
        contentTopBottom = document.getElementById("data_content_top_bottom"),
        mask = document.getElementById("mask");
        content = document.getElementById("content");
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
    // 选中当前显示的页面
    function changePage(pageId){
        sessionStorage.pageName = pageId;
        $(".prepage").fadeOut(0);
        $(".prepage")[0].setAttribute("id", "");
        $("." + pageId).fadeIn(0.3).siblings().fadeOut(0);
        if(pageId === 'missed_details'){
            var loadIndex = layer.load(2);
            $(".prepage").fadeIn(0);
            $(".prepage")[0].setAttribute("id", "recreation_platform");
            // 未结明细
            $.post("http://39.108.55.80:8081" + "/home/getPools",{
                "userId":1,
                "status":0
            },function(data){
                layer.close(loadIndex);
                var dt = data.result;
                missed_list.items = dt;
                if(data.code != '000000') {
                    layer.msg('加载失败，请重试');
                }
            });
        }else if(pageId === 'betting_record') {
            var loadIndex = layer.load(2);
            $(".prepage").fadeIn(0);
            $(".prepage")[0].setAttribute("id", "recreation_platform");
             // 投注记录
            $.post("http://39.108.55.80:8081" + "/home/getPools",{
                "userId":1
                // "status":1
            },function(data){
                layer.close(loadIndex);
                var dt = data.result;
                integral_list.items = dt;
                if(data.code != '000000') {
                    layer.msg('加载失败，请重试');
                }
            });
        } else {
            // 改变选中字体颜色
            $("#" + pageId).css('color', '#EA4758').siblings().css('color', '#535353');
            // 改变icon图标
            $.each($(".footer a"), function(i, n){
                var id_item_v = $(n).prop('id');
                if(pageId === id_item_v) {
                    $(n).children("i").css("backgroundImage", "url(" + tabarIcon[id_item_v][1] + ")");
                } else {
                    $(n).children("i").css("backgroundImage", "url(" + tabarIcon[id_item_v][0] + ")");
                }
            });
            // 切换顶部标题
            switch(pageId) {
                case 'index_data': 
                contentTop.style.transform = "translateY(0)";
                content.style.transform = "translateY(0)";
                topTitle.text('PK10');
                break;
                case 'recreation_platform': 
                var lottery_box = new Vue({
                    el:"#lottery_box",
                    data:{
                        gnumber:"",
                        pl:"",
                        bgm1:"",
                        bgm2:"",
                        bgm3:"",
                        bgm4:"",
                        bgm5:"",
                        sgm1:"",
                        sgm2:"",
                        sgm3:"",
                        sgm4:"",
                        sgm5:"",
                        single1:"",
                        single2:"",
                        single3:"",
                        single4:"",
                        single5:"",
                        double1:"",
                        double2:"",
                        double3:"",
                        double4:"",
                        double5:"",
                        sumbig:"",
                        sumsmall:"",
                        sumsingle:"",
                        sumdoub:"",
                        long:"",
                        hu:"",
                        allscore:0,
                        winscore:0,
                        showbet:false,
                        jf:"",
                        type:""
                    },
                    methods:{
                        betSubmit:function(event){
                            this.showbet = true;
                            var setV = event.target.getAttribute("data-set");
                            var jf = [], type = [];
                            
                            if(setV === '1') {
                                event.target.setAttribute("data-set", 2);
                                event.target.innerText = '下注';
                                this.gnumber = $("#newgnumber").text()
                                $("#newnumber").text($("#newgnumber").text());
                                // 确认下注
                                if(this.bgm1 != '') {
                                    this.allscore += parseInt(this.bgm1);
                                    jf.push(this.bgm1);
                                    type.push('big1');
                                }
                                if(this.bgm2 != '') {
                                    this.allscore += parseInt(this.bgm2);
                                    jf.push(this.bgm2);
                                    type.push('big2');
                                }
                                if(this.bgm3 != '') {
                                    this.allscore += parseInt(this.bgm3);
                                    jf.push(this.bgm3);
                                    type.push('big3');
                                }
                                if(this.bgm4 != '') {
                                    this.allscore += parseInt(this.bgm4);
                                    jf.push(this.bgm4);
                                    type.push('big4');
                                }
                                if(this.bgm5 != '') {
                                    this.allscore += parseInt(this.bgm5);
                                    jf.push(this.bgm5);
                                    type.push('big5');
                                }

                                if(this.sgm1 != '') {
                                    this.allscore += parseInt(this.sgm1);
                                    jf.push(this.sgm1);
                                    type.push('small1');
                                }
                                if(this.sgm2 != '') {
                                    this.allscore += parseInt(this.sgm2);
                                    jf.push(this.sgm2);
                                    type.push('small2');
                                }
                                if(this.sgm3 != '') {
                                    this.allscore += parseInt(this.sgm3);
                                    jf.push(this.sgm3);
                                    type.push('small3');
                                }
                                if(this.sgm4 != '') {
                                    this.allscore += parseInt(this.sgm4);
                                    jf.push(this.sgm4);
                                    type.push('small4');
                                }
                                if(this.sgm5 != '') {
                                    this.allscore += parseInt(this.sgm5);
                                    jf.push(this.sgm5);
                                    type.push('small5');
                                }

                                if(this.single1 != '') {
                                    this.allscore += parseInt(this.single1);
                                    jf.push(this.single1);
                                    type.push('single1');
                                }
                                if(this.single2 != '') {
                                    this.allscore += parseInt(this.single2);
                                    jf.push(this.single2);
                                    type.push('single2');
                                }
                                if(this.single3 != '') {
                                    this.allscore += parseInt(this.single3);
                                    jf.push(this.single3);
                                    type.push('single3');
                                }
                                if(this.single4 != '') {
                                    this.allscore += parseInt(this.single4);
                                    jf.push(this.single4);
                                    type.push('single4');
                                }
                                if(this.single5 != '') {
                                    this.allscore += parseInt(this.single5);
                                    jf.push(this.single5);
                                    type.push('single5');
                                }

                                if(this.double1 != '') {
                                    this.allscore += parseInt(this.double1);
                                    jf.push(this.double1);
                                    type.push('doub1');
                                }
                                if(this.double2 != '') {
                                    this.allscore += parseInt(this.double2);
                                    jf.push(this.double2);
                                    type.push('doub2');
                                }
                                if(this.double3 != '') {
                                    this.allscore += parseInt(this.double3);
                                    jf.push(this.double3);
                                    type.push('doub3');
                                }
                                if(this.double4 != '') {
                                    this.allscore += parseInt(this.double4);
                                    jf.push(this.double4);
                                    type.push('doub4');
                                }
                                if(this.double5 != '') {
                                    this.allscore += parseInt(this.double5);
                                    jf.push(this.double5);
                                    type.push('doub5');
                                }

                                if(this.sumbig != '') {
                                    this.allscore += parseInt(this.sumbig);
                                    jf.push(this.sumbig);
                                    type.push('sumbig');
                                }
                                if(this.sumsmall != '') {
                                    this.allscore += parseInt(this.sumsmall);
                                    jf.push(this.sumsmall);
                                    type.push('sumsmall');
                                }
                                if(this.sumsingle != '') {
                                    this.allscore += parseInt(this.sumsingle);
                                    jf.push(this.sumsingle);
                                    type.push('sumsingle');
                                }
                                if(this.sumdoub != '') {
                                    this.allscore += parseInt(this.sumdoub);
                                    jf.push(this.sumdoub);
                                    type.push('sumdoub');
                                }
                                if(this.long != '') {
                                    this.allscore += parseInt(this.long);
                                    jf.push(this.long);
                                    type.push('long');
                                }
                                if(this.hu != '') {
                                    this.allscore += parseInt(this.hu);
                                    jf.push(this.hu);
                                    type.push('hu');
                                }
                                this.winscore = (this.allscore * parseFloat(this.pl)).toFixed(1);
                                // console.log(jf.join(','));
                                // console.log(type.join(','));
                                this.jf = jf.join(',');
                                this.type = type.join(',');
                                console.log(this.jf);
                            } else {
                                // console.log(lottery_box.jf);
                                var indexLoad = layer.load(2);
                                $.post("http://39.108.55.80:8081/home/addPool",{
                                    userId:sessionStorage.id,
                                    gmnum:lottery_box.gnumber,
                                    jf:lottery_box.jf,
                                    type:lottery_box.type,
                                    count:1
                                }, function(data){
                                    // console.log(data);
                                    layer.close(indexLoad);
                                    if(data.code === '000000') {
                                        layer.msg('下注成功');
                                        sessionStorage.jftask = parseInt(sessionStorage.jftask) - parseInt(lottery_box.allscore);
                                        globalInfo.updateSession();
                                        $("#user_core").val(sessionStorage.jftask);
                                    } else {
                                        layer.msg('下注失败'); 
                                    }
                                    lottery_box.allscore = 0;
                                    lottery_box.winscore = 0;
                                    this.showbet = false;
                                })
                            }
                        },
                        resetBet:function(event){
                            $("#betSubmit")[0].setAttribute("data-set", 1);
                            $("#betSubmit").text("确认");
                            this.showbet = false;
                            this.bgm1 = "";
                            this.bgm2 = "";
                            this.bgm3 = "";
                            this.bgm4 = "";
                            this.bgm5 = "";

                            this.sgm1 = "";
                            this.sgm2 = "";
                            this.sgm3 = "";
                            this.sgm4 = "";
                            this.sgm5 = "";

                            this.single1 = "";
                            this.single2 = "";
                            this.single3 = "";
                            this.single4 = "";
                            this.single5 = "";

                            this.double1 = "";
                            this.double2 = "";
                            this.double3 = "";
                            this.double4 = "";
                            this.double5 = "";

                            this.sumbig = "";
                            this.sumsmall = "";
                            this.sumsingle = "";
                            this.sumdoub = "";
                            this.long = "";
                            this.hu = "";
                            this.jf = "";
                            this.type = "";
                        }
                    }
                });
                $.post("http://39.108.55.80:8081/jf/getJf?number=003", function(data){
                    var d = data.result.data;
                    // console.log(data);
                    lottery_box.pl = d;
                });
                topTitle.text('娱乐中心');
                break;
                case 'personal_data': 
                contentTop.style.transform = "translateY(45px)";
                content.style.transform = "translateY(40px)";
                topTitle.text('PK10');
                showOrHideEditButton($("#" + pageId).prop('class'));
                break;
            }
        }
    }
    if(sessionStorage.pageName != '') {
        changePage(sessionStorage.pageName);
    }

    // 底部Tabar切换
    $("#index_data, #recreation_platform, #personal_data").on("click", function(){
        var id = $(this).prop("id");
        changePage(id);
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

    function formateTimeStamp(timestamp){
        var time = new Date(timestamp);
        var y = time.getFullYear();//年
        var m = time.getMonth() + 1 < 10 ? "0" + (time.getMonth() + 1) : time.getMonth() + 1;//月
        var d = time.getDate() < 10 ? "0" + time.getDate() : time.getDate();//日
        var h = time.getHours() < 10 ? "0" + time.getHours() : time.getHours();//时
        var mm = time.getMinutes() < 10 ? "0" + time.getMinutes() : time.getMinutes();//分
        var s = time.getSeconds();//秒
        return y+"."+m+"."+d+" "+h+":"+mm;
    }

    Vue.filter('formateDate', function (value) {
        return formateTimeStamp(value);
    })


    // 子菜单点击事件
    contentTopBottom.onclick = function(e){
        var tag = e.target,
            tagName = tag.nodeName.toLowerCase();
        if(tagName === 'span') {
            var dataUrl = tag.dataset.url;
            switch(dataUrl){
                case 'personal_data':
                topTitle.text('个人信息');
                break;
                case 'editPass':
                topTitle.text('密码修改');
                break;
                case 'hang_integral2':
                topTitle.text('挂卖交易积分');
                break;
                case 'buy_integral':
                // 购买积分列表
                var loadIndex = layer.load(2);
                var goumailist = new Vue({
                    el:"#goumailist",
                    data:{
                        items:""
                    }
                });
                $.post("http://39.108.55.80:8081/home/getBusiness?userid=" + sessionStorage.id + "&type=" + 2, function(data){
                    // console.log(data.result);
                    layer.close(loadIndex);
                    goumailist.items = data.result;
                    if(data.code != '000000') {
                        layer.msg('加载失败，请重试');
                    }
                });
                topTitle.text('购买积分列表');
                break;
                case 'hang_integral':
                topTitle.text('挂卖积分列表');
                break;
                case 'hang_integral':
                topTitle.text('挂卖积分列表');
                break;
                case 'createAccount':
                // 查询开通账号积分
                $.post("http://39.108.55.80:8081/jf/getJf?number=001", function(data){
                    console.log(data)
                    var jf = data.result.data;
                    var selectBox = new Vue({
                        el:"#selectBox",
                        data:{
                            items:jf.split(',')
                        }
                    });
                    $("#selectBox").on("click", "div", function(){
                        var cls = $(this).prop("class");
                        if(cls === 'select_score'){
                            $("#register_core input").val($(this).text());
                        }else{
                            $("#register_core input").val('');
                        }
                        hideMaskAndContentTopBottom();
                    });
                });
                topTitle.text('开通账号');
                break;
                case 'push_list':
                topTitle.text('直推列表');
                break;
                case 'task_gift':
                topTitle.text('转赠任务密钥');
                break;
                case 'integral_conversion':
                topTitle.text('积分转换');
                break;
                case 'task_application':
                topTitle.text('任务申请');
                break;
                case 'bulletin':
                topTitle.text('网站公告');
                break;
                case 'feedBack':
                topTitle.text('留言反馈');
                break;
                case 'feedBackList':
                topTitle.text('留言列表');
                break;
                case 'system_update':
                topTitle.text('系统更新');
                break;
                case 'integral_center':
                var loadIndex = layer.load(2);
                // 中心积分报表
                var inputJfList = new Vue({
                    el:"#inputJfList",
                    data:{
                        items:""
                    }
                });
                var outJfputList = new Vue({
                    el:"#outJfputList",
                    data:{
                        items:""
                    }
                });
                $.post("http://39.108.55.80:8081/jf/getCenterJf",{
                        userId:sessionStorage.id,
                        type:1
                    }, function(data){
                        layer.close(loadIndex);
                        if(data.code != '000000') {
                            layer.msg('转入积分数据加载失败，请重试');
                            console.error('转入积分数据加载失败');
                            return;
                        }
                        // console.log(data.result);
                        var dt = data.result;
                        for(var i = 0;i < dt.length;i++) {
                            dt[i].createdate = formateTimeStamp(dt[i].createdate);
                        }
                        outJfputList.items = dt;
                    });
                $.post("http://39.108.55.80:8081/jf/getCenterJf",{
                    userId:sessionStorage.id,
                    type:0
                },function(data){
                    // console.log(data.result);
                    layer.close(loadIndex);
                    if(data.code != '000000') {
                        layer.msg('转出积分数据加载失败，请重试');
                        console.error('转出积分数据加载失败');
                        return;
                    }
                    var dt = data.result;
                    inputJfList.items = dt;
                });
                topTitle.text('中心积分报表');
                break;
                case 'Task_key':
                topTitle.text('任务密钥报表');
                var loadIndex = layer.load(2);
                var renwuinputList = new Vue({
                    el:"#renwuinputList",
                    data:{
                        items:[]
                    }
                });
                $.post("http://39.108.55.80:8081/home/getTokens",{
                    account:sessionStorage.account
                }, function(data){
                    layer.close(loadIndex);
                    if(data.code != '000000') {
                        layer.msg('任务密钥转入数据加载失败，请重试');
                        console.error('挂卖数据加载失败');
                        return;
                    }
                    renwuinputList.items = data.result;
                });
                var renwuoutputList = new Vue({
                    el:"#renwuoutputList",
                    data:{
                        items:[]
                    }
                });
                $.post("http://39.108.55.80:8081/home/getTokens",{
                    userId:sessionStorage.id
                }, function(data){
                    layer.close(loadIndex);
                    if(data.code != '000000') {
                        layer.msg('任务密钥转出数据加载失败，请重试');
                        console.error('挂卖数据加载失败');
                        return;
                    }
                    renwuoutputList.items = data.result;
                });
                break;
                case 'Task_score':
                topTitle.text('任务积分报表');
                var loadIndex = layer.load(2);
                layer.close(loadIndex);
                layer.msg('该功能暂未开放');
                break;
                case 'Trading_points':
                var loadIndex = layer.load(2);
                var inputguamaiList = new Vue({
                    el:"#inputguamaiList",
                    data:{
                        items:[]
                    }
                });
                var outputguamaiList = new Vue({
                    el:"#outputguamaiList",
                    data:{
                        items:[]
                    }
                });
                $.post("http://39.108.55.80:8081/home/getBusiness",{
                    userid:sessionStorage.id,
                    type:1
                }, function(data){
                    // console.log(data.result);
                    layer.close(loadIndex);
                    if(data.code != '000000') {
                        layer.msg('挂卖数据加载失败，请重试');
                        console.error('挂卖数据加载失败');
                        return;
                    }
                    inputguamaiList.items = data.result;
                });
                $.post("http://39.108.55.80:8081/home/getBusiness",{
                    userid:sessionStorage.id,
                    type:0
                }, function(data){
                    // console.log(data.result);
                    layer.close(loadIndex);
                    if(data.code != '000000') {
                        layer.msg('购买数据加载失败，请重试');
                        console.error('购买数据加载失败');
                        return;
                    }
                    outputguamaiList.items = data.result;
                });
                topTitle.text('交易积分报表');
                break;
            }
            $(tag).siblings("span").addClass("yes");
            $(tag).parent().siblings().children().removeClass("yes");
            changePage(dataUrl);
            showHideTopBottom(isDown);
        }
    }

    $("#missed_details,#betting_record,.prepage").on("click", function(){
        var idv = $(this).prop("id");
        changePage(idv);
    })

    // 修改小按钮点击
    $(".editText,.cancelEdit").on("click", function(){
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

    var integral_list = new Vue({
        el:'#record_list',
        data:{
            items:""
        }
    });
    var missed_list = new Vue({
        el:'#missed_list',
        data:{
            items:""
        }
    });
    
    // 隐藏或显示编辑个人信息按钮
    function showOrHideEditButton(className){
        if(className.indexOf('editText') != -1) {
            $("#newUserName").val($("#editUsername").text());
            $("#newTelphone").val($("#editTelphone").text());
            $("#newBankName").val($("#editBankname").text());
            $("#newBankNum").val($("#editBanknum").text());
            $(".personal_data").find(".editUserInfo").css("display", "block");
            $(".editText").fadeOut(.3);
            $(".code_box").css("width", "65px").find("i").css("display", "block");
            $("#newUserName").fadeIn(0);
            $("#newTelphone").fadeIn(0);
            $("#newBankName").fadeIn(0);
            $("#newBankNum").fadeIn(0);
            $("#test1").fadeIn(0);
            $("#test2").fadeIn(0);

            $("#editUsername").fadeOut(0);
            $("#editTelphone").fadeOut(0);
            $("#editBanknum").fadeOut(0);
            $("#editBankname").fadeOut(0);
            $("#editAliPay").fadeOut(0);
            $("#editWxPay").fadeOut(0);
        } else {
            $(".personal_data").find(".editUserInfo").css("display", "none");
            $(".editText").fadeIn(.3);
            $(".code_box").css("width", "45px").find("i").css("display", "none");
            $("#newUserName").fadeOut(0);
            $("#newTelphone").fadeOut(0);
            $("#newBankName").fadeOut(0);
            $("#newBankNum").fadeOut(0);
            $("#test1").fadeOut(0);
            $("#test2").fadeOut(0);

            $("#editUsername").fadeIn(0);
            $("#editTelphone").fadeIn(0);
            $("#editBanknum").fadeIn(0);
            $("#editBankname").fadeIn(0);
            $("#editAliPay").fadeIn(0);
            $("#editWxPay").fadeIn(0);
        }
    }

    // 收款码上传
    layui.use(['upload', 'layer'], function(){
        var upload = layui.upload;
        //执行实例
        var uploadAliPay = upload.render({
            elem: '#test1' //绑定元素
            ,url: 'http://39.108.55.80:8081/user/updateImage' //上传接口
            ,accept:'images'
            ,field:'file'
            ,data:{
                userId:sessionStorage.id,
                type:'ali'
            }
            ,before:function(){
                layer.load(2);
            }
            ,done: function(res){
                // console.log(res);
                layer.closeAll('loading');
                //上传完毕回调
                $("#editAliPay").fadeIn(0);
                $("#test1").fadeOut(0);
                $("#editAliPay").children('img').prop('src', 'http://39.108.55.80' + res.result);
                sessionStorage.alipaypic = 'http://39.108.55.80' + res.result;
            }
            ,error: function(){
                layer.closeAll('loading');
                //请求异常回调
                layer.msg('上传支付宝收款码失败');
            }
        });

        var uploadWxPay = upload.render({
            elem: '#test2' //绑定元素
            ,url: 'http://39.108.55.80:8081/user/updateImage' //上传接口
            ,accept:'images'
            ,field:'file'
            ,data:{
                userId:sessionStorage.id,
                type:'weixin'
            }
            ,before:function(){
                layer.load(2);
            }
            ,done: function(res){
                // console.log(res);
                layer.closeAll('loading');
                //上传完毕回调
                $("#editWxPay").fadeIn(0);
                $("#test2").fadeOut(0);
                $("#editWxPay").children('img').prop('src', 'http://39.108.55.80' + res.result);
                sessionStorage.weixinpic = 'http://39.108.55.80' + res.result;
            }
            ,error: function(){
                layer.closeAll('loading');
                //请求异常回调
                layer.msg('上传微信收款码失败');
            }
        });
    });


}