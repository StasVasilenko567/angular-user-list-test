import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { TodoKanbanComponent } from "./components/todo-page/todo-page.component";

const routes: Routes = [
    { path: '', component: TodoKanbanComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TodoRoutesModule { }