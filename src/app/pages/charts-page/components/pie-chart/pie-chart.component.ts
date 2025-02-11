import { Component } from "@angular/core";
import * as Highcharts from 'highcharts';
import { HighchartsChartModule } from "highcharts-angular";

@Component({
    selector: "pie-chart",
    templateUrl: "./pie-chart.component.html",
    styleUrls: ["./pie-chart.component.css"],
    imports: [
        HighchartsChartModule
    ]
})
export class PieChartComponent {
    public Highcharts: typeof Highcharts = Highcharts;

    public options: Highcharts.Options = {   
      chart : {
        //  plotBorderWidth: null,
         plotShadow: false
      },
      title : {
         text: 'Предпочтения в девушках'   
      },
      tooltip : {
         pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
      },
      plotOptions : {
         pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: {
               enabled: true,
               format: '<b>{point.name}</b>: {point.percentage:.1f} %',
               style: {
                  // color: (Highcharts.theme && Highcharts.theme.contrastTextColor)||
                  color: 'black'
               }
            }
         }
      },
      series : [{
         type: 'pie',
         name: 'Browser share',
         data: [
            ['С кем можно обсудить Джоджо',   99.0],
            ['Красивые, милые, общительные',      1.0]
         ]
      }]
   }
}