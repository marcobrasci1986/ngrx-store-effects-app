import {ChangeDetectionStrategy, Component, OnInit, ViewContainerRef} from "@angular/core";

import { Pizza } from "../../models/pizza.model";
import * as fromStore from "../../store";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs/Observable";
import { ToastsManager } from "ng2-toastr";

@Component({
  selector: "products",
  styleUrls: ["products.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="products">
      <div class="products__new">
        <a
          class="btn btn__ok"
          routerLink="./new">
          New Pizza
        </a>
      </div>
      <div class="products__list">
        <div *ngIf="!((pizzas$ | async)?.length)">
          No pizzas, add one to get started.
        </div>
        <pizza-item
          *ngFor="let pizza of (pizzas$ | async)"
          [pizza]="pizza">
        </pizza-item>
      </div>
    </div>
  `
})
export class ProductsComponent implements OnInit {
  pizzas$: Observable<Pizza[]>;

  constructor(
    private store: Store<fromStore.ProductsState>,
    public toastr: ToastsManager,
    vcr: ViewContainerRef
  ) {
    this.toastr.setRootViewContainerRef(vcr);
  }

  ngOnInit() {
    this.pizzas$ = this.store.select(fromStore.getAllPizzas);
    this.toastr.success("You are awesome!", "Success!");
  }
}
