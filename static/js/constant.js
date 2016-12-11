// var urlHead = "http://hm.runorout.com/";
var map = {
    getUrlHead: function(){
        return 'http://hm.runorout.com';
    },
    getClassListDemo: function(){
        return this.getUrlHead() + '/init/v2/teams';
    },
}

//截取url参数
$.getUrlParam = function(name) { //获取url参数
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
}

//检测动画是否完成
$.fn.transitionEnd = function(callback) {
    var events = ['webkitTransitionEnd', 'transitionend'],
        i, dom = this;

    function fireCallBack(e) {
        /*jshint validthis:true */
        if (e.target !== this) return;
        callback.call(this, e);
        for (i = 0; i < events.length; i++) {
            dom.off(events[i], fireCallBack);
        }
    }
    if (callback) {
        for (i = 0; i < events.length; i++) {

            dom.on(events[i], fireCallBack);
        }
    }
    return this;
};

//校验手机号
function checkTel(value) {
    var isMob = /^((\+?86)|(\(\+86\)))?(13[0123456789][0-9]{8}|15[0123456789][0-9]{8}|18[0123456789][0-9]{8}|17[0123456789][0-9]{8}|147[0-9]{8}|1349[0-9]{7})$/;
    if (isMob.test(value)) {
        return true;
    } else {
        return false;
    }
}

function setLocalStorage(key, value) {
    window.sessionStorage[key] = value;
}

function getLocalStorage(key, defaultValue) {
    return window.sessionStorage[key] || defaultValue;
}

function removeLocalStorage(key) {
    window.sessionStorage.removeItem(key);
}

function setCookie(c_name, value, expiredays) {
    //alert(c_name)
    var exdate = new Date();
    exdate.setDate(exdate.getDate() + expiredays);
    document.cookie = c_name + "=" + escape(value) + ((expiredays == null) ? "" : ";expires=" + exdate.toGMTString())
}

//取回cookie
function getCookie(c_name) {
    if (document.cookie.length > 0) {
        c_start = document.cookie.indexOf(c_name + "=");
        if (c_start != -1) {
            c_start = c_start + c_name.length + 1
            c_end = document.cookie.indexOf(";", c_start)
            if (c_end == -1) c_end = document.cookie.length
            return unescape(document.cookie.substring(c_start, c_end))
        }
    }
    return ""
}

function delCookie(name) {
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval = getCookie(name);
    if (cval != null)
        document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
}
//转化为两位小数
function toDecimal2(x) {
    var resalt = "";
    if (x != null && x != "") {
        var f = parseFloat(x);
        if (isNaN(f)) {
            return false;
        }
        var f = Math.round(x * 100) / 100;
        var s = f.toString();
        var rs = s.indexOf('.');
        if (rs < 0) {
            rs = s.length;
            s += '.';
        }
        while (s.length <= rs + 2) {
            s += '0';
        }
        resalt = s;
    } else {
        resalt = "0.00"
    }
    return resalt;
}

function toMonth(value) {
    var arr = value.split("-");
    return (arr[1] + "." + arr[2]);
}

//时间戳转日期
function getLocalTime(nS) {
    var now = new Date(parseInt(nS) * 1000);
    var year = now.getFullYear();
    var month = now.getMonth() + 1;
    if (month < 10) {
        month = "0" + month;
    }
    var date = now.getDate();
    if (date < 10) {
        date = "0" + date;
    }
    var hour = now.getHours();
    if (hour < 10) {
        hour = "0" + hour;
    }
    var minute = now.getMinutes();
    if (minute < 10) {
        minute = "0" + minute;
    }
    var second = now.getSeconds();
    if (second < 10) {
        second = "0" + second;
    }
    return year + "-" + month + "-" + date + " " + hour + ":" + minute;
}

//检测是否为两位小数
function checkMoney(s) {
    var temp = /^[0-9]*(\.[0-9]{1,2})?$/;
    var isTrue = true;
    if (!temp.test(s)) {
        isTrue = false;
    }
    return isTrue;
}

function checkAge(value) {
    var r = /^[-+]?\d*$/;
    if (r.test(value)) {
        return true;
    } else {
        return false;
    }
}

function getToday() {
    var today = new Date();
    var month = today.getMonth() + 1;

    if (month < 10) {
        month = "0" + month;
    }
    var day = today.getDate();
    if (day < 10) {
        day = "0" + day;
    }
    return today.getFullYear() + "-" + (month) + "-" + day;
}

function addByTransDate(dateParameter, num) { //dateParameter是2006-12-18格式 
    var translateDate = "",
        dateString = "",
        monthString = "",
        dayString = "";
    translateDate = dateParameter.replace("-", "/").replace("-", "/");
    var newDate = new Date(translateDate);
    newDate = newDate.valueOf();
    newDate = newDate + num * 24 * 60 * 60 * 1000;
    newDate = new Date(newDate);
    //如果月份长度少于2，则前加 0 补位   
    if ((newDate.getMonth() + 1).toString().length == 1) {
        monthString = 0 + "" + (newDate.getMonth() + 1).toString();
    } else {
        monthString = (newDate.getMonth() + 1).toString();
    }
    //如果天数长度少于2，则前加 0 补位   
    if (newDate.getDate().toString().length == 1) {
        dayString = 0 + "" + newDate.getDate().toString();
    } else {
        dayString = newDate.getDate().toString();
    }
    dateString = newDate.getFullYear() + "-" + monthString + "-" + dayString;
    return dateString;
}

function DateDiff(startDate, endDate) {
    // console.log(startDate + "," + endDate);
    var startTime = new Date(Date.parse(startDate.replace(/-/g, "/"))).getTime();
    var endTime = new Date(Date.parse(endDate.replace(/-/g, "/"))).getTime();
    var dates = ((startTime - endTime)) / (1000 * 60 * 60 * 24);
    return dates;
}

/* 加载loading引入 */

