import { Injectable } from "@angular/core";
import { Actions, Effect } from "@ngrx/effects";

import * as pizzaAction from "../actions/pizzas.action";
import { catchError, map, switchMap } from "rxjs/operators";
import * as fromServices from "../../services";
import { of } from "rxjs/observable/of";

/**
 * Effects will use services to get data from the backend
 */
@Injectable()
export class PizzasEffect {
  constructor(
    private actions$: Actions,
    private pizzaService: fromServices.PizzasService
  ) {}

  /**
   * Listen for dispatched action, will also call the reducer.
   *
   * Will dispatch loadPizzaSuccess with a payload
   * @type {Observable<any>}
   */
  @Effect()
  loadPizzas$ = this.actions$.ofType(pizzaAction.LOAD_PIZZAS).pipe(
    switchMap(() => {
      console.log("In Effects");
      return this.pizzaService.getPizzas().pipe(
        map(pizzas => new pizzaAction.LoadPizzasSuccess(pizzas)),
        catchError(error => of(new pizzaAction.LoadPizzasFail(error)))
      );
    })
  );

  @Effect()
  createPizza$ = this.actions$.ofType(pizzaAction.CREATE_PIZZA).pipe(
    map((action: pizzaAction.CreatePizza) => action.payload),
    switchMap(pizza => {
      return this.pizzaService.createPizza(pizza).pipe(
        map(updatedPizza => new pizzaAction.CreatePizzaSuccess(updatedPizza)),
        catchError(error => of(new pizzaAction.CreatePizzaFail(error)))
      );
    })
  );
}
