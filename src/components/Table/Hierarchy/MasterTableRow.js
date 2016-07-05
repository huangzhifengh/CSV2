import React, { Component } from 'react'

class TableRow extends Component {
  
  static propTypes = {
    data: React.PropTypes.object.isRequired,
    columns: React.PropTypes.array.isRequired,
    command: React.PropTypes.array.isRequired,
    onTableRowClick: React.PropTypes.func
  }

  static defaultProps = {
    data: {},
    columns: [],
    command: []
  }

  getIndent () {
    let indents = []
    let count = this.props.level - 1

    if (count) {
      for (let i = 0; i < count; i++) {
        indents.push(<span key={i} className="table-indent"></span>)
      }
    }

    return indents
  }

  render() {
    let data = this.props.data

    if (!data) {
      return <tr><td colSpan={this.props.columns.length}>空空</td></tr>
    }

    return (
      <tr>
        {this.props.columns.map((config, index) => {
          return !config.columnHidden && <td key={Math.random()}>
            {!index && this.getIndent()}
            {!index && !!this.props.hasSub && <a className="btn btn-xs" data-id={this.props.data.id} onClick={this._toggleSubRow.bind(this)}><span className="icon glyphicon glyphicon-triangle-right"></span></a>}
            {config.parse ? config.parse(data[config.name]) : data[config.name]}
          </td>
        })}
        <td>
          {this.props.command.map(item => {
            return <a className="btn btn-link btn-xs" key={Math.random()} onClick={this.props.onTableRowClick.bind(this, item.name, data)}>{item.text}</a>
          })}
        </td>
      </tr>
    )
  }

  _toggleSubRow (e) {
    $(e.target).toggleClass('open')
    let id = $(e.currentTarget).data('id')
    $(`.sub-table-wrapper[data-id=${id}]`).slideToggle('fast')
  }

}

export default TableRow

