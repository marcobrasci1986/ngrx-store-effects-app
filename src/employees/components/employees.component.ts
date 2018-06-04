import {Component, OnInit} from "@angular/core";
import {Employee, Type} from "../model/employee.model";

/**
 * https://emberigniter.com/transform-any-data-structure-with-javascript-reduce/
 */
@Component({
  selector: "employee",
  templateUrl: "./employee.component.html"
})
export class EmployeesComponent implements OnInit {
  name: string = "Marco";
  extractBoss: Employee;
  employees: Employee[] = [
    {
      firstName: "Mark",
      lastName: "Johnson",
      age: 32,
      type: Type.MANAGER
    },
    {
      firstName: "Lisa",
      lastName: "Arrow",
      age: 24,
      type: Type.HR
    },
    {
      firstName: "Ben",
      lastName: "Cakewalk",
      age: 54,
      type: Type.BOSS
    },
    {
      firstName: "Jan",
      lastName: "Modaal",
      age: 45,
      type: Type.WORKER
    },
    {
      firstName: "Eden",
      lastName: "Hazard",
      age: 31,
      type: Type.WORKER
    },
    {
      firstName: "Stef",
      lastName: "Curry",
      age: 34,
      type: Type.WORKER
    }
  ];

  /**
   * array.reduce(function(acc, value, index, array) {
        // ...
        return acc;
      }, initialValue);
   */
  ngOnInit(): void {
    console.log("Init employeesComponent");

    this.flattenBoss();
  }

  private flattenBoss() {
    this.extractBoss = <Employee> this.employees.reduce(function (accumulator, value) {
      if (value.type === Type.BOSS) {
        return {
          ...accumulator,
          [value.type]: value
        }
      } else {
        return accumulator; // default return accumulated result till then
      }

    }, {});

  }
}
