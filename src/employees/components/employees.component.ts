import {Component, OnInit} from "@angular/core";
import {Employee, FlattenedEmployee, Type} from "../model/employee.model";

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
  workersAge: number;
  flattenedObject: FlattenedEmployee;
  employees: Employee[] = [
    {
      id: 1,
      firstName: "Mark",
      lastName: "Johnson",
      age: 32,
      type: Type.MANAGER
    },
    {
      id: 2,
      firstName: "Lisa",
      lastName: "Arrow",
      age: 24,
      type: Type.HR
    },
    {
      id: 3,
      firstName: "Ben",
      lastName: "Cakewalk",
      age: 54,
      type: Type.BOSS
    },
    {
      id: 4,
      firstName: "Jan",
      lastName: "Modaal",
      age: 50,
      type: Type.WORKER
    },
    {
      id: 5,
      firstName: "Eden",
      lastName: "Hazard",
      age: 20,
      type: Type.WORKER
    },
    {
      id: 6,
      firstName: "Stef",
      lastName: "Curry",
      age: 20,
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
    this.agesOfWorkers();
    this.flattenWithId();
  }

  private flattenBoss() {
    this.extractBoss = <Employee>this.employees.reduce(function (
      accumulator,
      value
      ) {
        if (value.type === Type.BOSS) {
          return {
            ...accumulator,
            [value.type]: value
          };
        } else {
          return accumulator; // default return accumulated result till then
        }
      },
      {});
  }

  private agesOfWorkers() {
    this.workersAge = this.employees.reduce((accumulator, employee) => {
      if (employee.type === Type.WORKER) {
        return accumulator + employee.age;
      } else {
        return accumulator;
      }
    }, 10);
  }

  private flattenWithId() {
    this.flattenedObject = this.employees.reduce((accumulator: FlattenedEmployee, employee: Employee) => {
      return {
        ...accumulator,
        [employee.id]: employee
      };
    }, {});

    console.log(this.flattenedObject);
  }
}
