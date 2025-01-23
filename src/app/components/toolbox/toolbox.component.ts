import { Component, inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '@services/user.service';
import { User } from '@models/user.model';
import { generateUID } from '@utils/UuidGenerator';
import { EditDialogComponent } from '@components/edit-dialog/edit-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-toolbox',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './toolbox.component.html',
  styleUrl: './toolbox.component.css'
})
export class ToolboxComponent {

  private userService = inject(UserService)
  readonly dialog = inject(MatDialog);  

  public addUser(inputValue: User) {

    const tempU: User = {
      id: generateUID(),
      name: inputValue.name as string,
      username: inputValue.username as string,
      email: inputValue.email as string,
      phone: inputValue.phone as string,
    }
    this.userService.addUser(tempU);
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
