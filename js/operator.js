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
    });
});