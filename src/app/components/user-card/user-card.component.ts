import { Component, inject, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EditDialogComponent } from '@components/edit-dialog/edit-dialog.component';
import { User } from '@models/User';
import { UserService } from '@services/user.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-user-card',
  imports: [],
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.css'
})
export class UserCardComponent {
  @Input() user: User | undefined;

  readonly dialog = inject(MatDialog);
  private userService = inject(UserService);

  public deleteUser() {
    this.userService.deleteUser(this.user?.id as string);
  }

  openDialog() {
    const dialogRef = this.dialog.open(EditDialogComponent, {
      width: '600px',
      data: this.user,
    });

    dialogRef.afterClosed().subscribe((result: User | null) => {
      if (result) {
        this.userService.updateUser(this.user?.id as string, result);
      }
    });
  }
}
