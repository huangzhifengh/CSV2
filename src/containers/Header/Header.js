import React, { Component } from 'react';
import styles from './Header.css';
import withStyles from 'with-style';
import Navigation from '../Navigation';

@withStyles(styles)
class Header extends Component {

  render() {
    return (
      <div className="Header">
        <div className="Header-container">
          <a className="Header-brand" href="#home">
            <img className="Header-brandImg" src="images/logo.png" width="35" height="38" alt="lsiot" />
            <span className="Header-brandTxt">砾石物联网管控系统</span>
          </a>
          <Navigation className="Header-nav" />
        </div>
      </div>
    );
  }

}

export default Header;
