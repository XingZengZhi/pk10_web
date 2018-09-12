(function(){
    /**
     * lotteryTime 是开奖时间
     * dataTime 开奖时间字符串数组
     * m 开奖分钟，s 开奖秒数
     * getTime 倒计时函数
     * 
     */
    var lotteryTime = '10:09';

    var dataTime = lotteryTime.split(':');

    var m = parseInt(dataTime[0]), s = parseInt(dataTime[1]); 

    var openLottery = document.getElementById("openLottery");

    var time = setTimeout(getTime, 1000);

    function getTime(){
        if(s == 0){
            s = 60;
            m--;
        }
        s--;
        openLottery.innerText = (m < 10? '0' + m : m) + ':' + (s < 10? '0' + s : s);
        if(m == 0 && s == 0){
            clearTimeout(time);
            return;
        }
        time = setTimeout(getTime, 1000);
    }

})(window, document);

