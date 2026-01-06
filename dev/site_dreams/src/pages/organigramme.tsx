import React from 'react';

// 1. Définition de l'interface pour typer les données
interface TeamMember {
  name: string;
  role: string;
  children?: TeamMember[]; // Le "?" signifie que c'est optionnel
}

const Organigramme: React.FC = () => {
  // 2. Application du type à l'objet team
  const team: TeamMember = {
    name: "Direction DREAMS",
    role: "Conseil d'Administration",
    children: [
      {
        name: "Pôle Social",
        role: "Accompagnement",
        children: [
          { name: "Médiateur", role: "Terrain" },
          { name: "Juriste", role: "Droit d'asile" },
        ],
      },
      {
        name: "Pôle Santé",
        role: "Prévention",
        children: [
          { name: "Psychologue", role: "Soutien" },
        ],
      },
    ],
  };

  // 3. Typage des props du sous-composant Node
  const Node: React.FC<{ item: TeamMember }> = ({ item }) => {
    return (
      <li className="relative p-6 px-2">
        <div className="flex flex-col items-center">
          <div className="relative p-4 rounded-xl border-2 border-yellow-600 bg-white shadow-sm z-10 min-w-[140px]">
            <p className="text-sm font-bold text-gray-900">{item.name}</p>
            <p className="text-xs text-gray-500 uppercase tracking-wider">{item.role}</p>
          </div>

          {item.children && (
            <ul className="flex flex-row mt-10 relative">
              <div className="absolute top-[-40px] left-1/2 w-px h-10 bg-gray-300"></div>
              
              {item.children.map((child, index) => (
                <div key={index} className="relative">
                  <div className={`absolute top-0 h-px bg-gray-300 
                    ${index === 0 && item.children!.length > 1 ? 'left-1/2 right-0' : ''}
                    ${index > 0 && index < item.children!.length - 1 ? 'left-0 right-0' : ''}
                    ${index === item.children!.length - 1 && item.children!.length > 1 ? 'left-0 right-1/2' : ''}
                  `}></div>
                  
                  <div className="absolute top-0 left-1/2 w-px h-10 bg-gray-300"></div>
                  
                  <div className="pt-10">
                    <Node item={child} />
                  </div>
                </div>
              ))}
            </ul>
          )}
        </div>
      </li>
    );
  };

  return (
    <div className="p-10 bg-gray-50 min-h-screen overflow-x-auto">
      <h2 className="text-3xl font-bold text-center mb-20 text-gray-800">Organigramme de l'Association</h2>
      <div className="flex justify-center">
        <ul className="flex flex-row justify-center list-none">
          <Node item={team} />
        </ul>
      </div>
    </div>
  );
};

export default Organigramme;