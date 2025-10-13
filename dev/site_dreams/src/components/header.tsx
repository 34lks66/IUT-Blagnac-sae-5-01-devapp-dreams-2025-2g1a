import { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronDown, Menu, X } from "lucide-react";
import logo from "../assets/logo.png";

type DropdownKey = 'antennes' | 'missions' | 'soutenir';

const Logo = () => (
  <a href="/" className="min-w-[128px] min-h-[128px]">
    <img src={logo} alt="Logo" className="h-32 w-auto" />
  </a>
);


const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
const [openDropdown, setOpenDropdown] = useState<DropdownKey | null>(null);

  const menuStructure = {
    antennes: {
      title: "DREAMS et ses antennes",
      pays: [
        { name: "Accueil", href: "/" },
        { 
          name: "France", 
          href: "/france",
          villes: [
            { name: "Toulouse"},
            { name: "Carcassonne"},
            { name: "Narbonne"}
          ]
        },
        { 
          name: "Togo", 
          villes: [ { name: "Lomé"} ]
        },
        { 
          name: "Burkina Faso", 
          villes: [
            { name: "Bobo-Dioulasso"},
            { name: "Ouagadougou"}
          ],
        },
        { 
          name: "Côte d'Ivoire", 
          villes: [
            { name: "Abidjan"},
            { name: "Bouaké"}
          ]
        },
        { 
          name: "Italie"
        },     
      ]
    },
    missions: {
      title: "Nos missions",
      items: [
        { name: "Accueil du public LGBTQ+", href: "/accueil_public" },
        { name: "Évaluation et orientation", href: "/evaluation" },
        { name: "Hébergement solidaire et temporaire", href: "/hebergement" },
        { name: "Accompagnement administratif et juridique", href: "/accompagnement" },
        { name: "Sensibilisation des minorités sexuelles", href: "/sensibilisation" }
      ]
    },
    soutenir: {
      title: "Nous soutenir",
      items: [
        { name: "Faire un don", href: "/donner" },
        { name: "Devenir bénévole", href: "/devenir-benevole" },
        { name: "Devenir partenaire", href: "/devenir-partenaire" }
      ]
    }
  };

