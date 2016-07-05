import React, { Component } from 'react'
import SwitchButton from './SwitchButton'
import HeartButton from './HeartButton'

class CustomCommand extends Component {
  
  static propTypes = {
    onClick: React.PropTypes.func
  }

  render() {

    let { onClick, type, text } = this.props

    let props = {
      onClick: onClick,
      ...this.props,
    }

    switch (type) {
      case 'switch':
        return <SwitchButton {...props} />
        break
      case 'heartBtn':
        return <HeartButton {...props} />
        break
      default:
        return <a className="btn btn-link btn-xs" onClick={onClick}>{text}</a> 
    }
  }

}

export default CustomCommand

