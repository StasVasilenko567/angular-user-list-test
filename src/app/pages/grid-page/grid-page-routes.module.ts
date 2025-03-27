import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { GridListComponent } from "./components/grid-list/grid-list.component";

const routesMap: Routes = [
    {    path: "", component: GridListComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routesMap)],
    exports: [RouterModule]
})
export class GridPageRoutesModule { }