const toggleDropdown = (key: DropdownKey) => {
  setOpenDropdown(openDropdown === key ? null : key);
};

  return (
    <>
      {/* Header Desktop */}
      <header className="bg-white border-b-2 pt-8" style={{borderImage: "linear-gradient(to right, #f59e0b, #93720a) 1"}}>
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex-1"></div>
          
          {/* Logo centré */}
          <div className="flex items-center justify-center space-x-3">
            <a href="/" className="flex items-center space-x-3">
              <Logo />
              <span className="text-4xl font-bold bg-gradient-to-r from-yellow-500 to-amber-700 bg-clip-text text-transparent">
                DREAMS
              </span>
            </a>
          </div>

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
            
            {/* Burger Menu Mobile */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden text-gray-700 z-50"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        {/* Deuxième ligne - Navigation Desktop */}
        <nav className="hidden md:block border-t border-gray-100">
          <div className="flex items-center justify-center px-6 py-3 space-x-">
            {/* DREAMS et ses antennes */}
            <div className="relative group">
              <button
                className="flex items-center space-x-1 px-4 py-2 text-sm font-medium text-gray-700 hover:text-amber-600 transition-colors"
                onMouseEnter={() => setOpenDropdown('antennes')}
              >
                <span>{menuStructure.antennes.title}</span>
                <ChevronDown size={16} className={`transform transition-transform ${openDropdown === 'antennes' ? 'rotate-180' : ''}`} />
              </button>
              
              {openDropdown === 'antennes' && (
                <div 
                  className="absolute top-full left-0 mt-1 w-64 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50"
                  onMouseLeave={() => setOpenDropdown(null)}
                >
                  {menuStructure.antennes.pays.map((pays) => (
                    <div key={pays.name}>
                      <a
                        href={pays.href}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-amber-50 hover:text-amber-600 font-medium"
                      >
                        {pays.name}
                      </a>
                      {pays.villes && (
                        <div className="pl-4 bg-gray-50">
                          {pays.villes.map((villes) => (
                            <Link
                              to={`/villes/${encodeURIComponent(villes.name)}`}
                              key={villes.name}
                              className="block px-4 py-2 text-xs text-gray-600 hover:text-amber-600"
                            >
                              → {villes.name}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Nos missions */}
            <div className="relative group">
              <button
                className="flex items-center space-x-1 px-4 py-2 text-sm font-medium text-gray-700 hover:text-amber-600 transition-colors"
                onMouseEnter={() => setOpenDropdown('missions')}
              >
                <span>{menuStructure.missions.title}</span>
                <ChevronDown size={16} className={`transform transition-transform ${openDropdown === 'missions' ? 'rotate-180' : ''}`} />
              </button>
              
              {openDropdown === 'missions' && (
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

            {/* Agenda */}
            <a
              href="/agenda"
              className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-amber-600 transition-colors"
            >
              Agenda
            </a>

            {/* Nous soutenir */}
            <div className="relative group">
              <button
                className="flex items-center space-x-1 px-4 py-2 text-sm font-medium text-gray-700 hover:text-amber-600 transition-colors"
                onMouseEnter={() => setOpenDropdown('soutenir')}
              >
                <span>{menuStructure.soutenir.title}</span>
                <ChevronDown size={16} className={`transform transition-transform ${openDropdown === 'soutenir' ? 'rotate-180' : ''}`} />
              </button>
              
              {openDropdown === 'soutenir' && (
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

            {/* Contact */}
            <a
              href="/contact"
              className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-amber-600 transition-colors"
            >
              Contact
            </a>
          </div>
        </nav>
      </header>

      {/* Menu Mobile */}
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
                aria-label="Close menu"
              >
                <X size={28} />
              </button>
              
              <h2 className="text-xl font-bold mb-6 mt-8 text-gray-800">Menu</h2>
              
              {/* Boutons mobile */}
              <div className="flex flex-col gap-3 mb-6">
                <a 
                  href="/devenir-benevole"
                  className="w-full text-center px-4 py-3 border-2 border-amber-600 text-amber-700 rounded-md font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Devenir bénévole
                </a>
                <a 
                  href="/donner"
                  className="w-full text-center px-4 py-3 bg-gradient-to-r from-yellow-500 to-amber-600 text-white rounded-md font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Donner
                </a>
              </div>

              <div className="border-t border-gray-200 pt-4">
                {/* DREAMS et ses antennes */}
                <div className="mb-4">
                  <button
                    onClick={() => toggleDropdown('antennes')}
                    className="flex items-center justify-between w-full px-3 py-2 text-left font-semibold text-gray-800"
                  >
                    <span>{menuStructure.antennes.title}</span>
                    <ChevronDown size={20} className={`transform transition-transform ${openDropdown === 'antennes' ? 'rotate-180' : ''}`} />
                  </button>
                  {openDropdown === 'antennes' && (
                    <div className="pl-4 mt-2 space-y-2">
                      {menuStructure.antennes.pays.map((pays) => (
                        <div key={pays.name}>
                          <a
                            href={pays.name}
                            className="block py-2 text-sm text-gray-700 hover:text-amber-600"
                            onClick={() => setIsMenuOpen(false)}
                          >
                            {pays.name}
                          </a>
                          {pays.villes && (
                            <div className="pl-4 space-y-1">
                              {pays.villes.map((villes) => (
                                <Link
                                  to={`/pages_dynamiques/villes/${encodeURIComponent(villes.name)}`}

                                  key={villes.name}
                                  className="block py-1 text-xs text-gray-600 hover:text-amber-600"
                                  onClick={() => setIsMenuOpen(false)}
                                >
                                  → {villes.name}
                                </Link>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Nos missions */}
                <div className="mb-4">
                  <button
                    onClick={() => toggleDropdown('missions')}
                    className="flex items-center justify-between w-full px-3 py-2 text-left font-semibold text-gray-800"
                  >
                    <span>{menuStructure.missions.title}</span>
                    <ChevronDown size={20} className={`transform transition-transform ${openDropdown === 'missions' ? 'rotate-180' : ''}`} />
                  </button>
                  {openDropdown === 'missions' && (
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

                {/* Agenda */}
                <a
                  href="/agenda"
                  className="block px-3 py-2 font-semibold text-gray-800 hover:text-amber-600"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Agenda
                </a>

                {/* Nous soutenir */}
                <div className="mb-4">
                  <button
                    onClick={() => toggleDropdown('soutenir')}
                    className="flex items-center justify-between w-full px-3 py-2 text-left font-semibold text-gray-800"
                  >
                    <span>{menuStructure.soutenir.title}</span>
                    <ChevronDown size={20} className={`transform transition-transform ${openDropdown === 'soutenir' ? 'rotate-180' : ''}`} />
                  </button>
                  {openDropdown === 'soutenir' && (
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

                {/* Contact */}
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