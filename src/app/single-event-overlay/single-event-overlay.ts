import { Component } from '@angular/core';
import * as FusionCharts from 'fusioncharts';

@Component({
  selector: 'single-event-overlay',
  templateUrl: './single-event-overlay.html'
})
export class SingleEventOverlay {
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
      xAxis: null,
      caption: null,
      subCaption: null
    };
    this.fetchData();
  }

  fetchData() {
    var jsonify = res => res.json();
    var dataFetch = fetch(
      'https://s3.eu-central-1.amazonaws.com/fusion.store/ft/data/single-event-overlay-data.json'
    ).then(jsonify);
    var schemaFetch = fetch(
      'https://s3.eu-central-1.amazonaws.com/fusion.store/ft/schema/single-event-overlay-schema.json'
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
        plot: 'Interest Rate',
        format: {
          suffix: '%'
        },
        title: 'Interest Rate'
      };
      this.dataSource.xAxis = {
        plot: 'Time',
        timemarker: [
          {
            start: 'Mar-1980',
            label: 'US inflation peaked at 14.8%.',
            timeFormat: '%b-%Y',
            style: {
              marker: {
                fill: '#D0D6F4'
              }
            }
          },
          {
            start: 'May-1981',
            label:
              'To control inflation, the Fed started {br} raising interest rates to over {br} 20%.',
            timeFormat: '%b-%Y'
          },
          {
            start: 'Jun-1983',
            label:
              'By proactive actions of Mr.Volcker, {br} the inflation falls to 2.4% {br} from the peak of over 14% {br} just three years ago.',
            timeFormat: '%b-%Y',
            style: {
              marker: {
                fill: '#D0D6F4'
              }
            }
          },
          {
            start: 'Oct-1987',
            label:
              'The Dow Jones Industrial Average lost {br} about 30% of it’s value.',
            timeFormat: '%b-%Y',
            style: {
              marker: {
                fill: '#FBEFCC'
              }
            }
          },
          {
            start: 'Jan-1989',
            label: 'George H.W. Bush becomes {br} the 41st president of US!',
            timeFormat: '%b-%Y'
          },
          {
            start: 'Aug-1990',
            label:
              'The oil prices spiked to $35 {br} per barrel from $15 per barrel {br} because of the Gulf War.',
            timeFormat: '%b-%Y'
          },
          {
            start: 'Dec-1996',
            label:
              'Alan Greenspan warns of the dangers {br} of "irrational exuberance" in financial markets, {br} an admonition that goes unheeded',
            timeFormat: '%b-%Y'
          },
          {
            start: 'Sep-2008',
            label: 'Lehman Brothers collapsed!',
            timeFormat: '%b-%Y'
          },
          {
            start: 'Mar-2009',
            label:
              'The net worth of US households {br} stood at a trough of $55 trillion.',
            timeFormat: '%b-%Y',
            style: {
              marker: {
                fill: '#FBEFCC'
              }
            }
          },
          {
            start: 'Oct-2009',
            label: 'Unemployment rate peaked {br} in given times to 10%.',
            timeFormat: '%b-%Y'
          }
        ]
      };
      this.dataSource.caption = {
        text: 'Interest Rate Analysis'
      };
      this.dataSource.subCaption = {
        text: 'Federal Reserve (USA)'
      };
    });
  }
}
