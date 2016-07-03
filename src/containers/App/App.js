import React, { Component } from 'react'
import styles from './App.css'
import withStyles from 'with-style'
import Header from '../Header'
import Footer from '../Footer'
import TreeLikeUI from 'components/TreeLikeUI'

@withStyles(styles)
class App extends Component {
  
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

