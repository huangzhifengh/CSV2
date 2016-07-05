import React, { Component } from 'react'
import CustomCommand from '../CustomCommand'

class TableRow extends Component {
  
  static propTypes = {
    data: React.PropTypes.object.isRequired,
    columns: React.PropTypes.array.isRequired,
    command: React.PropTypes.array.isRequired
  }

  static defaultProps = {
    data: [],
    columns: [],
    command: []
  }

  render() {
    let { data, columns, command } = this.props

    if (!data) {
      return <tr><td colSpan={columns.length+1}>暂无数据</td></tr>
    }
    
    return <tr>
      {columns.map((config, index) => {
        return !config.columnHidden && <td key={index}>{config.parse ? config.parse(data[config.name], data) : data[config.name]}</td>
      })}
      {!!command.length && <td>
        {command.map((item, index) => {
          let props = {
            key: index,
            onClick: this._onClick.bind(this),
            config: item,
            value: data[item.valueField]
          }
          return <CustomCommand {...props} />
        })}
      </td>}
    </tr>
  }

  _onClick (command, e) {
    this.props.onCommandClick(command, this.props.data, e)
  }

}

export default TableRow

