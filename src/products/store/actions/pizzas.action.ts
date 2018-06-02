import {Action} from "@ngrx/store";
import {Pizza} from "../../models/pizza.model";


/*
 * Action have two properties: type and optional payload
 * Reducers: switch on type
 */


// load pizzas
// namespace[Products] -> per feature module
// communication via Events
export const LOAD_PIZZAS = '[Products] Load Pizzas';
export const LOAD_PIZZAS_FAIL = '[Products] Load Pizzas Fail';
export const LOAD_PIZZAS_SUCCESS = '[Products] Load Pizzas Success';

// Action Creators
export class LoadPizzas implements Action {
  readonly type = LOAD_PIZZAS;
}

export class LoadPizzasSuccess implements Action {
  readonly type = LOAD_PIZZAS_SUCCESS;

  constructor(public payload: Pizza[]) {
  }
}

export class LoadPizzasFail implements Action {
  readonly type = LOAD_PIZZAS_FAIL;

  //error message from server
  constructor(private payload: any) {
  }
}

// Action Types (used in switch in Reducer)
export type PizzasAction = LoadPizzas | LoadPizzasFail | LoadPizzasSuccess
