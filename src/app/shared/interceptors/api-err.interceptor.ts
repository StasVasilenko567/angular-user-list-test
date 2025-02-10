import { HttpErrorResponse, HttpEvent, HttpEventType, HttpHandler, HttpHandlerFn, HttpInterceptor, HttpRequest, HttpResponse } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { ErrorDialogComponent } from "app/shared/components/error-dialog/error-dialog.component";
import { catchError, Observable, tap, throwError } from "rxjs";

// export function ApiErrorInterceptorFunc(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
//     const dialog = inject(MatDialog);

//     return next(req).pipe(
//         catchError((err: HttpErrorResponse) => {
//             dialog.open(ErrorDialogComponent, {
//                 data: { message: err.message },
//             });
//             return throwError(() => new Error(err.message));
//         })
//     );
// }

@Injectable()
export class ApiErrorInterceptor implements HttpInterceptor {

    private readonly dialog = inject(MatDialog);

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req).pipe(
            tap({
                error: (err: any) => {
                    console.log('error class')
                    this.dialog.open(ErrorDialogComponent, {
                        data: { message: err.message },
                    });
                }
            }),
        )
    }
}