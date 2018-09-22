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
        $.post("http://120.79.46.90:8080/flm/user/fogetPwd.do",{
            "id":sessionStorage.id,
            "password":$("#oldPassword").val(),
            "newpassword":$("#newPassword").val()
        },function(data){
            console.log(data);
        });
    });
    // 完善个人资料
    $("#perfectUserInfo").on('click', function(){
        var updateUserJson = $("#updateUserInfo").serializeObject();
        console.log(updateUserJson);
        $.post("http://120.79.46.90:8080/flm/user/updateUser.do",{
            "userVO":updateUserJson
        },function(data){
            console.log(data);
        });
    });
});