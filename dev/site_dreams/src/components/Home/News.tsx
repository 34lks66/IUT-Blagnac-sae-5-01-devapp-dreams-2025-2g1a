import { useState } from "react";
import { CalendarDays, ChevronLeft, ChevronRight } from "lucide-react"
import none from "../../assets/none.jpg"

interface News {
    id: number;
    image: string;
    date: string;
    title: string;
    link: string;
}

const newsData: News[] = [
    {
        id: 1,
        image: none,
        date: "25 septembre 2025",
        title: "appel",
        link: '#',
    },
    {
        id: 2,
        image: none,
        date: "18 septembre 2025",
        title: "lancement",
        link: '#',
    },
    {
        id: 3,
        image: none,
        date: "11 septembre 2025",
        title: "Evolution",
        link: '#',
    },
];

const News: React.FC = () => {

  const [current, setCurrent] = useState(0);

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % newsData.length);
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + newsData.length) % newsData.length);
  };

  return (
    <section className="bg-[#FFFCF9] mb-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-16 text-center">
            Nos{" "}
            <span className="text-yellow-500">Actualités</span>
          </h1>

           {/* Mobile */}
          <div className="relative md:hidden">
           <div className="overflow-hidden">
            <div className="flex transition-transform duration-500 ease-in-out" style={{ transform: `translateX(-${current * 100}%) ` }}>
            {newsData.map((news) => (
                <div
                  key={news.id}
                  className="flex-shrink-0 w-full px-2"
                >
                  <div className="relative">
                    <img src={news.image} alt={news.title} className="w-full h-56 object-cover"/>
                    <span className="absolute top-4 left-4 bg-teal-700 text-white text-sm font-semibold px-3 py-1 rounded-full">
                        Actualité
                    </span>
                  </div>

                  <div className="p-6">
                    <div className="flex items-center text-gray-600 mb-3 text-sm">
                        <CalendarDays className="w-4 h-4 mr-2 text-gray-500" />
                        {news.date}
                    </div>

                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                        {news.title}
                    </h3>

                    <a href={news.link} className="text-yellow-600 font-semibold hover:text-yellow-700 transition-colors flex items-center">
                        Lire plus
                        <span className="ml-1 text-lg">→</span>
                    </a>
                  </div>
                    
                </div>
            ))}
             </div>
           </div>

           <button onClick={prevSlide} className="absolute top-1/2 left-2 -translate-y-1/2 bg-white/90 backdrop-blur-sm p-2 rounded-full shadow hover:bg-white">
                <ChevronLeft className="w-6 h-6 text-gray-700" />
           </button>
           <button onClick={nextSlide} className="absolute top-1/2 right-2 -translate-y-1/2 bg-white/90 backdrop-blur-sm p-2 rounded-full shadow hover:bg-white">
                <ChevronRight className="w-6 h-6 text-gray-700" />
           </button>
          </div>
          
          {/* DESKTOP */}
          <div className="hidden md:grid grid-cols-2 lg:grid-cols-3 gap-8">
            {newsData.map((news) => (
                <div
                  key={news.id}
                  className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="relative">
                    <img src={news.image} alt={news.title} className="w-full h-56 object-cover"/>
                    <span className="absolute top-4 left-4 bg-teal-700 text-white text-sm font-semibold px-3 py-1 rounded-full">
                        Actualité
                    </span>
                  </div>

                  <div className="p-6">
                    <div className="flex items-center text-gray-600 mb-3 text-sm">
                        <CalendarDays className="w-4 h-4 mr-2 text-gray-500" />
                        {news.date}
                    </div>

                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                        {news.title}
                    </h3>

                    <a href={news.link} className="text-yellow-600 font-semibold hover:text-yellow-700 transition-colors flex items-center">
                        Lire plus
                        <span className="ml-1 text-lg">→</span>
                    </a>
                  </div>
                    
                </div>
            ))}
          </div>

        </div>
    </section>
  )
}

export default News

