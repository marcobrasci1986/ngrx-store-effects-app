import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { RouterModule, Routes } from "@angular/router";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import {
  RouterStateSerializer,
  StoreRouterConnectingModule
} from "@ngrx/router-store";
import { MetaReducer, StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";
import { CustomSerializer, effects, reducers } from "./store";
// not used in production
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import { storeFreeze } from "ngrx-store-freeze";
// bootstrap
import { AppComponent } from "./containers/app/app.component";
import { EmployeesComponent } from "../employees/components/employees.component";
import { EmployeesModule } from "../employees/employee.module";

// this would be done dynamically with webpack for builds
const environment = {
  development: true,
  production: false
};
// function applied to every reducer -> NOT in production
export const metaReducers: MetaReducer<any>[] = !environment.production
  ? [storeFreeze]
  : [];

// routes
export const ROUTES: Routes = [
  { path: "", pathMatch: "full", redirectTo: "products" },
  {
    path: "products",
    loadChildren: "../products/products.module#ProductsModule"
  },
  {
    path: "employees",
    component: EmployeesComponent
  }
];

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(ROUTES),
    StoreModule.forRoot(reducers, { metaReducers }),
    EffectsModule.forRoot(effects),
    StoreRouterConnectingModule, // setup for RouterState
    environment.development ? StoreDevtoolsModule.instrument() : [],
    EmployeesModule
  ],
  providers: [{ provide: RouterStateSerializer, useClass: CustomSerializer }], // registers are own CustomSerializer
  declarations: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule {}
