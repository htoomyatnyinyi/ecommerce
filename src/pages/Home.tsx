import React from "react";
import logo from "@/assets/logo.png";

const Home: React.FC = () => {
  return (
    <div className="overflow-x-hidden">
      {/* Hero Section */}
      <section className="grid place-items-center text-center h-screen bg-hero bg-cover bg-center px-4">
        <div className="w-full max-w-4xl space-y-10 p-5 rounded-lg backdrop-blur-sm bg-gradient-to-r from-white to-black bg-clip-text text-transparent hover:shadow-xl transition duration-300">
          <h1 className="font-serif text-lg sm:text-xl p-2 mb-5 bg-clip-text text-transparent">
            WELCOME TO ECOMMERCE STORE
          </h1>
          <h1 className="text-4xl sm:text-7xl font-bold p-2 m-2 bg-gradient-to-tr from-slate-900 to-slate-400 text-transparent bg-clip-text">
            Let Brint The Gratest <br /> Fashion For You
          </h1>
          <div className="p-2 m-1 text-blue-600 hover:text-white hover:shadow-xl transition duration-300 rounded-lg">
            Join In
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="grid grid-cols-1 sm:grid-cols-2 gap-6 px-4 sm:px-8 py-8">
        <div className="hover:shadow-xl transition duration-300 p-5 rounded-lg">
          <img
            src={logo}
            alt="logo"
            className="max-h-[300px] dark:invert mx-auto"
          />
        </div>
        <div className="flex justify-center items-center p-5 hover:shadow-xl transition duration-300 rounded-lg">
          <div className="bg-gradient-to-tr from-slate-400 to-slate-900 text-transparent bg-clip-text text-left">
            <h1 className="text-2xl sm:text-3xl font-semibold pb-5">
              OUR STORY
            </h1>
            <h2 className="text-3xl sm:text-5xl pb-6 font-bold">
              For People Who Love Fashion
            </h2>
            <p className="pb-4 text-sm sm:text-base">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Placeat
              ratione...
            </p>
            <p className="pb-4 text-sm sm:text-base">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Tempora...
            </p>
            <button className="p-2 mt-2 bg-slate-900 text-white rounded dark:bg-white dark:text-cyan-900">
              Read More
            </button>
          </div>
        </div>
      </section>

      {/* Customer Testimonials */}
      <section className="py-16 px-4">
        <h1 className="text-3xl sm:text-5xl p-8 text-center font-bold">
          What Our Customers Say
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {["Hnin", "Phyu", "Hnin Phyu"].map((name, i) => (
            <div
              key={i}
              className="hover:shadow-xl transition p-5 rounded-lg border bg-gradient-to-tl from-slate-900 to-slate-400 text-transparent bg-clip-text"
            >
              <h1 className="text-xl sm:text-2xl pb-5 font-semibold">{name}</h1>
              <p className="text-sm sm:text-base">
                Lorem ipsum dolor sit amet consectetur adipisicing elit...
              </p>
              <img
                src={logo}
                alt="logo"
                className="h-24 w-24 rounded-full mx-auto dark:invert mt-5"
              />
            </div>
          ))}
        </div>
      </section>

      {/* Gift Card Section */}
      <section className="px-4 sm:px-8 py-12">
        <div className="backdrop-blur-sm p-5 space-y-10 rounded-lg bg-gradient-to-tr from-sky-500 to-sky-900 text-transparent bg-clip-text hover:shadow-xl transition duration-300">
          <h1 className="font-serif text-lg sm:text-xl">GIFT CARD</h1>
          <h1 className="text-4xl sm:text-7xl font-bold bg-gradient-to-tr from-slate-900 to-slate-400 text-transparent bg-clip-text">
            Give The Gift of <br /> Fashion
          </h1>
          <div className="p-3 border text-cyan-900 w-fit mx-auto hover:shadow-xl rounded-lg cursor-pointer">
            Purchase A Gift Card
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-5 text-center">
        {[
          { name: "SECURE PAYMENT" },
          { name: "DELIVER WITH CARE" },
          { name: "EXCELLENT SERVICE" },
        ].map((item, i) => (
          <div
            key={i}
            className="hover:shadow-xl transition p-5 rounded-lg border bg-gradient-to-tl from-slate-900 to-slate-400 text-transparent bg-clip-text"
          >
            <h1 className="text-xl sm:text-2xl pb-5 font-semibold">
              {item.name}
            </h1>
            <div className="flex flex-col items-center space-y-4 sm:space-y-0 sm:flex-row sm:space-x-5">
              <img
                src={logo}
                alt="logo"
                className="h-20 w-20 rounded-full dark:invert"
              />
              <p className="text-sm sm:text-base">
                Lorem ipsum dolor sit amet consectetur adipisicing elit...
              </p>
            </div>
          </div>
        ))}
      </section>

      {/* Footer or Ending Section */}
      <section className="py-16 px-4">
        <h1 className="text-3xl sm:text-5xl p-8 text-center font-bold">
          Have A Good Day!
        </h1>
      </section>
    </div>
  );
};

