$(function(){
    function formateTimeStamp(timestamp){
        if(!timestamp) return timestamp;
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
    $("#userId").val(sessionStorage.id);
    $.fn.serializeObject = function(){    
       var o = {};    
       var a = this.serializeArray();    
       $.each(a, function() {    
           if (o[this.name]) {    
               if (!o[this.name].push) {    
                   o[this.name] = [o[this.name]];    
               }    
               o[this.name].push(this.value || '');    
           } else {    
               o[this.name] = this.value || '';    
           }    
       });    
       return o;    
    };
    // 退出
    var mainHead = new Vue({
        el:"#mainHead",
        methods:{
            userExit:function(){
                location.href = "/login.html";
                sessionStorage.clear();
            }
        }
    });
    globalInfo.getUserInfoByGlobal();
    // 两面长龙排行
    var lianmian = new Vue({
        el:"#lianmian",
        data:{
            items:""
        }
    });
    $.post("http://39.108.55.80:8081/home/getPaiLong", function(data){
        lianmian.items = data.result;
    });
    // 修改用户登录密码
    $("#confirmChangePass").on('click', function(){
        $.post("http://39.108.55.80:8081" + "/user/fogetPwd",{
            "id":sessionStorage.id,
            "password":$("#oldPassword").val(),
            "newpassword":$("#newPassword").val()
        },function(data){
            if(data.code === '000000') {
                var timer = 3;
                $(".hang_detail10").fadeIn(0);
                $(".code_tip9").text("修改成功！即将推出重新登录");
                setInterval(function(){
                    timer--;
                    if(timer == 0) {
                        location.href = "/login.html";
                        sessionStorage.clear();
                    }
                },2000);

            } else {
                $(".code_tip9").text("修改失败！");
            }
        });
    });
    // 修改安全码
    $("#confirmChangeSecuritycode").on('click', function(){
        $.post("http://39.108.55.80:8081" + "/user/fogetPwd",{
            "id":sessionStorage.id,
            "safepwd":$("#oldSecuritycode").val(),
            "newsafepwd":$("#newSecuritycode").val()
        },function(data){
            if(data.code === '000000') {
                $(".code_tip9").text("修改成功！");
                $(".hang_detail10").fadeIn(0);
            } else {
                $(".code_tip9").text("修改失败！");
                $(".hang_detail10").fadeIn(0);
            }
        });
    });
    // 首页公告数据
    layui.use(['flow', 'layer'], function(){
        var flow = layui.flow, layer = layui.layer;
        // 检测用户是否已登录
        if(!sessionStorage.id) {
            $("#content").hide(0);
            $(".hang_detail9").fadeIn(.3);
            $(".close_detail9").on("click", function(){
                $(".hang_detail8").fadeOut(.3);
                location.href = "/login.html";
            });
            return;
        }
        // 首页公告
        flow.load({
            elem:'#bulletinList',
            done:function(page,next){
                var lis = [];
                $.get("http://39.108.55.80:8081" + '/home/getNotice?page='+page, function(res){
                    layui.each(res.result, function(index, item){
                        lis.push('<li class="div_li">'+ 
                        '<div class="data_base_div">' +
                            '<span class="div_left_title">'+ item.title +'</span>' +
                            '<span class="div_right_date">'+ item.createDate +'</span>' +
                        '</div>'+
                        '<div class="data_base_div">' +
                            '<a class="div_base_detail div_detail">' +
                                '<span class="link_span">'+ item.content + '</span>' +
                                '<i class="link_icon_right main_link_icon_right"></i>' +
                            '</a>'+
                        '</div>'
                        +'</li>');
                    }); 
                    next(lis.join(''), page < res.pages);    
                });
            }
        });
        // 反馈列表
        flow.load({
            elem:'#feedBackList',
            done:function(page,next){
                getFeedBackPage(page, next);
            }
        });
        function getFeedBackPage(page, next){
            var lis = [];
            $.get("http://39.108.55.80:8081" + '/home/getMessages?page='+page,{
                "userId":sessionStorage.id
            }, function(res){
                layui.each(res.result, function(index, item){
                    var date = new Date(item.create_date),
                    Y = date.getFullYear() + '-',
                    M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-',
                    D = date.getDate() + ' ',
                    h = date.getHours() + ':',
                    m = date.getMinutes() + ':',
                    s = date.getSeconds();
                    lis.push('<li class="div_li">'+ 
                    '<div class="feedBackTitle">' +
                        item.content +
                    '</div>'+
                    '<div class="feedBackTime">' +
                        Y + M + D + h + m +
                    '</div>'
                    +'</li>');
                }); 
                next(lis.join(''), page < res.pages);    
            });
        }
        // 添加留言反馈
        $("#feedBackButton").on('click', function(){
            var feedbackText = $("#feedbackText").val();
            $.post("http://39.108.55.80:8081" + "/home/addMessage",{
                "userId":sessionStorage.id,
                "content":feedbackText
            },function(data){
                if(data.code === '000000') {
                    $(".code_tip9").text("留言反馈成功！");
                    $(".hang_detail10").fadeIn(.3);
                    $("#feedbackText").val("");
                    $("#feedBackList").children().remove();
                    flow.load({
                        elem:'#feedBackList',
                        done:function(page,next){
                            getFeedBackPage(page, next);
                        }
                    });
                } else {
                    $(".code_tip9").text("留言反馈失败！");
                    $(".hang_detail10").fadeIn(.3);
                }
            });
        });
        // 网站公告
        flow.load({
            elem:'#webBulletinList',
            done:function(page,next){
                var lis = [];
                $.get("http://39.108.55.80:8081" + '/home/getNotice?page='+page, function(res){
                    layui.each(res.result, function(index, item){
                        lis.push('<li class="div_li">'+ 
                        '<div class="data_base_div">' +
                            '<span class="div_left_title">'+ item.title +'</span>' +
                            '<span class="div_right_date">'+ item.createDate +'</span>' +
                        '</div>'+
                        '<div class="data_base_div">' +
                            '<a class="div_base_detail div_detail">' +
                                '<span class="link_span">'+ item.content + '</span>' +
                                '<i class="link_icon_right main_link_icon_right"></i>' +
                            '</a>'+
                        '</div>'
                        +'</li>');
                    }); 
                    next(lis.join(''), page < res.pages);    
                });
            }
        });
        // 任务中心
        $(".taskToken").text(sessionStorage.taskToken);
        flow.load({
            elem:'#pushList',
            done:function(page,next){
                var lis = [];
                $.get("http://39.108.55.80:8081" + '/user/getChilds?page='+page,{
                    "userId":sessionStorage.id
                }, function(res){
                    // console.log(res.result);
                    layui.each(res.result, function(index, item){
                        var date = new Date(item.createDate),
                        Y = date.getFullYear() + '-',
                        M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-',
                        D = date.getDate() + ' ',
                        h = (date.getHours()+1 < 10 ? '0'+(date.getHours()+1) : date.getHours()+1) + ':',
                        m = (date.getMinutes()+1 < 10 ? '0'+(date.getMinutes()+1) : date.getMinutes()+1);
                        // s = date.getSeconds();
                        lis.push('<div class="data_base">'+ 
                            '<ul class="data_base_list">' +
                                '<li>'+
                                    '<span class="data_base_span data_base_titleLeft">'+
                                        '<i class="icon-li data_base_icon1"></i>账号'+
                                    '</span>'+
                                    '<span class="data_base_span data_base_titleRight">'+ item.account +'</span>'+
                                '</li>'+
                                '<li>'+
                                    '<span class="data_base_span data_base_titleLeft">'+
                                        '<i class="icon-li data_base_icon2"></i>初始注册积分'+
                                    '</span>'+
                                    '<span class="data_base_span data_base_titleRight">'+ item.jfold + '</span>'+
                                '</li>'+
                                '<li>'+
                                    '<span class="data_base_span data_base_titleLeft">' +
                                        '<i class="icon-li data_base_icon3"></i>开通时间' +
                                    '</span>'+
                                    '<span class="data_base_span data_base_titleRight">' + Y+M+D+h+m + '</span>'+
                                '</li>'+
                                '<li>'+
                                    '<span class="data_base_span data_base_titleLeft">'+
                                        '<i class="icon-li data_base_icon4"></i>任务密钥花费数量'+
                                    '</span>'+
                                    '<span class="data_base_span data_base_titleRight">'+ item.usedtoken +'</span>'+
                                '</li>'+
                                '<li>'+
                                    '<span class="data_base_span data_base_titleLeft">'+
                                        '<i class="icon-li data_base_icon5"></i>任务密钥剩余数量'+
                                    '</span>'+
                                    '<span class="data_base_span data_base_titleRight">'+item.taskToken+'</span>'+
                                '</li>'+
                            '</ul>'
                        +'</div>');
                    }); 
                    next(lis.join(''), page < res.pages);    
                });
            }
        });
        // 娱乐中心
        var recreation_platform = new Vue({
            el:"#recreation_userinfo",
            data:{
                userName:sessionStorage.account,
                userCore:sessionStorage.jftask
            },
            methods:{
                updateUserInfo:function(){
                    this.userName = sessionStorage.account;
                    this.userCore = sessionStorage.jfbusiness;
                }
            }
        });

        setInterval(recreation_platform.updateUserInfo, 1000);

        function setTimeActive(){
            var dataTime = lottery_info.lotteryTime.split(':');
            var m = parseInt(dataTime[0]), s = parseInt(dataTime[1]);
            if(m == 0 && s == 0) {
                // 可购买
                $("#xiazhubtn").show(0);
                lottery_info.countDownMethod();
                return;
            }
            if(s == 0){
                s = 60;
                m--;
            }
            s--;
            sessionStorage.nowSeconds1 = s;
            lottery_info.lotteryTime = (m < 10? '0' + m : m) + ':' + (s < 10? '0' + s : s);
            // console.log(lottery_info.lotteryTime);
        }
        function closeTimeLite(){
            var dataTime = lottery_info.closeTime.split(':');
            var m = parseInt(dataTime[0]), s = parseInt(dataTime[1]);
            if(m == 0 && s == 0) {
                // 封盘
                $("#xiazhubtn").hide(0);
                $(".bet_box").hide(0);
                $("#closeLottery").text("已封盘");
                return;
            }
            if(s == 0){
                s = 60;
                m--;
            }
            s--;
            sessionStorage.nowSeconds2 = s;
            lottery_info.closeTime = (m < 10? '0' + m : m) + ':' + (s < 10? '0' + s : s);
            $("#closeLottery").text(lottery_info.closeTime);
        }
        var lotteryTime, closeLotteryTime;
        var lottery_info = new Vue({
            el:"#lottery_info",
            data:{
                countDown:"",
                lotteryTime:"00:00",
                closeTime:"00:00",
                gmnum:"",
                gm1:"",
                gm2:"",
                gm3:"",
                gm4:"",
                gm5:""
            },
            methods:{
                countDownMethod:function(){
                    console.log(sessionStorage.nowSeconds1);
                    // $("#closeLottery").text("00:00");
                    var nowDate = new Date();
                    var nowHours = nowDate.getHours();
                    var nowMinute = nowDate.getMinutes();
                    var nowSeconds1, nowSeconds2;
                    if(sessionStorage.nowSeconds1 != 'NaN' && sessionStorage.nowSeconds2 != 'NaN') {
                        // nowMinute1 = sessionStorage.nowMinute;
                        nowSeconds1 = sessionStorage.nowSeconds1;
                        // nowMinute2 = sessionStorage.nowMinute;
                        nowSeconds2 = sessionStorage.nowSeconds2;
                    } else {
                        // sessionStorage.nowMinute1 = nowMinute = nowDate.getMinutes();
                        sessionStorage.nowSeconds1 = nowSeconds1 = nowDate.getSeconds();
                        sessionStorage.nowSeconds2 = nowSeconds2 = nowDate.getSeconds();
                    }
                    if(2 <= nowHours && 21 >= nowHours) {
                        var isopen = nowMinute % 10;
                        if(nowMinute == 55 && nowHours == 21) {
                            lottery_info.lotteryTime = 10 - isopen > 0 ? "0" + (10 - isopen) + ":" + nowSeconds1 : "00:00";
                            lottery_info.closeTime = "00:00";
                        } else {
                            lottery_info.lotteryTime = 10 - isopen > 0 ? "0" + (10 - isopen) + ":" + nowSeconds1 : "00:00";
                            lottery_info.closeTime = 5 - isopen > 0 ? "0" + (5 - isopen) + ":" + nowSeconds2 : "00:00";
                        }
                        setInterval(setTimeActive, 1000);
                        setInterval(closeTimeLite, 1000);
                    } else if((22 <= nowHours && 23 >= nowHours) || (nowHours < 2)) {
                        var isopen = nowMinute % 10 < 5 ? nowMinute % 10 : nowMinute % 10 - 5;
                        // console.log(isopen);
                        if(nowMinute == 55 && nowHours == 1) {
                            lottery_info.lotteryTime = 5 - isopen > 0 ? "0" + (5 - isopen) + ":" + nowSeconds1 : "00:00";
                            lottery_info.closeTime = "00:00";
                        } else {
                            lottery_info.lotteryTime = 5 - isopen > 0 ? "0" + (5 - isopen) + ":" + nowSeconds1 : "00:00";
                            lottery_info.closeTime = 3 - isopen > 0 ? "0" + (3 - isopen) + ":" + nowSeconds2 : "00:00";
                        }
                        setInterval(setTimeActive, 1000);
                        if($("#closeLottery").text() != "已封盘") {
                            setInterval(closeTimeLite, 1000);
                        }
                    } else {
                        // 计时停止，一直封盘
                        $("#xiazhubtn").hide(0);
                        lottery_info.lotteryTime = "00:00";
                        $("#closeLottery").text("已封盘");
                    }
                    
                }
            }
        });

        lottery_info.countDownMethod();

        setInterval(()=>{
            getGmnum();
        }, 15000);

        var leaderlist = new Vue({
            el:"#leaderlist",
            data:{
                choose:1,
                gms:"",
                bgms:"",
                sgms:""
            },
            methods:{
                changeChoose:function(event){
                    var setV = event.target.getAttribute("data-set");
                    $(event.target).addClass("leader_btn_active").siblings().removeClass("leader_btn_active");
                    this.choose = setV;
                }
            }
        });
        
        // 获取开奖信息
        function getGmnum(){
            $.post("http://39.108.55.80:8081/home/getData", function(data){
                // console.log(data);
                if(data.code === '111111') {
                    return;
                }
                var r = data.result[0];
                lottery_info.gm1 = r.gm1;
                lottery_info.gm2 = r.gm2;
                lottery_info.gm3 = r.gm3;
                lottery_info.gm4 = r.gm4;
                lottery_info.gm5 = r.gm5;
                lottery_info.gmnum = r.gmnum;
                $("#newgnumber").text(parseInt(r.gmnum) + 1);
                var gms = [], bgms = [], sgms = [];

                for(var i = 0;i < data.result.length;i++) {
                    var gmss = {};
                    gmss.gm1 = data.result[i].gm1;
                    gmss.gm2 = data.result[i].gm2;
                    gmss.gm3 = data.result[i].gm3;
                    gmss.gm4 = data.result[i].gm4;
                    gmss.gm5 = data.result[i].gm5;
                    // gmss.gmnum = data.result[i].gmnum.substring(data.result[i].gmnum.length - 3, data.result[i].gmnum.length);
                    gmss.gmnum = data.result[i].gmnum;
                    gmss.gmsum = data.result[i].gmsum;
                    gms.push(gmss);
                }

                for(var i = 0;i < data.result.length;i++) {
                    var bgmss = {};
                    bgmss.bgm1 = data.result[i].bgm1;
                    bgmss.bgm2 = data.result[i].bgm2;
                    bgmss.bgm3 = data.result[i].bgm3;
                    bgmss.bgm4 = data.result[i].bgm4;
                    bgmss.bgm5 = data.result[i].bgm5;
                    bgmss.create_date = data.result[i].create_date;
                    bgmss.bgmsum = data.result[i].bgmsum;
                    bgms.push(bgmss);
                }

                for(var i = 0;i < data.result.length;i++) {
                    var sgmss = {};
                    sgmss.sgm1 = data.result[i].sgm1;
                    sgmss.sgm2 = data.result[i].sgm2;
                    sgmss.sgm3 = data.result[i].sgm3;
                    sgmss.sgm4 = data.result[i].sgm4;
                    sgmss.sgm5 = data.result[i].sgm5;
                    sgmss.lastup_date = data.result[i].lastup_date;
                    sgmss.sgmsum = data.result[i].sgmsum;
                    sgms.push(sgmss);
                }

                leaderlist.gms = gms;
                leaderlist.bgms = bgms;
                leaderlist.sgms = sgms;
                
            });
        }

        getGmnum();

        // 购买
        $.post("http://39.108.55.80:8081" + "/home/getBuyJf",{
            userId:sessionStorage.id
        },function(data){
            var dt = data.result;
            var users = [];
            for(var i = 0;i < dt.length;i++) {
                if(dt[i].id != sessionStorage.id){
                    users.push(dt[i]);
                }
            }
            // console.log(users);
            // console.log(users);
            var goumailist = new Vue({
                el:'#goumailist',
                data:{
                    items:users
                },
                methods:{
                    confirmHang:function(event){
                        var id = event.target.dataset.id;
                        $.post("http://39.108.55.80:8081/user/getUsers",{
                            userId:id
                        },function(data){
                            // console.log(data);
                            var banknum = data.result.banknum;
                            var alipaypic = data.result.alipaypic;
                            var weixinpic = data.result.weixinpic;
                            $("#userInfoDetailBankNum").text(banknum);
                            $("#userInfoDetailAliPay").children('img').prop('src', "http://39.108.55.80/" + alipaypic);
                            $("#userInfoDetailWxPay").children('img').prop('src', "http://39.108.55.80/" + weixinpic);
                            layer.open({
                                type:1,
                                area:['300px','250px'],
                                content:$("#userInfoDeatil"),
                                cancel:function(){
                                    $(event.target).hide(0).siblings('.goumaiStatus').show(0);
                                    $.post("http://39.108.55.80:8081/home/updateBusiness", {
                                        status:1,
                                        userid:sessionStorage.id,
                                        id:id,
                                        safepwd:data.result.safepwd
                                    }, function(data) {
                                        // console.log(data);
                                    });
                                }
                            });
                        });
                    }
                }
            });
        });
        // 挂卖
        $.post("http://39.108.55.80:8081" + "/home/getBusiness",{
            userId:sessionStorage.id,
            status:1,
            type:1
        },function(data){
            var dt = data.result;
            // console.log(dt);
            var users = [];
            for(var i = 0;i < dt.length;i++) {
                if(dt[i].userid == sessionStorage.id){
                    users.push(dt[i]);
                }
                if(dt[i].configtime) {
                    dt[i].configtime = formateTimeStamp(dt[i].configtime) + '之前';
                } else {
                    dt[i].configtime = formateTimeStamp(dt[i].configtime);
                }
            }
            // console.log(users);
            var integral_list = new Vue({
                el:'#integral_list',
                data:{
                    items:users
                },
                methods:{
                    confirmHang:function(event){
                        var id = event.target.dataset.id;id
                        console.log(event.target.dataset.id);
                        $(".hang_detail11").fadeIn(0);
                        $(".close_detail11").on('click', function(){
                            $(".hang_detail11").fadeOut(0);
                        });
                        $("#guamaiconfirm").off('click').on('click', function(){
                            var pwd = $("#guamaipwd").val();
                            $.post("http://39.108.55.80:8081/home/updateBusiness",{
                                id:id,
                                status:1,
                                userid:sessionStorage.id,
                                safepwd:pwd
                            },function(data){
                                // console.log(data);
                                if(data.code === '000000') {
                                    $(event.target).hide(0);
                                    $(event.target).siblings('.goumaiStatus').text('交易中').show(0);
                                    $(".hang_detail11").fadeOut(0);
                                    layer.msg('挂卖成功');
                                } else {
                                    layer.msg('交易失败');
                                }
                            });
                        });
                    }
                }
            });
        });
        
        // 挂卖交易积分
        var jfguamai = new Vue({
            el:"#guamaijf",
            data:{
                jfvalue:"",
                jfbusiness:sessionStorage.jfbusiness
            },
            methods:{
                confirmHang:function(){
                    var jfvalue = this.jfvalue;
                    if(jfvalue === '') {
                        layer.msg("请输入要挂卖的积分");
                    } else {
                        if(parseInt(jfvalue) > parseInt(sessionStorage.jfbusiness)) {
                            layer.msg("交易积分不足，不能进行挂卖");
                            return;
                        }
                        $(".hang_detail11").fadeIn(0);
                        $(".close_detail11").on('click', function(){
                            $(".hang_detail11").fadeOut(0);
                        });
                        
                    }
                }
            }
        });
        $("#guamaiconfirm").off('click').on('click', function(){
            var pwd = $("#guamaipwd").val();
            if(pwd != '') {
                var jfvalue = jfguamai.jfvalue;
                $.post("http://39.108.55.80:8081/home/addBusiness", {
                    userid:sessionStorage.id,
                    selljf:jfguamai.jfvalue,
                    safepwd:pwd
                }, function(data){
                    // console.log(data);
                    $(".hang_detail11").fadeOut(0);
                    if(data.code === '000000') {
                        jfguamai.jfvalue = "";
                        layer.msg("挂卖成功");
                        jfguamai.jfbusiness = sessionStorage.jfbusiness = parseInt(sessionStorage.jfbusiness) - parseInt(jfvalue);
                    } else {
                        layer.msg(data.result);
                    }
                    $("#guamaipwd").val('');
                    jfguamai.jfvalue = "";
                });
            } else {
                layer.msg("安全码不能为空");
            }
        });
       
        // 任务申请
        var taskApplication = new Vue({
            el:"#task_application",
            data:{
                taskTokenApply:sessionStorage.taskToken
            },
            methods:{
                giftKey:function(event){
                    if(parseInt(this.taskTokenApply) <= 0) {
                        layer.msg("已经没有足够的任务密钥了！");
                        return;
                    }
                    $.post("http://39.108.55.80:8081" + "/home/addTask",{
                        "userid":sessionStorage.id
                    }, function(data){
                        if(data.code === '000000'){
                            $(".hang_detail5").fadeIn(.3);
                            $(".code_tip4").show(0);
                            sessionStorage.taskToken = parseInt(sessionStorage.taskToken) - 1;
                            $("#taskTokenApply").text(sessionStorage.taskToken);
                            $(".code_tip4").text("申请已提交！");
                        } else {
                            if(data.result) {
                                layer.msg(data.result);
                            } else {
                                layer.msg("申请失败");
                            }
                            // $(".code_tip4").text("申请失败！");
                        }
                    });
                }
            }
        });
        // 开通账号
        var openAccount = new Vue({
            el:"#createAccountForm",
            data:{
                account:"",
                jfzhuce:"",
                password:"",
                safepwd:""
            },
            methods:{
                createAccount:function(event){
                    this.jfzhuce = $("#jfzhuce").val();
                    if(parseInt(this.jfzhuce) > parseInt(sessionStorage.jfcenter)) {
                        $(".code_tip6").text('可用积分不足');
                        $(".hang_detail7").fadeIn(.3);
                    } else {
                        if(this.account == '' || this.jfzhuce == '' || this.password == '' || this.safepwd == '') {
                            var tips = "";
                            $(".hang_detail10").fadeIn(.3);
                            if(this.account == '') {
                                tips = "账号不能为空！";
                            } else if(this.password == '') {
                                tips = "登录密码不能为空！";
                            } else if(this.safepwd == '') {
                                tips = "安全密码不能为空！";
                            } else if(this.jfzhuce == '') {
                                tips = "注册积分不能为空！";
                            }
                            $(".code_tip9").text(tips);
                        } else {
                            $.post("http://39.108.55.80:8081" + "/user/register",{
                                account:this.account,
                                jfzhuce:this.jfzhuce,
                                password:this.password,
                                safepwd:this.safepwd,
                                pid:sessionStorage.id
                            }, function(data){
                                console.log(data);
                                if(data.code === '000000') {
                                    sessionStorage.jfcenter = parseInt(sessionStorage.jfcenter) - parseInt(openAccount.jfzhuce);
                                    updateUserCoreInfo();
                                    openAccount.account = "";
                                    openAccount.jfzhuce = "";
                                    openAccount.password = "";
                                    openAccount.safepwd = "";
                                    $(".hang_detail10").fadeIn(.3);
                                    $(".code_tip9").text("账号开通成功！");
                                } else if(data.code === '000002'){
                                    $(".hang_detail10").fadeIn(.3);
                                    $(".code_tip9").text("账号已存在！");
                                } else {
                                    $(".hang_detail10").fadeIn(.3);
                                    $(".code_tip9").text("账号开通失败！");
                                }
                            });
                        }
                    }
                },
                showScores:function(){
                    $("#mask").show();
                    $("#selectBox").show();
                }
            }
        });

        // 个人中心
        var updateUserInfo = new Vue({
            el:"#updateUserInfo",
            data:{
                account:sessionStorage.account,
                username:sessionStorage.username,
                telephone:sessionStorage.telephone,
                bankName:sessionStorage.bankName,
                bankNum:sessionStorage.bankNum,
                alipaypic:'http://39.108.55.80' + sessionStorage.alipaypic,
                weixinpic:'http://39.108.55.80' + sessionStorage.weixinpic,
                newUserName:"",
                newTelphone:"",
                newBankName:"",
                newBankNum:"",
            },
            methods:{
                updateUserInfo:function(){
                }
            }
        });
        $("#perfectUserInfo").on("click", function(){
            var updateUserJson = $("#updateUserInfo").serialize();
            var loadIndex = layer.load(2);
            $.post("http://39.108.55.80:8081" + "/user/updateUser", {
                "userId":sessionStorage.id,
                // "username":$("#newUserName").val(),
                "telephone":$("#newTelphone").val(),
                "bankname":$("#newBankName").val(),
                "banknum":$("#newBankNum").val()
            },function(data){
                layer.close(loadIndex);
                if(data.code === '000000') {
                    globalInfo.updateSession();
                    $(".code_tip9").text("更新成功！");
                    $(".hang_detail10").fadeIn(0);
                    // updateUserInfo.username = sessionStorage.username = $("#newUserName").val();
                    updateUserInfo.telephone = sessionStorage.telephone = $("#newTelphone").val();
                    updateUserInfo.bankName = sessionStorage.bankName = $("#newBankName").val();
                    updateUserInfo.bankNum = sessionStorage.bankNum = $("#newBankNum").val();
                    $(".personal_data").find(".editUserInfo").css("display", "none");
                    $(".editText").fadeIn(.3);
                } else {
                    $(".code_tip9").text("更新失败！");
                    $(".hang_detail10").fadeIn(0);
                }
            });
        });
        // 转赠密钥
        var taskGift = new Vue({
            el:"#task_gift",
            data:{
                account:"",
                num:"",
                safepwd:""
            },
            methods:{
                giftButton:function(event){
                    if(this.account === '' || this.safepwd === '') {
                        layer.msg("账号或安全密码不能为空！");
                        return;
                    }
                    if(this.num === '') {
                        layer.msg("请输入要转赠的密钥数量！");
                        return;
                    }
                    if(parseInt(sessionStorage.jftask) < parseInt(this.num)) {
                        layer.msg("密钥数量不足！");
                    } else {
                        $.post("http://39.108.55.80:8081" + "/user/gaveToken",{
                            account:this.account,
                            num:this.num,
                            safepwd:this.safepwd,
                            userid:sessionStorage.id
                        },function(data){
                            console.log(data);
                            if(data.code === '000000') {
                                layer.msg('转赠成功');
                                $("#taskGiftToken").text(parseInt(sessionStorage.taskToken) - parseInt(taskGift.num));
                            } else {
                                if(data.result) {
                                    layer.msg(data.result);
                                } else {
                                    layer.msg('转赠失败');
                                }
                            }
                            taskGift.account = "";
                            taskGift.num = "";
                            taskGift.safepwd = "";
                        });
                    }
                }
            }
        });
        
        // 积分转换中心
        var conversionBox = new Vue({
            el:"#conversionBox",
            data:{
                jfcenter:sessionStorage.jfcenter,
                jfzhuce:sessionStorage.jfzhuce,
                jftask:sessionStorage.jftask,
                isC:1,
                jf:""
            },
            methods:{
                changeIsC:function(event){
                    this.isC = parseInt(event.target.dataset.isc);
                    $(event.target).addClass("conversion_active").siblings(".conversion_button").removeClass("conversion_active");
                },
                confirmConversion:function(event){
                    if(this.jf === ''){
                        layer.msg("请输入要转换的积分！");
                        return;
                    }
                    var type = 0;
                    switch(this.isC){
                        case 1:
                        if(parseInt(this.jf) <= parseInt(this.jfcenter)) {
                            type = 4;
                        } else {
                            if(parseInt(this.jf) <= parseInt(this.jfzhuce)) {
                                type = 2;
                            } else {
                                $(".hang_detail7").fadeIn(.3);
                            }
                        }
                        break;
                        case 2:
                        if(parseInt(this.jfcenter) > 0) {
                            type = 5;
                        } else {
                            if(parseInt(this.jfzhuce) > 0) {
                                type = 3;
                            } else {
                                $(".hang_detail7").fadeIn(.3);
                            }
                        }
                        break;
                        case 3:
                        type = 1;
                        break;
                    }
                    if(type != 0) {
                        var core = this.jf;
                        // console.log(type);
                        $.post("http://39.108.55.80:8081" + "/jf/transforjf",{
                            userId:sessionStorage.id,
                            type:type,
                            jf:parseInt(conversionBox.jf)
                        },function(data){
                            // console.log(data);
                            if(data.code === '000000') {
                                console.log(type);
                                if(type === 2 || type === 3 || type === 1) {
                                    //更新注册积分
                                    conversionBox.jfzhuce = sessionStorage.jfzhuce = parseInt(conversionBox.jfzhuce) - parseInt(core);
                                    // 更新任务积分
                                    if( type === 3) {
                                        conversionBox.jftask = sessionStorage.jftask = parseInt(conversionBox.jftask) + parseInt(core);
                                    }
                                    // 更新交易积分
                                    if( type === 2) {
                                        sessionStorage.jfbusiness = parseInt(sessionStorage.jfbusiness) + parseInt(core);
                                    }
                                    // 更新中心积分
                                    if( type === 1) {
                                        conversionBox.jfcenter = sessionStorage.jfcenter = parseInt(sessionStorage.jfcenter) + parseInt(core);
                                    }
                                } else if(type === 4 || type === 5) {
                                    // 更新中心积分
                                    conversionBox.jfcenter = sessionStorage.jfcenter = parseInt(conversionBox.jfcenter) - parseInt(core);
                                    // 更新任务积分
                                    if( type === 5) {
                                        conversionBox.jftask = sessionStorage.jftask = parseInt(conversionBox.jftask) + parseInt(core);
                                    }
                                    // 更新交易积分
                                    if( type === 4) {
                                        sessionStorage.jfbusiness = parseInt(sessionStorage.jfbusiness) + parseInt(core);
                                    }
                                }
                                $(".hang_detail8").fadeIn(.3);
                                globalInfo.updateSession();
                            } else {
                                if(type == 3 || type == 5) {
                                    $(".code_tip6").text('请输入允许转换为任务积分的值');
                                } else {
                                    $(".code_tip6").text(' 抱歉！您没有足够的积分扣除。');
                                }
                                $(".hang_detail7").fadeIn(.3);
                            }
                            conversionBox.jf ="";
                            updateUserCoreInfo();
                        });
                    }
                },
                updateUserInfo:function(){
                    this.jfcenter = sessionStorage.jfcenter;
                    this.jfzhuce = sessionStorage.jfzhuce;
                    this.jftask = sessionStorage.jftask;
                }
            }
        });

        function updateUserCoreInfo(){
            // 更新首页用户资料
            // userInfo.updateUserInfo();
            // 更新娱乐平台用户资料
            recreation_platform.updateUserInfo();
            // 积分转换中心
            conversionBox.updateUserInfo();
        }
    });
});