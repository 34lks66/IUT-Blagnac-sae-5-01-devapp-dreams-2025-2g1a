import { useState } from "react";
import { ChevronUp, Menu, X } from "lucide-react";
import logo from "../assets/logo.png";

type DropdownKey = "antennes" | "missions" | "soutenir";

const Logo = () => (
  <a href="/" 
  // className="min-w-[128px] min-h-[128px]"
  >
    <img src={logo} alt="Logo" className="h-32 w-auto" />
  </a>
);

const Header = () => {
  const [openCountry, setOpenCountry] = useState<string | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<DropdownKey | null>(null);

  const menuStructure = {
    antennes: {
      title: "Nos antennes",
      pays: [
        {
          name: "France",
          href: "/pays/france",
          villes: [
            { name: "Toulouse"},
            { name: "Carcassonne"},
            { name: "Narbonne"},
          ],
        },
        {
          name: "Togo",
          href: "/pays/togo",
          villes: [{ name: "Lomé"}],
        },
        {
          name: "Burkina Faso",
          href: "/pays/burkina-faso",
          villes: [
            { name: "Bobo-Dioulasso"},
            { name: "Ouagadougou"},
          ],
        },
        {
          name: "Côte d'Ivoire",
          href: "/pays/cote-divoire",
          villes: [
            { name: "Abidjan"},
            { name: "Bouaké"},
          ],
        },
        { name: "Italie", href: "/pays/italie" },
      ],
    },
    missions: {
      title: "Nos missions",
      items: [
        { name: "Accueil du public LGBTQ+", href: "/accueil_public" },
        { name: "Évaluation et orientation", href: "/evaluation" },
        { name: "Hébergement solidaire et temporaire", href: "/hebergement" },
        { name: "Accompagnement administratif et juridique", href: "/accompagnement" },
        { name: "Sensibilisation des minorités sexuelles", href: "/sensibilisation" },
      ],
    },
    soutenir: {
      title: "Nous soutenir",
      items: [
        { name: "Faire un don", href: "/donner" },
        { name: "Devenir bénévole", href: "/devenir-benevole" },
        { name: "Devenir partenaire", href: "/devenir-partenaire" },
      ],
    },
  };

  const toggleDropdown = (key: DropdownKey) => {
    setOpenDropdown(openDropdown === key ? null : key);
  };

  return (
    <>
      {/* HEADER */}
      <header className="bg-white border-b-2" style={{ borderImage: "linear-gradient(to right, #f59e0b, #93720a) 1" }}>
        <div className="flex items-center justify-between">
          <div className="flex-1"></div>

          {/* LOGO */}
          <div className="flex items-center justify-center space-x-3">
            <a href="/" className="flex items-center space-x-3">
              <Logo />
              <span className="text-4xl font-bold bg-gradient-to-r from-yellow-500 to-amber-700 bg-clip-text text-transparent">
                DREAMS
              </span>
            </a>
          </div>

          {/* ACTIONS / BURGER */}
          <div className="flex-1 flex justify-end items-center space-x-3">
            <a
              href="/devenir-benevole"
              className="hidden md:flex items-center px-4 py-2 border-2 border-amber-600 text-amber-700 rounded-md hover:bg-amber-50 transition-colors text-sm font-medium"
            >
              Devenir bénévole
            </a>
            <a
              href="/donner"
              className="hidden md:flex items-center px-4 py-2 bg-gradient-to-r from-yellow-500 to-amber-600 text-white rounded-md hover:shadow-lg transition-all text-sm font-medium"
            >
              Donner
            </a>

            {/* Menu mobile */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden text-gray-700 z-50"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        {/* NAVIGATION DESKTOP */}
        <nav className="hidden md:block border-t border-gray-100">
          <div className="flex items-center justify-center px-6 py-3 space-x-2">

            <a href="/" className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-amber-600">
              Accueil
            </a>

            {/* === ANTENNES === */}
            <div className="relative group">
              <button
                className="flex items-center space-x-1 px-4 py-2 text-sm font-medium text-gray-700 hover:text-amber-600"
                onMouseEnter={() => setOpenDropdown("antennes")}
                onClick={() => setOpenDropdown(null)}
              >
                <span>{menuStructure.antennes.title}</span>
                <ChevronUp
                  size={16}
                  className={`transform transition-transform ${openDropdown === "antennes" ? "rotate-180" : ""
                    }`}
                />
              </button>

              {openDropdown === "antennes" && (
                <div
                  className="absolute top-full left-0 mt-1 w-64 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50"
                  onMouseLeave={() => setOpenDropdown(null)}
                >
                  {menuStructure.antennes.pays.map((pays, idx) => (
                    <div key={idx} className="relative group/item">
                      <a
                        href={pays.href}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-amber-50 hover:text-amber-600 font-medium flex justify-between items-center"
                      >
                        {pays.name}
                        {pays.villes && (
                          <ChevronUp
                            size={14}
                            className="ml-2 text-gray-500 transform transition-transform duration-300 group-hover/item:rotate-90 group-hover/item:text-amber-600"
                          />
                        )}
                      </a>

                      {pays.villes && (
                        <div className="absolute top-0 left-full mt-0 hidden group-hover/item:block bg-white border border-gray-200 rounded-lg shadow-lg z-50 min-w-[180px]">
                          {pays.villes.map((ville) => (
                            <a
                              key={ville.name}
                              href={`/villes/${ville.name}`}
                              className="block px-4 py-2 text-sm text-gray-700 hover:bg-amber-50 hover:text-amber-600 whitespace-nowrap"
                            >
                              {ville.name}
                            </a>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* === AUTRES MENUS === */}
            {/* Missions */}
            <div className="relative group">
              <button
                className="flex items-center space-x-1 px-4 py-2 text-sm font-medium text-gray-700 hover:text-amber-600"
                onMouseEnter={() => setOpenDropdown("missions")}
                onClick={() => setOpenDropdown(null)}
              >
                <span>{menuStructure.missions.title}</span>
                <ChevronUp
                  size={16}
                  className={`transform transition-transform ${openDropdown === "missions" ? "rotate-180" : ""
                    }`}
                />
              </button>

              {openDropdown === "missions" && (
                <div
                  className="absolute top-full left-0 mt-1 w-72 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50"
                  onMouseLeave={() => setOpenDropdown(null)}
                >
                  {menuStructure.missions.items.map((item, idx) => (
                    <a
                      key={idx}
                      href={item.href}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-amber-50 hover:text-amber-600"
                    >
                      {item.name}
                    </a>
                  ))}
                </div>
              )}
            </div>

            <a href="/agenda" className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-amber-600">
              Agenda
            </a>

            {/* Soutenir */}
            <div className="relative group">
              <button
                className="flex items-center space-x-1 px-4 py-2 text-sm font-medium text-gray-700 hover:text-amber-600"
                onMouseEnter={() => setOpenDropdown("soutenir")}
                onClick={() => setOpenDropdown(null)}
              >
                <span>{menuStructure.soutenir.title}</span>
                <ChevronUp
                  size={16}
                  className={`transform transition-transform ${openDropdown === "soutenir" ? "rotate-180" : ""
                    }`}
                />
              </button>

              {openDropdown === "soutenir" && (
                <div
                  className="absolute top-full left-0 mt-1 w-56 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50"
                  onMouseLeave={() => setOpenDropdown(null)}
                >
                  {menuStructure.soutenir.items.map((item, idx) => (
                    <a
                      key={idx}
                      href={item.href}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-amber-50 hover:text-amber-600"
                    >
                      {item.name}
                    </a>
                  ))}
                </div>
              )}
            </div>

            <a href="/contact" className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-amber-600">
              Contact
            </a>
          </div>
        </nav>
      </header>

      {/* === MENU MOBILE === */}
      {isMenuOpen && (
        <>
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
            onClick={() => setIsMenuOpen(false)}
          />
          <div className="fixed top-0 right-0 h-full w-4/5 max-w-sm bg-white shadow-2xl z-50 md:hidden overflow-y-auto">
            <div className="p-6">
              <button
                onClick={() => setIsMenuOpen(false)}
                className="absolute top-4 right-4 text-gray-700"
              >
                <X size={28} />
              </button>

              <h2 className="text-xl font-bold mb-6 mt-8 text-gray-800">Menu</h2>

              <div className="flex flex-col gap-3 mb-6">
                <a
                  href="/devenir-benevole"
                  className="w-full text-center px-4 py-3 border-2 border-amber-600 text-amber-700 rounded-md font-medium"
                >
                  Devenir bénévole
                </a>
                <a
                  href="/donner"
                  className="w-full text-center px-4 py-3 bg-gradient-to-r from-yellow-500 to-amber-600 text-white rounded-md font-medium"
                >
                  Donner
                </a>
              </div>

              <div className="border-t border-gray-200 pt-4">
                {/* Antennes */}
                <div className="mb-4">
                  <button
                    onClick={() => toggleDropdown("antennes")}
                    className="flex items-center justify-between w-full px-3 py-2 text-left font-semibold text-gray-800"
                  >
                    <span>{menuStructure.antennes.title}</span>
                    <ChevronUp
                      size={20}
                      className={`transform transition-transform ${openDropdown === "antennes" ? "rotate-180" : ""
                        }`}
                    />
                  </button>

                  {openDropdown === "antennes" && (
                    <div className="pl-4 mt-2 space-y-2">
                      {menuStructure.antennes.pays.map((pays, idx) => (
                        <div key={idx}>
                          <button
                            onClick={() =>
                              setOpenCountry(openCountry === pays.name ? null : pays.name)
                            }
                            className="flex items-center justify-between w-full py-2 text-sm font-medium text-gray-700 hover:text-amber-600"
                          >
                            <span>{pays.name}</span>
                            {pays.villes && (
                              <ChevronUp
                                size={14}
                                className={`transform transition-transform duration-300 ${openCountry === pays.name
                                    ? "rotate-180 text-amber-600"
                                    : ""
                                  }`}
                              />
                            )}
                          </button>

                          {pays.villes && openCountry === pays.name && (
                            <div className="pl-4 mt-1 space-y-1">
                              {pays.villes.map((ville) => (
                                <a
                                  key={ville.name}
                                  href={`/villes/${ville.name}`}
                                  className="block py-1 text-sm text-gray-600 hover:text-amber-600"
                                  onClick={() => setIsMenuOpen(false)}
                                >
                                  → {ville.name}
                                </a>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Missions */}
                <div className="mb-4">
                  <button
                    onClick={() => toggleDropdown("missions")}
                    className="flex items-center justify-between w-full px-3 py-2 text-left font-semibold text-gray-800"
                  >
                    <span>{menuStructure.missions.title}</span>
                    <ChevronUp
                      size={20}
                      className={`transform transition-transform ${openDropdown === "missions" ? "rotate-180" : ""
                        }`}
                    />
                  </button>

                  {openDropdown === "missions" && (
                    <div className="pl-4 mt-2 space-y-2">
                      {menuStructure.missions.items.map((item, idx) => (
                        <a
                          key={idx}
                          href={item.href}
                          className="block py-2 text-sm text-gray-700 hover:text-amber-600"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          {item.name}
                        </a>
                      ))}
                    </div>
                  )}
                </div>

                <a
                  href="/agenda"
                  className="block px-3 py-2 font-semibold text-gray-800 hover:text-amber-600"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Agenda
                </a>

                {/* Soutenir */}
                <div className="mb-4">
                  <button
                    onClick={() => toggleDropdown("soutenir")}
                    className="flex items-center justify-between w-full px-3 py-2 text-left font-semibold text-gray-800"
                  >
                    <span>{menuStructure.soutenir.title}</span>
                    <ChevronUp
                      size={20}
                      className={`transform transition-transform ${openDropdown === "soutenir" ? "rotate-180" : ""
                        }`}
                    />
                  </button>

                  {openDropdown === "soutenir" && (
                    <div className="pl-4 mt-2 space-y-2">
                      {menuStructure.soutenir.items.map((item, idx) => (
                        <a
                          key={idx}
                          href={item.href}
                          className="block py-2 text-sm text-gray-700 hover:text-amber-600"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          {item.name}
                        </a>
                      ))}
                    </div>
                  )}
                </div>

                <a
                  href="/contact"
                  className="block px-3 py-2 font-semibold text-gray-800 hover:text-amber-600"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Contact
                </a>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Header;