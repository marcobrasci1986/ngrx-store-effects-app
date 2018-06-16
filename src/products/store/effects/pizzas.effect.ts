import { Injectable } from "@angular/core";
import { Actions, Effect } from "@ngrx/effects";

import * as pizzaAction from "../actions/pizzas.action";
import { catchError, map, switchMap } from "rxjs/operators";
import * as fromServices from "../../services";
import { of } from "rxjs/observable/of";
import * as fromRoot from "../../../app/store";

import { Pizza } from "../../models/pizza.model";

/**
 * Effects will use services to get data from the backend.
 *
 * It will then dispatch a success action of an error action back to the reducer (with the ActionCreators)
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
        map(createdPizza => new pizzaAction.CreatePizzaSuccess(createdPizza)),
        catchError(error => of(new pizzaAction.CreatePizzaFail(error)))
      );
    })
  );

  @Effect()
  createPizzaSuccess = this.actions$
    .ofType(pizzaAction.CREATE_PIZZA_SUCCESS)
    .pipe(
      map((action: pizzaAction.CreatePizzaSuccess) => action.payload),
      map((pizza: Pizza) => {
        return new fromRoot.Go({
          path: ["/products", pizza.id]
        });
      })
    );

  @Effect()
  updatePizza$ = this.actions$.ofType(pizzaAction.UPDATE_PIZZA).pipe(
    map((action: pizzaAction.UpdatePizza) => action.payload),
    switchMap(pizza => {
      return this.pizzaService.updatePizza(pizza).pipe(
        map(updatedPizza => new pizzaAction.UpdatePizzaSuccess(updatedPizza)),
        catchError(error => of(new pizzaAction.CreatePizzaFail(error)))
      );
    })
  );

  @Effect()
  removePizza$ = this.actions$.ofType(pizzaAction.REMOVE_PIZZA).pipe(
    map((action: pizzaAction.RemovePizza) => action.payload),
    switchMap(pizzaToDelete => {
      return this.pizzaService.removePizza(pizzaToDelete).pipe(
        map(() => new pizzaAction.RemovePizzaSuccess(pizzaToDelete)),
        catchError(error => of(new pizzaAction.RemovePizzaFail(error)))
      );
    })
  );

  /**
   * Listen for multiple actions
   * @type {Actions<Action>}
   */
  @Effect()
  handlePizzaSuccess = this.actions$
    .ofType(pizzaAction.UPDATE_PIZZA_SUCCESS, pizzaAction.REMOVE_PIZZA_SUCCESS)
    .pipe(
      map(pizza => {
        return new fromRoot.Go({
          path: ["/products"]
        });
      })
    );
}
