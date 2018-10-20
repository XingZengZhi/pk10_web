var golobalURL = "http://120.79.46.90:8080";

var userInfo = new Vue({
    el:"#userInfoList",
    data:{
        // 用户ID
        id:"",
        // 用户账号
        account:"",
        // 用户姓名
        username:"",
        // 手机号
        telephone:"",
        // 支付宝收款码
        alipaypic:"",
        // 微信收款码
        weixinpic:"",
        // 银行卡号
        bankNum:"",
        // 银行名称
        bankName:"",
        // 中心积分
        jfcenter:"",
        // 任务积分
        jftask:"",
        // 交易积分
        jfbusiness:"",
        // 注册积分
        jfzhuce:"",
        // 任务密钥
        taskToken:"",
        // 已使用密钥
        usedtoken:"",
        // 原注册积分
        jfold:"",
        // 加载索引
        loadIndex:""
    },
    methods:{
        loadUserInfo:function(){
            layui.use('layer', function(){
                var layer = layui.layer;
                this.loadIndex = layer.load(2);
            });
        },
        cacelLoad:function(){
            layui.use('layer', function(){
                var layer = layui.layer;
                if(this.loadIndex == '') {
                    console.error('非法调用！');
                } else {
                    $("#userInfoList li span:last-child").fadeIn(0);
                    layer.close(this.loadIndex);
                }
            });
        }
    }
});

// 中心积分报表
var inputJfList = new Vue({
    el:"#inputJfList",
    data:{
        items:""
    }
});
var outJfputList = new Vue({
    el:"#outJfputList",
    data:{
        items:""
    }
});

var renwuinputList = new Vue({
    el:"#renwuinputList",
    data:{
        items:[]
    }
});

var renwuoutputList = new Vue({
    el:"#renwuoutputList",
    data:{
        items:[]
    }
});

var inputList = new Vue({
    el:"#inputList",
    data:{
        items:[]
    }
});

var inputguamaiList = new Vue({
    el:"#inputguamaiList",
    data:{
        items:[]
    }
});
var outputguamaiList = new Vue({
    el:"#outputguamaiList",
    data:{
        items:[]
    }
});



