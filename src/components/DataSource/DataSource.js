const noop = () => {}

class DataSource {
  
  constructor (options) {
    this.transport = options.transport || {}
    this.events = options.events || {}
    
    this.defaultData = {}

    this.eventsMap = {
      read: {
        did: 'onFetched',
      },
      save: {
        did: 'onFormDidSubmit',
      },
    }
  }
  
  setDefaultData (data) {
    this.defaultData = data
  }

  parse (data) {
    return this.transport.parse ? this.transport.parse(data) : (data.root ? data.root : data )
  }

  format (data, type) {
    return this.transport.format ? this.transport.format(data, type) : data
  }

  getAjaxOption (type, data) {
    let option = null
    if (this.transport) {
      let method = this.transport[type]
      if (method) {
        option = 'string' === typeof method ? ({url: method}) : method()
        option.data = _.extend({}, this.defaultData, option.data, data)
      }
    }

    return option
  }

  getEventNameByPath (path) {
    let target =  _.extend({}, this.eventsMap)
    while (path.length) {
      let name = path.shift()
      target = target[name]
    }
    return target
  }

  getEventName (path) {
    let paths = path.split('.')
    let name = 1 === paths.length ? paths[0] : this.getEventNameByPath(paths)
    return this.events[name] || noop
  }

  request (type, data, callback) {
    if ('function' === typeof data) {
      callback = data
      data = {}
    }

    let option = this.getAjaxOption(type, data)
    let hook = this.getEventName(`${type}.did`)

    option && ajax(option, resp => {
      callback && callback(resp)
      hook(resp)
      callback && callback(this.parse(resp))
    }, err => {
      hook(false, err)
      callback && callback(false, err)
    })
  }

  read (data, callback) {
    this.request('read', data, callback)
  }

  save (data, callback) {
    if ('function' === typeof data) {
      callback = data
      data = {}
    }
    
    data = this.format(data, 'save')
    let beforeSubmit = this.getEventName('onFormWillSubmit')

    if (2 === beforeSubmit.length) {
      beforeSubmit(data, () => {
        this.request('save', data, callback)
      })
    } else {
      if (false !== beforeSubmit(data)) {
        this.request('save', data, callback)
      }
    }
  }

}

export default DataSource

