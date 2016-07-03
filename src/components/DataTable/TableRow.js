import React, { Component } from 'react'
import FormElement from '../Form/FormElement'
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
    let data = this.props.data
    let columns = this.props.columns
    let command = this.props.command

    if (!data) {
      return <tr><td colSpan={columns.length+1}>暂无数据</td></tr>
    }
    
    return (
      <tr>
        {columns.map(config => {
          return !config.columnHidden && <td key={Math.random()}>{config.parse ? config.parse(data[config.name], data) : data[config.name]}</td>
        })}
        {!!command.length && <td>
          {command.map(item => {
            let props = {
              key: Math.random(),
              onClick: this._onClick.bind(this),
              config: item,
              value: data[item.valueField]
            }
            return <CustomCommand {...props} />
          })}
        </td>}
      </tr>
    )
  }

  _onClick (e, type) {
    this.props.onClick(type, this.props.data, e)
  }

}

export default TableRow

