import { Component } from "@angular/core";
import { HighchartsChartComponent, HighchartsChartModule } from 'highcharts-angular';
import * as Highcharts from 'highcharts';
import { XmasComponent } from "../xmas-chart/xmas.component";
import { PinesChartComponent } from "../pines-chart/pines-chart.component";
// import { ChartListComponent } from "../xmas-chart/xmas.component";

@Component({
    templateUrl: './chart-list.component.html',
    styleUrls: ['./chart-list.component.css'],
    imports: [
        HighchartsChartModule,
        XmasComponent,
        PinesChartComponent
    ]
})
export class ChartListComponent {}