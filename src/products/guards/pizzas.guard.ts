import { Injectable } from "@angular/core";
import * as fromStore from "../store";
import { CanActivate } from "@angular/router";
import { Observable } from "rxjs/Observable";
import { Store } from "@ngrx/store";
import { catchError, switchMap, take, tap, filter } from "rxjs/operators";
import { of } from "rxjs/observable/of";

@Injectable()
export class PizzasGuard implements CanActivate {
  constructor(private store: Store<fromStore.ProductsState>) {}

  canActivate(): Observable<boolean> {
    return this.checkStore().pipe(
      switchMap(() => of(true)),
      catchError(() => of(false))
    );
  }

  /**
   * take 1 -> unsubscribe automatically
   * @returns {Observable<boolean>}
   */
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
