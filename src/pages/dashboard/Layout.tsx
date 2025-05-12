// layout/DashboardLayout.tsx
// import { Sidebar } from "@/components/Sidebar";
import { Sidebar } from "./component/SideBar";
// import { Topbar } from "@/components/Topbar";
import { Outlet } from "react-router-dom";

export default function DashboardLayout() {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Topbar />
        <main className="flex-1 overflow-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

const Topbar = () => {
  return <div>This is Top Bar</div>;
};
// {
//   /* Grid Layout Example */
// }
// <section className="grid grid-cols-12 gap-4 p-4 h-screen">
//   <div className="col-span-12 md:col-span-4 bg-yellow-200 flex items-center justify-center">
//     <p className="text-lg font-medium">Sidebar</p>
//   </div>
//   <div className="col-span-12 md:col-span-8 bg-blue-200 flex items-center justify-center">
//     <p className="text-lg font-medium">Main Content</p>
//   </div>
// </section>;

// // import React from "react";
// // import logo from "@/assets/logo.png";

// // const Home: React.FC = () => {
// //   return (
// //     <div>
// //       <div className="grid place-items-center text-center h-screen bg-hero">
// //         <div className="backdrop-blur-xl p-5 m-1">
// //           <h1 className="font-serif p-2 mb-5 text-cyan-500 text-xl ">
// //             WELCOME TO ECOMMERCE STORE
// //           </h1>
// //           <h1 className="text-7xl font-bold p-2 m-2 ">
// //             Let Brint The Gratest <br /> Fashion For You
// //           </h1>
// //           <div className="">Join In</div>
// //         </div>
// //       </div>
// //       <div className="grid h-150 grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-6">
// //         <div className="">
// //           <img
// //             src={logo}
// //             alt="logo"
// //             className="max-h-150 dark:inverted-colors:100 "
// //           />
// //         </div>
// //         <div className=" p-4 flex justify-center items-center">
// //           <div className="">
// //             <h1 className="text- 3xl">OUR STORY</h1>
// //             <h2 className="text-5xl pb-10">For People Who Love Fashion</h2>
// //             <p>
// //               Lorem ipsum dolor, sit amet consectetur adipisicing elit. Placeat
// //               ratione veritatis quis facilis incidunt quam voluptate, officia
// //               laboriosam. Neque pariatur error laborum odio ex id nesciunt
// //               earum, unde aspernatur quisquam.
// //             </p>
// //             <p>
// //               Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora
// //               ab dolorum, corporis laborum ratione nobis impedit, voluptate
// //               autem voluptas a cumque? Sunt temporibus animi sint hic
// //               voluptatibus repellendus deleniti repudiandae.
// //             </p>
// //             <button className="p-2 m-1 bg-sky-500">ReacMore</button>
// //           </div>
// //         </div>
// //       </div>
// //       <div className="grid place-item-center ">
// //         <h1 className="text-5xl p-8 text-center ">What Our Customer Say</h1>
// //         <div
// //           className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6
// //         p-5 h-72 items-center text-center"
// //         >
// //           <div className="hover:shadow-xl transition duration-300 p-5 rounded-lg">
// //             <h1 className="text-2xl pb-5">Hnin </h1>
// //             <p className="p-5 ">
// //               Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae
// //               tempore repellendus, dicta, alias maxime minus eligendi saepe quis
// //               optio, officia reiciendis nemo quia facilis voluptatibus? Dolorum
// //               praesentium debitis possimus atque.
// //             </p>
// //             <img src={logo} alt="logo" className="h-24 rounded-full  w-24" />
// //           </div>
// //           <div className="hover:shadow-xl transition duration-300 p-5 rounded-lg">
// //             <h1 className="text-2xl pb-5">Phyu</h1>
// //             <p className="p-5 ">
// //               Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur,
// //               vitae exercitationem repudiandae sequi odit veniam, adipisci unde
// //               praesentium quas eum veritatis temporibus aspernatur laboriosam!
// //               Enim consequatur mollitia nemo ut.
// //             </p>
// //             <img src={logo} alt="logo" className="h-24 rounded-full w-24" />
// //           </div>
// //           <div className="hover:shadow-xl transition duration-300 p-5 rounded-lg">
// //             <h1 className="text-2xl pb-5">Hnin Phyu</h1>
// //             <p className="p-5 ">
// //               Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint
// //               eaque quo omnis dolorem provident alias nulla, tenetur cupiditate
// //               voluptatem, magni, amet dolores itaque esse saepe! Repudiandae,
// //               praesentium. Repellendus, quam non!
// //             </p>
// //             <img src={logo} alt="logo" className="h-24 rounded-full w-24" />
// //           </div>
// //         </div>
// //       </div>
// //       {/* <div className="grid grid-cols-12 gap-4 p-4 h-screen">
// //         <div className="col-span-12 md:col-span-4 bg-yellow-200">Sidebar</div>
// //         <div className="col-span-12 md:col-span-8 bg-blue-200">
// //           Main Content
// //         </div>
// //       </div> */}
// //     </div>
// //   );
// // };

// // export default Home;

// // // import React from "react";
// // // import image from "@/assets/logo.png";

// // // const Home: React.FC = () => {
// // //   return (
// // //     <div className="h-screen">
// // //       <div className="h-1/2 bg-slate-800"></div>
// // //       <div className="h-1/2  overflow-clip object-cover ">
// // //         <img src={image} alt="test" />
// // //       </div>
// // //       <div className=" h-96 grid grid-cols-2 ">
// // //         <div className="bg-amber-200"></div>
// // //         <div className="bg-amber-300"></div>
// // //         <div className="bg-amber-300"></div>
// // //         <div className=" h-10 bg-amber-800"></div>
// // //       </div>
// // //       <div className="grid grid-flow-colum">
// // //         <div className=" h-10 bg-amber-800"></div>
// // //       </div>
// // //       {/* <div className="h-screen dark:bg-gradient-to-bl from-slate-950 to-slate-900">
// // //         <div className="backdrop-blur-sm shadow-2xl ">
// // //           <div className="h-40 bg-gray-50 dark:bg-slate-900"></div>
// // //           <div className="h-20 bg-gray-100 dark:bg-slate-800"></div>
// // //           <div className="h-50 bg-gray-200 dark:bg-slate-700"></div>
// // //           <div className="h-50 bg-gray-200 dark:bg-slate-500"></div>
// // //           <div className="h-50 bg-gray-200 dark:bg-slate-400"></div>
// // //           <div className="h-50 bg-gray-200 dark:bg-slate-400"></div>
// // //         </div>
// // //       </div> */}
// // //     </div>
// // //   );
// // // };

// // // export default Home;
