const Histoire: React.FC = () => {
  const timeline = [
    {
      year: '2020',
      title: 'Respect My Choice',
      description: 'Création d\'un groupe WhatsApp pour offrir un lieu d\'entraide et de discussion aux personnes LGBTQIA+ et leurs alliés.',
    },
    {
      year: '2021',
      title: 'Afric\'Free',
      description: 'Face aux profils malveillants, naissance d\'une communauté sécurisée pour protéger les membres et garantir un espace bienveillant.',
    },
    {
      year: '2024',
      title: 'DREAMS',
      description: 'Officialisation sous le nom DREAMS pour affirmer notre vision : liberté, autonomie et indépendance.',
    },
  ];

  return (
    <div className="bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-6">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6 text-center p-5">
          Notre{' '}
          <span className="text-yellow-500">Histoire</span>
        </h1>

        <p className="text-lg text-gray-700 text-center max-w-3xl mx-auto mb-16">
          Un parcours d'évolution et d'engagement au service des personnes LGBTQIA+ et de leurs alliés.
        </p>

        <div className="relative">
          <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-yellow-500"></div>

          <div className="space-y-12 md:space-y-16">
            {timeline.map((item, index) => (
              <div
                key={index}
                className={`relative flex flex-col md:flex-row items-center gap-8 ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                <div className={`flex-1 ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                  <div className="bg-white p-4 md:p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                    <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3">
                      {item.title}
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>

                <div className="relative z-10 flex-shrink-0">
                  <div
                    className="bg-yellow-500 w-20 h-20 md:w-20 md:h-20 rounded-full flex items-center justify-center text-white shadow-lg hover:shadow-2xl border-4 border-white"
                  >
                  </div>
                  <div className="absolute -top-2 -right-2 bg-white rounded-full px-3 py-1 shadow-md">
                    <span className="text-sm font-bold text-gray-900">{item.year}</span>
                  </div>
                </div>

                <div className="flex-1 hidden md:block"></div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 bg-teal-700 rounded-2xl p-8 md:p-12 text-center shadow-xl">
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Notre Vision
          </h3>
          <p className="text-lg text-teal-50 max-w-3xl mx-auto leading-relaxed">
            DREAMS incarne nos valeurs fondamentales de <span className="font-semibold text-yellow-400">liberté</span>,
            d'<span className="font-semibold text-yellow-400">autonomie</span> et
            d'<span className="font-semibold text-yellow-400">indépendance</span>. Nous nous distinguons pour mieux accompagner
            les personnes en situation d'exil ou de rupture sociale vers un avenir épanouissant.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Histoire;
