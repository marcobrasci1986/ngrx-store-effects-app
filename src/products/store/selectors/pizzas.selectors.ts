//////////////////////////////////////////////////////////////////////////////
// Selectors: use in component to select pieces of state from the Store /////
//////////////////////////////////////////////////////////////////////////////

// products
import { createFeatureSelector, createSelector } from "@ngrx/store";

import * as fromRoot from "../../../app/store";
import * as fromPizzas from "../reducers/pizzas.reducer";
import * as fromToppings from "./toppings.selectors";
import * as fromFeature from "../reducers";
import { Pizza } from "../../models/pizza.model";

// products.pizzas
export const getPizzaState = createSelector(
  fromFeature.getProductsState,
  (state: fromFeature.ProductsState) => state.pizzas
);

export const getAllPizzasEntities = createSelector(
  getPizzaState,
  fromPizzas.getPizzasEntities
);

export const getAllPizzas = createSelector(getAllPizzasEntities, entities => {
  console.log("Get All Pizzas: ", entities);
  // convert object data structure into an array
  return Object.keys(entities).map(id => entities[+id]);
});

export const getSelectedPizza = createSelector(
  getAllPizzasEntities,
  fromRoot.getRouterState,
  (entities, router): Pizza => {
    return router.state && entities[router.state.params.pizzaId];
  }
);

export const getPizzaVisualized = createSelector(
  getSelectedPizza,
  fromToppings.getToppingEntities,
  fromToppings.getSelectedToppings,
  (selectedPizza, toppingsEntities, selectedToppings) => {
    const toppings = selectedToppings.map(id => toppingsEntities[id]);

    return {
      ...selectedPizza,
      toppings
    };
  }
);

// products.pizzas.loaded
export const getPizzasLoaded = createSelector(
  getPizzaState,
  fromPizzas.getPizzasLoaded
);
// products.pizzas.loading
export const getPizzasLoading = createSelector(
  getPizzaState,
  fromPizzas.getPizzasLoading
);

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
