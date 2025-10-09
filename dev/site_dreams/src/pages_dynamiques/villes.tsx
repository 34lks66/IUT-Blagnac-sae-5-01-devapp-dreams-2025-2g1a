import { useParams } from "react-router-dom";

function Villes() {
  const data = [
    { nom: "Toulouse", description: "Lomé est une ville situé en Afrique" },
    { nom: "Carcassonne", description: "c carcasonne quoi" },
  ];

  const { nom } = useParams();
  const ville = data.find((v) => v.nom === nom);

  console.log(data);

  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 max-w-md">
      <h2 className="text-2xl font-semibold text-gray-800 mb-2">
        {ville?.nom}
      </h2>
      <p className="text-gray-600 leading-relaxed">{ville?.description}</p>
    </div>
  );
}

export default Villes;
