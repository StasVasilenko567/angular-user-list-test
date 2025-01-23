import { NgIf } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
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
import { User } from '@models/user.model';

interface EditDialogData {
  user?: User;
  title: string;
}

interface EditDialogForm {
  name:  FormControl<string | null | undefined>;
  username: FormControl<string | null | undefined>;
  email: FormControl<string | null | undefined>;
  phone: FormControl<string | null | undefined>; 
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
    NgIf
  ],
  templateUrl: './edit-dialog.component.html',
  styleUrl: './edit-dialog.component.css'
})
export class EditDialogComponent {
  readonly data = inject<EditDialogData>(MAT_DIALOG_DATA);
  readonly dialogRef = inject(MatDialogRef<EditDialogComponent>);
  public form: FormGroup<EditDialogForm> = new FormGroup<EditDialogForm>({
    "name": new FormControl(this.data.user?.name, [Validators.required]),
    "username": new FormControl(this.data.user?.username, [Validators.required, Validators.minLength(4), Validators.maxLength(20)]),
    "email": new FormControl(this.data.user?.email, [Validators.required, Validators.email]),
    "phone": new FormControl(this.data.user?.phone, [Validators.required, Validators.pattern('[0-9]{10}')]),
  });

  public cancel(): void {
    this.dialogRef.close();
  }

  public goahead(): void {
    const values = this.form.value;
    this.dialogRef.close(values); 
  }
}
