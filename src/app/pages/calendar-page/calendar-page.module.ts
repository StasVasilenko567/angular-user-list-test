import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { CalendarComponent } from "./components/calendar/calendar.component";
import { CalendarRoutingModule } from "./calendar-routes.module";
import { provideAnimationsAsync } from "@angular/platform-browser/animations/async";
import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";

@NgModule({
    imports: [
        CommonModule,
        CalendarComponent,
        CalendarRoutingModule,
    ],
    providers: [
        provideAnimationsAsync()
    ]
})
export class CalendarPageModule { }