export default Home;

// with useMobile hookcs
// import * as React from "react";
// import logo from "@/assets/logo.png";

// // useIsMobile hook
// const MOBILE_BREAKPOINT = 768;

// export function useIsMobile() {
//   const [isMobile, setIsMobile] = React.useState<boolean | undefined>(
//     undefined
//   );

//   React.useEffect(() => {
//     const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
//     const onChange = () => {
//       setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
//     };
//     mql.addEventListener("change", onChange);
//     setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
//     return () => mql.removeEventListener("change", onChange);
//   }, []);

//   return !!isMobile;
// }

// const Home: React.FC = () => {
//   const isMobile = useIsMobile();

//   return (
//     <div>
//       {/* Hero Section */}
//       <section
//         className={`grid place-items-center text-center ${
//           isMobile ? "h-[80vh] py-8" : "h-screen"
//         } bg-hero bg-cover bg-center`}
//       >
//         <div
//           className={`w-full ${
//             isMobile ? "max-w-md p-4" : "max-w-4xl p-5"
//           } space-y-6 m-1 rounded-lg backdrop-blur-sm bg-gradient-to-r from-white to-black bg-clip-text text-transparent hover:shadow-xl transition duration-300`}
//         >
//           <h1
//             className={`font-serif ${
//               isMobile ? "text-lg p-1 mb-3" : "text-xl p-2 mb-5"
//             } bg-clip-text text-transparent`}
//           >
//             WELCOME TO ECOMMERCE STORE
//           </h1>
//           <h1
//             className={`font-bold ${
//               isMobile
//                 ? "text-4xl p-1 m-1"
//                 : "text-7xl p-2 m-2 bg-gradient-to-tr from-slate-900 to-slate-400 text-transparent bg-clip-text"
//             }`}
//           >
//             Let Bring The Greatest <br /> Fashion For You
//           </h1>
//           <div
//             className={`${
//               isMobile ? "p-2 text-sm" : "p-2 m-1"
//             } text-blue hover:text-white hover:shadow-xl transition duration-300 rounded-lg`}
//           >
//             Join In
//           </div>
//         </div>
//       </section>

