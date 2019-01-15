import { Component } from '@angular/core';
import * as FusionCharts from 'fusioncharts';

@Component({
  selector: 'column-line-time-axis',
  templateUrl: './column-line-time-axis.html'
})
export class ColumnLineTimeAxis {
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
        text: 'Web visits & downloads'
      },
      subcaption: {
        text: 'since 2015'
      },
      yAxis: [
        {
          plot: [
            {
              value: 'Downloads',
              type: 'column'
            },
            {
              value: 'Web Visits',
              type: 'line'
            }
          ]
        }
      ]
    };
    this.fetchData();
  }

  fetchData() {
    var jsonify = res => res.json();
    var dataFetch = fetch(
      'https://s3.eu-central-1.amazonaws.com/fusion.store/ft/data/column-line-combination-data.json'
    ).then(jsonify);
    var schemaFetch = fetch(
      'https://s3.eu-central-1.amazonaws.com/fusion.store/ft/schema/column-line-combination-schema.json'
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
