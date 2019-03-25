import React, { Component } from 'react';

import sample from '../data/result';

class ECGChart extends Component {

  // X 軸刻度
  xAxisStripLinesArray = [];

  // Y 軸刻度
  yAxisStripLinesArray = [];
  dps = [];

  style = { height: 450 + "px", width: 100 + "%" };

  constructor(props) {
    super(props);

    this.data = [];

    // 指定區段顯示
    // this.data = this.data.slice(500, 1000);

    this.props.data.forEach((c, index) => {
      // 顯示筆數
      if (
        index > this.props.maxIndex
        ||
        index < this.props.minIndex
      ) return;

      // 濾波設定採樣率
      if (index % 3 === 0) {
        this.data.push(c);
      };
    });
  }

  componentDidMount() {
    // eslint-disable-next-line no-undef
    var chart = new CanvasJS.Chart('chartContainer',
      {
        title: {
          text: "ECG Report",
        },
        subtitles: [
          // {
          //   text: "Subtitle1",
          //   horizontalAlign: "left",
          // },
          // {
          //   text: "Subtitle2",
          //   horizontalAlign: "left",
          // },
          // {
          //     text: "Doctor Sign",
          //     horizontalAlign: "right",
          //     verticalAlign: "bottom",
          // },
        ],
        axisY: {
          valueFormatString: "#",
          stripLines: this.yAxisStripLinesArray,
          gridThickness: 2,
          gridColor: "#dc74a5",
          lineColor: "#dc74a5",
          tickColor: "#dc74a5",
          labelFontColor: "#dc74a5",
        },
        axisX: {
          valueFormatString: "HH:mm:ss.fff",
          labelAngle: -50,
          stripLines: this.xAxisStripLinesArray,
          gridThickness: 2,
          gridColor: "#dc74a5",
          lineColor: "#dc74a5",
          tickColor: "#dc74a5",
          labelFontColor: "#dc74a5",
        },
        data: [
          {
            type: "spline",
            // type: "area",
            // xValueType: 'dataTime',
            color: "#222s",
            dataPoints: this.dps,
            // xValueFormatString: 'id #',
          }
        ]
      });
    this.addDataPointsAndStripLines();
    chart.render();
  }

  addDataPointsAndStripLines() {
    // 訊號資料
    for (let i = 0; i < this.data.length; i++) {
      this.dps.push(
        {
          x: new Date(this.data[i].time),
          y: Number(this.data[i].data),
        });
    }
    // Y軸區段標記
    for (let i = 0; i < 3000; i = i + 100) {
      if (i % 1000 !== 0)
        this.yAxisStripLinesArray.push({ value: i, thickness: 0.7, color: "#dc74a5" });
    }
    // X軸區段標記
    // for (var i = 0; i < 2000; i = i + 20) {
    //     if (i % 200 != 0)
    //         xAxisStripLinesArray.push({ value: i, thickness: 0.7, color: "#dc74a5" });
    // }
  }

  render() {
    return (
      <div
        id="chartContainer"
        style={this.style}
      >
      </div>
    );
  }
}

ECGChart.defaultProps = {
  data: sample,
  minIndex: 0,
  maxIndex: sample.length - 1,
}

export default ECGChart;
