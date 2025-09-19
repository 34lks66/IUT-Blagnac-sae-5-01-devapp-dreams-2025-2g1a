import '/src/App.css'

function MenuPays() {
  const pays = [
    { nom: 'FRANCE', classes: 'bg-red-700 hover:bg-red-700 text-white', href:"/France" },
    { nom: 'ITALIE', classes: 'bg-orange-500 hover:bg-orange-600 text-white', href:"/Italie" },
    { nom: 'ESPAGNE', classes: 'bg-yellow-400 hover:bg-yellow-500 text-black', href:"/Espagne" }, 
    { nom: "CÔTE D'IVOIRE", classes: 'bg-green-500 hover:bg-green-600 text-white' },
    { nom: 'BURKINA FASO', classes: 'bg-blue-600 hover:bg-blue-700 text-white' },
    { nom: 'TOGO', classes: 'bg-purple-600 hover:bg-purple-700 text-white' },
  ];

  return (
    <div className="w-full fixed flex">
      {pays.map((p) => (
        <button
          key={p.nom}
          className={`${p.classes} rounded-none px-4 py-2 font-bold transition-colors duration-200`}
        >
          {p.nom}
        </button>
      ))}
    </div>
  );
}

export default MenuPays;
