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
    // 修改用户登录密码
    $("#confirmChangePass").on('click', function(){
        $.post("http://120.79.46.90:8080/game/user/fogetPwd.do",{
            "id":sessionStorage.id,
            "password":$("#oldPassword").val(),
            "newpassword":$("#newPassword").val()
        },function(data){
            console.log(data);
        });
    });
    // 修改安全码
    $("#confirmChangeSecuritycode").on('click', function(){
        $.post("http://120.79.46.90:8080/game/user/fogetPwd.do",{
            "id":sessionStorage.id,
            "safepwd":$("#oldSecuritycode").val(),
            "newsafepwd":$("#newSecuritycode").val()
        },function(data){
            console.log(data);
        });
    });
    // 完善个人资料
    $("#perfectUserInfo").on('click', function(){
        var updateUserJson = $("#updateUserInfo").serializeObject();
        console.log(updateUserJson);
        $.post("http://120.79.46.90:8080/game/user/updateUser.do",{
            "userVO":updateUserJson
        },function(data){
            console.log(data);
        });
    });
    // 添加留言反馈
    $("#feedBackButton").on('click', function(){
        var feedbackText = $("#feedbackText").val();
        console.log("留言内容：" + feedbackText);
        $.post("http://120.79.46.90:8080/game/home/addMessage.do",{
            "userId":sessionStorage.id,
            "content":feedbackText
        },function(data){
            console.log(data);
        });
    });
    // 首页公告数据
    layui.use('flow', function(){
        var flow = layui.flow;
        // 首页公告
        flow.load({
            elem:'#bulletinList',
            done:function(page,next){
                var lis = [];
                $.get('http://120.79.46.90:8080/game/home/getNotice.do?page='+page, function(res){
                    console.log(res);
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
        // 网站公告
        flow.load({
            elem:'#webBulletinList',
            done:function(page,next){
                var lis = [];
                $.get('http://120.79.46.90:8080/game/home/getNotice.do?page='+page, function(res){
                    console.log(res);
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
                var lis = [];
                $.get('http://120.79.46.90:8080/game/home/getMessages.do?page='+page,{
                    "userId":sessionStorage.id
                }, function(res){
                    console.log(res);
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
        });
        // 任务中心
        $(".taskToken").text(sessionStorage.taskToken);
        // 直推列表
        flow.load({
            elem:'#pushList',
            done:function(page,next){
                var lis = [];
                $.get('http://120.79.46.90:8080/game/user/getChilds.do?page='+page,{
                    "userId":sessionStorage.id
                }, function(res){
                    console.log(res);
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
        $("#user_name").text(sessionStorage.account);
        $("#user_core").text(sessionStorage.jfbusiness);
        // 挂卖信息列表
        $.post("http://120.79.46.90:8080/game/home/getBusiness.do",{
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
        $.post("http://120.79.46.90:8080/game/home/getPools.do",{
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
        $.post("http://120.79.46.90:8080/game/home/getPools.do",{
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
    });
});