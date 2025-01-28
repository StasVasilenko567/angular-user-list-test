import { Component } from '@angular/core';
import { UserListComponent } from 'app/pages/users-page/components/user-list/user-list.component';
import { ToolboxComponent } from 'app/pages/users-page/components/toolbox/toolbox.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'test-angular';
}
