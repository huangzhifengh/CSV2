import React from 'react'
import Page from 'base-page'

class NoMatch extends Page {

  render () {
    return <div>404 not found</div>
  }

  componentDidMount () {
    this.loaded()
  }

}

export default NoMatch
