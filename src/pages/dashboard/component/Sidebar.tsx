import { Home, Package, Plus, LineChart, Settings } from "lucide-react";
import { NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";

const navItems = [
  { name: "Overview", to: "/", icon: <Home /> },
  { name: "Products", to: "/products", icon: <Package /> },
  { name: "Add Product", to: "/add-product", icon: <Plus /> },
  { name: "Sales", to: "/sales", icon: <LineChart /> },
  { name: "Settings", to: "/settings", icon: <Settings /> },
];

export function Sidebar() {
  return (
    <aside className="w-64 bg-white dark:bg-zinc-900 h-full p-4 shadow-md">
      <nav className="flex flex-col gap-4">
        {navItems.map(({ name, to, icon }) => (
          <NavLink
            to={to}
            key={name}
            className={({ isActive }) =>
              cn("flex items-center gap-3 p-2 rounded-md text-sm font-medium", {
                "bg-muted text-primary": isActive,
                "text-muted-foreground hover:bg-muted/50": !isActive,
              })
            }
          >
            {icon}
            {name}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