//       {/* Our Story Section */}
//       <section
//         className={`grid grid-cols-1 ${
//           isMobile ? "gap-4 p-4 h-auto" : "sm:grid-cols-2 gap-6 p-8 h-[600px]"
//         }`}
//       >
//         <div
//           className={`hover:shadow-xl transition duration-300 ${
//             isMobile ? "p-4" : "p-5"
//           } rounded-lg`}
//         >
//           <img
//             src={logo}
//             alt="logo"
//             className={`mx-auto ${
//               isMobile ? "max-h-32" : "max-h-150"
//             } dark:invert`}
//           />
//         </div>
//         <div
//           className={`flex justify-center items-center hover:shadow-xl transition duration-300 ${
//             isMobile ? "p-4" : "p-5"
//           } rounded-lg`}
//         >
//           <div
//             className={`bg-gradient-to-tr from-slate-400 to-slate-900 text-transparent bg-clip-text ${
//               isMobile ? "text-center" : ""
//             }`}
//           >
//             <h1
//               className={`font-semibold ${
//                 isMobile ? "text-2xl pb-3" : "text-3xl pb-5"
//               }`}
//             >
//               OUR STORY
//             </h1>
//             <h2
//               className={`font-bold ${
//                 isMobile ? "text-3xl pb-6" : "text-5xl pb-10"
//               }`}
//             >
//               For People Who Love Fashion
//             </h2>
//             <p className={`${isMobile ? "text-sm pb-3" : "pb-4"}`}>
//               Lorem ipsum dolor, sit amet consectetur adipisicing elit. Placeat
//               ratione veritatis quis facilis incidunt quam voluptate, officia
//               laboriosam.
//             </p>
//             <button
//               className={`${
//                 isMobile ? "p-2 text-sm" : "p-2 m-1"
//               } dark:bg-white dark:text-cyan-900 bg-slate-900 text-white rounded-lg`}
//             >
//               Read More
//             </button>
//           </div>
//         </div>
//       </section>

//       {/* Customer Testimonials */}
//       <section className={`${isMobile ? "py-8 px-2" : "py-16 px-4"}`}>
//         <h1
//           className={`font-bold text-center ${
//             isMobile ? "text-3xl p-4" : "text-5xl p-8"
//           }`}
//         >
//           What Our Customers Say
//         </h1>
//         <div
//           className={`grid grid-cols-1 ${
//             isMobile ? "gap-4 p-2" : "sm:grid-cols-2 md:grid-cols-3 gap-6 p-5"
//           } text-center`}
//         >
//           {[{ name: "Hnin" }, { name: "Phyu" }, { name: "Hnin Phyu" }].map(
//             (customer, i) => (
//               <div
//                 key={i}
//                 className={`hover:shadow-xl transition duration-300 ${
//                   isMobile ? "p-4" : "p-5"
//                 } rounded-lg border bg-gradient-to-tl from-slate-900 to-slate-400 text-transparent bg-clip-text`}
//               >
//                 <p className={`${isMobile ? "p-3 text-sm" : "p-5"}`}>
//                   Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae
//                   tempore repellendus, dicta, alias maxime minus eligendi saepe.
//                 </p>
//                 <img
//                   src={logo}
//                   alt="logo"
//                   className={`rounded-full mx-auto dark:invert ${
//                     isMobile ? "h-16 w-16" : "h-24 w-24"
//                   }`}
//                 />
//                 <h1
//                   className={`font-semibold ${
//                     isMobile ? "text-xl pb-3" : "text-2xl pb-5"
//                   }`}
//                 >
//                   {customer.name}
//                 </h1>
//               </div>
//             )
//           )}
//         </div>
//       </section>

