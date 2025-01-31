import { NgIf } from "@angular/common";
import { Component, inject } from "@angular/core";
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogContent, MatDialogRef, MatDialogTitle } from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";

interface CreateTaskDialogForm {
  title: FormControl<string | null | undefined>;
  description: FormControl<string | null | undefined>;
}

interface CreateTaskDialogData {
  
}

@Component({
  selector: 'app-create-task-dialog',
  templateUrl: './create-task-dialog.component.html',
  styleUrls: ['./create-task-dialog.component.css'],
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    ReactiveFormsModule,
    NgIf,
  ],
})
export class CreateTaskDialogComponent {
  public readonly data = inject<CreateTaskDialogData>(MAT_DIALOG_DATA);
  public readonly dialogRef = inject(MatDialogRef<CreateTaskDialogComponent>);
  public form: FormGroup<CreateTaskDialogForm> = new FormGroup({
    "title": new FormControl<string | null | undefined>(null, [Validators.required]),
    "description": new FormControl<string | null | undefined>(null, [Validators.required]),
  });

  public cancel(): void {
    this.dialogRef.close();
  }

  public submit(): void {
    this.dialogRef.close(this.form.value);
  }

}