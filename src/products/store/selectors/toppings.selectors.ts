import * as fromToppings from "../reducers/toppings.reducer";
import * as fromFeature from "../reducers";
import { createSelector } from "@ngrx/store";

// {
//   products: {
//     pizzas: {
//     }
//     toppings: {
//        entities: {},
//        loading: false,
//        loaded: false
//     }
//   }
// }
export const getToppingsState = createSelector(
  fromFeature.getProductsState,
  (state: fromFeature.ProductsState) => state.toppings
);

export const getToppingEntities = createSelector(
  getToppingsState,
  fromToppings.getToppingsEntities
);
export const getSelectedToppings = createSelector(
  getToppingsState,
  fromToppings.getSelectedToppings
);

export const getAllToppings = createSelector(
  getToppingEntities,
  entities => {
    return Object.keys(entities).map(id => entities[parseInt(id, 10)]);
  }
);

export const getToppingsLoaded = createSelector(
  getToppingsState,
  fromToppings.getToppingsLoaded
);

export const getToppingsLoading = createSelector(
  getToppingsState,
  fromToppings.getToppingsLoading
);
