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
    <section className="bg-white py-24">
        <div className="max-w-8xl mx-auto px-8 lg:px-12">
          {/* En-tête grande et sobre */}
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Actualités
            </h2>
            <div className="w-32 h-1 bg-gray-300 mx-auto mb-8"></div>
            <p className="text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Restez informé de nos dernières actions et événements
            </p>
          </div>

           {/* Version Mobile */}
          <div className="relative md:hidden">
           <div className="overflow-hidden">
            <div className="flex transition-transform duration-500 ease-in-out" style={{ transform: `translateX(-${current * 100}%) ` }}>
            {news.map((item) => (
                <div
                  key={item.id}
                  className="flex-shrink-0 w-full px-4"
                >
                  <div className="bg-white rounded-2xl border-2 border-gray-200 shadow-lg overflow-hidden">
                    <div className="relative">
                      <img src={`${API_BASE}${item.image}`} alt={item.title} className="w-full h-72 object-cover"/>
                      <span className="absolute top-6 left-6 bg-gray-800 text-white text-lg font-semibold px-4 py-2 rounded-xl">
                          Actualité
                      </span>
                    </div>

                    <div className="p-8">
                      <div className="flex items-center text-gray-600 mb-4 text-lg">
                          <CalendarDays className="w-6 h-6 mr-3 text-gray-500" />
                          {item.date}
                      </div>

                      <h3 className="text-2xl font-bold text-gray-900 mb-6">
                          {item.title}
                      </h3>

                      { item.link ? (
                        <a href={item.link} className="text-gray-800 font-semibold hover:text-gray-900 transition-colors flex items-center text-lg">
                          Lire plus
                          <span className="ml-2 text-xl transform group-hover:translate-x-1 transition-transform">→</span>
                        </a>
                      ) : (
                        <a href={`/news/${item._id}`} className="text-gray-800 font-semibold hover:text-gray-900 transition-colors flex items-center text-lg group">
                          Lire plus
                          <span className="ml-2 text-xl transform group-hover:translate-x-1 transition-transform">→</span>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
            ))}
             </div>
           </div>

           <button onClick={prevSlide} className="absolute top-1/2 left-4 -translate-y-1/2 bg-white/90 backdrop-blur-sm p-3 rounded-full shadow-lg hover:bg-white border border-gray-200">
                <ChevronLeft className="w-8 h-8 text-gray-700" />
           </button>
           <button onClick={nextSlide} className="absolute top-1/2 right-4 -translate-y-1/2 bg-white/90 backdrop-blur-sm p-3 rounded-full shadow-lg hover:bg-white border border-gray-200">
                <ChevronRight className="w-8 h-8 text-gray-700" />
           </button>
          </div>
          
          {/* Version Desktop */}
          <div className="hidden md:grid grid-cols-2 lg:grid-cols-3 gap-10">
            {news.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-3xl border-2 border-gray-200 shadow-lg overflow-hidden hover:shadow-2xl hover:border-gray-300 transition-all duration-300"
                >
                  <div className="relative">
                    <img src={`${API_BASE}${item.image}`} alt={item.title} className="w-full h-72 object-cover"/>
                    <span className="absolute top-6 left-6 bg-gray-800 text-white text-lg font-semibold px-4 py-2 rounded-xl">
                        Actualité
                    </span>
                  </div>

                  <div className="p-8">
                    <div className="flex items-center text-gray-600 mb-4 text-lg">
                        <CalendarDays className="w-6 h-6 mr-3 text-gray-500" />
                        {item.date}
                    </div>

                    <h3 className="text-2xl font-bold text-gray-900 mb-6 leading-tight">
                        {item.title}
                    </h3>

                    { item.link ? (
                      <a href={item.link} className="text-gray-800 font-semibold hover:text-gray-900 transition-colors flex items-center text-lg group">
                        Lire plus
                        <span className="ml-2 text-xl transform group-hover:translate-x-1 transition-transform">→</span>
                      </a>
                    ) : (
                      <a href={`/news/${item._id}`} className="text-gray-800 font-semibold hover:text-gray-900 transition-colors flex items-center text-lg group">
                        Lire plus
                        <span className="ml-2 text-xl transform group-hover:translate-x-1 transition-transform">→</span>
                      </a>
                    )}
                    
                    {/* Modal (conservé mais stylisé) */}
                    {item && (
                      <div id="static-modal" data-modal-backdrop="static" aria-hidden="true" className="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
                        <div className="relative p-4 w-full max-w-4xl max-h-full">
                          <div className="relative bg-white rounded-2xl shadow-2xl border-2 border-gray-200">
                            <div className="flex items-center justify-between p-8 border-b-2 border-gray-200">
                              <h3 className="text-3xl font-bold text-gray-900">
                                {item.title}
                              </h3>
                              <button type="button" className="text-gray-500 bg-gray-100 hover:bg-gray-200 hover:text-gray-900 rounded-xl text-lg w-10 h-10 ms-auto inline-flex justify-center items-center transition-colors">
                                <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                                </svg>
                                <span className="sr-only">Fermer</span>
                              </button>
                            </div>
                            <div className="p-8 space-y-6">
                              <p className="text-xl leading-relaxed text-gray-600">
                                {item.description}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>   
                </div>
            ))}
          </div>

          {/* Indicateurs de slide pour mobile */}
          <div className="md:hidden flex justify-center mt-8 space-x-3">
            {news.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrent(index)}
                className={`w-4 h-4 rounded-full transition-colors ${
                  index === current ? 'bg-gray-800' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>
    </section>
  )
}

export default News