import React, { PropTypes, Component } from 'react';
import styles from './TreeLikeUI.css';
import withStyles from '../../decorators/withStyles';
import TreeNode from './TreeNode'
import ajax from '../../ajax'

@withStyles(styles)
class TreeLikeUI extends Component {

  constructor () {
    super()

    this.state = {
      nodes: []
    }
  }

  static propTypes = {
    data: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.array
    ]),
    checkable: React.PropTypes.bool,
    nolink: React.PropTypes.bool,
    onUpdated: React.PropTypes.func,
    onItemClick: React.PropTypes.func,
    type: React.PropTypes.string
  }

  static defaultProps = {
    checkable: false,
    nolink: false,
    type: 'menu'
  }

  componentDidMount () {
    if ('array' !== $.type(this.props.data)) {
      ajax({
        url: this.props.data || '/api/resources/menu'
      }, resp => {
        if (resp && 0 === resp.code) {
          this._onDataRetrieved(resp.data)
        }
      })
    } else {
      this._onDataRetrieved(this.props.data)
    }
  }

  componentDidUpdate () {
    this.props.onUpdated && this.props.onUpdated()
  }

  render() {
    return (
      <ul className={cx({'tree-ui': true, [this.props.type]: true})}>
        {this.state.nodes}
      </ul>
    )
  }

  _onDataRetrieved (nodes) {
    let treeNodes = []
    if (nodes.length) {
      nodes.forEach((item, index) => {
        treeNodes.push(<TreeNode {...this.props} onCKBClick={this._onCKBClick.bind(this)} data={item} key={item.id} />)
      })
    } else {
      treeNodes.push(<li key="1" className="text-center">空空</li>)
    }

    this.setState({
      nodes: treeNodes
    })
  }

  _onCKBClick (e) {
    e.stopPropagation()

    /*
    let $target = $(e.target)
    if ($target.hasClass('master-node-ckb')) {
      let checked = e.target.checked
      $target.closest('.master-node').find('.sub-tree .tree-node-ckb').prop('checked', checked)
    } else if($target.hasClass('sub-node-ckb')) {
      let $ckbs = $target.closest('.sub-tree').find('.tree-node-ckb')
      let isAllChecked = $ckbs.length === $ckbs.filter(':checked').length
      $target.closest('.master-node').find('.master-node-ckb').prop('checked', isAllChecked)
    }
    */

    this.props.onCKBClick && this.props.onCKBClick(e)
  }

}

export default TreeLikeUI

