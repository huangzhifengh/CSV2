import React, { Component } from 'react'
import invariant from 'invariant'
import { canUseDOM } from 'exenv'

function withStyles(styles) {
  return (ComposedComponent) => class WithStyles extends Component {

    componentWillMount() {
      if (canUseDOM) {
        invariant(styles.use, `The style-loader must be configured with reference-counted API.`)
        styles.use()
      }
    }

    componentWillUnmount() {
      styles.unuse()
    }

    render() {
      return <ComposedComponent {...this.props} />
    }

  }
}

export default withStyles
