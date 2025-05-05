import { useEffect, useState } from "react";
import { AiFillSun, AiFillMoon } from "react-icons/ai";

const ThemeToggle = () => {
  const [theme, setTheme] = useState<string>(() => {
    // Check localStorage or system preference on initial load
    if (localStorage.theme) return localStorage.theme;
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  });

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  return (
    <button onClick={toggleTheme} className="p-2 text-xl m-1">
      {theme === "light" ? (
        <div className="p-2 dark:border-white border-cyan-900 border-b-2 border-l-2">
          <AiFillMoon />
        </div>
      ) : (
        <div className="p-2 dark:border-white border-cyan-900 border-t-2 border-r-2">
          <AiFillSun />
        </div>
      )}
    </button>
  );
};

export default ThemeToggle;
