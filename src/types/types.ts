type StringOrNumber = string | number;

const str: StringOrNumber = "Htoo Myat";

type Person = {
  name: string;
  age: number;
  active: "active" | "inactive";
};

const Person1: Person = {
  name: "Nyi",
  age: 28,
  active: "inactive",
};

const Person2: Person = {
  name: "Htoo",
  age: 27,
  active: "active",
};

console.log(Person1, Person2);

const PersonObject: {
  name: string;
  age: number;
  bio: string;
  something?: string;
} = {
  name: "Htoo Myat",
  age: 28,
  bio: "This is my bios.",
};

console.log(PersonObject);

const myAddFun = (a: number | string, b: number | string): number | string => {
  if (typeof a === "string" && typeof b === "string") {
    return a.concat(b);
  }
  if (typeof a === "number" && typeof b === "number") {
    return a + b;
  }
  throw new Error("Invalid Error");
};

myAddFun("ad", "db");

// generic function
const GFunction = <Person>(aGeneric: Person): Person => {
  return aGeneric;
};

console.log(GFunction);
interface PersonInterface {
  name: string;
  age: number;
  active: "active" | "inactive";
}
interface EmployeeInterface extends PersonInterface {
  role: string;
}

const Person3: PersonInterface = {
  name: "Htoo m",
  age: 28,
  active: "active",
};

const GenericFunction = <EmployeeInterface>(
  Ggeneric: EmployeeInterface
): EmployeeInterface => {
  return Ggeneric;
};

console.log(GenericFunction);

console.log(Person3);

const Employee: EmployeeInterface = {
  name: "employee ",
  age: 30,
  active: "inactive",
  role: "admin",
};

console.log(Employee);

// interface as a function
interface TestFunctin {
  (str: string): void;
}

const print: TestFunctin = (log) => {
  console.log(log);
};

print("hellow");

const myFunction = <T>(a: T): T => {
  return a;
};

myFunction(3);
// // export type PostProps = { id: number; title: string };
// // // type UserType = {
// // //   usernmae: string;
// // //   age: number;
// // //   phone?: string;
// // // };

// // // let betterFunction = (user: UserType) => {
// // //   console.log(user.usernmae);
// // // };

// // //
// // type myFunc = (a: number, b: string) => void;

// // let write: myFunc = (num, str) => {
// //   console.log(num + "times" + str);
// // };

// type UserType2 = {
//   username: string;
//   age: number;
//   phone?: number;
//   theme: "dark" | "light";
// };

// const userWithTheme: UserType2 = {
//   username: "Minn",
//   age: 34,
//   theme: "dark",
// };

// //interfaces

// interface IUser {
//   username: string;
//   email: string;
//   age: number;
// }

// interface IEmployee extends IUser {
//   emplyeeId: number;
// }

// const emp: IEmployee = {
//   emplyeeId: 1,
//   username: "Nyi",
//   age: 22,
//   email: "htoomyat@mail.com",
// };

// const client: IUser = {
//   username: "Htoo",
//   age: 20,
//   email: "htoomyatnyinyi@mail.com",
// };

// // generate
// interface IAuthor {
//   id: number;
//   username: string;
// }
// interface ICategory {
//   id: number;
//   title: string;
// }

// interface IPost {
//   id: number;
//   title: string;
//   desc: string;
//   extra: IAuthor[] | ICategory[];
// }

// //
// interface IPostBetter<T> {
//   id: number;
//   title: string;
//   desc: string;
//   extra: T[];
// }

// let post: IPostBetter<Any> = {
//   id: 1,
//   title: "technician",
//   desc: "this is job post descriptions",
//   extra: [],
// };

// interface IPostEvenBetter<T extends object> {
//   id: number;
//   title: string;
//   desc: string;
//   extra: T[];
// }

// const testMe2: IPostEvenBetter<IAuthor> = {
//   id: 1,
//   title: "Hi",
//   desc: "hello",
//   extra: [{ id: 1, username: "Joi" }],
// };

// const testMe3: IPostEvenBetter<ICategory> = {
//   id: 1,
//   title: "Hi",
//   desc: "hello",
//   extra: [{ id: 1, title: "Joi" }],
// };
