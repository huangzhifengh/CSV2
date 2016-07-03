import React, { Component, PropTypes } from 'react'
import styles from './SwitchButton.css'
import withStyles from 'with-style'

@withStyles(styles)
class SwitchButton extends Component {

  static propTypes = {
    config: React.PropTypes.object.isRequired,
    onClick: React.PropTypes.func
  }

  render () {
    /*<Toggle defaultToggled={true}/>*/
    return (<label className="switch-btn">
      <input type="checkbox" name={this.props.config.name} className="ios-switch green tinyswitch" defaultChecked={false} onChange={this.props.onClick}/>
      <div>
        <div></div>
      </div>
    </label>)
  }

}

export default SwitchButton
