import { Component, inject, Input } from '@angular/core';
import { User } from '@models/User';
import { UserService } from '@services/user.service';

@Component({
  selector: 'app-user-card',
  imports: [],
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.css'
})
export class UserCardComponent {
  @Input() user: User | undefined;

  private userService = inject(UserService);

  public deleteUser() {
    this.userService.deleteUser(this.user?.id as string);
  }
}
