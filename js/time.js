(function(){
    /**
     * lotteryTime 是开奖时间
     * dataTime 开奖时间字符串数组
     * m 开奖分钟，s 开奖秒数
     * getTime 倒计时函数
     * 
     */
    var lotteryTime = '10:00', closeLotteryTime = '03:45';

    var dataTime = lotteryTime.split(':'), closeDataTime = closeLotteryTime.split(':');

    var m = parseInt(dataTime[0]), s = parseInt(dataTime[1]), cm = parseInt(closeDataTime[0]), cs = parseInt(closeDataTime[1]);

    var openLottery = document.getElementById("openLottery"), closeLottery = document.getElementById("closeLottery");

    var timer1, timer2;

    timer1 = setTimeout(getTime1, 1000);

    timer2 = setTimeout(getTime2, 1000);

    function getTime1(){
        if(s == 0){
            s = 60;
            m--;
        }
        s--;
        openLottery.innerText = (m < 10? '0' + m : m) + ':' + (s < 10? '0' + s : s);
        if(m == 0 && s == 0){
            clearTimeout(timer1);
            return;
        }
        timer1 = setTimeout(getTime1, 1000);
    }

    function getTime2(){
        if(cs == 0){
            cs = 60;
            cm--;
        }
        cs--;
        closeLottery.innerText = (cm < 10? '0' + cm : cm) + ':' + (cs < 10? '0' + cs : cs);
        if(cm == 0 && cs == 0){
            clearTimeout(timer2);
            return;
        }
        timer2 = setTimeout(getTime2, 1000);
    }


})(window, document);

