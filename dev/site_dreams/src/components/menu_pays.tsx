import { useState } from 'react';
import '/src/App.css';
import { List } from 'lucide-react';


export default function MenuPays() {
  const [open, setOpen] = useState(false);
  const navPays = [
    { nom: 'FRANCE', classes: 'from-red-600 to-red-800 text-white', antennes: [{nom: "Toulouse"}, {nom: "Carcassonne"}, {nom: "Narbonne"}] },
    { nom: 'ITALIE', classes: 'from-orange-400 to-orange-600 text-white', antennes: [] },
    { nom: "CÔTE D'IVOIRE", classes: 'from-green-400 to-green-600 text-white', antennes: [{nom: "antenne_1"}, {nom: "antenne_2"}] },
    { nom: 'BURKINA FASO', classes: 'from-blue-500 to-blue-700 text-white', antennes: [{nom: "antenne_1"}, {nom: "antenne_2"}] },
    { nom: 'TOGO', classes: 'from-purple-500 to-purple-700 text-white', antennes: [{nom: "antenne_1"}, {nom: "antenne_2"}] },
  ];

  return (
    <div className="fixed top-0 left-0 w-full z-50">
      {/* Burger button visible sur mobile */}
      <div className="flex md:hidden justify-between items-center bg-gray-900 px-4 py-2">
        <button
          className="text-white focus:outline-none"
          onClick={() => setOpen((o) => !o)}
          aria-label="Ouvrir le menu"
        >
          <List />
        </button>
      </div>
      {/* Menu horizontal sur desktop, vertical sur mobile si open */}
      <nav className={`w-full ${open ? 'block' : 'hidden'} md:flex flex-col md:flex-row bg-white md:bg-transparent`}>
        <div className="flex flex-col md:flex-row w-full">
          {navPays.map((p) => (
            <div
              key={p.nom}
              className={`relative flex-1 min-w-[120px] bg-gradient-to-r ${p.classes} text-center font-bold cursor-pointer group`}
            >
                <div className="py-2">{p.nom}</div>
  
                <ul className="hidden group-hover:block md:absolute md:left-0 md:top-full bg-white text-black w-full z-50">
                  {p.antennes.map((antenne) => (
                    <li
                      key={antenne.nom}
                      className="px-4 py-2 hover:bg-gray-200 cursor-pointer font-medium"
                    >
                      {antenne.nom}
                    </li>
                  ))}
                </ul>
            </div>
          ))}
        </div>
      </nav>
    </div>
  );
}
