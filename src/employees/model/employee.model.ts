export interface Employee {
  firstName: string;
  lastName: string;
  age: number;
  type: Type
}


export enum Type {
  WORKER = "WORKER",
  MANAGER = "MANAGER",
  HR = "HR",
  BOSS = "BOSS"
}
