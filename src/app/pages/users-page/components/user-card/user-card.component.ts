import { Component, inject, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EditDialogComponent } from 'app/pages/users-page/components/edit-dialog/edit-dialog.component';
import { User, UserRole } from 'app/pages/users-page/models/user.model';
import { Store } from '@ngrx/store';
import { userActions } from 'app/pages/users-page/store/user.actions';
import { SelectorComponent } from "../selector/selector.component";

@Component({
  selector: 'app-user-card',
  imports: [SelectorComponent],
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.css'
})
export class UserCardComponent {

  public selectedRole: UserRole | undefined;
  
  @Input() user: User | undefined;
  
  private readonly dialog = inject(MatDialog);
  private readonly store = inject(Store);

  public roles = [
    {id: UserRole.ADMIN, name: 'Админ'},
    {id: UserRole.USER, name: 'Пользователь'},
    {id: UserRole.BARABULKA, name: 'Барабулька'},
  ];

  
  public deleteUser() {
    this.store.dispatch(userActions.deleteUser({ id: this.user?.id as string }));
  }

  public updateRole(role: UserRole) {
    this.store.dispatch(userActions.updateUser({ id: this.user?.id as string, user: {id: this.user?.id as string, name: this.user?.name as string, role: role, username: this.user?.username as string, email: this.user?.email as string, phone: this.user?.phone as string } }));
  }

  public onUpdatePressed() {
    this.updateRole(this.selectedRole as UserRole);
  }

  public onSelectionChange(role: UserRole) {
    this.selectedRole = role;
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
        const tmpUser: User = {
          id: this.user?.id as string,
          name: result.name,
          username: result.username,
          email: result.email,
          phone: result.phone,
          role: this.user?.role as UserRole,
        }
        this.store.dispatch(userActions.updateUser({ id: this.user?.id as string, user: tmpUser }));
      }
    });
  }
}
