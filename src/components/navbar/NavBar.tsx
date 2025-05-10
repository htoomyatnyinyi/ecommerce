import React from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "@/assets/logo.png";
import ThemeToggle from "./ThemeToggle";

interface UserInfo {
  id: string;
  name?: string;
  email?: string;
  // Add other user properties as needed
}

const NavBar: React.FC = () => {
  const navigate = useNavigate();
  const userInfoString = localStorage.getItem("userInfo");
  const userInfo: UserInfo | null = userInfoString
    ? JSON.parse(userInfoString)
    : null;

  const handleLogout = () => {
    localStorage.removeItem("userInfo");
    localStorage.removeItem("authToken"); // If you're using token-based auth
    navigate("/auth/signin");
    window.location.reload(); // Force refresh to update auth state
  };

  return (
    <div>
      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-lg shadow-lg shadow-black/5 backdrop-saturate-100 m-2 dark:backdrop-blur-sm dark:bg-opacity-50">
        <div className="container mx-auto flex justify-between items-center">
          <div>
            <Link to="/" className="flex items-baseline">
              <img
                src={logo}
                alt="Logo"
                className="h-8 w-auto dark:invert-100 m-1"
              />
              <p className="sm:block hidden">ecommercE</p>
            </Link>
          </div>

          <div className="flex space-x-4">
            <Link
              to="/e_products"
              className="hover:text-primary-500 transition-colors"
            >
              E_STORE
            </Link>
            <Link
              to="/products"
              className="hover:text-primary-500 transition-colors"
            >
              STORE
            </Link>
            {/* <Link
              to="/cart"
              className="hover:text-primary-500 transition-colors"
            >
              SHOPPING_CART
            </Link> */}
            {userInfo && (
              <Link
                to="/dashboard"
                className="hover:text-primary-500 transition-colors"
              >
                DASHBOARD
              </Link>
            )}
          </div>

          <div>
            {!userInfo ? (
              <ul className="flex space-x-4 items-center">
                <li>
                  <Link
                    to="/auth/signin"
                    className="hover:text-primary-500 transition-colors"
                  >
                    Sign In
                  </Link>
                </li>
                <li>
                  <Link
                    to="/auth/signup"
                    className="hover:text-primary-500 transition-colors"
                  >
                    Sign Up
                  </Link>
                </li>
                <li>
                  <Link
                    to="/cart"
                    className="hover:text-primary-500 transition-colors"
                  >
                    CART
                  </Link>
                  <ThemeToggle />
                </li>
              </ul>
            ) : (
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  {userInfo.name && (
                    <span className="font-medium hidden sm:inline">
                      {userInfo.name}
                    </span>
                  )}
                  {userInfo.email && (
                    <span className="text-sm text-gray-500 hidden md:inline">
                      ({userInfo.email})
                    </span>
                  )}
                </div>
                <button
                  onClick={handleLogout}
                  className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                >
                  Logout
                </button>
                <Link
                  to="/cart"
                  className="hover:text-primary-500 transition-colors"
                >
                  CART
                </Link>
                <ThemeToggle />
              </div>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
