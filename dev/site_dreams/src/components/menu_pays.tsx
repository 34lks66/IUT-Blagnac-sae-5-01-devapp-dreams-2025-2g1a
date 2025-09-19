import '/src/App.css'

function MenuPays() {
  const pays = [
    { nom: 'FRANCE', classes: 'bg-red-600 hover:beg-red-700 text-whit' },
    { nom: 'ITALIE', classes: 'bg-orange-500 hover:bg-orange-600 text-white' },
    { nom: 'ESPAGNE', classes: 'bg-yellow-400 hover:bg-yellow-500 text-black' }, 
    { nom: "CÔTE D'IVOIRE", classes: 'bg-green-500 hover:bg-green-600 text-white' },
    { nom: 'BURKINA FASO', classes: 'bg-blue-600 hover:bg-blue-700 text-white' },
    { nom: 'TOGO', classes: 'bg-purple-600 hover:bg-purple-700 text-white' },
  ];

  return (
    <div className="w-full fixed">
      {pays.map((p) => (
        <button
          key={p.nom}
          className={`${p.classes} rounded-none px-4 py-2`}
        >
          {p.nom}
        </button>
      ))}
    </div>
  );
}

export default MenuPays;
