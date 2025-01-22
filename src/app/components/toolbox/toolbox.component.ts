import { Component, inject, Input } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '@services/user.service';
import { User } from '@models/User';
import { generateUID } from '@utils/UuidGenerator';

@Component({
  selector: 'app-toolbox',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './toolbox.component.html',
  styleUrl: './toolbox.component.css'
})
export class ToolboxComponent {

  private userService = inject(UserService)

  public toolboxForm: FormGroup = new FormGroup({
    "name": new FormControl(null, [Validators.required]),
    "username": new FormControl(null, [Validators.required]),
    "email": new FormControl(null, [Validators.required, Validators.email]),
    "phone": new FormControl(null, [Validators.required, Validators.pattern('[0-9]{10}')]),
  });

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
