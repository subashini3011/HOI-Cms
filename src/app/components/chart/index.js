import React from 'react';
import {
  G2,
  Chart,
  Geom,
  Axis,
  Tooltip,
  Coord,
  Label,
  Legend
} from 'bizcharts';
import DataSet from '@antv/data-set';
import './index.scss';

class RevenueChart extends React.Component {
  render() {
    const { revenueChartDataList } = this.props;

    var dv = new DataSet.View().source(revenueChartDataList.chart);
    dv.transform({
      type: 'fold',
      fields: revenueChartDataList.fields,
      key: 'type',
      value: 'value'
    });
    const scale = {
      value: {
        alias: 'Revenue',
        formatter: function(val) {
          return '₹' + val;
        }
      },
      time: {
        range: [0, 1]
      }
    };
    return (
      <div className="chart">
        <Chart height={549} data={dv} padding={'auto'} scale={scale} forceFit>
          <Tooltip crosshairs />
          <Axis />
          {/* <Legend /> */}
          <Legend position="bottom" useHtml={true} />
          {/* <Legend
            useHtml={true}
            containerTpl={
              '<div class="g2-legend" style="position:absolute;top:20px;right:60px;width:auto;">' +
              '<h4 class="g2-legend-title"></h4>' +
              '<ul class="g2-legend-list" style="list-style-type:none;margin:0;padding:0;"></ul>' +
              '</div>'
            }
          /> */}
          <Geom type="line" position="time*value" color="type" shape="smooth" />
          <Geom
            type="line"
            position="time*value"
            color="type"
            shape="smooth"
            size={2}
          />
        </Chart>
      </div>
    );
  }
}

export default RevenueChart;
