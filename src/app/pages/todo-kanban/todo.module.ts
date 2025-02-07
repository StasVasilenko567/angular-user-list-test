import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { todoFeatureKey } from "./store/todo.reducers";
import { TodoEffects } from "./store/todo.effects";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import { todoFeature } from "./store/todo.reducers";
import { TodoRoutesModule } from "./todo-routes.module";
import { OrderService } from "./services/order.service";
import { HTTP_INTERCEPTORS, HttpClientJsonpModule, provideHttpClient, withInterceptors } from "@angular/common/http";
// import { ApiErrorHandlerService } from "./services/api-errhandler.service";

@NgModule({
    imports: [
        CommonModule,
        StoreModule.forFeature(todoFeatureKey, todoFeature.reducer),
        EffectsModule.forFeature([TodoEffects]),
        TodoRoutesModule,
        // HttpClientJsonpModule
    ],
    providers: [
        OrderService,
        // ApiErrorHandlerService,
        // {
        //     provide: HTTP_INTERCEPTORS,
        //     useClass: ApiErrorHandlerService,
        //     multi: true
        // }
    ]
})
export class TodoKanbanModule { }

