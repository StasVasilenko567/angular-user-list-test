import { Component, inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { User } from '@models/user.model';
import { generateUID } from '@utils/UuidGenerator';
import { EditDialogComponent } from '@components/edit-dialog/edit-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { userActions } from 'app/store/user.actions';

@Component({
  selector: 'app-toolbox',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './toolbox.component.html',
  styleUrl: './toolbox.component.css'
})
export class ToolboxComponent {

  readonly dialog = inject(MatDialog);  
  private readonly store = inject(Store);

  public addUser(inputValue: User) {
    const tempU: User = {
      id: generateUID(),
      name: inputValue.name as string,
      username: inputValue.username as string,
      email: inputValue.email as string,
      phone: inputValue.phone as string,
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
            this.addUser(result);
          }
    });
  }
}
