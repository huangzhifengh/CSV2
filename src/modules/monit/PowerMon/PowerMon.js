import React from 'react';
import Page from 'base-page';
import Table from 'components/Table';
import DataSource from 'components/DataSource';

class Module extends Page {

  render() {
    return (
      <div className="container-fluid">
        <div className="container-fluid">
          <div className="panel panel-default">
            <div className="panel-heading">供配电监测</div>
            <div className="panel-body">
              <div id="graph">暂无数据</div>
            </div>
          </div>
        </div>
      </div>
    )
  }

}

module.exports = Module
