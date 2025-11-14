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

                    { item.link ? (
                      <a href={item.link} className="text-yellow-600 font-semibold hover:text-yellow-700 transition-colors flex items-center">
                        Lire plus
                        <span className="ml-1 text-lg">→</span>
                      </a>
                    ) : (
                      <button className="text-yellow-600 font-semibold hover:text-yellow-700 transition-colors flex items-center">
                        Lire plus
                      <span className="ml-1 text-lg">→</span>
                      </button>
                    )}
                    {item && (
                      <div id="static-modal" data-modal-backdrop="static" aria-hidden="true" className="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
                        <div className="relative p-4 w-full max-w-2xl max-h-full">
                          <div className="relative bg-white rounded-lg shadow-sm dark:bg-gray-700">
                            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 border-gray-200">
                              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                                {item.title}
                              </h3>
                              <button type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="static-modal">
                                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                                </svg>
                                <span className="sr-only">Close modal</span>
                              </button>
                            </div>
                            <div className="p-4 md:p-5 space-y-4">
                              <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
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
        </div>
    </section>
  )
}

export default News

