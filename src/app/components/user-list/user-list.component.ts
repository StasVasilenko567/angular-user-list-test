import { Component, inject, OnInit } from '@angular/core';
import { UserService } from '@services/user.service';
import { AsyncPipe, NgFor } from '@angular/common';
import { UserCardComponent } from '@components/user-card/user-card.component';

@Component({
  selector: 'app-user-list',
  imports: [AsyncPipe, UserCardComponent, NgFor],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent implements OnInit {
  public userService = inject(UserService);

  ngOnInit(): void {
    this.userService.getUsers();
  }
}
