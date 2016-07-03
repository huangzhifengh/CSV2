$.loading = function() {
  $('.loading-overlay').addClass('show')
}

$.loaded = function() {
  $('.loading-overlay').removeClass('show')
}

Date.prototype.toString = function(format, loc) {
  var time = {};
  time.Year = this.getFullYear();
  time.TYear = ("" + time.Year).substr(2);
  time.Month = this.getMonth() + 1;
  time.TMonth = time.Month < 10 ? "0" + time.Month : time.Month;
  time.Day = this.getDate();
  time.TDay = time.Day < 10 ? "0" + time.Day : time.Day;
  time.Hour = this.getHours();
  time.THour = time.Hour < 10 ? "0" + time.Hour : time.Hour;
  time.hour = time.Hour < 13 ? time.Hour : time.Hour - 12;
  time.Thour = time.hour < 10 ? "0" + time.hour : time.hour;
  time.Minute = this.getMinutes();
  time.TMinute = time.Minute < 10 ? "0" + time.Minute : time.Minute;
  time.Second = this.getSeconds();
  time.TSecond = time.Second < 10 ? "0" + time.Second : time.Second;
  time.Millisecond = this.getMilliseconds();
  time.Week = this.getDay();

  var MMMArrEn = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  var MMMArr = ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"];
  var WeekArrEn = ["Sun", "Mon", "Tue", "Web", "Thu", "Fri", "Sat"];
  var WeekArr = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];

  var oNumber = time.Millisecond / 1000;

  if (format != undefined && format.replace(/\s/g, "").length > 0) {
    if (loc != undefined && loc == "en") {
      MMMArr = MMMArrEn.slice(0);
      WeekArr = WeekArrEn.slice(0);
    }
    format = format
      .replace(/yyyy/ig, time.Year)
      .replace(/yyy/ig, time.Year)
      .replace(/yy/ig, time.TYear)
      .replace(/y/ig, time.TYear)
      .replace(/MMM/g, MMMArr[time.Month - 1])
      .replace(/MM/g, time.TMonth)
      .replace(/M/g, time.Month)
      .replace(/dd/ig, time.TDay)
      .replace(/d/ig, time.Day)
      .replace(/HH/g, time.THour)
      .replace(/H/g, time.Hour)
      .replace(/hh/g, time.Thour)
      .replace(/h/g, time.hour)
      .replace(/mm/g, time.TMinute)
      .replace(/m/g, time.Minute)
      .replace(/ss/ig, time.TSecond)
      .replace(/s/ig, time.Second)
      .replace(/fff/ig, time.Millisecond)
      .replace(/ff/ig, oNumber.toFixed(2) * 100)
      .replace(/f/ig, oNumber.toFixed(1) * 10)
      .replace(/EEE/g, WeekArr[time.Week]);
  } else {
    format = time.Year + "-" + time.Month + "-" + time.Day + " " + time.Hour + ":" + time.Minute + ":" + time.Second;
  }
  return format;
}

// array some polyfill
if (!Array.prototype.some) {
  Array.prototype.some = function(fun) {
    'use strict';

    if (this === void 0 || this === null)
      throw new TypeError();

    var t = Object(this);
    var len = t.length >>> 0;
    if (typeof fun !== 'function')
      throw new TypeError();

    var thisArg = arguments.length >= 2 ? arguments[1] : void 0;
    for (var i = 0; i < len; i++) {
      if (i in t && fun.call(thisArg, t[i], i, t))
        return true;
    }

    return false;
  };
}

