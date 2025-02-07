import { HttpErrorResponse, HttpEvent, HttpEventType, HttpHandler, HttpHandlerFn, HttpInterceptor, HttpRequest, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, catchError, finalize, Observable, tap, throwError } from "rxjs";

// @Injectable()
// export class ApiErrorHandlerService implements HttpInterceptor {

//     private readonly errorsSubject: BehaviorSubject<string> = new BehaviorSubject<string>("");
//     public readonly error$ = this.errorsSubject.asObservable();

//     intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
//         console.log("HELLO");
//         return next.handle(req).pipe(
//             tap({
//                 error: (err: any) => {
//                     if (err?.message != "") {
//                         this.errorsSubject.next(err.message);
//                     }
//                 }
//             }),
//         );
//     }
// }

const errorSubject: BehaviorSubject<string> = new BehaviorSubject<string>("");
export const apiError$ = errorSubject.asObservable();

export function ApiErrorInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
    return next(req).pipe(
        catchError((err: HttpErrorResponse) => {
            errorSubject.next(err.message);
            return throwError(() => new Error(err.message));
        })
    );
}