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
    }
});