// Promise polyfill
if (!('Promise' in window)) {
  (function (root) {
    // Store setTimeout reference so promise-polyfill will be unaffected by
    // other code modifying setTimeout (like sinon.useFakeTimers())
    var setTimeoutFunc = setTimeout;

    function noop() {
    }

    // Use polyfill for setImmediate for performance gains
    var asap = (typeof setImmediate === 'function' && setImmediate) ||
      function (fn) {
        setTimeoutFunc(fn, 1);
      };

    var onUnhandledRejection = function onUnhandledRejection(err) {
      console.warn('Possible Unhandled Promise Rejection:', err); // eslint-disable-line no-console
    };

    // Polyfill for Function.prototype.bind
    function bind(fn, thisArg) {
      return function () {
        fn.apply(thisArg, arguments);
      };
    }

    var isArray = Array.isArray || function (value) {
        return Object.prototype.toString.call(value) === '[object Array]';
      };

    function Promise(fn) {
      if (typeof this !== 'object') throw new TypeError('Promises must be constructed via new');
      if (typeof fn !== 'function') throw new TypeError('not a function');
      this._state = 0;
      this._handled = false;
      this._value = undefined;
      this._deferreds = [];

      doResolve(fn, this);
    }

    function handle(self, deferred) {
      while (self._state === 3) {
        self = self._value;
      }
      if (self._state === 0) {
        self._deferreds.push(deferred);
        return;
      }
      self._handled = true;
      asap(function () {
        var cb = self._state === 1 ? deferred.onFulfilled : deferred.onRejected;
        if (cb === null) {
          (self._state === 1 ? resolve : reject)(deferred.promise, self._value);
          return;
        }
        var ret;
        try {
          ret = cb(self._value);
        } catch (e) {
          reject(deferred.promise, e);
          return;
        }
        resolve(deferred.promise, ret);
      });
    }

    function resolve(self, newValue) {
      try {
        // Promise Resolution Procedure: https://github.com/promises-aplus/promises-spec#the-promise-resolution-procedure
        if (newValue === self) throw new TypeError('A promise cannot be resolved with itself.');
        if (newValue && (typeof newValue === 'object' || typeof newValue === 'function')) {
          var then = newValue.then;
          if (newValue instanceof Promise) {
            self._state = 3;
            self._value = newValue;
            finale(self);
            return;
          } else if (typeof then === 'function') {
            doResolve(bind(then, newValue), self);
            return;
          }
        }
        self._state = 1;
        self._value = newValue;
        finale(self);
      } catch (e) {
        reject(self, e);
      }
    }

    function reject(self, newValue) {
      self._state = 2;
      self._value = newValue;
      finale(self);
    }

    function finale(self) {
      if (self._state === 2 && self._deferreds.length === 0) {
        setTimeout(function() {
          if (!self._handled) {
            onUnhandledRejection(self._value);
          }
        }, 1);
      }

      for (var i = 0, len = self._deferreds.length; i < len; i++) {
        handle(self, self._deferreds[i]);
      }
      self._deferreds = null;
    }

    function Handler(onFulfilled, onRejected, promise) {
      this.onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : null;
      this.onRejected = typeof onRejected === 'function' ? onRejected : null;
      this.promise = promise;
    }

    /**
     * Take a potentially misbehaving resolver function and make sure
     * onFulfilled and onRejected are only called once.
     *
     * Makes no guarantees about asynchrony.
     */
    function doResolve(fn, self) {
      var done = false;
      try {
        fn(function (value) {
          if (done) return;
          done = true;
          resolve(self, value);
        }, function (reason) {
          if (done) return;
          done = true;
          reject(self, reason);
        });
      } catch (ex) {
        if (done) return;
        done = true;
        reject(self, ex);
      }
    }

    Promise.prototype['catch'] = function (onRejected) {
      return this.then(null, onRejected);
    };

    Promise.prototype.then = function (onFulfilled, onRejected) {
      var prom = new Promise(noop);
      handle(this, new Handler(onFulfilled, onRejected, prom));
      return prom;
    };

    Promise.all = function () {
      var args = Array.prototype.slice.call(arguments.length === 1 && isArray(arguments[0]) ? arguments[0] : arguments);

      return new Promise(function (resolve, reject) {
        if (args.length === 0) return resolve([]);
        var remaining = args.length;

        function res(i, val) {
          try {
            if (val && (typeof val === 'object' || typeof val === 'function')) {
              var then = val.then;
              if (typeof then === 'function') {
                then.call(val, function (val) {
                  res(i, val);
                }, reject);
                return;
              }
            }
            args[i] = val;
            if (--remaining === 0) {
              resolve(args);
            }
          } catch (ex) {
            reject(ex);
          }
        }

        for (var i = 0; i < args.length; i++) {
          res(i, args[i]);
        }
      });
    };

    Promise.resolve = function (value) {
      if (value && typeof value === 'object' && value.constructor === Promise) {
        return value;
      }

      return new Promise(function (resolve) {
        resolve(value);
      });
    };

    Promise.reject = function (value) {
      return new Promise(function (resolve, reject) {
        reject(value);
      });
    };

    Promise.race = function (values) {
      return new Promise(function (resolve, reject) {
        for (var i = 0, len = values.length; i < len; i++) {
          values[i].then(resolve, reject);
        }
      });
    };

    /**
     * Set the immediate function to execute callbacks
     * @param fn {function} Function to execute
     * @private
     */
    Promise._setImmediateFn = function _setImmediateFn(fn) {
      asap = fn;
    };

    Promise._setUnhandledRejectionFn = function _setUnhandledRejectionFn(fn) {
      onUnhandledRejection = fn;
    };

    root.Promise = Promise;

  })(window);
}

window.Alert = () => {}
