import { NgModule } from "@angular/core";
import { WorkersPageRoutesModule } from "./workers-page-routes.module";
import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";
import { workersFeature } from "./store/workers.reducers";
import { WorkersEffects } from "./store/workers.effects";
import { workersFeatureKey } from "./store/workers.config";
import { WorkerApiService } from "./services/worker-api.service";

@NgModule({
    imports: [
        WorkersPageRoutesModule,
        StoreModule.forFeature(workersFeatureKey, workersFeature.reducer),
        EffectsModule.forFeature([WorkersEffects]),
    ],
    providers: [
        WorkerApiService
    ]
})
export class WorkersPageModule {}