
(function () {
    var exp1 = new Error('Key not string');
    var exp2 = new Error('Value not string or number');
    var exp3 = new Error('Wrong number of parameters');
    var exp4 = new Error('Key not found');
    var exp5 = new Error('Wrong Date');





    var clib = {};
    clib.getCookie = function (key) {
        if (arguments.length != 1) {
            throw exp3;
        }
        if (typeof key != 'string') {
            throw exp1;
        }
        key = encodeURIComponent(key);
        var regex = `(^|;)\\s*${key}\\s*=\\s*([^;]+)`;
        var match = document.cookie.match(new RegExp(regex));
        if (match) {
            return decodeURIComponent(match[2]);
        } else {
            throw exp4;
            // return null;
        }
    }

    clib.setCookie = function (key, value, date) {
        if (arguments.length != 2 && arguments.length != 3) {
            throw exp3;
        }
        if (typeof key != 'string') {
            throw exp1;
        }
        if (typeof value != 'string' && typeof value != 'number') {
            throw exp2;
        }
        // console.log(date instanceof Date);
        if (arguments.length == 3 && !(date instanceof Date)) {
            throw exp5;
        }
        key = encodeURIComponent(key);
        value = encodeURIComponent(value);
        // date = date.toUTCString();
        if (arguments[2] !== undefined) {
            date = date.toUTCString();
            document.cookie = `${key}=${value};expires=${date}`;
        } else {
            document.cookie = `${key}=${value}`;
        }
    }

    clib.deleteCookie = function (key) {
        if (arguments.length != 1) {
            throw exp3;
        }
        if (typeof key != 'string') {
            throw exp1;
        }
        key = encodeURIComponent(key);

        var regex = `(^|;)\\s*${key}\\s*=\\s*([^;]+)`;
        var match = document.cookie.match(new RegExp(regex));
        if (match) {
            // return decodeURIComponent(match[2]);
            document.cookie = `${key}= ; expires = Thu, 01 Jan 1970 00:00:00 GMT`;
        } else {
            throw exp4;
            // return null;
        }

    }

    clib.removeAllCookies = function () {
        if (arguments.length != 0) {
            throw exp3;
        }
        var str = document.cookie;
        var regex = `(^|;)\\s*([^=]+)\\s*=\\s*([^;]+)`;
        var re = new RegExp(regex, 'g');
        var retArr = [];
        var myArray;
        while (myArray = re.exec(str)) {
            var key = myArray[2];
            document.cookie = `${key}= ; expires = Thu, 01 Jan 1970 00:00:00 GMT`;
        }
        return retArr;
    }


    clib.allCookieList = function () {
        if (arguments.length != 0) {
            throw exp3;
        }
        var str = document.cookie;
        var regex = `(^|;)\\s*([^=]+)\\s*=\\s*([^;]+)`;
        var re = new RegExp(regex, 'g');
        var retArr = [];
        var myArray;
        while (myArray = re.exec(str)) {
            var key = decodeURIComponent(myArray[2]);
            var val = decodeURIComponent(myArray[3]);
            retArr[key] = val;
        }
        return retArr;
    }

    clib.hasCookie = function (key) {
        if (arguments.length != 1) {
            throw exp3;
        }
        if (typeof key != 'string') {
            throw exp1;
        }
        key = encodeURIComponent(key);
        var regex = `(^|;)\\s*${key}\\s*=\\s*([^;]+)`;
        var match = document.cookie.match(new RegExp(regex));
        if (match) {
            return true;
        } else {
            return false;
        }
    }

    var _clib = window.clib;
    clib.noConflict = function () {
        if (window.clib === clib) {
            window.clib = _clib;
        }
        return clib;
    };
    window.clib = clib;
})();