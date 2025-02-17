import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { WorkersListComponent } from "./components/workers-list/worker-list.component";

const routesMap: Routes = [
    {    path: "", component: WorkersListComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routesMap)],
    exports: [RouterModule]
})
export class WorkersPageRoutesModule { }