import React from 'react';
import Page from 'base-page';

class Module extends Page {

  render() {
    return (
      <div className="container-fluid">
        <div className="panel panel-default">
          <div className="panel-heading">精密空调详细信息</div>
          <div className="panel-body">
            <div className="row">
              <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6">S1：温度设定</div>
              <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6">S2：温度设定</div>
            </div>
            <div className="row">
              <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6">S3：温度报警上限设置</div>
              <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6">S4：温度报警上限设置</div>
            </div>
            <div className="row">
              <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6">S5：温度报警下限设置</div>
              <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6">S6：温度报警下限设置</div>
            </div>

            <div className="row">
              <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6">A1：压缩机2排气压力=======6546</div>
              <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6">A2：压缩机2排气压力=======6546</div>
            </div>
            <div className="row">
              <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6">A3：加湿电流=======0</div>
              <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6">A4：回风湿度=======45.50</div>
            </div>
            <div className="row">
              <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6">A5：回风湿度=======25.50</div>
              <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6">A6：设定温度值=======50.00</div>
            </div>
            <div className="row">
              <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6">A7：设定温度值=======0</div>
              <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6">A8：送风温度======0</div>
            </div>
            <div className="row">
              <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6">A9：系统运行时间（小时）======22.40</div>
            </div>

            <div className="row">
              <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6">D1：制冷模式======开启</div>
              <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6">D2：除湿模式======关闭</div>
            </div>
            <div className="row">
              <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6">D3：高水位开关======关闭</div>
              <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6">D4：远地开关======关闭</div>
            </div>
            <div className="row">
              <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6">D5：风压差开关======关闭</div>
              <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6">D6：电加热保护=======保护</div>
            </div>
            <div className="row">
              <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6">D7：送风机过载和热保护======解除</div>
              <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6">D8：过滤网堵塞=======否</div>
            </div>
            <div className="row">
              <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6">D9：地板漏水报警=======正常</div>
              <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6">D10：断路器辅助开关=======开启</div>
            </div>
            <div className="row">
              <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6">D11：相序保护器电源故障=======报警</div>
              <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6">D12：压缩机1低压保护开关=======解除</div>
            </div>
            <div className="row">
              <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6">D13：压缩机2低压保护开关=======解除</div>
              <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6">D14：压缩机1高压保护开关=======解除</div>
            </div>
            <div className="row">
              <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6">D15：压缩机2高压保护开关=======解除</div>
              <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6">D16：压缩机1状态=======关闭</div>
            </div>
            <div className="row">
              <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6">D17：压缩机2状态=======关闭</div>
              <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6">D18：电加热1状态=======关闭</div>
            </div>
            <div className="row">
              <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6">D19：电加热2状态=======关闭</div>
              <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6">D20：压缩机1除湿电磁阀=======关闭</div>
            </div>
            <div className="row">
              <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6">D21：压缩机2除湿电磁阀=======关闭</div>
              <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6">D22：加温器状态=======关闭</div>
            </div>
            <div className="row">
              <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6">D23：送风机状态=======关闭</div>
              <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6">D24：压缩机1液管电磁阀=======关闭</div>
            </div>
            <div className="row">
              <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6">D25：压缩机2液管电磁阀=======关闭</div>
              <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6">D26：加湿器进水阀=======关闭</div>
            </div>
            <div className="row">
              <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6">D27：加湿器排水阀=======关闭</div>
              <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6">D28：风机模式=======关闭</div>
            </div>
            <div className="row">
              <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6">D29：加热模式=======关闭</div>
              <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6">D30：加湿模式=======关闭</div>
            </div>
            <div className="row">
              <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6">D31：压缩机1排气压力传感器故障=======正常</div>
              <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6">D32：压缩机2排气压力传感器故障=======正常</div>
            </div>
            <div className="row">
              <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6">D33：温度过高报警=======正常</div>
              <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6">D34：湿度过高报警=======正常</div>
            </div>
            <div className="row">
              <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6">D35：压缩机1运行时间超时=======正常</div>
              <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6">D36：压缩机2运行时间超时=======正常</div>
            </div>
            <div className="row">
              <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6">D37：送风机运行时间超时=======正常</div>
              <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6">D38：电加热1运行时间超时=======正常</div>
            </div>
            <div className="row">
              <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6">D39：电加热2运行时间超时=======正常</div>
              <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6">D40：机组运行时间超时=======正常</div>
            </div>
            <div className="row">
              <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6">D41：加温器电源故障=======正常</div>
              <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6">D42：湿度过低报警=======正常</div>
            </div>
            <div className="row">
              <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6">D43：温度过低报警=======正常</div>
              <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6">D44：机组过热报警=======正常</div>
            </div>
            <div className="row">
              <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6">D45：湿度传感器故障=======正常</div>
              <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6">D46：温度传感器故障=======正常</div>
            </div>
            <div className="row">
              <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6">D47：送风温度传感器故障=======正常</div>
              <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6">D48：加湿电流过高报警=======正常</div>
            </div>
            <div className="row">
              <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6">D49：加温器运行时间超时=======正常</div>
              <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6">D50：加温电流过低报警=======正常</div>
            </div>
            <div className="row">
              <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6">D51：缺水报警=======正常</div>
              <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6">D52：低蒸汽加温量报警=======正常</div>
            </div>
            <div className="row">
              <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6">D53：排水报警=======正常</div>
              <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6">D54：加湿罐损坏=======正常</div>
            </div>

          </div>
        </div>
      </div>
    )
  }

}

module.exports = Module
