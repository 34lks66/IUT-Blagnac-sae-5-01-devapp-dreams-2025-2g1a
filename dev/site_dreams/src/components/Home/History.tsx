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
    <div className="bg-white">
      <div className="max-w-7xl mx-auto px-8 lg:px-12 py-24">
        {/* En-tête grande et imposante */}
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Notre Histoire
          </h2>
          <div className="w-32 h-1 bg-gray-300 mx-auto mb-8"></div>
          <p className="text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Un parcours d'évolution et d'engagement au service des personnes LGBTQIA+ et de leurs alliés.
          </p>
        </div>

        {/* Timeline agrandie */}
        <div className="relative">
          <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gray-200"></div>

          <div className="space-y-20">
            {timeline.map((item, index) => (
              <div
                key={index}
                className={`relative flex flex-col md:flex-row items-center gap-12 ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                <div className={`flex-1 ${index % 2 === 0 ? 'md:pr-16 md:text-right' : 'md:pl-16 md:text-left'}`}>
                  <div className="bg-gray-50 hover:bg-white p-10 rounded-2xl border-2 border-gray-200 transition-all duration-300 hover:shadow-lg">
                    <h3 className="text-3xl font-bold text-gray-900 mb-4">
                      {item.title}
                    </h3>
                    <p className="text-xl text-gray-600 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>

                <div className="relative z-10 flex-shrink-0">
                  <div className="bg-gray-900 w-8 h-8 rounded-full border-4 border-white shadow-lg"></div>
                  <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-white rounded-xl px-6 py-3 border-2 border-gray-200 shadow-md">
                    <span className="text-2xl font-bold text-gray-900">{item.year}</span>
                  </div>
                </div>

                <div className="flex-1 hidden md:block"></div>
              </div>
            ))}
          </div>
        </div>

        {/* Section vision agrandie */}
        <div className="mt-24 bg-gray-50 rounded-2xl p-12 md:p-16 border-2 border-gray-200">
          <div className="text-center max-w-5xl mx-auto">
            <h3 className="text-4xl font-bold text-gray-900 mb-8">
              Notre Vision
            </h3>
            <p className="text-2xl text-gray-600 leading-relaxed">
              DREAMS incarne nos valeurs fondamentales de <span className="font-bold text-gray-900">liberté</span>,
              d'<span className="font-bold text-gray-900">autonomie</span> et
              d'<span className="font-bold text-gray-900">indépendance</span>. Nous nous distinguons pour mieux accompagner
              les personnes en situation d'exil ou de rupture sociale vers un avenir épanouissant.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Histoire;