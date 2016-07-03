import React from 'react'
import withStyles from 'with-style'
import Page from 'base-page'
import styles from './Login.css'
import { connect } from 'react-redux'
import { login } from 'redux/modules/auth'

@withStyles(styles)
@connect(state => ({
  user: state.auth.user,
  loginError: state.auth.loginError,
}), { login })
class Login extends Page {
  
  render () {
    return <div className="LoginPage">
      <div className="LoginPage-container">
        <h2 className="title text-center">砾石物联网管控系统</h2>
        <div className="sth">
          <form className="form-horizontal">
            <div className="form-group">
              <label className="control-label col-sm-1">
                <span className="glyphicon glyphicon-user"></span>
              </label>
              <div className="col-sm-10">
                <input type="text" name="name" className="form-control" onKeyUp={this._login.bind(this)} onChange={this.handleChange.bind(this)} />
              </div>
            </div>
            <div className="form-group">
              <label className="control-label col-sm-1">
                <span className="glyphicon glyphicon-lock"></span>
              </label>
              <div className="col-sm-10">
                <input type="password" name="pwd" className="form-control" onKeyUp={this._login.bind(this)} onChange={this.handleChange.bind(this)} />
              </div>
            </div>
            <div className="form-group">
              <div className="col-sm-offset-1 col-sm-10">
                <a className="btn btn-primary form-control" onClick={this._login.bind(this)}>登录</a>
              </div>
            </div>
          </form>
        </div>
      </div>
      <div className="load-overlay"></div>
      <div ref="alert" className="alert alert-danger">用户名或密码错误</div>
    </div>
  }

  componentWillReceiveProps (nextProps) {
    console.log(nextProps)
    if (!this.props.user && nextProps.user) {
      location.hash = '/'
    } else if (nextProps.loginError) {
      let resp = nextProps.loginError
      $(this.refs.alert).text(resp.name).slideDown('fast', () => {
        setTimeout(() => {
          $(this.refs.alert).slideUp('fast')
        }, 1500)
      })
    }
  }

  componentDidMount () {
    this.loaded()
  }

  handleChange (event) {
    this.setState({[event.target.name]: event.target.value})
  }

  _login (e) {

    if (e.keyCode && 13 !== e.keyCode) {
      return
    }

    if (!this.state.name || !this.state.pwd) {
      $(this.refs.alert).text("请输入用户名或密码").slideDown('fast', () => {
        setTimeout(() => {
          $(this.refs.alert).slideUp('fast')
        }, 1500)
      })
      return
    }

    this.props.login({
      userName: this.state.name,
      password: this.state.pwd,
    })
  }

}

export default Login

