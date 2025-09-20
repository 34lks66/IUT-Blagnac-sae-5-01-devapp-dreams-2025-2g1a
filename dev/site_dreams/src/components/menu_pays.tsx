import '/src/App.css'

function MenuPays() {
  const navPays = [
    { nom: 'FRANCE', classes: 'bg-red-700 hover:bg-red-700 text-white', href:'/France', antennes: [{nom: "Toulouse"}, {nom: "Carcassonne"}]},
    { nom: 'ITALIE', classes: 'bg-orange-500 hover:bg-orange-600 text-white', href:'/Italie', antennes: [{nom: "antenne_1"}, {nom: "antenne_2"}] },
    { nom: 'ESPAGNE', classes: 'bg-yellow-400 hover:bg-yellow-500 text-black', href:'/Espagne', antennes: [{nom: "antenne_1"}, {nom: "antenne_2"}] }, 
    { nom: "CÔTE D'IVOIRE", classes: 'bg-green-500 hover:bg-green-600 text-white', href:"/Côte_D'Ivoire", antennes: [{nom: "antenne_1"}, {nom: "antenne_2"}] },
    { nom: 'BURKINA FASO', classes: 'bg-blue-600 hover:bg-blue-700 text-white', href:'/BurkinaFaso', antennes: [{nom: "antenne_1"}, {nom: "antenne_2"}] },
    { nom: 'TOGO', classes: 'bg-purple-600 hover:bg-purple-700 text-white', href:'Togo', antennes: [{nom: "antenne_1"}, {nom: "antenne_2"}] },
  ];

  return (
  <div className="w-screen fixed top-0 left-0 flex">
      {navPays.map((p) => (
        <select
          key={p.nom}
          className={`flex-1 ${p.classes} rounded-none px-4 py-2 font-bold transition-colors duration-200 appearance-none text-center`}
        >
          <option value="" disabled selected hidden>{p.nom}</option>
            {p.antennes.map((antenne) => (
            <option value={antenne.nom}>{antenne.nom}</option>))}
          
        </select>
      ))}
    </div>
  );
}

export default MenuPays;