// 全局参数刷新
var globalInfo = {
    updateSession:function() {
        $.post("http://39.108.55.80:8081/user/getUsers?userId=" + sessionStorage.id, function(data){
            // 用户ID
            sessionStorage.id = data.result['id'];
            // 用户账号
            sessionStorage.account = data.result['account'];
            // 用户姓名
            sessionStorage.username = data.result['username'];
            // 手机号
            sessionStorage.telephone = data.result['telephone'];
            // 支付宝收款码
            sessionStorage.alipaypic = data.result['alipaypic'];
            // 微信收款码
            sessionStorage.weixinpic = data.result['weixinpic'];
            // 银行卡号
            sessionStorage.bankNum = data.result['bankNum'];
            // 银行名称
            sessionStorage.bankName = data.result['bankName'];
            // 中心积分
            sessionStorage.jfcenter = data.result['jfcenter'];
            // 任务积分
            sessionStorage.jftask = data.result['jftask'];
            // 交易积分
            sessionStorage.jfbusiness = data.result['jfbusiness'];
            // 注册积分
            sessionStorage.jfzhuce = data.result['jfzhuce'];
            // 任务密钥
            sessionStorage.taskToken = data.result['taskToken'];
            // 已使用密钥
            sessionStorage.usedtoken = data.result['usedtoken'];
            // 原注册积分
            sessionStorage.jfold =data.result['jfold'];

            updateUserInfo();
        });
    },
    jiaoyijifen:function(){
        $.post("http://39.108.55.80:8081/home/getBusiness",{
            userid:sessionStorage.id,
            type:1
        }, function(data){
            // console.log(data.result);
            if(data.code != '000000') {
                layui.use('layer', function(){
                    var layer = layui.layer;
                    layer.msg('挂卖数据加载失败，请重试');
                });
                console.error('挂卖数据加载失败');
                return;
            }
            inputguamaiList.items = data.result;
        });
        $.post("http://39.108.55.80:8081/home/getBusiness",{
            userid:sessionStorage.id,
            type:0
        }, function(data){
            // console.log(data.result);
            if(data.code != '000000') {
                layui.use('layer', function(){
                    var layer = layui.layer;
                    layer.msg('购买数据加载失败，请重试');
                });
                console.error('购买数据加载失败');
                return;
            }
            outputguamaiList.items = data.result;
        });
    },
    centerPage:function() {
        $.post("http://39.108.55.80:8081/jf/getCenterJf",{
            userId:sessionStorage.id,
            type:1
        }, function(data){
            if(data.code != '000000') {
                layui.use('layer', function(){
                    var layer = layui.layer;
                    layer.msg('转入积分数据加载失败，请重试');
                });
                console.error('转入积分数据加载失败');
                return;
            }
            // console.log(data.result);
            var dt = data.result;
            for(var i = 0;i < dt.length;i++) {
                dt[i].createdate = formateTimeStamp(dt[i].createdate);
            }
            outJfputList.items = dt;
        });
        $.post("http://39.108.55.80:8081/jf/getCenterJf",{
            userId:sessionStorage.id,
            type:0
        },function(data){
            // console.log(data.result);
            if(data.code != '000000') {
                layui.use('layer', function(){
                    var layer = layui.layer;
                    layer.msg('转出积分数据加载失败，请重试');
                });
                console.error('转出积分数据加载失败');
                return;
            }
            var dt = data.result;
            for(var i = 0;i < dt.length;i++) {
                dt[i].createdate = formateTimeStamp(dt[i].createdate);
            }
            inputJfList.items = dt;
        });
    },
    renwumiyao:function(){
        $.post("http://39.108.55.80:8081/home/getTokens",{
            account:sessionStorage.account
        }, function(data){
            console.log(data);
            if(data.code != '000000') {
                layui.use('layer', function(){
                    var layer = layui.layer;
                    layer.msg('任务密钥转入数据加载失败，请重试');
                });
                console.error('挂卖数据加载失败');
                return;
            }
            renwuinputList.items = data.result;
        });
        
        $.post("http://39.108.55.80:8081/home/getTokens",{
            userId:sessionStorage.id
        }, function(data){
            if(data.code != '000000') {
                layui.use('layer', function(){
                    var layer = layui.layer;
                    layer.msg('任务密钥转出数据加载失败，请重试');
                });
                console.error('挂卖数据加载失败');
                return;
            }
            renwuoutputList.items = data.result;
        });
    },
    renwujifen:function(){
        $.post("http://39.108.55.80:8081/home/getPools",{
            userId:sessionStorage.id
        }, function(data){
            if(data.code != '000000') {
                layui.use('layer', function(){
                    var layer = layui.layer;
                    layer.msg('任务积分报表数据加载失败，请重试');
                });
                return;
            }
            // console.log(data);
            inputList.items = data.result;
        });
    },
    getUserInfoByGlobal:function() { 
        userInfo.loadUserInfo();
        updateUserInfo();
        userInfo.cacelLoad();
    }
}

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

function updateUserInfo() {
    // 用户ID
    userInfo.id = sessionStorage.id,
    // 用户账号
    userInfo.account = sessionStorage.account,
    // 用户姓名
    userInfo.username = sessionStorage.username,
    // 手机号
    userInfo.telephone = sessionStorage.telephone,
    // 支付宝收款码
    userInfo.alipaypic = sessionStorage.alipaypic,
    // 微信收款码
    userInfo.weixinpic = sessionStorage.weixinpic,
    // 银行卡号
    userInfo.bankNum = sessionStorage.bankNum,
    // 银行名称
    userInfo.bankName = sessionStorage.bankName,
    // 中心积分
    userInfo.jfcenter = sessionStorage.jfcenter,
    // 任务积分
    userInfo.jftask = sessionStorage.jftask,
    // 交易积分
    userInfo.jfbusiness = sessionStorage.jfbusiness,
    // 注册积分
    userInfo.jfzhuce = sessionStorage.jfzhuce,
    // 任务密钥
    userInfo.taskToken = sessionStorage.taskToken,
    // 已使用密钥
    userInfo.usedtoken = sessionStorage.usedtoken,
    // 原注册积分
    userInfo.jfold = sessionStorage.jfold
}

setInterval(globalInfo.updateSession, 2000);

globalInfo.centerPage();
globalInfo.renwumiyao();
globalInfo.renwujifen();
globalInfo.jiaoyijifen();

// 警告制表符
console.warn(
    '\n┌---------------------------------------------------------------┐\n' + 
    '├\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t┤\n' +
    '├--------------请勿在此进行任何操作，以免带来不必要的损失！---------┤\n' +
    '├\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t┤\n' +
    '└---------------------------------------------------------------┘'
);

console.warn(
    '\n ヾ(￣▽￣)好人一生平安'
);