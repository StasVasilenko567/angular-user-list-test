import { CommonModule } from "@angular/common";
import { UsersPageComponent } from "./users-page.component";
import { NgModule } from "@angular/core";
import { provideHttpClient } from "@angular/common/http";
import { provideStore, StoreModule } from "@ngrx/store";
import { provideRouter, RouterModule } from "@angular/router";
import { EffectsModule, provideEffects } from "@ngrx/effects";
import { userFeatureKey } from "./store/user.reducers";
import { UserEffects } from "./store/user.effects";
import { userFeature } from "./store/user.reducers";
import { provideAnimationsAsync } from "@angular/platform-browser/animations/async";
import { UserRoutingModule } from "./user-routes.module";

@NgModule({
  imports: [
    CommonModule,
    UsersPageComponent,
    StoreModule.forFeature(userFeatureKey, userFeature.reducer),
    EffectsModule.forFeature([UserEffects]),
    UserRoutingModule,
  ],
  providers: [
    provideHttpClient(),
    provideAnimationsAsync(),
  ]
})
export class UsersPageModule { }
