import { Component } from '@angular/core';
import * as FusionCharts from 'fusioncharts';

@Component({
  selector: 'multivariate-timeseries',
  templateUrl: './multivariate-timeseries.html'
})
export class MultiVariateTimeSeries {
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
        text: 'Cariaco Basin Sampling'
      },
      subcaption: {
        text: 'Analysis of O₂ Concentration and Surface Temperature'
      },
      yAxis: [
        {
          plot: 'O2 concentration',
          min: '3',
          max: '6',
          title: 'O₂ Concentration (mg/L)'
        },
        {
          plot: 'Surface Temperature',
          min: '18',
          max: '30',
          title: 'Surface Temperature (°C)'
        }
      ]
    };
    this.fetchData();
  }

  fetchData() {
    var jsonify = res => res.json();
    var dataFetch = fetch(
      'https://s3.eu-central-1.amazonaws.com/fusion.store/ft/data/plotting-two-variable-measures-data.json'
    ).then(jsonify);
    var schemaFetch = fetch(
      'https://s3.eu-central-1.amazonaws.com/fusion.store/ft/schema/plotting-two-variable-measures-schema.json'
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
