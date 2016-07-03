import { cookie, localStore } from 'storeUtil'
import config from '../../config'

const SUCCESS = 0
const DEFAULT_TYPE = 'POST'
const LOCAL_STORE_STUB_FIELD = 'sign'
const NOT_MODIFIED = 'not modified'

const showWhatisWrong = (msg, url) => {
  if (!/(dologin|doauth|val)\.json$/.test(url)) {
    window.Alert({
      title: '请求错误',
      content: msg
    })
  }
}

const processTraditionParma = (data) => {
  _(data).each(function(reqData, reqName, data) {
    if (_(reqData).isArray()) {
      _(reqData).each(function(val, index) {
        if (_(val).isObject()) {
          _(val).each(function(value, prop) {
            data[reqName + '[' + index + '].' + prop] = value;
          });
        } else {
          data[reqName + '[' + index + ']'] = val;
        }
      });

      delete data[reqName];
    }
  })
}

const handleSuccess = (option, resp, xhr, success, fail, resolve, reject) => {
  if (!resp || (resp && resp.code === SUCCESS)) {
    if (NOT_MODIFIED === resp.msg) {
      let stub = localStore.get(option.localKey)
      let cache =  localStore.get(stub)

      if (!cache) {
        delete option.data[LOCAL_STORE_STUB_FIELD]
        ajax(option, resp => {
          resolve(resp)
        }, resp => {
          reject(resp)
        })
      } else {
        let jsonCache = {};
        try {
          jsonCache = JSON.parse(cache)
        } catch (err) {
          console.error('Error to parse cached request string')
        }

        success && success(jsonCache)
        resolve(jsonCache)
      }
    } else {
      if (option.localKey) {
        localStore.set(option.localKey, resp[LOCAL_STORE_STUB_FIELD])
        localStore.set(resp[LOCAL_STORE_STUB_FIELD], JSON.stringify(resp))
      }

      success && success(resp)
      resolve(resp)
    }
  } else {
    !fail && showWhatisWrong(resp.msg, option.url)
    fail && fail(resp)
    reject(resp)
  }
}

let queue = []

const ajax = (option, success, fail) => {
  const proxyConfig = config.proxy

  return new Promise((resolve, reject) => {

    if (!option.invisualize) {
      $.loading()
    }

    option = $.extend(true, {
      data: {
        token: cookie.getCookie('user_token') || ''
      }
    }, {
      type: DEFAULT_TYPE,
      dataType: 'json',
      success: (resp, status, xhr) => {
        handleSuccess(option, resp, xhr, success, fail, resolve, reject)
      },
      error: (resp) => {
        reject(resp)

        if (401 === resp.status) {
          window.location = '/#/login'
        } else if ('abort' === resp.statusText) {

        } else if (!fail) {
          showWhatisWrong(resp.responseJSON && resp.responseJSON.msg || '未知错误', option.url)
        } else {
          fail(resp)
        }
      }
    }, option)

    if (option.localKey) {
      let stub = localStore.get(option.localKey)
      if (stub) {
        option.data[LOCAL_STORE_STUB_FIELD] = stub
      }
    }

    if (option.tradition) {
      processTraditionParma(option.data)
    }

    let url = option.url
    url = (proxyConfig.prefix || '') + url
    if (proxyConfig.suffix) {
      url = url.replace('\?', proxyConfig.suffix + '?')
    }

    option.url = url

    let jqXHR = $.ajax(option).always(() => {
      queue.splice(Math.min(jqXHR.index, queue.length) - 1, 1)
      if (!queue.length) {
        $.loaded()
      }
    })

    let length = queue.push(jqXHR)
    jqXHR.index = length
  })
}

export default ajax

export function reset () {
  $.loaded()
  queue.forEach(item => {
    item.abort && item.abort()
  })

  queue = []
}
