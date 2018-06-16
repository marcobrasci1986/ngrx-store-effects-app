import { Pizza } from "../../models/pizza.model";
import * as fromPizzas from "../actions/pizzas.action";

/**
 * A piece of the global State
 */
export interface PizzaState {
  entities: { [id: number]: Pizza };
  loaded: boolean;
  loading: boolean;
}

export const initialState: PizzaState = {
  entities: {},
  loaded: false,
  loading: false
};

export function reducer(
  state = initialState,
  action: fromPizzas.PizzasAction
): PizzaState {
  switch (action.type) {
    case fromPizzas.LOAD_PIZZAS: {
      return { ...state, loading: true };
    }
    case fromPizzas.LOAD_PIZZAS_SUCCESS: {
      console.log("Load Pizzas Success");
      const pizzas = action.payload;

      // flatten array to object structure
      const entities = pizzas.reduce(
        (accumulator: { [id: number]: Pizza }, pizza: Pizza) => {
          return {
            ...accumulator,
            [pizza.id]: pizza
          };
        },
        {
          ...state.entities // initial state
        }
      );
      return { ...state, loading: false, loaded: true, entities };
    }
    case fromPizzas.LOAD_PIZZAS_FAIL: {
      return { ...state, loading: false, loaded: false };
    }

    case fromPizzas.UPDATE_PIZZA_SUCCESS:
    case fromPizzas.CREATE_PIZZA_SUCCESS: {
      const pizza: Pizza = action.payload;
      const entities = { ...state.entities, [pizza.id]: pizza };

      return { ...state, entities };
    }
    case fromPizzas.REMOVE_PIZZA_SUCCESS: {
      const removedPizza: Pizza = action.payload;

      // new ES6 trick: destructure entities. Remove a pizza by ID from the entities array
      const { [removedPizza.id]: removed, ...entities } = state.entities;

      return { ...state, entities };
    }
  }

  return state;
}

export const getPizzasEntities = (state: PizzaState) => state.entities;
export const getPizzasLoading = (state: PizzaState) => state.loading;
export const getPizzasLoaded = (state: PizzaState) => state.loaded;
