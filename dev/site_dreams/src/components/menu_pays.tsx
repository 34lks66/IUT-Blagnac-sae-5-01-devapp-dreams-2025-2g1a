import { useState } from 'react';
import { List, X } from 'lucide-react';

export default function MenuPays() {
  const [open, setOpen] = useState(false);
  const [paysOpen, setPaysOpen] = useState<string | null>(null); // pour ouvrir/fermer la sous-liste antennes
  const navPays = [
    { nom: 'FRANCE', classes: 'from-red-600 to-red-800 text-white', antennes: [{nom: "Toulouse"}, {nom: "Carcassonne"}, {nom: "Narbonne"}] },
    { nom: 'ITALIE', classes: 'from-orange-400 to-orange-600 text-white', antennes: [] },
    { nom: "CÔTE D'IVOIRE", classes: 'from-green-400 to-green-600 text-white', antennes: [{nom: "antenne_1"}, {nom: "antenne_2"}] },
    { nom: 'BURKINA FASO', classes: 'from-blue-500 to-blue-700 text-white', antennes: [{nom: "antenne_1"}, {nom: "antenne_2"}] },
    { nom: 'TOGO', classes: 'from-purple-500 to-purple-700 text-white', antennes: [{nom: "antenne_1"}, {nom: "antenne_2"}] },
  ];

  return (
    <div className="fixed top-0 left-0 w-full z-50">
      {/* --- MOBILE --- */}
      <div className="md:hidden flex items-center bg-gray-900 px-4 py-2 justify-between">
        <span className="text-white font-bold text-lg">Pays</span>
        <button
          className="text-white focus:outline-none z-30"
          onClick={() => setOpen(true)}
          aria-label="Ouvrir le menu"
        >
          <List />
        </button>
      </div>
      {/* Overlay et menu latéral mobile */}
      {open && (
        <>
          {/* Overlay sombre */}
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
            onClick={() => setOpen(false)}
          />
          {/* Menu latéral */}
          <div className="fixed top-0 right-0 h-full w-4/5 max-w-sm bg-white shadow-lg z-50 md:hidden overflow-y-auto transition-transform duration-300">
            <div className="p-6">
              <button
                onClick={() => setOpen(false)}
                className="absolute top-4 right-4 text-gray-700"
                aria-label="Fermer le menu"
              >
                <X size={28} />
              </button>
              <h2 className="text-xl font-bold mb-6 mt-8">Pays</h2>
              <ul className="flex flex-col gap-4 list-none">
                {navPays.map((p) => (
                  <li key={p.nom} className="">
                    <button
                      className={`w-full text-left px-3 py-3 font-bold rounded bg-gradient-to-r ${p.classes} shadow text-white flex items-center justify-between`}
                      //si le pays est deja set dans paysOpen, le mettre a null (fermer), sinon si il est a null le mettre a p.nom(nom du pays)
                      onClick={() => setPaysOpen(paysOpen === p.nom ? null : p.nom)}
                    >
                      <span>{p.nom}</span>
                      {p.antennes.length > 0 && (
                        <span className="ml-2 text-xs">{paysOpen === p.nom ? '▲' : '▼'}</span>
                      )}
                    </button>
                    {/* Sous-liste antennes */}
                    {p.antennes.length > 0 && paysOpen === p.nom && (
                      <ul className="ml-4 mt-2 bg-gray-50 rounded shadow-inner">
                        {p.antennes.map((antenne) => (
                          <li
                            key={antenne.nom}
                            className="px-4 py-2 hover:bg-gray-200 cursor-pointer font-medium text-gray-800"
                          >
                            {antenne.nom}
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </>
      )}

      {/* --- DESKTOP --- */}
      <nav className="hidden md:flex flex-col md:flex-row w-full">
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
