import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";
import { ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
// components
import * as fromComponents from "./components";
// containers
import * as fromContainers from "./containers";
// services
import * as fromServices from "./services";

// guards
import * as fromGuards from "./guards";
import { StoreModule } from "@ngrx/store";
import { effects, reducers } from "./store";
import { EffectsModule } from "@ngrx/effects";
import { PizzaExistsGuard } from "./guards/pizza-exists.guard";

// routes
export const ROUTES: Routes = [
  {
    path: "",
    component: fromContainers.ProductsComponent,
    canActivate: [fromGuards.PizzasGuard]
  },

  {
    path: "new",
    component: fromContainers.ProductItemComponent,
    canActivate: [fromGuards.PizzasGuard, fromGuards.ToppingsGuard]
  },
  {
    path: ":pizzaId",
    component: fromContainers.ProductItemComponent,
    canActivate: [fromGuards.PizzaExistsGuard, fromGuards.ToppingsGuard]
  }
];

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forChild(ROUTES),
    StoreModule.forFeature("products", reducers), // bind to root Store object, for lazy loading feature modules
    EffectsModule.forFeature(effects)
  ],
  providers: [...fromServices.services, ...fromGuards.guards],
  declarations: [...fromContainers.containers, ...fromComponents.components],
  exports: [...fromContainers.containers, ...fromComponents.components]
})
export class ProductsModule {}
