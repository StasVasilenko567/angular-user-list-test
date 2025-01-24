import { Component, inject, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EditDialogComponent } from '@components/edit-dialog/edit-dialog.component';
import { User } from '@models/user.model';
import { Store } from '@ngrx/store';
import { userActions } from 'app/store/user.actions';

@Component({
  selector: 'app-user-card',
  imports: [],
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.css'
})
export class UserCardComponent {
  @Input() user: User | undefined;
  
  readonly dialog = inject(MatDialog);
  private readonly store = inject(Store);

  public deleteUser() {
    this.store.dispatch(userActions.deleteUser({ id: this.user?.id as string }));
  }

  public openDialog() {
    const dialogRef = this.dialog.open(EditDialogComponent, {
      width: '600px',
      data: {
        user: this.user,
        title: 'Редактировать пользователя'
      },
    });

    dialogRef.afterClosed().subscribe((result: User | null) => {
      if (result) {
        this.store.dispatch(userActions.updateUser({ id: this.user?.id as string, user: result }));
      }
    });
  }
}
