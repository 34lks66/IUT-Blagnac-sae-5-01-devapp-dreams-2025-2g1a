// components/DashboardStats.jsx
import React from 'react';

const DashboardStats = () => {
  const stats = [
    {
      title: 'Utilisateurs actifs',
      value: '1,248',
      change: '+12%',
      isPositive: true,
      icon: (
        <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
        </svg>
      ),
    },
    {
      title: 'Nouveaux membres',
      value: '156',
      change: '+8%',
      isPositive: true,
      icon: (
        <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
        </svg>
      ),
    },
    {
      title: 'Événements à venir',
      value: '23',
      change: '+5%',
      isPositive: true,
      icon: (
        <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
    },
    {
      title: 'Taux de participation',
      value: '78%',
      change: '+3%',
      isPositive: true,
      icon: (
        <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
    },
  ];

  const engagementData = {
    labels: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Jun'],
    datasets: [
      {
        label: 'Engagement',
        data: [65, 78, 82, 79, 92, 105],
        borderColor: '#3b82f6',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
      },
    ],
  };

  const platformData = {
    labels: ['Site Web', 'Mobile', 'Email', 'Réseaux sociaux'],
    datasets: [
      {
        data: [45, 30, 15, 10],
        backgroundColor: [
          'rgba(59, 130, 246, 0.8)',
          'rgba(16, 185, 129, 0.8)',
          'rgba(245, 158, 11, 0.8)',
          'rgba(236, 72, 153, 0.8)',
        ],
      },
    ],
  };

  const recentActivities = [
    {
      id: 1,
      user: 'Marie Dubois',
      action: 'a rejoint un événement',
      time: 'Il y a 5 min',
      type: 'join',
    },
    {
      id: 2,
      user: 'Jean Martin',
      action: 'a commenté une publication',
      time: 'Il y a 12 min',
      type: 'comment',
    },
    {
      id: 3,
      user: 'Sophie Lambert',
      action: 'a créé un nouveau groupe',
      time: 'Il y a 25 min',
      type: 'create',
    },
    {
      id: 4,
      user: 'Pierre Moreau',
      action: 'a participé à un sondage',
      time: 'Il y a 1h',
      type: 'participate',
    },
  ];

  const maxEngagement = Math.max(...engagementData.datasets[0].data);

  return (
    <div className="space-y-6">
      {/* Grille de statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition duration-200"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                <div className={`flex items-center mt-2 ${
                  stat.isPositive ? 'text-green-600' : 'text-red-600'
                }`}>
                  <span className="text-sm font-medium">{stat.change}</span>
                  <span className="text-xs ml-1">vs mois dernier</span>
                </div>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg">
                {stat.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Graphiques et activités */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Graphique d'engagement */}
        <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Engagement des membres</h3>
          <div className="h-64">
            <div className="flex items-end justify-between h-48 space-x-2">
              {engagementData.labels.map((label, index) => (
                <div key={index} className="flex flex-col items-center flex-1">
                  <div
                    className="w-full bg-blue-500 rounded-t transition-all duration-300 hover:opacity-80"
                    style={{
                      height: `${(engagementData.datasets[0].data[index] / maxEngagement) * 100}%`,
                      background: 'linear-gradient(to top, #3b82f6, rgba(59, 130, 246, 0.3))',
                      minHeight: '20px',
                    }}
                  ></div>
                  <span className="text-xs text-gray-600 mt-2">{label}</span>
                  <span className="text-sm font-semibold text-gray-900 mt-1">
                    {engagementData.datasets[0].data[index]}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Activités récentes */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Activités récentes</h3>
          <div className="space-y-4">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-start space-x-3 p-3 hover:bg-gray-50 rounded-lg transition duration-200">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">
                    {activity.user}
                  </p>
                  <p className="text-sm text-gray-600 mt-1">
                    {activity.action}
                  </p>
                  <span className="text-xs text-gray-500 mt-1">{activity.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Section inférieure */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Répartition des canaux */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Canaux d'accès</h3>
          <div className="flex items-center justify-center">
            <div className="w-48 h-48 relative">
              <div className="w-full h-full rounded-full border-8 border-blue-500"></div>
              <div className="w-3/4 h-3/4 rounded-full border-8 border-green-500 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
              <div className="w-1/2 h-1/2 rounded-full border-8 border-yellow-500 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
              <div className="w-1/4 h-1/4 rounded-full border-8 border-pink-500 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-6">
            {platformData.labels.map((label, index) => (
              <div key={index} className="flex items-center">
                <div
                  className="w-3 h-3 rounded-full mr-2"
                  style={{ backgroundColor: platformData.datasets[0].backgroundColor[index] }}
                ></div>
                <span className="text-sm text-gray-600">{label}</span>
                <span className="ml-auto text-sm font-semibold text-gray-900">
                  {platformData.datasets[0].data[index]}%
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Actions rapides */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Actions rapides</h3>
          <div className="grid grid-cols-2 gap-4">
            <button className="p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition duration-200 text-left">
              <div className="w-8 h-8 bg-blue-500 rounded-lg mb-2 flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
              <span className="text-sm font-medium text-gray-900">Nouvel événement</span>
            </button>
            
            <button className="p-4 bg-green-50 rounded-lg hover:bg-green-100 transition duration-200 text-left">
              <div className="w-8 h-8 bg-green-500 rounded-lg mb-2 flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <span className="text-sm font-medium text-gray-900">Gérer membres</span>
            </button>
            
            <button className="p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition duration-200 text-left">
              <div className="w-8 h-8 bg-purple-500 rounded-lg mb-2 flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </div>
              <span className="text-sm font-medium text-gray-900">Modifier contenu</span>
            </button>
            
            <button className="p-4 bg-yellow-50 rounded-lg hover:bg-yellow-100 transition duration-200 text-left">
              <div className="w-8 h-8 bg-yellow-500 rounded-lg mb-2 flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <span className="text-sm font-medium text-gray-900">Rapports</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardStats;