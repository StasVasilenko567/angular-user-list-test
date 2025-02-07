import { HttpErrorResponse, HttpEvent, HttpEventType, HttpHandler, HttpHandlerFn, HttpInterceptor, HttpRequest, HttpResponse } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { ErrorDialogComponent } from "app/shared/components/error-dialog/error-dialog.component";
import { BehaviorSubject, catchError, finalize, Observable, tap, throwError } from "rxjs";

export function ApiErrorInterceptorFunc(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
    const dialog = inject(MatDialog);

    return next(req).pipe(
        catchError((err: HttpErrorResponse) => {
            dialog.open(ErrorDialogComponent, {
                data: { message: err.message },
            });
            return throwError(() => new Error(err.message));
        })
    );
}