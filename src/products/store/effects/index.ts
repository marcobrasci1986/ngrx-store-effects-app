import { PizzasEffect } from "./pizzas.effect";
import { ToppingsEffects } from "./toppings.effect";

/**
 * EffectsModule.forFeature(effects)
 *
 */
export const effects: any[] = [PizzasEffect, ToppingsEffects];
export * from "./pizzas.effect";
export * from "./toppings.effect";
