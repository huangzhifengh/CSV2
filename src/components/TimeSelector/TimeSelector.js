import React, { PropTypes, Component } from 'react'
import Moment from '../../utils/CustomMoment'

class TimeSelector extends Component {

  constructor (props) {
    super(props)

    this.period = {
      Y: {
        key: 'year',
        text: '年',
      },
      S: {
        key: 'season',
        text: '季'
      },
      M: {
        key: 'month',
        text: '月'
      },
      W: {
        key: 'week',
        text: '周'
      },
      D: {
        key: 'day',
        text: '日'
      },
      H: {
        key: 'hour',
        text: '时'
      },
      m: {
        key: 'minute',
        text: '分'
      },
      s: {
        key: 'second',
        text: '秒'
      }
    }

    this.currentPeriodType = this.props.default || 'day'
    this.startTime = new Moment().add(this.currentPeriodType, -1)
    this.stopTime = new Moment()
  }

  static propTypes = {
    buttons: PropTypes.string.isRequired
  }

  static defaultProps = {
    buttons: 'PDWMSYN'
  }

  render() {
    return (<div className="row">
      <div className="col-lg-5 col-md-5 col-sm-5 col-xs-5 text-left">
        <h4>时段：<span id="showSta"></span>&nbsp;~&nbsp;<span id="showEnd"></span></h4>
      </div>
      <div className="col-lg-2 col-md-2 col-sm-2 col-xs-2 text-center"></div>
      <div className="col-lg-5 col-md-5 col-sm-5 col-xs-5 text-right">
        <div id="timeOpt" className="btn-group btn-group-sm" data-toggle="buttons">
          <button type="button" className="btn btn-default" data-key="prev" onClick={this._onClick.bind(this)}><span className="glyphicon glyphicon-chevron-left"></span></button>
          {Array.prototype.slice.call(this.props.buttons).map(button => {
            let key = this.period[button].key
            return (<label className={cx({btn: true, 'btn-default': true, active: key === this.currentPeriodType})} key={Math.random()} data-key={key} onClick={this._onClick.bind(this)}>
              <input type="radio" name="options" defaultChecked={key === this.currentPeriodType} />{this.period[button].text}
            </label>)
          })}
          <button type="button" className="btn btn-default" data-key="next" onClick={this._onClick.bind(this)}><span className="glyphicon glyphicon-chevron-right"></span></button>
        </div>
      </div>
    </div>)
  }

  _onClick (e) {
    let btn_key = e.currentTarget.dataset.key

    if (this.currentPeriodType === btn_key) {
      return
    }

    if (['prev', 'next'].indexOf(btn_key) !== -1) {
      let dir = 'prev' === btn_key ? -1 : 1
      this.startTime.add(this.currentPeriodType, dir * 1)
      this.stopTime.add(this.currentPeriodType, dir * 1)
    } else {
      this.currentPeriodType = btn_key

      this.startTime = new Moment().add(this.currentPeriodType, -1)
      this.stopTime = new Moment()
    }

    this.props.onClick && this.props.onClick(this.startTime.getTime(), this.stopTime.getTime())
  }

}

export default TimeSelector
