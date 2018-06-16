import * as fromToppings from "../actions/toppings.action";
import { Topping } from "../../models/topping.model";

export interface ToppingsState {
  entities: { [id: number]: Topping };
  loaded: boolean;
  loading: boolean;
  selectedToppings: number[];
}

export const initialState: ToppingsState = {
  entities: {},
  loaded: false,
  loading: false,
  selectedToppings: []
};

export function reducer(
  state = initialState,
  action: fromToppings.ToppingsAction
): ToppingsState {
  switch (action.type) {
    case fromToppings.VISUALIZE_TOPPINGS: {
      // basically sets selected toppings in the store
      console.log("Reducer Visualize toppings");
      const selectedToppings = action.payload;
      return {
        ...state,
        selectedToppings
      };
    }
    case fromToppings.LOAD_TOPPINGS: {
      console.log("Reducer:: LOAD_TOPPINGS");
      return {
        ...state,
        loading: true
      };
    }
    case fromToppings.LOAD_TOPPINGS_SUCCESS: {
      const toppings = action.payload;

      const entities = toppings.reduce(
        (accumulator: { [id: number]: Topping }, topping: Topping) => {
          return {
            ...accumulator,
            [topping.id]: topping
          };
        },
        {
          ...state.entities // initial state
        }
      );

      return {
        ...state,
        loading: false,
        loaded: true,
        entities
      };
    }

    case fromToppings.LOAD_TOPPINGS_FAIL: {
      return {
        ...state,
        loaded: false,
        loading: false
      };
    }
  }
  return state;
}

export const getToppingsEntities = (state: ToppingsState) => state.entities;
export const getToppingsLoaded = (state: ToppingsState) => state.loaded;
export const getToppingsLoading = (state: ToppingsState) => state.loading;
export const getSelectedToppings = (state: ToppingsState) =>
  state.selectedToppings;
