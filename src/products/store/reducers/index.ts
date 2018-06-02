import * as fromPizzas from "./pizzas.reducer";
import {PizzaState, reducer} from "./pizzas.reducer";
import {ActionReducerMap, createFeatureSelector, createSelector} from "@ngrx/store";

export interface ProductsState {
  pizzas: PizzaState
}

// register reducers
export const reducers: ActionReducerMap<ProductsState> = {
  pizzas: reducer
};

// products
export const getProductsState = createFeatureSelector<ProductsState>('products');

// products.pizzas
export const getPizzaState = createSelector(getProductsState, (state: ProductsState) => state.pizzas);
// products.pizzas.data
export const getAllPizzas = createSelector(getPizzaState, fromPizzas.getPizzas);
// products.pizzas.loaded
export const getPizzasLoaded = createSelector(getPizzaState, fromPizzas.getPizzasLoaded);
// products.pizzas.loading
export const getPizzasLoading = createSelector(getPizzaState, fromPizzas.getPizzasLoading);


// Explanation
// getProductsState: returns products object from global state
// getPizzaState: returns pizza object from ProductsState

// We are essentially stepping through the state tree, using selector functions

// const state = {
//   products: {
//     pizzas: {
//       data: [],
//       loaded: false,
//       loading: false
//     }
//   }
// };
