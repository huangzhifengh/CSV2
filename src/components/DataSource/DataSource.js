const noop = () => {}

class DataSource {
  
  constructor (options) {
    options = options = {}
    this.transport = options.transport || {}
    this.events = options.events || {}
    
    this._data = options.data
    this.requestData = options.requestData
  }
  
  setRequestData (data) {
    this.requestData = data
  }

  parse (data) {
    return this.transport.parse ? this.transport.parse(data) : data
  }

  format (data, type) {
    return this.transport.format ? this.transport.format(data, type) : data
  }

  getAjaxOption (type, data) {
    let method = this.transport[type]
    if (method) {
      let option = 'string' === typeof method ? ({url: method}) : method()
      option.data = _.extend({}, this.requestData, option.data, data)
      return option
    }
    return null
  }

  getEventName (path) {
    let paths = path.split('.')
    let name = ['on', 'data', paths[0], paths[1]].join('-').replace(/-(\w)/g, (a, b) => b.toUpperCase())
    return this.events[name] || noop
  }

  request (type, data, callback) {
    let option = this.getAjaxOption(type, data)
    if (option) {
      let did_hook = this.getEventName(`did.${type}`)
      ajax(option, resp => {
        callback && callback(resp)
        did_hook(resp)
        callback && callback(this.parse(resp))
      }, err => {
        did_hook(false, err)
        callback && callback(false, err)
      })
    }
  }

  prepare (type, data, callback) {
    if ('function' === typeof data) {
      callback = data
      data = {}
    }

    data = this.format(data, type)
    let will_hook = this.getEventName(`will.${type}`)
    if (2 === will_hook.length) {
      will_hook(data, () => {
        this.request(type, data, callback)
      })
    } else {
      if (false !== will_hook(data)) {
        this.request(type, data, callback)
      }
    }
  }

  read (data, callback) {
    this.prepare('read', data, callback)
  }

  save (data, callback) {
    this.prepare('save', data, callback)
  }

  create (data, callback) {
    this.prepare('create', data, callback)
  }

  update (data, callback) {
    this.prepare('update', data, callback)
  }

  destroy (id, callback) {
    this.prepare('destroy', { id }, callback)
  }

}

export default DataSource

