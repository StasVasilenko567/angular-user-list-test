import { Component, Input } from "@angular/core";
import { Todo } from "../../models/todo.model";
import { CdkDrag } from "@angular/cdk/drag-drop";
@Component({
    selector: 'app-todo-card',
    templateUrl: './todo-card.component.html',
    styleUrls: ['./todo-card.component.css'],
    standalone: true,
    imports: [CdkDrag],
})
export class TodoCardComponent {
    @Input() todo!: Todo;
}