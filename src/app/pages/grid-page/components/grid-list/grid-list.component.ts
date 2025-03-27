import { Component } from "@angular/core";
import { HighlightDirective } from "../../directives/highlight.directive";

@Component({
    selector: "app-grid-list",
    templateUrl: "./grid-list.component.html",
    styleUrls: ["./grid-list.component.css"],
    imports: [HighlightDirective]
})
export class GridListComponent {}