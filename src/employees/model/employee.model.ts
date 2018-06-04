export interface Employee {
  id: number;
  firstName: string;
  lastName: string;
  age: number;
  type: Type
}

export interface FlattenedEmployee {
  [id: number]: Employee;
}


export enum Type {
  WORKER = "WORKER",
  MANAGER = "MANAGER",
  HR = "HR",
  BOSS = "BOSS"
}
