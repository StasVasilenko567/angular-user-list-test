import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ChartListComponent } from "./components/charts-list/chart-list.component";

const routes: Routes = [
    { path: '', component: ChartListComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ChartsRoutesModule {}