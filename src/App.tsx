import React from "react";
import { RouterProvider } from "react-router-dom";
import { router } from "@/routes/Routes";

const App: React.FC = () => {
  return (
    <div className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
