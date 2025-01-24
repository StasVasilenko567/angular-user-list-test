import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UserListComponent } from './components/user-list/user-list.component';
import { ToolboxComponent } from './components/toolbox/toolbox.component';
import { StoreModule } from '@ngrx/store';  
import { userFeature } from './store/user.reducers';
import { EffectsModule } from '@ngrx/effects';
import { UserEffects } from './store/user.effects';

@Component({
  selector: 'app-root',
  imports: [UserListComponent, ToolboxComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'test-angular';
}
