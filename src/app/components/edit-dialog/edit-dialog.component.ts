import { Component, inject, model } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { User } from '@models/User';
import { GetFormBuilder } from '@models/UserForm';

@Component({
  selector: 'app-edit-dialog',
  imports: [MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    ReactiveFormsModule],
  templateUrl: './edit-dialog.component.html',
  styleUrl: './edit-dialog.component.css'
})
export class EditDialogComponent {
  readonly user = inject<User>(MAT_DIALOG_DATA);
  readonly dialogRef = inject(MatDialogRef<EditDialogComponent>);
  public formBuilder = GetFormBuilder(this.user);

  public cancel(): void {
    this.dialogRef.close();
  }

  public goahead(): void {
    const values = this.formBuilder.value;
    this.dialogRef.close(values); 
  }
}
