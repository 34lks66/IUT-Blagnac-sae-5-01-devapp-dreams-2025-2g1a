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
      <div className="flex justify-between items-center w-full">
        {/* Menu Desktop - Navigation horizontale */}
        <ul className="hidden md:flex flex-row gap-1 lg:gap-3 xl:gap-6 m-0 p-2 list-none w-full justify-end">
          {navItems.map((item, idx) => (
            <li
              key={item.href}
              className={`px-1 lg:px-2 py-1 border-t-2 border-b-2 ${itemColors[idx]}`}
            >
              <a
                href={item.href}
                className={`block text-left text-[10px] lg:text-xs xl:text-sm font-medium transition-colors duration-500 ${textHoverColors[idx]} max-w-[100px] lg:max-w-[140px] xl:max-w-[180px] leading-tight`}
              >
                {item.name}
              </a>
            </li>
          ))}
        </ul>

        {/* Burger Button Mobile */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden ml-auto text-gray-700 z-50"
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Menu Mobile - Overlay */}
      {isMenuOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
            onClick={() => setIsMenuOpen(false)}
          />
          
          {/* Menu Mobile */}
          <div className="fixed top-0 right-0 h-full w-4/5 max-w-sm bg-white shadow-lg z-50 md:hidden overflow-y-auto">
            <div className="p-6">
              <button
                onClick={() => setIsMenuOpen(false)}
                className="absolute top-4 right-4 text-gray-700"
                aria-label="Close menu"
              >
                <X size={28} />
              </button>
              
              <h2 className="text-xl font-bold mb-6 mt-8">Menu</h2>
              
              <ul className="flex flex-col gap-4 list-none">
                {navItems.map((item, idx) => (
                  <li
                    key={item.href}
                    className={`px-3 py-3 border-l-4 ${itemColors[idx]} bg-gray-50 rounded-r`}
                  >
                    <a
                      href={item.href}
                      className={`font-medium text-sm ${textHoverColors[idx]} transition-colors duration-300`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </>
      )}
    </nav>
  );
};

export default NavBar;