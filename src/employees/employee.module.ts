import {NgModule} from "@angular/core";
import {EmployeesComponent} from "./components/employees.component";
import {CommonModule} from '@angular/common';

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [],
  declarations: [
    EmployeesComponent
  ],
  exports: [
    EmployeesComponent
  ]
})
export class EmployeesModule {
}
