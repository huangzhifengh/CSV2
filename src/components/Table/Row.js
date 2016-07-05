import React, { Component, PropTypes } from 'react'
import Command from '../CustomCommand'
import Cell from './Cell'

class TableRow extends Component {
  
  static propTypes = {
    data: PropTypes.object.isRequired,
    columns: PropTypes.array.isRequired,
    command: PropTypes.array,
    hasDetail: PropTypes.bool,
    checkable: PropTypes.bool,
    onClick: PropTypes.func.isRequired,
  }

  static defaultProps = {
    data: {},
    columns: [],
    command: [],
    hasDetail: false,
    checkable: false,
    onClick: () => {},
  }

  render() {
    let { data, columns, command, hasDetail, checkable, onClick, ...other } = this.props
    
    return <tr {...other} >
      {hasDetail && <Cell onClick={::this.toggleSubRow}><span className="icon glyphicon glyphicon-triangle-right" /></Cell> }
      {checkable && <Cell><input type="checkbox" /></Cell>}
      {columns.map((config, index) => {
        return !config.columnHidden && 
          <Cell key={index}>{config.parse ? config.parse(data[config.name], data) : data[config.name]}</Cell>
      })}
      {!!command.length && <Cell>
        {command.map((item, index) => {
          let props = {
            key: index,
            ...item,
            onClick: onClick.bind(this, item, data),
            data: data,
          }
          return <Command {...props} />
        })}
      </Cell>}
    </tr>
  }

  toggleSubRow () {
    console.log('toggle sub row')
  }
}

export default TableRow

