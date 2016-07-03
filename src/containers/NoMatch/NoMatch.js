import React from 'react'
import Page from 'base-page'

class NoMatch extends Page {

  render () {
    return <div>哟!页面呢？我也不知道.我猜你一定把地址搞错了。 小黄改一下这个404页面的样式</div>
  }

  componentDidMount () {
    this.loaded()
  }

}

export default NoMatch
