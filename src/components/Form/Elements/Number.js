import React, { Component, PropTypes } from 'react';

class Module extends Component {

  static propTtypes = {
    config: React.PropTypes.object,
    value: React.PropTypes.any
  }

  render () {
  	
    return <input type="text" name={this.props.config.name} className="form-control" defaultValue={this.props.config.value} />

  }
}

export default Module

