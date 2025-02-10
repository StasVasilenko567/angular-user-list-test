import { Component, inject, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { Store } from "@ngrx/store";
import { pineActions } from "../../store/pine.actions";
import { pineSelectors } from "../../store/pine.selectors";
import { Subscription } from "rxjs";
import { HighchartsChartComponent, HighchartsChartModule } from "highcharts-angular";
import * as Highcharts from 'highcharts';

@Component({
    selector: "pines-chart",
    templateUrl: "./pines-chart.component.html",
    styleUrls: ["./pines-chart.component.css"],
    imports: [
        HighchartsChartModule
    ]
})
export class PinesChartComponent implements OnInit, OnDestroy {

    private readonly store: Store = inject(Store);

    public pines$ = this.store.select(pineSelectors.selectPines);

    public update: boolean = false;

    private pinesSubscription: Subscription | undefined;

    @ViewChild('chart') chart: HighchartsChartComponent|undefined;

    public chartOptions: Highcharts.Options = {
        chart: {
            zooming: {
                type: 'x'
            }
        },
        title: {
            text: 'Ёлочки'
        },
        subtitle: {
            text: document.ontouchstart === undefined ?
                'Click and drag in the plot area to zoom in' :
                'Pinch the chart to zoom in'
        },
        xAxis: {
            type: 'datetime'
        },
        yAxis: {
            title: {
                text: 'Высота'
            }
        },
        legend: {
            enabled: false
        },
        plotOptions: {
            area: {
                marker: {
                    radius: 2
                },
                lineWidth: 1,
                color: {
                    linearGradient: {
                        x1: 0,
                        y1: 0,
                        x2: 0,
                        y2: 1
                    },
                    stops: [
                        [0, 'rgb(199, 113, 243)'],
                        [0.7, 'rgb(76, 175, 254)']
                    ]
                },
                states: {
                    hover: {
                        lineWidth: 1
                    }
                },
                threshold: null
            }
        },

        series: []
    };
    public Highcharts: typeof Highcharts = Highcharts;

    public ngOnInit(): void {
        this.store.dispatch(pineActions.loadPines());

        this.pinesSubscription = this.pines$.subscribe((pines) => {
            this.chartOptions.series![0] = {
                type: 'area',
                name: 'Красивые ёлочки',
                data: pines
            }
            this.chart?.updateChange.emit(true);
        });
    }

    public ngOnDestroy(): void {
        this.pinesSubscription?.unsubscribe();
    }
}