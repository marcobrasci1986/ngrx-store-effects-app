import { Pizza } from "../products/models/pizza.model";
import { Topping } from "../products/models/topping.model";

fdescribe("SpreadOperator", () => {
  it("it should add an object with spread operator in immutable way", function() {
    const pizzas: Pizza[] = [];

    pizzas.push(
      {
        id: 1,
        name: "Pepperoni",
        toppings: [
          {
            id: 1,
            name: "salami"
          }
        ]
      },
      {
        id: 2,
        name: "MeatLover",
        toppings: [
          {
            id: 2,
            name: "meat"
          }
        ]
      }
    );

    const pizzaToAdd: Pizza = {
      id: 3,
      name: "Margarita",
      toppings: [
        {
          id: 3,
          name: "cheese"
        }
      ]
    };

    const updatedPizzas = [...pizzas, pizzaToAdd];

    expect(updatedPizzas.length).toBe(3);
    expect(updatedPizzas[2]).toEqual(pizzaToAdd);
  });

  it("it should destructure object to extract toppings array", () => {
    const pizzaToAdd: Pizza = {
      id: 3,
      name: "Margarita",
      toppings: [
        {
          id: 3,
          name: "cheese"
        }
      ]
    };

    const { toppings } = pizzaToAdd;
    expect(toppings.length).toBe(1);
    expect(toppings[0].id).toBe(3);
    expect(toppings[0].name).toBe("cheese");
  });
});
