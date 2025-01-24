import { Component, inject, OnInit } from '@angular/core';
import { AsyncPipe, NgFor } from '@angular/common';
import { UserCardComponent } from '@components/user-card/user-card.component';
import { userActions } from 'app/store/user.actions';
import { Store } from '@ngrx/store';
import { userSelectors } from 'app/store/user.selectors';

@Component({
  selector: 'app-user-list',
  imports: [AsyncPipe, UserCardComponent, NgFor],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent implements OnInit {
  private store = inject(Store);

  ngOnInit(): void {
    this.store.dispatch(userActions.loadUsers());
  }

  public users$ = this.store.select(userSelectors.selectUsers);
}
