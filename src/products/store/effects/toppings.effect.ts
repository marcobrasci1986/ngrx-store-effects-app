import { Injectable } from "@angular/core";
import { Actions, Effect } from "@ngrx/effects";

import * as toppingsAction from "../actions/toppings.action";
import { catchError, map, switchMap } from "rxjs/operators";
import * as fromServices from "../../services";
import { of } from "rxjs/observable/of";

@Injectable()
export class ToppingsEffects {
  constructor(
    private actions$: Actions,
    private toppingsService: fromServices.ToppingsService
  ) {}

  /**
   * Triggered by LOAD_TOPPINGS as dispatched action
   * Listen for dispatched action, will also call the reducer.
   *
   * Will dispatch LoadToppingsSuccess with a payload
   * @type {Observable<any>}
   */
  @Effect()
  loadToppings$ = this.actions$.ofType(toppingsAction.LOAD_TOPPINGS).pipe(
    switchMap(() => {
      console.log("In Toppings Effects");
      return this.toppingsService.getToppings().pipe(
        map(toppings => new toppingsAction.LoadToppingsSuccess(toppings)),
        catchError(error => of(new toppingsAction.LoadToppingsFail(error)))
      );
    })
  );
}
