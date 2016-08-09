import React, { Component } from 'react'

class Pagination extends Component {
  
  static propTypes = {
    total: React.PropTypes.number,
    rows: React.PropTypes.number,
    onClick: React.PropTypes.func
  }

  static defaultProps = {
    total: 0,
    rows: 0
  }

  shouldComponentUpdate (nextProps, nextSates) {
    return !!nextProps.total
  }

  render() {
    let { page = 1, rows, total, onClick } = this.props
    
    if (!rows) return <span />

    let pageCount = Math.ceil(total / rows)
    let lis = []

    for(var i = 0; i < pageCount; i++) {
      lis.push(<li key={i} className={cx({
        active: page === (i + 1)
      })} data-page={i + 1} onClick={onClick.bind(this, i + 1)}><a href="javascript: void 0;">{i + 1}</a></li>)
    }

    return (
      <nav className="pull-right">
        <ul className="pagination pagination-sm">
          <li className={cx({disabled: page === 1})}>
            <a href="javascript: void 0;" onClick={onClick.bind(this, page - 1)}>
              <span>&laquo;</span>
            </a>
          </li>
          {lis}
          <li className={cx({disabled: pageCount === page})}>
            <a href="javascript: void 0;" onClick={onClick.bind(this, page === pageCount ? false : (page + 1))}>
              <span>&raquo;</span>
            </a>
          </li>
        </ul>
      </nav>
    )
  }

}

export default Pagination
