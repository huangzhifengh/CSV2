import React, { PropTypes, Component } from 'react';
import MenuItem from './TreeNode'

class SubMenu extends Component {

  static propTypes = {
    list: React.PropTypes.array.isRequired,
    textField: React.PropTypes.string,
    checkable: React.PropTypes.bool,
    nolink: React.PropTypes.bool,
    onCKBClick: React.PropTypes.func
  }

  render () { 
    let {list, ...other} = this.props

    return (
      <ul className="sub-tree">
        {list.map(item => {
          return <MenuItem {...other} data={item} key={item.id} />
        })}
      </ul>
    )
  }

}

export default SubMenu

