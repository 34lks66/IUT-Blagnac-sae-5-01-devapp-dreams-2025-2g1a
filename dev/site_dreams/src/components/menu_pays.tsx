import '/src/App.css'

function MenuPays() {
  const navPays = [
    { nom: 'FRANCE', classes: 'from-red-600 to-red-800 text-white', antennes: [{nom: "Toulouse"}, {nom: "Carcassonne"}, {nom: "Narbonne"}] },
    { nom: 'ITALIE', classes: 'from-orange-400 to-orange-600 text-white', antennes: [] },
    { nom: 'ESPAGNE', classes: 'from-yellow-300 to-yellow-500 text-black', antennes: [{nom: "antenne_1"}, {nom: "antenne_2"}] },
    { nom: "CÔTE D'IVOIRE", classes: 'from-green-400 to-green-600 text-white', antennes: [{nom: "antenne_1"}, {nom: "antenne_2"}] },
    { nom: 'BURKINA FASO', classes: 'from-blue-500 to-blue-700 text-white', antennes: [{nom: "antenne_1"}, {nom: "antenne_2"}] },
    { nom: 'TOGO', classes: 'from-purple-500 to-purple-700 text-white', antennes: [{nom: "antenne_1"}, {nom: "antenne_2"}] },
  ];

  return (
<div className="fixed top-0 left-0 w-full flex z-50">
  {navPays.map((p) => (
    <div
      key={p.nom}
      className={`relative flex-1 min-w-[120px] bg-gradient-to-r ${p.classes} text-center px-2 py-2 font-bold cursor-pointer group`}
    >
      {p.nom}
      <ul className="absolute left-0 top-full hidden group-hover:block bg-white text-black w-full shadow-md">
        {p.antennes.map((antenne) => (
          <li
            key={antenne.nom}
            className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
          >
            {antenne.nom}
          </li>
        ))}
      </ul>
    </div>
  ))}
</div>

  );
}

export default MenuPays;
