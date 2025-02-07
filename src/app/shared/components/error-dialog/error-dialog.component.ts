import { Component, inject } from "@angular/core";
import { MatButton } from "@angular/material/button";
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogContent, MatDialogRef, MatDialogTitle } from "@angular/material/dialog";

interface ErrorDialogData {
    message: string;
}

@Component({
    selector: 'app-error-dialog',
    templateUrl: './error-dialog.component.html',
    styleUrls: ['./error-dialog.component.css'],
    imports: [
        MatDialogTitle,
        MatDialogContent,
        MatDialogActions,
        MatButton
    ]
})
export class ErrorDialogComponent {
    public readonly data = inject<ErrorDialogData>(MAT_DIALOG_DATA);
    public readonly dialogRef = inject(MatDialogRef<ErrorDialogComponent>);

    public exit() {
        this.dialogRef.close();
    }
}