import { Component, inject, OnInit } from '@angular/core';
import { UserSerice } from '../../user.service';
import { AsyncPipe } from '@angular/common';
import { UserCardComponent } from '../user-card/user-card.component';

@Component({
  selector: 'app-user-list',
  imports: [AsyncPipe, UserCardComponent],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent implements OnInit {
  public userService = inject(UserSerice);

  ngOnInit(): void {
    this.userService.getUsers();
  }
}
