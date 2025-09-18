import '/src/App.css'

function MenuPays() {
  const pays = [
    { nom: 'FRANCE', classes: 'bg-red-600 hover:bg-red-700 text-white' },
    { nom: 'ITALIE', classes: 'bg-orange-500 hover:bg-orange-600 text-white' },
    { nom: 'ESPAGNE', classes: 'bg-yellow-400 hover:bg-yellow-500 text-black' }, 
    { nom: "CÔTE D'IVOIRE", classes: 'bg-green-500 hover:bg-green-600 text-white' },
    { nom: 'BURKINA FASO', classes: 'bg-blue-600 hover:bg-blue-700 text-white' },
    { nom: 'TOGO', classes: 'bg-purple-600 hover:bg-purple-700 text-white' },
  ];

  return (
    <div className="w-full fixed top-0 left-0 flex shadow-lg z-50">
      {pays.map((p) => (
        <button
          key={p.nom}
          className={`${p.classes} flex-1 py-6 text-xl font-bold border-r border-white`}
        >
          {p.nom}
        </button>
      ))}
    </div>
  );
}

export default MenuPays;
