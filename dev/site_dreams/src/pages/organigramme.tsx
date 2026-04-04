import { Tree, TreeNode } from 'react-organizational-chart';

// Node version "Précise"
const StyledNode = ({ name, role, color = "border-slate-300" }: { name: string, role: string, color?: string }) => (
  <div className={`inline-block p-1.5 rounded-md border-[1.2px] ${color} bg-white shadow-sm w-[95px] mx-0.5 transition-all duration-200 hover:scale-110 z-10`}>
    <p className="text-[9px] font-extrabold text-slate-800 leading-none truncate uppercase tracking-tighter">{name}</p>
    <p className="text-[7px] text-slate-400 font-bold tracking-tighter mt-1 leading-none italic">{role}</p>
  </div>
);

const legendItems = [
  { label: 'Présidence', color: 'bg-red-500', border: 'border-red-500' },
  { label: 'Direction Exécutive', color: 'bg-orange-500', border: 'border-orange-500' },
  { label: 'Antenne Côte d\'Ivoire', color: 'bg-blue-500', border: 'border-blue-500' },
  { label: 'Antenne France', color: 'bg-indigo-600', border: 'border-indigo-600' },
  { label: 'Antenne Togo', color: 'bg-emerald-500', border: 'border-emerald-500' },
  { label: 'Pôles', color: 'bg-purple-500', border: 'border-purple-500' },
  { label: 'Membres', color: 'bg-slate-300', border: 'border-slate-300' },
];

const OrganigrammeDreams = () => {
  return (
    <main className="bg-white text-gray-800 font-sans leading-relaxed">

      {/* ============ EN-TÊTE ============ */}
      <section className="max-w-6xl mx-auto pt-10 pb-6 px-4">
        <div className="text-center">
          <p className="text-gray-500 text-xs mb-4">Accueil / Organigramme</p>
          <h1 className="text-3xl md:text-4xl font-extrabold mb-4">
            Notre <span className="text-yellow-500">équipe</span>
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Découvrez la structure organisationnelle de <span className="font-bold notranslate" translate="no">DREAMS</span> et
            les personnes qui œuvrent au quotidien pour porter nos projets à travers le monde.
          </p>
        </div>
      </section>

      {/* ============ LÉGENDE ============ */}
      <section className="max-w-6xl mx-auto px-4 pb-6">
        <div className="bg-white rounded-2xl border border-gray-100 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] p-6">
          <h3 className="text-sm font-bold text-gray-800 uppercase tracking-wide mb-4 text-center">Légende</h3>
          <div className="flex flex-wrap justify-center gap-4">
            {legendItems.map((item) => (
              <div
                key={item.label}
                className={`flex items-center gap-2 bg-white border-l-4 ${item.border} rounded-lg px-4 py-2 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-0.5`}
              >
                <span className={`w-3 h-3 rounded-full ${item.color} flex-shrink-0`}></span>
                <span className="text-xs font-semibold text-gray-700">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ ORGANIGRAMME ============ */}
      <section className="w-full pb-10">
        <div className="overflow-auto no-scrollbar cursor-grab active:cursor-grabbing flex justify-center items-start">
          
          {/* L'ARBRE EN SCALE 0.85 (Le réglage final) */}
          <div className="w-max px-32 py-6 flex flex-col items-center origin-top transform scale-[0.85]">
            
            <Tree
              lineWidth={'2px'}
              lineColor={'#cbd5e1'}
              lineBorderRadius={'8px'}
              label={<StyledNode name="Christian T." role="Président" color="border-red-500" />}
            >
              <TreeNode label={<StyledNode name="-" role="DE" color="border-orange-500" />}>
                
                <div className="flex justify-center gap-4 mt-3">
                  {/* CÔTE D'IVOIRE */}
                  <TreeNode label={<StyledNode name="C. d'Ivoire" role="Antenne" color="border-blue-500" />}>
                    <TreeNode label={<StyledNode name="Alloussene" role="Resp." />} />
                    <TreeNode label={<StyledNode name="Alassane" role="Sec." />} />
                    <TreeNode label={<StyledNode name="Mondésir" role="Trés." />} />
                  </TreeNode>

                  {/* FRANCE */}
                  <TreeNode label={<StyledNode name="France" role="Antenne" color="border-indigo-600" />}>
                    <TreeNode label={<StyledNode name="Christian" role="Resp." />} />
                    <TreeNode label={<StyledNode name="Fabrice" role="Sec." />} />
                    <TreeNode label={<StyledNode name="Alexandre" role="Trés." />} />
                  </TreeNode>

                  {/* TOGO */}
                  <TreeNode label={<StyledNode name="Togo" role="Antenne" color="border-emerald-500" />}>
                    <TreeNode label={<StyledNode name="Prince" role="Resp." />} />
                    <TreeNode label={<StyledNode name="Samiratou" role="Sec." />} />
                    <TreeNode label={<StyledNode name="Lens A." role="Trés." />} />
                  </TreeNode>

                  {/* PÔLES */}
                  <TreeNode label={<StyledNode name="Pôles" role="Structure" color="border-purple-500" />}>
                    <TreeNode label={<StyledNode name="Aly/Allou" role="Perm." />} />
                    <TreeNode label={<StyledNode name="Nahia/J-F" role="Log." />} />
                    <TreeNode label={<StyledNode name="Ella/Azi" role="Com." />} />
                    <TreeNode label={<StyledNode name="G. Rostand" role="Héb." />} />
                    <TreeNode label={<StyledNode name="C/Rodri." role="Sens." />} />
                  </TreeNode>
                </div>

              </TreeNode>
            </Tree>
          </div>
        </div>
      </section>

      {/* ============ CTA SECTION (comme les autres pages) ============ */}
      <section className="text-center max-w-6xl mx-auto py-7 px-4">
        <button
          className="group relative item card rounded-xl text-center border-t-4 border-t-yellow-500 bg-white shadow-md px-5 py-3 mb-2 overflow-hidden transition-all duration-400 hover:shadow-lg"
          onClick={() => {
            window.location.href = "/devenir-benevole";
          }}
        >
          <div className="absolute inset-0 bg-yellow-500 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-[cubic-bezier(0.65,0,0.35,1)] z-0"></div>
          <div className="relative z-10">
            <div className="title-content flex justify-center">
              <span className="font-bold title font-title text-gray-800 group-hover:text-white transition-colors duration-300">
                Envie de rejoindre l'équipe ?
              </span>
            </div>
            <div className="btn-content flex justify-center mb-3 mt-3">
              <span className="btn my-3 text-gray-600 group-hover:text-white transition-colors duration-300">
                Rejoignez <span className="font-bold notranslate" translate="no">DREAMS</span> en
                tant que bénévole et contribuez à faire la différence au quotidien.
              </span>
            </div>
          </div>
        </button>
      </section>

      <style dangerouslySetInnerHTML={{ __html: `
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}} />
    </main>
  );
};

export default OrganigrammeDreams;