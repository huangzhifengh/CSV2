module.exports = {
  cookie: {
    setCookie: function (key, value, expires) {
      if (!expires) {
        expires = 0;
      }

      var date = new Date();
      date.setTime(date.getTime() + expires);
      var set_cookie = [
        key, "=", value];

      if (expires) {
        set_cookie.push("; expires=", date.toGMTString());
      }
      set_cookie = set_cookie.concat("; path=", '/');

      document.cookie = set_cookie.join('');
    },
    getCookie: function (key) {
      var escaped = key.replace(/(\.|\*|\(|\)|\[|\])/g, '\\$1');
      var match = document.cookie.match("(^|;\\s)" + escaped + "=([^;]*)(;|$)");
      return (match ? match[2] : null);
    }
  },
  localStore: {
    isAvailable: function() {
      return ('localStorage' in window) && (window.location.protocol != 'file:');
    },
    exists: function(key) {
      return (this.get(key) !== null);
    },
    set: function(key, value) {
      return window.localStorage.setItem(this._key(key), value);
    },
    get: function(key) {
      return window.localStorage.getItem(this._key(key));
    },
    clear: function(key) {
      window.localStorage.removeItem(this._key(key));
    },
    _key: function(key) {
      return ['YBM', 'store', key].join('.');
    }
  }
}
