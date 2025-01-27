import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { AsyncPipe, NgFor } from '@angular/common';
import { UserCardComponent } from '@components/user-card/user-card.component';
import { userActions } from 'app/store/user.actions';
import { Store } from '@ngrx/store';
import { userSelectors } from 'app/store/user.selectors';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user-list',
  imports: [AsyncPipe, UserCardComponent, NgFor],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent implements OnInit, OnDestroy {
  private readonly store = inject(Store);

  public users$ = this.store.select(userSelectors.selectUsers);
  public isError$ = this.store.select(userSelectors.selectIsError);
  
  private isErrorSubscription: Subscription | undefined;

  public ngOnInit(): void {
    this.store.dispatch(userActions.loadUsers());

    this.isErrorSubscription = this.isError$.subscribe((isError) => {
      if (isError) {
        console.error('Ошибка загрузки пользователей');
      }
    });
  }

  public ngOnDestroy(): void {
    this.isErrorSubscription?.unsubscribe();
  }
}
