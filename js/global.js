// 全局参数刷新
var globalInfo = {
    updateSession:function() {
        $.post("http://39.108.55.80:8081/user/getUsers?userId=" + sessionStorage.id, function(data){
            console.log(data);
            // 用户ID
            sessionStorage.id = data.result['id'],
            // 用户账号
            sessionStorage.account = data.result['account'],
            // 用户姓名
            sessionStorage.username = data.result['username'],
            // 手机号
            sessionStorage.telephone = data.result['telephone'],
            // 支付宝收款码
            sessionStorage.alipaypic = data.result['alipaypic'],
            // 微信收款码
            sessionStorage.weixinpic = data.result['weixinpic'],
            // 银行卡号
            sessionStorage.bankNum = data.result['bankNum'],
            // 银行名称
            sessionStorage.bankName = data.result['bankName'],
            // 中心积分
            sessionStorage.jfcenter = data.result['jfcenter'],
            // 任务积分
            sessionStorage.jftask = data.result['jftask'],
            // 交易积分
            sessionStorage.jfbusiness = data.result['jfbusiness'],
            // 注册积分
            sessionStorage.jfzhuce = data.result['jfzhuce'],
            // 任务密钥
            sessionStorage.taskToken = data.result['taskToken'],
            // 已使用密钥
            sessionStorage.usedtoken = data.result['usedtoken'],
            // 原注册积分
            sessionStorage.jfold =data.result['jfold']
        });
    }
}

// 警告制表符
console.log(
    '\n┌---------------------------------------------------------------┐\n' + 
    '├\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t┤\n' +
    '├--------------请勿在此进行任何操作，以免带来不必要的损失！---------┤\n' +
    '├\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t┤\n' +
    '└---------------------------------------------------------------┘'
);

console.log(
    '\n ヾ(￣▽￣)好人一生平安'
);