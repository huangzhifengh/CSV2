import DataSource from '../DataSource'
import eventBus from '../../eventBus'

class DataSourceWithSocket extends DataSource {

  constructor (options) {
    super(options)

    this.requestEnd = (type, resp, err) => {
      if ('read' === type) {
        if (resp) {
          let data = this.parse(resp)
          this.data = data.data || data
        }
      }
      options.requestEnd && options.requestEnd.call(this, arguments)
    }

    this.onSocketMsg = msg => {
      let index = _.findIndex(this.data, {
        id: msg.data.id
      })
      if (msg.data && -1 !== index) {
        console.info('[SOCKET]', 'NEW DATA MACTHED')
        this.data[index] = msg.data
        this.sync(this.data)
      }
    }

    this.listenSocketMsg()
  }

  listenSocketMsg () {
    eventBus.on('socketMsg', this.onSocketMsg)
  }

  sync (data) {
    if (data) {
      this.getEvent('refreshHook')({
        data: data,
      })
    } else {
      this.prepare('read', resp => {
        this.getEvent('refreshHook')(resp)
      })
    }
  }

  removeListeners () {
    eventBus.removeListener('socketMsg', this.onSocketMsg)
  }

}

export default DataSourceWithSocket