//       {/* Gift Card & Services */}
//       <div>
//         <div
//           className={`backdrop-blur-sm w-full space-y-6 hover:shadow-xl transition duration-300 rounded-lg ${
//             isMobile
//               ? "p-4 m-1 bg-gradient-to-tr from-sky-500 to-sky-900 text-transparent bg-clip-text"
//               : "p-5 m-1 bg-gradient-to-tr from-sky-500 to-sky-900 text-transparent bg-clip-text"
//           }`}
//         >
//           <h1
//             className={`font-serif ${
//               isMobile ? "text-lg p-1 mb-3 pl-2" : "text-xl p-2 mb-5 pl-5"
//             }`}
//           >
//             GIFT CARD
//           </h1>
//           <h1
//             className={`font-bold ${
//               isMobile
//                 ? "text-4xl p-1 m-1"
//                 : "text-7xl p-2 m-2 bg-gradient-to-tr from-slate-900 to-slate-400 text-transparent bg-clip-text"
//             }`}
//           >
//             Give The Gift of <br /> Fashion
//           </h1>
//           <div
//             className={`border text-cyan-900 hover:shadow-xl transition duration-300 rounded-lg ${
//               isMobile ? "p-2 w-48 text-sm" : "p-2 m-1 w-60"
//             }`}
//           >
//             Purchase A Gift Card
//           </div>
//         </div>
//         <div
//           className={`grid grid-cols-1 ${
//             isMobile ? "gap-4 p-2" : "sm:grid-cols-2 md:grid-cols-3 gap-6 p-5"
//           } text-center`}
//         >
//           {[
//             { name: "SECURE PAYMENT" },
//             { name: "DELIVER WITH CARE" },
//             { name: "EXCELLENT WITH SERVICE" },
//           ].map((customer, i) => (
//             <div
//               key={i}
//               className={`hover:shadow-xl transition duration-300 ${
//                 isMobile ? "p-4" : "p-5"
//               } rounded-lg border bg-gradient-to-tl from-slate-900 to-slate-400 text-transparent bg-clip-text`}
//             >
//               <h1
//                 className={`font-semibold ${
//                   isMobile ? "text-xl pb-3" : "text-2xl pb-5"
//                 }`}
//               >
//                 {customer.name}
//               </h1>
//               <div
//                 className={`flex items-center justify-center ${
//                   isMobile ? "flex-col space-y-3" : "space-x-5"
//                 }`}
//               >
//                 <img
//                   src={logo}
//                   alt="logo"
//                   className={`rounded-full mx-auto dark:invert ${
//                     isMobile ? "h-16 w-16" : "h-24 w-24"
//                   }`}
//                 />
//                 <p className={`${isMobile ? "p-3 text-sm" : "p-5"}`}>
//                   Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae
//                   tempore repellendus, dicta, alias maxime minus.
//                 </p>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Footer Section */}
//       <section className={`${isMobile ? "py-8 px-2" : "py-16 px-4"}`}>
//         <h1
//           className={`font-bold text-center ${
//             isMobile ? "text-3xl p-4" : "text-5xl p-8"
//           }`}
//         >
//           Have A Good Day!
//         </h1>
//       </section>
//     </div>
//   );
// };

// export default Home;

// // // original code
// // import React from "react";
// // import logo from "@/assets/logo.png";

// // const Home: React.FC = () => {
// //   return (
// //     <div>
// //       {/* Hero Section */}

// //       <section className="grid place-items-center text-center h-screen bg-hero bg-cover bg-center">
// //         <div
// //           className="w-full max-w-4xl space-y-10 p-5 m-1 rounded-lg
// //     backdrop-blur-sm bg-gradient-to-r from-white to-black
// //     bg-clip-text text-transparent hover:shadow-xl transition duration-300"
// //         >
// //           <h1 className="font-serif text-xl p-2 mb-5  bg-clip-text text-transparent">
// //             WELCOME TO ECOMMERCE STORE
// //           </h1>
// //           <h1 className="text-7xl font-bold p-2 m-2 bg-gradient-to-tr from-slate-900 to-slate-400 text-transparent bg-clip-text">
// //             Let Brint The Gratest <br /> Fashion For You
// //           </h1>
// //           <div className="p-2 m-1 text-blue hover:text-white hover:shadow-xl transition duration-300 rounded-lg">
// //             Join In
// //           </div>
// //         </div>
// //       </section>

// //       {/* Our Story Section */}
// //       <section className="grid grid-cols-1 sm:grid-cols-2 gap-6 p-8 h-[600px]">
// //         <div className="hover:shadow-xl transition duration-300 p-5 rounded-lg ">
// //           <img
// //             src={logo}
// //             alt="logo"
// //             className="max-h-150  dark:invert mx-auto "
// //           />
// //         </div>
// //         <div className="flex justify-center items-center hover:shadow-xl transition duration-300 p-5 rounded-lg  ">
// //           <div className="bg-gradient-to-tr from-slate-400 to-slate-900 text-transparent bg-clip-text">
// //             <h1 className="text-3xl font-semibold pb-5">OUR STORY</h1>
// //             <h2 className="text-5xl pb-10 font-bold">
// //               For People Who Love Fashion
// //             </h2>
// //             <p className="pb-4">
// //               Lorem ipsum dolor, sit amet consectetur adipisicing elit. Placeat
// //               ratione veritatis quis facilis incidunt quam voluptate, officia
// //               laboriosam. Neque pariatur error laborum odio ex id nesciunt
// //               earum, unde aspernatur quisquam.
// //             </p>
// //             <p className="pb-4">
// //               Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora
// //               ab dolorum, corporis laborum ratione nobis impedit, voluptate
// //               autem voluptas a cumque? Sunt temporibus animi sint hic
// //               voluptatibus repellendus deleniti repudiandae.
// //             </p>
// //             <button className="p-2 m-1 dark:bg-white dark:text-cyan-900 bg-slate-900 text-white">
// //               Read More
// //             </button>
// //           </div>
// //         </div>
// //       </section>

