import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { todoFeatureKey } from "./store/todo.reducers";
import { TodoEffects } from "./store/todo.effects";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import { todoFeature } from "./store/todo.reducers";

@NgModule({
    imports: [
        CommonModule,
        StoreModule.forFeature(todoFeatureKey, todoFeature.reducer),
        EffectsModule.forFeature([TodoEffects]),
        // TodoKanbanComponent,
    ]
})
export class TodoKanbanModule { }