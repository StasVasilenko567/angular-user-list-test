import { FormControl, FormGroup, Validators } from "@angular/forms";
import { User } from "./User";

export function GetFormBuilder(args?: User): FormGroup {
    return new FormGroup({
        "name": new FormControl(args?.name, [Validators.required]),
        "username": new FormControl(args?.username, [Validators.required, Validators.minLength(4), Validators.maxLength(20)]),
        "email": new FormControl(args?.email, [Validators.required, Validators.email]),
        "phone": new FormControl(args?.phone, [Validators.required, Validators.pattern('[0-9]{10}')]),
    });
}