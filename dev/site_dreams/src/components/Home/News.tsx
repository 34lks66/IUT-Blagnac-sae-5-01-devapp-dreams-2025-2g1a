import { useState, useEffect } from "react";
import { CalendarDays, ChevronLeft, ChevronRight } from "lucide-react"

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";

const News: React.FC = () => {

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [news, setNews] = useState<any[]>([]);

  useEffect(() => {
        fetch(`${API_BASE}/api/news/get`)
        .then((res) => res.json())
        .then((data) => setNews(data))
        .catch((err) => console.log(err));
  }, [])

  const [current, setCurrent] = useState(0);

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % news.length);
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + news.length) % news.length);
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
            {/* {newsData.map((news) => ( */}
            {news.map((item) => (
                <div
                  key={item.id}
                  className="flex-shrink-0 w-full px-2"
                >
                  <div className="relative">
                    <img src={`${API_BASE}${item.image}`} alt={item.title} className="w-full h-56 object-cover"/>
                    <span className="absolute top-4 left-4 bg-teal-700 text-white text-sm font-semibold px-3 py-1 rounded-full">
                        Actualité
                    </span>
                  </div>

                  <div className="p-6">
                    <div className="flex items-center text-gray-600 mb-3 text-sm">
                        <CalendarDays className="w-4 h-4 mr-2 text-gray-500" />
                        {item.date}
                    </div>

                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                        {item.title}
                    </h3>

                    <a href={item.link} className="text-yellow-600 font-semibold hover:text-yellow-700 transition-colors flex items-center">
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
            {/* {newsData.map((news) => ( */}
            {news.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="relative">
                    <img src={`${API_BASE}${item.image}`} alt={item.title} className="w-full h-56 object-cover"/>
                    <span className="absolute top-4 left-4 bg-teal-700 text-white text-sm font-semibold px-3 py-1 rounded-full">
                        Actualité
                    </span>
                  </div>

                  <div className="p-6">
                    <div className="flex items-center text-gray-600 mb-3 text-sm">
                        <CalendarDays className="w-4 h-4 mr-2 text-gray-500" />
                        {item.date}
                    </div>

                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                        {item.title}
                    </h3>

                    <a href={item.link} className="text-yellow-600 font-semibold hover:text-yellow-700 transition-colors flex items-center">
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

