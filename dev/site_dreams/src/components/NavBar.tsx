import { useState } from "react";
import { Menu, X } from "lucide-react";

const navItems = [
  { name: "Accueil du public migrant LGBTQ+", href: "/" },
  { name: "Évaluation et orientation", href: "/evaluation" },
  { name: "Hébergement solidaire et temporaire", href: "/hebergement" },
  { name: "Accompagnement administratif et juridique", href: "/accompagnement" },
  { name: "Sensibilisation des minorités sexuelles", href: "/sensibilisation" },
];

const itemColors = [
  "border-red-500",
  "border-orange-500",
  "border-yellow-400",
  "border-green-300",
  "border-blue-500",
];

const textHoverColors = [
  "hover:text-red-500",
  "hover:text-orange-500",
  "hover:text-yellow-400",
  "hover:text-green-300",
  "hover:text-blue-500",
];

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="p-3 relative">
      <div className="flex justify-between items-center w-full md:w-3/4 md:ml-auto">
        {/* Menu Desktop*/}
        <ul className="hidden md:flex flex-row gap-2 lg:gap-4 xl:gap-6 2xl:gap-8 m-0 p-5 list-none">
          {navItems.map((item, idx) => (
            <li
              key={item.href}
              className={`px-0 py-1 border-t-2 border-b-2 ${itemColors[idx]}`}
            >
              <a
                href={item.href}
                className={`block text-left text-sm lg:text-base font-medium transition-colors duration-500 ${textHoverColors[idx]}`}
              >
                {item.name}
              </a>
            </li>
          ))}
        </ul>

        {/* Burger Button Mobile */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden text-gray-700"
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Menu Mobile */}
      {isMenuOpen && (
        <div className="fixed top-24 left-0 w-full bg-gray-100 shadow-md z-40">
          <ul className="flex flex-col gap-4 p-4 list-none">
            {navItems.map((item, idx) => (
              <li
                key={item.href}
                className={`px-2 py-2 border-l-4 ${itemColors[idx]}`}
              >
                <a
                  href={item.href}
                  className={`font-medium ${textHoverColors[idx]}`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default NavBar;