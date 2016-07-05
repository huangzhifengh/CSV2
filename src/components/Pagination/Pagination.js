import React, { Component } from 'react'

class Pagination extends Component {
  
  static propTypes = {
    total: React.PropTypes.number,
    size: React.PropTypes.number,
    onPaginationClick: React.PropTypes.func
  }

  static defaultProps = {
    total: 0,
    size: 0
  }

  shouldComponentUpdate (nextProps, nextSates) {
    return !!nextProps.total
  }

  render() {
    
    if (!this.props.size) return <span />

    let currentPage = this.props.page
    let page = Math.ceil(this.props.total / this.props.size)
    let lis = []

    for(var i = 0; i < page; i++) {
      lis.push(<li key={i} className={cx({
        active: currentPage === (i + 1)
      })} data-page={i + 1} onClick={this.props.onClick.bind(this, i + 1)}><a href="javascript: void 0;">{i + 1}</a></li>)
    }

    return (
      <nav className="pull-right">
        <ul className="pagination pagination-sm">
          <li className={cx({disabled: currentPage === 1})}>
            <a href="javascript: void 0;" onClick={this.props.onClick.bind(this, currentPage - 1)}>
              <span>&laquo;</span>
            </a>
          </li>
          {lis}
          <li className={cx({disabled: page === currentPage})}>
            <a href="javascript: void 0;" onClick={this.props.onClick.bind(this, currentPage === page ? false : (currentPage + 1))}>
              <span>&raquo;</span>
            </a>
          </li>
        </ul>
      </nav>
    )
  }

}

export default Pagination
