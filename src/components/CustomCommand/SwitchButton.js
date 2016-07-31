import React, { Component, PropTypes } from 'react'
import styles from './SwitchButton.css'
import withStyles from 'with-style'

@withStyles(styles)
class SwitchButton extends Component {

  static propTypes = {
    name: PropTypes.string,
    checked: PropTypes.bool,
    onClick: PropTypes.func
  }

  render () {
    let { name, checked, onClick} = this.props

    return (<label className="switch-btn">
      <input type="checkbox" name={name} className="ios-switch green tinyswitch" defaultChecked={checked} onChange={onClick}/>
      <div>
        <div></div>
      </div>
    </label>)
  }

}

export default SwitchButton
