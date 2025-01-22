import { Component, inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '@services/user.service';
import { User } from '@models/User';
import { generateUID } from '@utils/UuidGenerator';
import { GetFormBuilder } from '@models/UserForm';

@Component({
  selector: 'app-toolbox',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './toolbox.component.html',
  styleUrl: './toolbox.component.css'
})
export class ToolboxComponent {

  private userService = inject(UserService)

  public toolboxForm = GetFormBuilder();

  public addUser() {
    const inputValue = this.toolboxForm.value;

    const tempU: User = {
      id: generateUID(),
      name: inputValue.name,
      username: inputValue.username,
      email: inputValue.email,
      phone: inputValue.phone,
    }
    this.userService.addUser(tempU);
  }
}
