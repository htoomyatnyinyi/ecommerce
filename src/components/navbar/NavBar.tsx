import React from "react";
import { Link } from "react-router-dom";
import logo from "@/assets/logo.png";
import ThemeToggle from "./ThemeToggle";

const NavBar: React.FC = () => {
  return (
    <div>
      <nav
        className="fixed top-0 left-0 right-0 z-5 backdrop-blur-sm shadow-md 
      m-2   dark:backdrop-blur-sm dark:bg-opacity-50"
      >
        <div
          className="container mx-auto flex justify-between
         items-center"
        >
          <div>
            <Link to="/" className="flex items-baseline ">
              <img
                src={logo}
                alt="Logo"
                className="h-8 w-auto dark:invert-100 m-1"
              />
              <p className="sm:block hidden">ecommercE</p>
            </Link>
          </div>
          <div className="flex space-x-4">
            <Link to="/products">STORE</Link>
            <Link to="/e_products">E_STORE</Link>
            <Link to="/cart">SHOPPING_CART</Link>
          </div>
          <div>
            <ul className="flex space-x-4 items-center">
              <li>
                <Link to="/auth" className="">
                  Sign In
                </Link>
              </li>
              <li>
                <Link to="/auth" className="">
                  Sign Up
                </Link>
              </li>
              <li>
                <ThemeToggle />
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
