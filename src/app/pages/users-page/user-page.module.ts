import { CommonModule } from "@angular/common";
import { UsersPageComponent } from "./users-page.component";
import { NgModule } from "@angular/core";
import { provideHttpClient } from "@angular/common/http";
import { provideStore, StoreModule } from "@ngrx/store";
import { RouterModule } from "@angular/router";
import { EffectsModule, provideEffects } from "@ngrx/effects";
import { userFeatureKey } from "./store/user.reducers";
import { UserEffects } from "./store/user.effects";
import { userFeature } from "./store/user.reducers";
import { provideAnimationsAsync } from "@angular/platform-browser/animations/async";
import { routes } from "app/app.routes";

@NgModule({
  imports: [
    CommonModule,
    UsersPageComponent,
    StoreModule.forFeature(userFeatureKey, userFeature.reducer),
    EffectsModule.forFeature([UserEffects]),
    RouterModule.forChild(routes),
  ],
  providers: [
    provideHttpClient(),
    provideStore({ [userFeatureKey]: userFeature.reducer }),
    provideEffects([UserEffects]),
    provideAnimationsAsync(),
  ]
})
export class UsersPageModule { }
