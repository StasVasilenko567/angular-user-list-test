import { Component } from '@angular/core';
import { UserListComponent } from './components/user-list/user-list.component';
import { ToolboxComponent } from './components/toolbox/toolbox.component';

@Component({
  selector: 'app-users-page',
  standalone: true,
  imports: [ToolboxComponent, UserListComponent],
  templateUrl: './users-page.component.html',
  styleUrl: './users-page.component.css',
})
export class UsersPageComponent {

}
