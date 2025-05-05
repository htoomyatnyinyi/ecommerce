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
