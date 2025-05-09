import React from "react";
import image from "@/assets/logo.png";

const Home: React.FC = () => {
  return (
    <div className="h-screen">
      <div className="h-1/2 bg-slate-800"></div>
      <div className="h-1/2  overflow-clip object-cover ">
        <img src={image} alt="test" />
      </div>
      <div className=" h-96 grid grid-cols-2 ">
        <div className="bg-amber-200"></div>
        <div className="bg-amber-300"></div>
        <div className="bg-amber-300"></div>
        <div className=" h-10 bg-amber-800"></div>
      </div>
      <div className="grid grid-flow-colum">
        <div className=" h-10 bg-amber-800"></div>
      </div>
      {/* <div className="h-screen dark:bg-gradient-to-bl from-slate-950 to-slate-900">
        <div className="backdrop-blur-sm shadow-2xl ">
          <div className="h-40 bg-gray-50 dark:bg-slate-900"></div>
          <div className="h-20 bg-gray-100 dark:bg-slate-800"></div>
          <div className="h-50 bg-gray-200 dark:bg-slate-700"></div>
          <div className="h-50 bg-gray-200 dark:bg-slate-500"></div>
          <div className="h-50 bg-gray-200 dark:bg-slate-400"></div>
          <div className="h-50 bg-gray-200 dark:bg-slate-400"></div>
        </div>
      </div> */}
    </div>
  );
};

export default Home;
