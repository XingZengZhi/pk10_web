window.onload = function(){
    var _login = function() {
        layui.use('layer', function(){
            var layer = layui.layer;
            if(userName.value === '' || userPass === '') {
                layer.msg("账户或密码不能为空！");
            } else {
                if(userName.value.toLowerCase() === userData.userName &&
                        userPass.value.toLowerCase() === userData.userPass) {
                    var loadIndex = layer.load(1);
                    setTimeout(function(){
                        layer.close(loadIndex);
                        location.href = "/view/main.html";
                    }, 1000);
                    // 后台登录操作
                } else {
                    layer.msg("登录失败，请检查账户或密码");
                }
            }
        });
    }
    // 模拟用户登录数据
    var userData = {
        userName:"admin",
        userPass:"admin123"
    };
    function getDocElem(eleValue) {
        var e = null;
        if(eleValue.indexOf("#") != -1) {
            e = document.getElementById(eleValue.substr(1));
        } else {

        }
        if(e == null) "element is null.";
        return e;
    }
    var userName = getDocElem("#userName"),
        userPass = getDocElem("#userPass"),
        loginSubmit = getDocElem("#loginSumbit");
    // 登录操作
    loginSubmit.onclick = function() {
        _login();
    }
    // 键盘操作
    userPass.onkeypress = function(e){
        if(e.key === "Enter"){
            _login();
        }
    }
}