import { CommonModule } from "@angular/common";
import { Component, inject } from "@angular/core";
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatDialogActions, MatDialogContent, MatDialogRef, MatDialogTitle } from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIcon } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { employeeStatus } from "app/pages/workers-page/models/enums.models";
import {MatSelectModule} from '@angular/material/select';

interface CreateEmployeeDialogForm {
    name: FormControl<string | null | undefined>;
    employeeStatus: FormControl<employeeStatus | null | undefined>;
    department: FormControl<string | null | undefined>;
    departmentId: FormControl<number | null | undefined>;
}

@Component({
    selector: "app-create-employee-dialog",
    templateUrl: "./create-employee-dialog.component.html",
    styleUrls: ["./create-employee-dialog.component.css"],
    imports: [
        MatFormFieldModule,
        MatInputModule,
        FormsModule,
        MatButtonModule,
        MatDialogTitle,
        MatDialogContent,
        MatDialogActions,
        ReactiveFormsModule,
        CommonModule,
        MatIcon,
        MatSelectModule,
    ]
})
export class CreateEmployeeDialogComponent {
    public readonly dialogRef = inject(MatDialogRef<CreateEmployeeDialogComponent>);

    public readonly employeeStatus = [
        { value: 0, label: "начальник" },
        { value: 1, label: "новичок" },
    ];

    public form: FormGroup<CreateEmployeeDialogForm> = new FormGroup({
        "name": new FormControl<string | null | undefined>(null, [Validators.required]),
        "employeeStatus": new FormControl<employeeStatus | null | undefined>(null, [Validators.required]),
        "department": new FormControl<string | null | undefined>(null, [Validators.required]),
        "departmentId": new FormControl<number | null | undefined>(null, [Validators.required])
    })

    public cancel() {
        this.dialogRef.close();
    }

    public submit() {
        this.dialogRef.close(this.form.value);
    }
}