// //       {/* Customer Testimonials */}
// //       <section className="py-16 px-4 ">
// //         <h1 className="text-5xl p-8 text-center font-bold">
// //           What Our Customers Say "
// //         </h1>
// //         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-5 text-center">
// //           {[{ name: "Hnin" }, { name: "Phyu" }, { name: "Hnin Phyu" }].map(
// //             (customer, i) => (
// //               <div
// //                 key={i}
// //                 className="hover:shadow-xl transition duration-300 p-5 rounded-lg border  bg-gradient-to-tl from-slate-900 to-slate-400 text-transparent bg-clip-text"
// //               >
// //                 <h1 className="text-2xl pb-5 font-semibold">{customer.name}</h1>
// //                 <p className="p-5">
// //                   Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae
// //                   tempore repellendus, dicta, alias maxime minus eligendi saepe
// //                   quis optio, officia reiciendis nemo quia facilis voluptatibus.
// //                   Dolorum praesentium debitis possimus atque.
// //                 </p>
// //                 <img
// //                   src={logo}
// //                   alt="logo"
// //                   className="h-24 w-24 rounded-full mx-auto dark:invert"
// //                 />
// //               </div>
// //             )
// //           )}
// //         </div>
// //       </section>
// //       <div>
// //         <div
// //           className="backdrop-blur-sm p-5 m-1 w-full  space-y-10
// //         bg-gradient-to-tr from-sky-500 to-sky-900  align-button
// //         text-transparent bg-clip-text hover:shadow-xl transition duration-300 rounded-lg  "
// //         >
// //           <h1 className="font-serif p-2 mb-5 text-xl pl-5">GIFT CARD</h1>
// //           <h1 className="text-7xl font-bold p-2 m-2 bg-gradient-to-tr from-slate-900 to-slate-400 text-transparent bg-clip-text  ">
// //             Give The Gift of <br /> Fashion
// //           </h1>
// //           <div className="p-2 m-1 border text-cyan-900 w-60  hover:shadow-xl transition duration-300  rounded-lg ">
// //             Purchase A Gift Card
// //           </div>
// //         </div>
// //         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-5 text-center">
// //           {[
// //             { name: "SECURE PAYMENT" },
// //             { name: "DELIVER WITH CARE" },
// //             { name: "EXCELLENT WITH SERVICE" },
// //           ].map((customer, i) => (
// //             <div
// //               key={i}
// //               className="hover:shadow-xl transition duration-300 p-5 rounded-lg border  bg-gradient-to-tl from-slate-900 to-slate-400 text-transparent bg-clip-text"
// //             >
// //               <h1 className="text-2xl pb-5 font-semibold">{customer.name}</h1>

// //               <div className="flex items-center justify-center space-x-5">
// //                 <img
// //                   src={logo}
// //                   alt="logo"
// //                   className="h-24 w-24 rounded-full mx-auto dark:invert"
// //                 />
// //                 <p className="p-5">
// //                   Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae
// //                   tempore repellendus, dicta, alias maxime minus eligendi saepe
// //                   quis optio, officia reiciendis nemo quia facilis voluptatibus.
// //                 </p>
// //               </div>
// //             </div>
// //           ))}
// //         </div>
// //       </div>
// //       <section className="py-16 px-4 ">
// //         <h1 className="text-5xl p-8 text-center font-bold">
// //           Have A Good Day!.
// //         </h1>
// //       </section>
// //     </div>
// //   );
// // };

// // export default Home;
