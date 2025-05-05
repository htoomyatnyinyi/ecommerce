import { createBrowserRouter, Outlet, Navigate } from "react-router-dom";
import NotFound from "@/routes/NotFound";
import NavBar from "@/components/navbar/NavBar";
import Home from "@/pages/Home";

import { useAuthMeQuery } from "@/redux/api/auth/authApi";
import Ecommerce from "@/pages/ecommerce/Ecommerce";

type ProtectedRoute = {
  allowedRoles: string[];
  children: any;
};

const AppLayout = () => (
  <>
    <NavBar />
    {/* Add any other layout components here */}
    <main className="pt-16">
      {/* Adjust padding as needed */}
      <Outlet /> {/* Renders the matched child route component */}
    </main>
  </>
);

const ProtectedRoute = ({ allowedRoles, children }: ProtectedRoute) => {
  const { data: user } = useAuthMeQuery();
  console.log("user at protective routes", user, allowedRoles);

  if (!allowedRoles.includes(`${user?.role}`)) {
    return <Navigate to="/auth" replace />;
  }

  if (user && user.role === "employer") {
    return <Navigate to="/employer" replace />;
  }
  if (user && user.role === "user") {
    return <Navigate to="/user" replace />;
  }
  // If the user is authenticated and has the correct role, render the children
  return children;
};

export const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/auth",
        element: <div>Auth Page</div>,
      },
      {
        path: "/ecommerce",
        element: <Ecommerce />,
      },
      {
        path: "/employer/profile",
        element: (
          <ProtectedRoute allowedRoles={["employer"]}>
            <div>Employer Profile</div>
          </ProtectedRoute>
        ),
      },

      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);
