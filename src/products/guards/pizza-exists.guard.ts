import * as fromStore from "../store";
import { Injectable } from "@angular/core";
import { CanActivate, ActivatedRouteSnapshot } from "@angular/router";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs/Observable";
import { filter, switchMap, take, tap, map } from "rxjs/operators";
import { Pizza } from "../models/pizza.model";

@Injectable()
export class PizzaExistsGuard implements CanActivate {
  constructor(private store: Store<fromStore.ProductsState>) {}

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    return this.checkStore().pipe(
      switchMap(() => {
        const id = parseInt(route.params.pizzaId, 10);
        return this.hasPizza(id);
      })
    );
  }

  /**
   * Double Bang!! -> convert truthy value to a boolean
   * @param {number} id
   * @returns {Observable<boolean>}
   */
  hasPizza(id: number): Observable<boolean> {
    return this.store.select(fromStore.getAllPizzasEntities).pipe(
      map((entities: { [key: number]: Pizza }) => {
        let pizzaExists = !!entities[id];
        console.log(`Does pizza exists? ${pizzaExists}`);
        return pizzaExists;
      }),
      take(1)
    );
  }

  checkStore(): Observable<boolean> {
    return this.store.select(fromStore.getPizzasLoaded).pipe(
      tap(loaded => {
        if (!loaded) {
          console.log("Not loaded -> Dispatching LoadPizzas");
          this.store.dispatch(new fromStore.LoadPizzas());
        }
      }),
      filter(loaded => {
        console.log("loaded -> Moving on");
        return loaded == true;
      }), // wait for it
      take(1)
    );
  }
}
