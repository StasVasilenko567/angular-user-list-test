import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { CalendarPageComponent } from "./calendar-page.component";
import { CalendarRoutingModule } from "./calendar-routes.module";
import { provideAnimationsAsync } from "@angular/platform-browser/animations/async";
import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";

@NgModule({
    imports: [
        CommonModule,
        CalendarPageComponent,
        CalendarRoutingModule,
    ],
    providers: [
        provideAnimationsAsync()
    ]
})
export class CalendarPageModule { }
