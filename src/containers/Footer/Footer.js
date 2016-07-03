import React, { PropTypes, Component } from 'react';
import styles from './Footer.css';
import withStyles from 'with-style'

@withStyles(styles)
class Footer extends Component {

  render() {
    return (
      <div className="Footer">
        <div className="Footer-container">
          <span className="Footer-text">© 2015-2020 杭州砾石科技有限公司</span>
        </div>
      </div>
    );
  }

}

export default Footer;
