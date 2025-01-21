import { Component, inject, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../user.service';
import { User } from '../../models/User';
import { generateUID } from '../../utils/UuidGenerator';

@Component({
  selector: 'app-toolbox',
  imports: [FormsModule],
  templateUrl: './toolbox.component.html',
  styleUrl: './toolbox.component.css'
})
export class ToolboxComponent {
  @Input() public nameFiled: string = '';

  private userService = inject(UserService)

  public addUser() {
    const tempU: User = {
      id: generateUID(),
      name: this.nameFiled,
    }
    this.userService.addUser(tempU);
  }
}
