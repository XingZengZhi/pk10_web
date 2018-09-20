window.onload = function(){
    var _login = function() {
        layui.use('layer', function(){
            var layer = layui.layer;
            if(userName.value === '' || userPass === '') {
                layer.msg("账户或密码不能为空！");
            } else {
                $.post("http://120.79.46.90:8080/game/user/login.do",{
                    "account":$("#userName").val(),
                    "password":$("#userPass").val()
                }, function (data) {
                    if(data.code === '000000') {
                        // 用户ID
                        sessionStorage.id = data.result.id;
                        // 用户账号
                        sessionStorage.account = data.result.account;
                        // 用户姓名
                        sessionStorage.username = data.result.username;
                        // 手机号
                        sessionStorage.telephone = data.result.telephone;
                        // 支付宝收款码
                        sessionStorage.alipaypic = data.result.alipaypic;
                        // 微信收款码
                        sessionStorage.weixinpic = data.result.weixinpic;
                        // 银行卡号
                        sessionStorage.bankNum = data.result.bankNum;
                        // 银行名称
                        sessionStorage.bankName = data.result.bankName;
                        // 中心积分
                        sessionStorage.jfcenter = data.result.jfcenter;
                        // 任务积分
                        sessionStorage.jftask = data.result.jftask;
                        // 交易积分
                        sessionStorage.jfbusiness = data.result.jfbusiness;
                        // 注册积分
                        sessionStorage.jfzhuce = data.result.jfzhuce;
                        // 任务密钥
                        sessionStorage.taskToken = data.result.taskToken;
                        // 已使用密钥
                        sessionStorage.usedtoken = data.result.usedtoken;
                        // 原注册积分
                        sessionStorage.jfold = data.result.jfold;
                        var loadIndex = layer.load(1);
                        setTimeout(function(){
                            layer.close(loadIndex);
                            var path = location.href.substring(0, location.href.lastIndexOf('/'));
                            location.href = path + "/view/main.html";
                        }, 1000);
                        // 后台登录操作
                    } else {
                        layer.msg(data.message);
                    }
                });
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