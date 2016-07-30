import React from 'react';
import Page from 'base-page';

class Module extends Page {

  render() {
    return (
      <div className="container-fluid">
        <div className="panel panel-default">
          <div className="panel-heading">UPS详细信息</div>
          <div className="panel-body">
            <div className="row">
              <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6">A1：输入电压=======227.0</div>
              <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6">A2：故障电压=======227.0</div>
            </div>
            <div className="row">
              <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6">A3：输出电压=======220.0</div>
              <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6">A4：输出负载（%）=======0.4500</div>
            </div>
            <div className="row">
              <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6">A5：频率=======50.00</div>
              <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6">A6：电池电压=======13.32</div>
            </div>
            <div className="row">
              <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6">A7：温度=======32.00</div>
              <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6">D1：市电电压=======正常</div>
            </div>
            <div className="row">
              <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6">D2：电池欠压=======否</div>
              <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6">D3：旁路供电=======否</div>
            </div>
            <div className="row">
              <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6">D4：UPS故障=======否</div>
              <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6">D5：自测试中=======否</div>
            </div>
            <div className="row">
              <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6">D6：蜂呜器开关=======否</div>
            </div>

          </div>
        </div>
      </div>
    )
  }

}

module.exports = Module
