$(function(){
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
    var mainHead = new Vue({
        el:"#mainHead",
        methods:{
            userExit:function(){
                location.href = "/login.html";
                sessionStorage.clear();
            }
        }
    });
    // 首页用户信息
    var userInfo = new Vue({
        el:"#userInfoList",
        data:{
            // 用户ID
            id:sessionStorage.id,
            // 用户账号
            account:sessionStorage.account,
            // 用户姓名
            username:sessionStorage.username,
            // 手机号
            telephone:sessionStorage.telephone,
            // 支付宝收款码
            alipaypic:sessionStorage.alipaypic,
            // 微信收款码
            weixinpic:sessionStorage.weixinpic,
            // 银行卡号
            bankNum:sessionStorage.bankNum,
            // 银行名称
            bankName:sessionStorage.bankName,
            // 中心积分
            jfcenter:sessionStorage.jfcenter,
            // 任务积分
            jftask:sessionStorage.jftask,
            // 交易积分
            jfbusiness:sessionStorage.jfbusiness,
            // 注册积分
            jfzhuce:sessionStorage.jfzhuce,
            // 任务密钥
            taskToken:sessionStorage.taskToken,
            // 已使用密钥
            usedtoken:sessionStorage.usedtoken,
            // 原注册积分
            jfold:sessionStorage.jfold
        },
        methods:{
            updateUserInfo:function(){
                // 用户ID
                this.id = sessionStorage.id,
                // 用户账号
                this.account = sessionStorage.account,
                // 用户姓名
                this.username = sessionStorage.username,
                // 手机号
                this.telephone = sessionStorage.telephone,
                // 支付宝收款码
                this.alipaypic = sessionStorage.alipaypic,
                // 微信收款码
                this.weixinpic = sessionStorage.weixinpic,
                // 银行卡号
                this.bankNum = sessionStorage.bankNum,
                // 银行名称
                this.bankName = sessionStorage.bankName,
                // 中心积分
                this.jfcenter = sessionStorage.jfcenter,
                // 任务积分
                this.jftask = sessionStorage.jftask,
                // 交易积分
                this.jfbusiness = sessionStorage.jfbusiness,
                // 注册积分
                this.jfzhuce = sessionStorage.jfzhuce,
                // 任务密钥
                this.taskToken = sessionStorage.taskToken,
                // 已使用密钥
                this.usedtoken = sessionStorage.usedtoken,
                // 原注册积分
                this.jfold = sessionStorage.jfold
            }
        }
    });
    // 修改用户登录密码
    $("#confirmChangePass").on('click', function(){
        $.post("http://39.108.55.80:8081" + "/user/fogetPwd",{
            "id":sessionStorage.id,
            "password":$("#oldPassword").val(),
            "newpassword":$("#newPassword").val()
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
        // 直推列表
        flow.load({
            elem:'#pushList',
            done:function(page,next){
                var lis = [];
                $.get("http://39.108.55.80:8081" + '/user/getChilds?page='+page,{
                    "userId":sessionStorage.id
                }, function(res){
                    layui.each(res.result, function(index, item){
                        var date = new Date(item.createDate),
                        Y = date.getFullYear() + '-',
                        M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-',
                        D = date.getDate() + ' ',
                        h = date.getHours() + ':',
                        m = date.getMinutes();
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
                                        '<i class="icon-li data_base_icon4"></i>任务密钥话费数量'+
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
                userCore:sessionStorage.jfbusiness
            },
            methods:{
                updateUserInfo:function(){
                    this.userName = sessionStorage.account;
                    this.userCore = sessionStorage.jfbusiness;
                }
            }
        });
        var lottery_info = new Vue({
            el:"#lottery_info",
            data:{
                countDown:"",
                lotteryTime:"10:00",
                gmnum:20180926050,
                gm1:"",
                gm2:"",
                gm3:"",
                gm4:"",
                gm5:"",
            },
            methods:{
                countDownMethod:function(){
                    var dataTime = this.lotteryTime.split(':');
                    var m = parseInt(dataTime[0]), s = parseInt(dataTime[1]);
                    if(s == 0){
                        s = 60;
                        m--;
                    }
                    s--;
                    this.lotteryTime = (m < 10? '0' + m : m) + ':' + (s < 10? '0' + s : s);
                    if(m == 0 && s == 0){
                        this.lotteryTime = "10:00";
                        this.gmnum += 1;
                        // 重新获取开奖信息
                        getGmnum();
                    }
                }
            }
        });
        setInterval(()=>{
            lottery_info.countDownMethod();
        }, 1000);
        // 获取开奖信息
        function getGmnum(){
            $.post("http://39.108.55.80:8081" + "/home/getData",{
                gmnum:lottery_info.gmnum
            }, function(data){
                var r = data.result[0];
                lottery_info.gm1 = r.gm1;
                lottery_info.gm2 = r.gm2;
                lottery_info.gm3 = r.gm3;
                lottery_info.gm4 = r.gm4;
                lottery_info.gm5 = r.gm5;
                console.log(r);
            });
        }
        getGmnum();
        // 挂卖信息列表
        $.post("http://39.108.55.80:8081" + "/home/getBusiness",{
            "userId":1
            // "status":1
        },function(data){
            var dt = data.result;
            var integral_list = new Vue({
                el:'#integral_list',
                data:{
                    items:dt
                },
                methods:{
                    confirmHang:function(event){
                        console.log(event.target.dataset.id);
                    }
                }
            });
        });
        // 投注记录
        $.post("http://39.108.55.80:8081" + "/home/getPools",{
            "userId":1
            // "status":1
        },function(data){
            var dt = data.result;
            var integral_list = new Vue({
                el:'#record_list',
                data:{
                    items:dt
                }
            });
        });
        // 未结明细
        $.post("http://39.108.55.80:8081" + "/home/getPools",{
            "userId":1,
            "status":0
        },function(data){
            var dt = data.result;
            console.log(dt);
            var missed_list = new Vue({
                el:'#missed_list',
                data:{
                    items:dt
                }
            });
        });
        // 赠送密钥
        var taskApplication = new Vue({
            el:"#task_application",
            data:{
                taskToken:sessionStorage.taskToken
            },
            methods:{
                giftKey:function(event){
                    if(parseInt(this.taskToken) <= 0) {
                        layer.msg("已经没有足够的任务密钥了！");
                        return;
                    }
                    $.post("http://39.108.55.80:8081" + "/home/addTask",{
                        "userid":1
                    }, function(data){
                        $(".hang_detail5").fadeIn(.3);
                        $(".code_tip4").show(0);
                        if(data.code === '000000'){
                            sessionStorage.taskToken = taskApplication.taskToken = parseInt(sessionStorage.taskToken) - 1;
                            $(".code_tip4").text("申请已提交！");
                        } else {
                            layer.msg(data.message);
                            $(".code_tip4").text("申请失败！");
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
                alipaypic:sessionStorage.alipaypic,
                weixinpic:sessionStorage.weixinpic,
                newUserName:"",
                newTelphone:"",
                newBankName:"",
                newBankNum:"",
            },
            methods:{
                updateUserInfo:function(){
                    // var updateUserJson = $("#updateUserInfo").serialize();
                    // $.post("http://39.108.55.80:8081" + "/user/updateUser", {
                    //     "userId":sessionStorage.id,
                    //     "username":$("#newUserName").val(),
                    //     "telephone":$("#newTelphone").val(),
                    //     "bankNum":$("#newBankName").val(),
                    //     "bankname":$("#newBankNum").val(),
                    // },function(data){
                    //     if(data.code === '000000') {
                    //         $(".code_tip9").text("更新成功！");
                    //         $(".hang_detail10").fadeIn(0);
                    //         sessionStorage.username = this.newUserName;
                    //         sessionStorage.telephone = this.newTelphone;
                    //         sessionStorage.bankName = this.newBankName;
                    //         sessionStorage.bankNum = this.newBankNum;
                    //     } else {
                    //         $(".code_tip9").text("更新失败！");
                    //         $(".hang_detail10").fadeIn(0);
                    //     }
                    // });
                }
            }
        });
        $("#perfectUserInfo").on("click", function(){
            var updateUserJson = $("#updateUserInfo").serialize();
            $.post("http://39.108.55.80:8081" + "/user/updateUser", {
                "userId":sessionStorage.id,
                "username":$("#newUserName").val(),
                "telephone":$("#newTelphone").val(),
                "bankNum":$("#newBankName").val(),
                "bankname":$("#newBankNum").val(),
            },function(data){
                if(data.code === '000000') {
                    $(".code_tip9").text("更新成功！");
                    $(".hang_detail10").fadeIn(0);
                    sessionStorage.username = $("#newUserName").val();
                    sessionStorage.telephone = $("#newTelphone").val();
                    sessionStorage.bankName = $("#newBankName").val();
                    sessionStorage.bankNum = $("#newBankNum").val();
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
                            if(data.code === '000000') {
                                taskGift.account = "";
                                taskGift.num = "";
                                taskGift.safepwd = "";
                            }
                            layer.msg(data.message);
                        });
                    }
                }
            }
        });
        // 中心积分报表
        $.post("http://39.108.55.80:8081" + "/home/getTokens",{
            account:sessionStorage.account
        },function(data){
            var dt = data.result;
            var inputList = new Vue({
                el:"#inputList",
                data:{
                    items:dt
                }
            });
        });
        $.post("http://39.108.55.80:8081" + "/home/getTokens",{
            userId:sessionStorage.id
        },function(data){
            var dt = data.result;
            var inputList = new Vue({
                el:"#outputList",
                data:{
                    items:dt
                }
            });
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
                        if(parseInt(this.jf) <= parseInt(this.jfcenter)) {
                            type = 5;
                        } else {
                            if(parseInt(this.jf) <= parseInt(this.jfzhuce)) {
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
                        var core = this.jf
                        $.post("http://39.108.55.80:8081" + "/jf/transforjf",{
                            userId:sessionStorage.id,
                            type:type,
                            jf:parseInt(this.jf)
                        },function(data){
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
                            } else {
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
            userInfo.updateUserInfo();
            // 更新娱乐平台用户资料
            recreation_platform.updateUserInfo();
            // 积分转换中心
            conversionBox.updateUserInfo();
        }
    });
});