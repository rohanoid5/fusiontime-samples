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
      yAxis: null,
      caption: null
    };
    this.fetchData();
  }

  fetchData() {
    var jsonify = res => res.json();
    var dataFetch = fetch(
      'https://raw.githubusercontent.com/fusioncharts/dev_centre_docs/fusiontime-beta-release/charts-resources/fusiontime/online-sales-single-series/data.json'
    ).then(jsonify);
    var schemaFetch = fetch(
      'https://raw.githubusercontent.com/fusioncharts/dev_centre_docs/fusiontime-beta-release/charts-resources/fusiontime/online-sales-single-series/schema.json'
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
        plot: [
          {
            value: 'Sales ($)'
          }
        ]
      };
      this.dataSource.caption = {
        text: 'Online Sales of a SuperStore in the US'
      };
    });
  }
}
