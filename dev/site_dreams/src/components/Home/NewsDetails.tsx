import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";

const NewsDetails: React.FC = () => {
  const { id } = useParams();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [news, setNews] = useState<any>(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        let res = await fetch(`${API_BASE}/api/news/get/${id}`);
        let data = await res.json();

        if (data && !data.error) {
          setNews(data);
          return;
        }

        res = await fetch(`${API_BASE}/api/newspays/get/${id}`);
        data = await res.json();

        if (data && !data.error) {
          setNews(data);
          return;
        }

        setNews(null);
      } catch (err) {
        console.error(err);
      }
    };

    fetchNews();
  }, [id]);

  if (!news) return <p className="text-center mt-20">Chargement...</p>;

  const title = news.title || news.titre;

  return (
    <div className="max-w-5xl mx-auto px-8 lg:px-12 py-20">

      <div className="relative w-full h-96 rounded-3xl overflow-hidden shadow-xl mb-6">
        <img
          src={`${API_BASE}${news.image}`}
          alt={news.title}
          className="w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/10"></div>

        <h1 className="absolute bottom-4 left-6 right-6 text-4xl md:text-5xl font-bold text-white drop-shadow-xl">
          {title}
        </h1>
      </div>

      <p className="text-lg md:text-xl text-gray-600 mb-10">
        {news.date}
      </p>
    
      <p className="text-2xl leading-relaxed text-gray-700 whitespace-pre-line">
        {news.description}
      </p>

    </div>
  );
};

export default NewsDetails;