import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouterModule, Routes} from '@angular/router';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {MetaReducer, StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
// not used in production
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {storeFreeze} from 'ngrx-store-freeze';
// bootstrap
import {AppComponent} from './containers/app/app.component';

// this would be done dynamically with webpack for builds
const environment = {
  development: true,
  production: false,
};
// function applied to every reducer -> NOT in production
export const metaReducers: MetaReducer<any>[] = !environment.production ? [storeFreeze] : [];


// routes
export const ROUTES: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'products'},
  {
    path: 'products',
    loadChildren: '../products/products.module#ProductsModule',
  },
];

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(ROUTES),
    StoreModule.forRoot({}, {metaReducers}),
    EffectsModule.forRoot([]),
    environment.development ? StoreDevtoolsModule.instrument() : [],
  ],
  declarations: [AppComponent],
  bootstrap: [AppComponent],
})
export class AppModule {
}
