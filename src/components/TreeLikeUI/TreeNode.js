import React, { PropTypes, Component } from 'react';
import SubMenu from './SubTree'

class MenuItem extends Component {

  constructor (props) {
    super(props)
  }

  static propTypes = {
    data: React.PropTypes.object.isRequired,
    textField: React.PropTypes.string,
    checkable: React.PropTypes.bool,
    nolink: React.PropTypes.bool,
    onCKBClick: React.PropTypes.func,
    onItemClick: React.PropTypes.func
  }

  _getMenuIndent () {
    let indents = []

    if (this.props.level) {
      for (let i = 0; i < this.props.level; i++) {
        indents.push(<span key={i} className="tree-indent"></span>)
      }
    }

    return indents
  }

  render() {
    let item = this.props.data
    let hasSub = !!item.children.length
    let {data, ...other} = this.props
    let isMenu = 'menu' === this.props.type

    return (
      <li className={cx({'master-node': hasSub})} onClick={this._subTreeToggle}>
        <a href={(hasSub || this.props.nolink) ? 'javascript: void 0;' : ('#' + (item.src || ''))} data-id={item.id}>
          {!this.props.level && isMenu && item.iconCls && <span className={`glyphicon glyphicon-${item.iconCls}`}></span>}
          {this._getMenuIndent()}
          {!isMenu && hasSub && <span className='icon glyphicon glyphicon-triangle-right'></span>}
          {this.props.checkable && <input type="checkbox" className={cx({'tree-node-ckb': true, 'master-node-ckb': hasSub, 'sub-node-ckb': this.props.level})} data-id={item.id} onClick={this.props.onCKBClick} />}
          <span className='menu-text' onClick={this._onSelected.bind(this)}>{item[this.props.textField || 'text']}</span>
          {isMenu && hasSub && <span className="icon glyphicon glyphicon-menu-right pull-right"></span>}
        </a>
        {hasSub && <SubMenu {...other} level={this.props.level ? (this.props.level + 1) : 1} list={item.children} />}
      </li>
    )
  }

  _onSelected (e) {
    e.stopPropagation()
    let $target = $(e.currentTarget)
    if (!$target.hasClass('master-node')) {
      $target.addClass('active').siblings().removeClass('active')
    }
    this.props.onItemClick && this.props.onItemClick(this.props.data)
  }

  _subTreeToggle (e) {
    e.stopPropagation()
    let $target = $(e.currentTarget).closest('li')

    $target.addClass('active').siblings().removeClass('active open').find('> .sub-tree').slideUp('fast')

    if ($target.hasClass('master-node')) {
      $target.toggleClass('open').find('> .sub-tree').slideToggle('fast')
      $target.find('li').removeClass('active')
    }
  
  }

}

export default MenuItem
