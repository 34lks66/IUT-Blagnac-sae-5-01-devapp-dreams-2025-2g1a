import React from 'react';
import { Tree, TreeNode } from 'react-organizational-chart';

// Node version "Précise"
const StyledNode = ({ name, role, color = "border-slate-300" }: { name: string, role: string, color?: string }) => (
  <div className={`inline-block p-1.5 rounded-md border-[1.2px] ${color} bg-white shadow-sm w-[95px] mx-0.5 transition-all duration-200 hover:scale-110 z-10`}>
    <p className="text-[9px] font-extrabold text-slate-800 leading-none truncate uppercase tracking-tighter">{name}</p>
    <p className="text-[7px] text-slate-400 font-bold tracking-tighter mt-1 leading-none italic">{role}</p>
  </div>
);

const OrganigrammeDreams = () => {
  return (
    <div className="w-full h-screen bg-slate-50 flex flex-col overflow-hidden font-sans">
      
      {/* TITRE CENTRÉ */}
      <div className="pt-6 pb-2 text-center">
        <h1 className="text-xs font-black text-slate-900 uppercase tracking-[0.3em]">
          ORGANIGRAMME DREAMS
        </h1>
        <div className="h-[2px] w-10 bg-red-500 mx-auto mt-1 rounded-full"></div>
      </div>

      {/* ZONE DE NAVIGATION */}
      <div className="flex-grow overflow-auto no-scrollbar cursor-grab active:cursor-grabbing flex justify-center items-start">
        
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

      <style dangerouslySetInnerHTML={{ __html: `
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}} />
    </div>
  );
};

export default OrganigrammeDreams;