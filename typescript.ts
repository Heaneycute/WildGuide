//! npm create vite@latest client -- --template react-ts

let str: string = 'abc';
let num: number;
let bool: boolean = true;

str = String(123);
num = 123;

function sum(a: number, b: number): number {
  return a + b;
}

function logResult(result: any, label: string): void {
  console.log(`${label}: `, result);
}

sum(10, 10);

const arr: string[] = ['a', 'b', 'c'];
const arr1: Array<number> = [1, 2, 3];

const test = (user: { firstname: string; lastname?: string; age?: number }) => {
  console.log(`Hello ${user.firstname}`);
};

test({ firstname: 'Bob' });

type Notebook = {
  id: number;
  brand: string;
  model: string;
};

type Phone = {
  id: number;
  brand: string;
  screenSize: string;
};

type Person = {
  id: number;
  firstname: string;
  lastname: string;
  age?: number;
  device: Notebook | Phone;
};

interface IPerson<T> {
  id: number;
  firstname: string;
  lastname: string;
  age?: number;
  device: T;
}

const user: Person = {
  id: 1,
  firstname: 'Ivan',
  lastname: 'Ivanov',
  age: 25,
  device: {
    id: 1,
    brand: 'Apple',
    model: 'Macbook Air m2',
  },
};

const user2: IPerson<Phone> = {
  id: 1,
  firstname: 'Petr',
  lastname: 'Ivanov',
  age: 22,
  device: {
    id: 1,
    brand: 'Samsung',
    screenSize: '6.1',
  },
};

let arr2: Person[];

arr2 = []
  arr2[0].firstname
