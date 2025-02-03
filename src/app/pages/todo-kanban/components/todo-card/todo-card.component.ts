import { Component, ElementRef, inject, Input, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { Todo } from "../../models/todo.model";
import { CdkDrag } from "@angular/cdk/drag-drop";
import { CommonModule } from "@angular/common";
import { Store } from "@ngrx/store";
import { todoActions } from "../../store/todo.actions";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { Subscription } from "rxjs";
import { todoSelectors } from "../../store/todo.selectors";

@Component({
    selector: 'app-todo-card',
    templateUrl: './todo-card.component.html',
    styleUrls: ['./todo-card.component.css'],
    standalone: true,
    imports: [CdkDrag, CommonModule, MatIconModule, MatButtonModule],
})
export class TodoCardComponent implements OnInit, OnDestroy {
    @Input() todo!: Todo;
    private readonly store = inject(Store);
    private readonly isLoading$ = this.store.select(todoSelectors.selectIsLoading)
    private isLoadingSubscription: Subscription | undefined;
    @ViewChild("card") private readonly cardRef: ElementRef | undefined
    ngOnInit(): void {
        this.isLoadingSubscription = this.isLoading$.subscribe((isLoading) => {
            if (isLoading) {
                this.cardRef?.nativeElement.classList.add("disabled")
            } else {
                this.cardRef?.nativeElement.classList.remove("disabled")
            }
        })
    }

    ngOnDestroy(): void {
        this.isLoadingSubscription?.unsubscribe();
    }

    public deleteTodo(): void {
        this.store.dispatch(todoActions.deleteTodo({ id: this.todo.id }));
    }
}
