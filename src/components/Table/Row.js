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
    let { data, columns, command, hasDetail, checkable, onClick, toggleSubrow, ...other } = this.props
    
    return <tr {...other} >
      {hasDetail && <Cell 
        onClick={() => {
          toggleSubrow(other['data-index'])
          this.toggleSubrow()
        }}>
          <span ref="expandIcon" className="icon glyphicon glyphicon-triangle-right expand-toggle-icon" />
      </Cell> }
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

  toggleSubrow () {
    $(this.refs.expandIcon).toggleClass('expand')
  }
}

export default TableRow

