import { NgModule } from "@angular/core";
import { HighchartsChartModule } from "highcharts-angular";
import { ChartsRoutesModule } from "./charts-routes.module";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import { pineFeature, pineFeatureKey } from "./store/pine.reducers";
import { PineEffects } from "./store/pine.effects";

@NgModule({
    imports: [
        HighchartsChartModule,
        ChartsRoutesModule,
        StoreModule.forFeature(pineFeatureKey, pineFeature.reducer),
        EffectsModule.forFeature([PineEffects]),
    ]
})
export class ChartsModule {

}