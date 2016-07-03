import React from 'react'
import Page from 'base-page'
import Tabel from 'components/Table'

class Job extends Page {

  render () {
    return this.props.children || <div>deive</div>
  }

}

module.exports = Job
