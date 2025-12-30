import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { paths } from "../../data/paths";
import FR from "../../assets/map_image/FR.png";
import BF from "../../assets/map_image/BF.png";
import CI from "../../assets/map_image/CI.png";
import TG from "../../assets/map_image/TG.png";

type WorldMapProps = {
    paysDreams?: string[];
};

const detailCountry = [
  { country_code: "FR", pays: "France", description: "Découvrez nos actions en France", href: '/pays/france', img: FR },
  { country_code: "BF", pays: "Burkina Faso", description: "Découvrez nos actions au Burkina Faso", href: '/pays/burkina-faso', img: BF },
  { country_code: "TG", pays: "Togo", description: "Découvrez nos actions au Togo", href: '/pays/togo', img: TG },
  { country_code: "CI", pays: "Côte d'Ivoire", description: "Découvrez nos actions en Côte d'Ivoire", href: '/pays/cote-ivoire', img: CI },
];

type Country = typeof detailCountry[number];

const Map: React.FC<WorldMapProps> = ({ paysDreams = [] }) => {
    const navigate = useNavigate();
    const [scale] = useState(4.5);
    const [translate, setTranslate] = useState({ x: -1270, y: -640 });
    const [isDragging, setIsDragging] = useState(false);
    const lastPos = useRef<{ x: number; y: number } | null>(null);
    const [hoveredCountry, setHoveredCountry] = useState<string | null>(null);
    const [popup, setPopup] = useState(false);
    const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);

    const handleMouseDown = (e: React.MouseEvent) => {
        setIsDragging(true);
        lastPos.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseUp = () => {
        setIsDragging(false);
        lastPos.current = null;
    }

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!isDragging || !lastPos.current) return;
        const dx = e.clientX - lastPos.current.x;
        const dy = e.clientY - lastPos.current.y;
        setTranslate((prev) => ({ x: prev.x + dx, y: prev.y + dy }));
        lastPos.current = { x: e.clientX, y: e.clientY };
    };

    const handleCountryClick = (countryCode: string) => {
        const found = detailCountry.find((c) => c.country_code === countryCode);
        if (found) {
            setSelectedCountry(found);
            setPopup(true);
        } else {
            setPopup(false);
            setSelectedCountry(null);
        }
    };

    const handleClick = (href: string) => {
        navigate(href);
    };

    return (
        <div className="relative w-full h-[70vh] bg-white">
            <svg
                viewBox="0 0 800 600"
                width="100%"
                height="100%"
                onMouseDown={handleMouseDown}
                onMouseUp={handleMouseUp}
                onMouseMove={handleMouseMove}
                style={{ 
                    cursor: isDragging ? "grabbing" : "grab", 
                    background: "#ffffff" 
                }}
            >
                <g transform={`translate(${translate.x},${translate.y}) scale(${scale})`}>
                    {paths.map((country) => {
                        const isPaysDREAMS = paysDreams.includes(country.code);
                        const isHovered = hoveredCountry === country.code;
                        return (
                            <path
                                key={country.code}
                                d={country.d}
                                fill={isPaysDREAMS ? "#1e40af" : "#e5e7eb"}
                                fillOpacity={isHovered ? "0.9" : "1"}
                                stroke={isHovered ? "#374151" : "#9ca3af"}
                                strokeWidth={isHovered ? "0.15" : "0.05"}
                                strokeOpacity="0.8"
                                fillRule="evenodd"
                                style={{ transition: "all 0.2s ease" }}
                                className="country"
                                cursor="pointer"
                                onMouseEnter={() => setHoveredCountry(country.code)}
                                onMouseLeave={() => setHoveredCountry(null)}
                                onClick={() => handleCountryClick(country.code)}
                            />
                        )
                    })}
                </g>
            </svg>

            {/* Popup sobre */}
            {popup && selectedCountry && (
                <div 
                    className="absolute z-50 w-80 bg-white border border-gray-200 shadow-xl rounded-lg overflow-hidden"
                    style={{ left: "50%", top: "50%", transform: "translate(-50%, -50%)" }}
                >
                    {/* En-tête */}
                    <div className="relative">
                        <img 
                            src={selectedCountry.img} 
                            alt={selectedCountry.pays}
                            className="w-full h-40 object-cover"
                        />
                        <button 
                            onClick={() => setPopup(false)}
                            className="absolute top-3 right-3 w-8 h-8 bg-white/90 hover:bg-white rounded-full flex items-center justify-center text-gray-600 hover:text-gray-800 transition-all duration-200 shadow-sm"
                        >
                            ×
                        </button>
                    </div>

                    {/* Contenu */}
                    <div className="p-6">
                        <h3 className="text-xl font-semibold text-gray-900 mb-2 text-center">
                            {selectedCountry.pays}
                        </h3>
                        <p className="text-gray-600 text-center mb-6">
                            {selectedCountry.description}
                        </p>
                        
                        <div className="flex justify-center">
                            <button 
                                onClick={() => handleClick(selectedCountry.href)}
                                className="bg-gray-900 hover:bg-gray-800 text-white px-6 py-2 rounded-md font-medium transition-colors duration-200"
                            >
                                Voir la fiche pays
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Légende discrète */}
            <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-4 border border-gray-200 shadow-sm">
                <div className="flex items-center space-x-4 text-sm">
                    <div className="flex items-center space-x-2">
                        <div className="w-4 h-4 bg-blue-800 rounded-sm"></div>
                        <span className="text-gray-700">Pays d'action</span>
                    </div>
                    <div className="flex items-center space-x-2">
                        <div className="w-4 h-4 bg-gray-300 rounded-sm"></div>
                        <span className="text-gray-700">Autres pays</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Map;