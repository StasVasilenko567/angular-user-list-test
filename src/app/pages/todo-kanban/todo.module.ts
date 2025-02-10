import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { todoFeatureKey } from "./store/todo.reducers";
import { TodoEffects } from "./store/todo.effects";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import { todoFeature } from "./store/todo.reducers";
import { TodoRoutesModule } from "./todo-routes.module";
import { OrderService } from "./services/order.service";

@NgModule({
    imports: [
        CommonModule,
        StoreModule.forFeature(todoFeatureKey, todoFeature.reducer),
        EffectsModule.forFeature([TodoEffects]),
        TodoRoutesModule,
    ],
    providers: [
        OrderService,
    ]
})
export class TodoKanbanModule { }

