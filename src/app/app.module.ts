import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

// Import angular-fusioncharts
import { FusionChartsModule } from 'angular-fusioncharts';

// Import FusionCharts library and chart modules
import * as FusionCharts from 'fusioncharts';
import * as TimeSeries from 'fusioncharts/fusioncharts.timeseries';

import * as FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion';

// Pass the fusioncharts library and chart modules
FusionChartsModule.fcRoot(FusionCharts, TimeSeries, FusionTheme);

// Import all the Custom Components
import { SimpleTimeSeries } from './simple-timeseries/simple-timeseries';
import { MultiVariateTimeSeries } from './multivariate-timeseries/multivariate-timeseries';
import { StockChart } from './stock-chart/stock-chart';
import { SingleEventOverlay } from './single-event-overlay/single-event-overlay';
import { MultiSeriesTimeAxis } from './multiseries-timeaxis/multiseries-timeaxis';

@NgModule({
  declarations: [
    AppComponent,
    SimpleTimeSeries,
    MultiVariateTimeSeries,
    StockChart,
    SingleEventOverlay,
    MultiSeriesTimeAxis
  ],
  imports: [
    BrowserModule,
    // Specify FusionChartsModule as import
    FusionChartsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
