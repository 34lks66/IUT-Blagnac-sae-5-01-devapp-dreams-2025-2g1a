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
  return (
    <nav className="p-3">
      <div className="w-full md:w-3/4 md:ml-auto">
        <ul className="flex flex-row gap-8 m-0 p-5 list-none ">
          {navItems.map((item, idx) => (
            <li
              key={item.href}
              className={`px-0 py-1 border-t-2 border-b-2 ${itemColors[idx]}`}
            >
              <a
                href={item.href}
                className={`block text-left font-medium transition-colors duration-500 ${textHoverColors[idx]}`}
              >
                {item.name}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
