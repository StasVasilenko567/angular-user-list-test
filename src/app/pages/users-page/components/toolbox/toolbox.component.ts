import { Component, inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { User, UserRole } from 'app/pages/users-page/models/user.model';
import { generateUID } from 'app/pages/users-page/utils/UuidGenerator';
import { EditDialogComponent } from 'app/pages/users-page/components/edit-dialog/edit-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { userActions } from 'app/pages/users-page/store/user.actions';

@Component({
  selector: 'app-toolbox',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './toolbox.component.html',
  styleUrl: './toolbox.component.css'
})
export class ToolboxComponent {

  readonly dialog = inject(MatDialog);  
  private readonly store = inject(Store);

  private addUser(inputValue: User) {
    const tempU: User = {
      id: generateUID(),
      name: inputValue.name as string,
      username: inputValue.username as string,
      email: inputValue.email as string,
      phone: inputValue.phone as string,
      role: inputValue.role as UserRole,
    }
    this.store.dispatch(userActions.addUser({ user: tempU }));
  }

  public openDialog() {
    const dialogRef = this.dialog.open(EditDialogComponent, {
          width: '600px',
          data: {
            user: null,
            title: 'Добавить пользователя'
          },
        });
    
        dialogRef.afterClosed().subscribe((result: User | null) => {
          if (result) {
            console.log(result);
            this.addUser(result);
          }
    });
  }
}
