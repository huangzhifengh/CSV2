import React, { PropTypes, Component } from 'react';
import classNames from 'classnames';
import styles from './Navigation.css';
import withStyles from 'with-style'
import { connect } from 'react-redux'

@withStyles(styles)
@connect(state => ({
  user: state.auth.user,
}))
class Navigation extends Component {

  static propTypes = {
    className: PropTypes.string,
  }

  logout () {
    ajax({
      url: '/api/auth/logout',
      type: 'POST'
    }, resp => {
      if (resp && 0 === resp.code) {
        location.hash = 'login'
      }
    })
  }

  render() {
    let user = this.props.user || {}

    return (
      <div className={classNames(this.props.className, 'Navigation')} role="navigation">
        <a className="Navigation-link btn btn-link" href="#">{user?user.realName:""}</a>
        <a className="Navigation-link btn btn-link" href="#">消息</a>
        <a className="Navigation-link btn btn-link" onClick={this.logout.bind(this)}>登出</a>
      </div>
    );
  }

}

export default Navigation;
