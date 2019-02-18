import React, { Component } from 'react';
import './App.scss';

import moment from 'moment';

// import Header from './components/Header';
import csv from './data/result';

class App extends Component {

  xAxisStripLinesArray = [];
  yAxisStripLinesArray = [];
  dps = [];
  dataPointsArray = csv;
  constructor() {
    super();

    this.dataPointsArray = [];
    // console.log(csv);
    this.dataPointsArray = this.dataPointsArray.slice(500, 1000);
    csv.forEach((c, index) => {
      // if (index >= csv.length - 2) return;
      // const now = csv[index].time;
      // const next = csv[index + 1].time;
      // const diff = moment(next).diff(moment(now));
      //console.log(moment.duration(diff));
      // console.log(index);
      if (index > 2000 || index < 1000) return;
      if (index % 3 === 0) {
        this.dataPointsArray.push(c);
      };
    });
    // const EcgTime = csv.map(c => c.time);
    // const duringTime = moment(EcgTime[667]).diff(moment(EcgTime[0]))
    // console.log(moment(EcgTime[667]), moment(EcgTime[0]));
    // console.log(`${duringTime}ms`);
    // console.log(moment.duration(duringTime));
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
    for (let i = 0; i < this.dataPointsArray.length; i++) {
      this.dps.push(
        {
          x: new Date(this.dataPointsArray[i].time),
          y: Number(this.dataPointsArray[i].data),
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
      <div>
        <div
          id="chartContainer"
          style={{ height: 450 + "px", width: 100 + "%" }}
        >
        </div>
      </div>
    );
  }
}

export default App;
