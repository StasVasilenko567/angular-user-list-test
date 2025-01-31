import { NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { SelectorComponent } from 'app/pages/users-page/components/selector/selector.component';
import { User, UserRole } from 'app/pages/users-page/models/user.model';

interface EditDialogData {
  user?: User;
  title: string;
}

interface EditDialogForm {
  name:  FormControl<string | null | undefined>;
  username: FormControl<string | null | undefined>;
  email: FormControl<string | null | undefined>;
  phone: FormControl<string | null | undefined>; 
  role: FormControl<UserRole | null>;
}

@Component({
  selector: 'app-edit-dialog',
  imports: [MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    ReactiveFormsModule,
    NgIf,
  ],
  templateUrl: './edit-dialog.component.html',
  styleUrl: './edit-dialog.component.css'
})
export class EditDialogComponent {
  public readonly data = inject<EditDialogData>(MAT_DIALOG_DATA);
  public readonly dialogRef = inject(MatDialogRef<EditDialogComponent>);
  public form: FormGroup<EditDialogForm> = new FormGroup({
    "name": new FormControl(this.data.user?.name, [Validators.required]),
    "username": new FormControl(this.data.user?.username, [Validators.required, Validators.minLength(4), Validators.maxLength(20)]),
    "email": new FormControl(this.data.user?.email, [Validators.required, Validators.email]),
    "phone": new FormControl(this.data.user?.phone, [Validators.required, Validators.pattern('[0-9]{10}')]),
    "role": new FormControl(this.data.user?.role || UserRole.USER, [Validators.required]),
  });

  public cancel(): void {
    this.dialogRef.close();
  }

  public submit(): void {
    const values = this.form.value;
    this.dialogRef.close(values); 
  }
}
