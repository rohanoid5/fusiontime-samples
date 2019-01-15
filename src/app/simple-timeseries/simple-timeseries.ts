import { Component } from '@angular/core';
import * as FusionCharts from 'fusioncharts';

@Component({
  selector: 'simple-timeseries',
  templateUrl: './simple-timeseries.html'
})
export class SimpleTimeSeries {
  dataSource: any;
  type: string;
  width: string;
  height: string;
  constructor() {
    this.type = 'timeseries';
    this.width = '800';
    this.height = '600';
    this.dataSource = {
      data: null,
      caption: {
        text: 'Sales Analysis'
      },
      subcaption: {
        text: 'Grocery'
      },
      yAxis: [
        {
          plot: {
            value: 'Grocery Sales Value',
            type: 'line'
          },
          format: {
            prefix: '$'
          },
          title: 'Sale Value'
        }
      ]
    };
    this.fetchData();
  }

  fetchData() {
    var jsonify = res => res.json();
    var dataFetch = fetch(
      'https://s3.eu-central-1.amazonaws.com/fusion.store/ft/data/line-chart-with-time-axis-data.json'
    ).then(jsonify);
    var schemaFetch = fetch(
      'https://s3.eu-central-1.amazonaws.com/fusion.store/ft/schema/line-chart-with-time-axis-schema.json'
    ).then(jsonify);

    Promise.all([dataFetch, schemaFetch]).then(res => {
      const data = res[0];
      const schema = res[1];
      const fusionTable = new FusionCharts.DataStore().createDataTable(
        data,
        schema
      );
      this.dataSource.data = fusionTable;
    });
  }
}
