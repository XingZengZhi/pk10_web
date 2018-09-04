window.onload = function(){
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
        layui.use('layer', function(){
            var layer = layui.layer;
            if(userName.value === '' || userPass === '') {
                layer.msg("账户或密码不能为空！");
            } else {
                if(userName.value.toLowerCase() === userData.userName &&
                        userPass.value.toLowerCase() === userData.userPass) {
                    layer.load(1);
                    // 后台登录操作
                } else {
                    layer.msg("登录失败，请检查账户或密码");
                }
            }
        });
    }
}