import AgendaAdmin from './Agenda';
import Accueil from '../components/News';
import PagesSite from './PagePays';
import Utilisateurs from './Utilisateurs';
import Beneficiaires from './Beneficiaires';
import PageAntennes from './pageAntenne';
import DashboardStats from './DashboardStats';

interface ContentProps {
  activeTab: string;
}

const Content = ({ activeTab }: ContentProps) => {
  const renderDashboard = () => (
    <div className="space-y-6">

      {/* Dashboard de statistiques */}
      <DashboardStats />
    </div>
  );

  const renderPlaceholder = (title: string, description: string) => (
    <div className="bg-white rounded-xl p-12 shadow-md text-center">
      <div className="max-w-md mx-auto">
        <div className="w-16 h-16 bg-yellow-500 rounded-xl mx-auto mb-4 flex items-center justify-center">
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold mb-3 bg-yellow-500 bg-clip-text text-transparent">
          {title}
        </h2>
        <p className="text-gray-600 mb-6">{description}</p>
        <span className="inline-block px-6 py-2 bg-gray-100 text-gray-600 rounded-lg font-medium text-sm">
          Fonctionnalité à venir
        </span>
      </div>
    </div>
  );

  const contentMap: Record<string, React.ReactElement> = {
    dashboard: renderDashboard(),
    agenda: <AgendaAdmin />,
    accueil: <Accueil />,
    pages: <PagesSite />,
    users: <Utilisateurs />,
    beneficiaires: <Beneficiaires />,
    pages_antennes: <PageAntennes />,
    settings: renderPlaceholder(
      'Paramètres',
      'Configurez les paramètres généraux de l\'application'
    ),
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