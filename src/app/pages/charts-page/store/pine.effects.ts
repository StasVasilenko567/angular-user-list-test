import { inject, Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { PineApiService } from "../services/pineapi.service";
import { catchError, map, of, switchMap } from "rxjs";
import { pineActions } from "./pine.actions";

@Injectable()
export class PineEffects {
    private readonly actions$: Actions = inject(Actions);
    private readonly apiService: PineApiService = inject(PineApiService);

    public loadPines$ = createEffect(() => this.actions$.pipe(
        ofType(pineActions.loadPines),
        switchMap(() => this.apiService.getPines().pipe(
            map((pines: [number, number]) => pineActions.loadPinesSuccess({ pines })),
            catchError(() => of(pineActions.loadPinesFailure()))
        ))
    ));
}
