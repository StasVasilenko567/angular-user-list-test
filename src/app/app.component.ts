import { Component } from '@angular/core';
import { UserListComponent } from '@components/user-list/user-list.component';
import { ToolboxComponent } from '@components/toolbox/toolbox.component';

@Component({
  selector: 'app-root',
  imports: [UserListComponent, ToolboxComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'test-angular';
}
