import { Component, Input } from "@angular/core";
import { Status } from "../../models/status.model";
import { Todo } from "../../models/todo.model";
import { Observable } from "rxjs";

@Component({
    selector: 'app-status-tower',
    templateUrl: './status-tower.component.html',
    styleUrls: ['./status-tower.component.css'],
})
export class StatusTowerComponent {
    @Input() public filter: Status|undefined;
    @Input() public todos$: Observable<Todo[]>|undefined;
}