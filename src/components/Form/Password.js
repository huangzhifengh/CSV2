import React, { Component, PropTypes } from 'react';

class Module extends Component {

  static propTtypes = {
    config: React.PropTypes.object,
    value: React.PropTypes.any
  }

  render () {

    return <input type="password" name={this.props.config.name} className="form-control" defaultValue={this.props.value} />

  }

}

export default Module

