class DataSource {
  
  constructor (options) {
    _.extend(this, {}, {
      transport: {},
      idField: 'id',
    }, options)

    this.activeData = null
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
      let option = 'string' === typeof method ? ({url: method}) : method(this.activeData)
      option.data = _.extend({}, this.filter, option.data, data)
      return option
    }
    return null
  }

  getEvent (name) {
    return this[name] || (() => {})
  }

  request (type, data, callback) {
    let option = this.getAjaxOption(type, data)
    if (option) {
      let did_hook = this.getEvent('requestEnd')
      ajax(option, resp => {
        did_hook(type, resp)
        callback && callback(this.parse(resp))
      }, err => {
        did_hook(type, false, err)
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
    let will_hook = this.getEvent('requestStart')
    if (3 === will_hook.length) {
      will_hook(type, data, () => {
        this.request(type, data, callback)
      })
    } else {
      if (false !== will_hook(type, data)) {
        this.request(type, data, callback)
      }
    }
  }


  /***APIs***/
  read (data, callback) {
    this.prepare('read', data, resp => {
      let data = resp
      if (resp.data) data = resp.data
      this.data = data
      callback && callback(resp)
    })
  }

  readDefault (data, callback) {
    if (this.getAjaxOption('detail')) {
      this.prepare('detail', data, callback)
    } else {
      this.prepare('read', data, callback)
    }
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
    this.prepare('destroy', {[id ? 'ids' : 'nothing']: id}, callback)
  }

  sync () {
    this.prepare('read', resp => {
      this.getEvent('refreshHook')(resp)
    })
  }

  filter (filter) {
    this.filter = filter
    this.sync()
  }

  setActiveData (data) {
    this.activeData = data
  }

  setRefreshHook (hook) {
    this.refreshHook = hook 
  }
  /***APIs end***/

}

export default DataSource

