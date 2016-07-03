import React, { Component } from 'react'
import SwitchButton from './SwitchButton'
import HeartButton from './HeartButton'

class CustomCommand extends Component {
  
  static propTypes = {
    config: React.PropTypes.object.isRequired,
    onClick: React.PropTypes.func
  }

  render() {
    let props = {
      config: this.props.config,
      onClick: this._onClick.bind(this),
      value: this.props.value
    }

    switch (this.props.config.type) {
      case 'switch':
        return <SwitchButton {...props} />
        break
      case 'heartBtn':
        return <HeartButton {...props} />
        break
      default:
        return <a className="btn btn-link btn-xs" onClick={this._onClick.bind(this)}>{this.props.config.text}</a> 
    }
  }

  _onClick (e) {
    this.props.onClick(e, this.props.config.name)
  }

}

export default CustomCommand

