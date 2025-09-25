import { House, Bed, Compass, Megaphone, FileText} from 'lucide-react';

const Home: React.FC = () => {

    // const navigate = useNavigate();

    const missions = [
    {
      icon: <House className="w-10 h-10 md:w-20 md:h-20" />,
      title: 'Accueil',
      href: '/',
    },
    {
      icon: <Compass className="w-10 h-10 md:w-20 md:h-20" />,
      title: 'Orientation',
      href: '/',
    },
    {
      icon: <Bed className="w-10 h-10 md:w-20 md:h-20" />,
      title: 'Hébergement',
      href: '/',
    },
    {
      icon: <FileText className="w-10 h-10 md:w-20 md:h-20" />,
      title: 'Accompagnement',
      href: '/',
    },
    {
      icon: <Megaphone className="w-10 h-10 md:w-20 md:h-20" />,
      title: 'Sensibilisation',
      href: '/',
    }
  ];

    const bgColors = [
    "bg-red-500",
    "bg-yellow-400",
    "bg-teal-500",
    "bg-blue-500",
    "bg-purple-500",
    ];

    // const handleClick = (href: string) => {
    //     navigate(href);
    // };

    return (
        <section id="missions" className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 ">
                Nos Missions
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
                {missions.map((mission, index) => (
                  <div
                    key={index}
                    className={`mission-card ${bgColors[index]} p-6 md:p-8 rounded-lg transition-all duration-300 group md:flex md:flex-col md:items-center md:text-center md:min-h-[280px] h-full hover:shadow-lg hover:scale-105`}
                  >
                    <div className="text-white mb-4 group-hover:text-white transition-colors">
                      {mission.icon}
                    </div>
                    <h3 className="text-2xl text-white mb-3">
                      {mission.title}
                    </h3>
                    <button onClick={mission.href} className="bg-teal-700 text-white px-6 py-2 rounded-lg hover:bg-teal-900 transition-colors duration-200 font-medium md:w-auto mt-auto">
                        En savoir plus
                    </button>
                  </div>
                ))}
              </div>
            </div>
        </section>
    );
};

export default Home;