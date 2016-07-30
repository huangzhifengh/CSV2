import React, { Component } from 'react'
import styles from './App.css'
import withStyles from 'with-style'
import Header from '../Header'
import Footer from '../Footer'
import TreeLikeUI from 'components/TreeLikeUI'
import eventBus from '../../eventBus'
import config from '../../../config'

@withStyles(styles)
class App extends Component {

  componentDidMount () {
    this.initSocket()
  }

  initSocket () {
    let socket = config.socket
    global.socket = new WebSocket(`${socket.protocal}://${socket.target}:${socket.targetPort}${socket.prefix}`)
    global.socket.onopen = e => {
      console.info('[SOCKET]', 'SOCKET HAS CONNECTED')
    }
    global.socket.onmessage = e => {
      try {
        let socketMsg = JSON.parse(e.data)
        eventBus.emit('socketMsg', socketMsg)
      } catch (err) {
        throw new Error(err)
      }
    }
  }
  
  render () {
    return <div className="container">
      <aside className="tree-ui-container">
        <TreeLikeUI data={'/api/resources/tree?resourcesType=menu'}/>
      </aside>
      <Header />
      <div className="main">
        {this.props.children}
      </div>
    </div>
  }

}

export default App

