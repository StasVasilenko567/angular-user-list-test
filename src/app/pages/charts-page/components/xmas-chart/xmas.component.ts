import { Component } from "@angular/core";
import { HighchartsChartComponent, HighchartsChartModule } from 'highcharts-angular';
import * as Highcharts from 'highcharts';

@Component({
    selector: "xmas-chart",
    templateUrl: './xmas.component.html',
    styleUrls: ['./xmas.component.css'],
    imports: [
        HighchartsChartModule,
    ]
})
export class XmasComponent {
    Highcharts: typeof Highcharts = Highcharts;
    chartOptions: Highcharts.Options = {
        title: {text: "Рождественское настроение"},
        xAxis: {
            title: {
                text: "Время"
            }
        },
        yAxis: {
            title: {
                text: "Настроение"
            }
        },
        series: [
            {
                name: "Средний показатель настроения",
                data: [
                    {
                        x: 0,
                        y: 10,
                    },
                    {
                        x: 1,
                        y: 10,
                        dataLabels: [{
                            enabled: true,
                            formatter: function() {
                                return "Застрял мандарин в жопе";
                            },
                        }]
                    },
                    {
                        x: 1.03,
                        y: 50,
                    },
                ],
                type: 'line'
            }
        ]
  };
}