import { createBrowserRouter, Outlet, Navigate } from "react-router-dom";
import { useAuthMeQuery } from "@/redux/api/auth/authApi";

import NotFound from "@/routes/NotFound";
import Home from "@/pages/Home";
import ProductLists from "@/pages/ecommerce_store/ProductLists";

import NavBar from "@/components/navbar/NavBar";
import Cart from "@/pages/ecommerce_store/Cart";
import ProductStore from "@/pages/ecommerce_store/ProductStore";
import Dashboard from "@/pages/dashboard/Dashboard";
import SignUp from "@/pages/auth/SignUp";
import SignIn from "@/pages/auth/SignIn";

type ProtectedRoute = {
  allowedRoles: string[];
  children: any;
};

const AppLayout = () => (
  <>
    <NavBar />
    {/* <NavigationBar /> */}
    {/* Add any other layout components here */}
    <main className="pt-18">
      {/* <main className="pt-16">  */}
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
    return <Navigate to="/profile/employer" replace />;
  }

  if (user && user.role === "user") {
    return <Navigate to="/profile/user" replace />;
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
        path: "/auth/signin",
        element: <SignIn />,
      },
      {
        path: "/auth/signup",
        element: <SignUp />,
      },

      {
        path: "/e_products",
        element: <ProductLists />,
      },
      {
        path: "/products",
        element: <ProductStore />,
      },
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/cart",
        element: <Cart />,
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
