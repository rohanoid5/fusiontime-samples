import { Component } from '@angular/core';
import * as FusionCharts from 'fusioncharts';

@Component({
  selector: 'stock-chart',
  templateUrl: './stock-chart.html'
})
export class StockChart {
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
      yAxis: null,
      caption: null
    };
    this.fetchData();
  }

  fetchData() {
    var jsonify = res => res.json();
    var dataFetch = fetch(
      'https://s3.eu-central-1.amazonaws.com/fusion.store/ft/data/candlestick-chart-data.json'
    ).then(jsonify);
    var schemaFetch = fetch(
      'https://s3.eu-central-1.amazonaws.com/fusion.store/ft/schema/candlestick-chart-schema.json'
    ).then(jsonify);

    Promise.all([dataFetch, schemaFetch]).then(res => {
      const data = res[0];
      const schema = res[1];
      const fusionTable = new FusionCharts.DataStore().createDataTable(
        data,
        schema
      );
      this.dataSource.data = fusionTable;
      this.dataSource.yAxis = {
        plot: {
          open: 'Open',
          high: 'High',
          low: 'Low',
          close: 'Close',
          type: 'candlestick'
        },
        title: 'Value'
      };
      this.dataSource.caption = {
        text: 'Apple Inc. Stock Price'
      };
    });
  }
}
