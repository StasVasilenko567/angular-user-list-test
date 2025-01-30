import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { provideHttpClient } from "@angular/common/http";
import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";
import { userFeatureKey } from "./store/user.reducers";
import { UserEffects } from "./store/user.effects";
import { userFeature } from "./store/user.reducers";
import { provideAnimationsAsync } from "@angular/platform-browser/animations/async";
import { UserRoutingModule } from "./user-routes.module";
import { UserListComponent } from "./components/user-list/user-list.component";

@NgModule({
  imports: [
    CommonModule,
    UserListComponent,
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
