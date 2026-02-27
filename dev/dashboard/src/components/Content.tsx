import AgendaAdmin from './Agenda';
import Accueil from '../components/News';
import PagesSite from './PagePays';
import Utilisateurs from './Utilisateurs';
import Beneficiaires from './Beneficiaires';
import Heberges from './Heberges';
import PageAntennes from './pageAntenne';
import DashboardStats from './DashboardStats';
import Parametre from './Parametre';
import Projects from './Projects';
import OutilGestion from './OutilGestion';

interface ContentProps {
  activeTab: string;
}

const Content = ({ activeTab }: ContentProps) => {
  const contentMap: Record<string, React.ReactElement> = {
    dashboard: <DashboardStats />,
    outilgestion: <OutilGestion />,
    agenda: <AgendaAdmin />,
    projects: <Projects />,
    accueil: <Accueil />,
    pages: <PagesSite />,
    users: <Utilisateurs />,
    beneficiaires: <Beneficiaires />,
    heberges: <Heberges />,
    pages_antennes: <PageAntennes />,
    settings: <Parametre />,
  };

  return (
    <main className="flex-1 bg-gradient-to-br from-gray-50 to-gray-100 p-6 overflow-y-auto">
      <div className="max-w-7xl mx-auto">
        {contentMap[activeTab] || contentMap.dashboard}
      </div>
    </main>
  );
};

export default Content;