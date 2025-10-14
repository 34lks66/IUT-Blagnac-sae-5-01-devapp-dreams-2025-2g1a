import { useRef, useState } from "react";
import { paths } from "../../data/paths";
import FR from "../../assets/map_image/FR.png";
import BF from "../../assets/map_image/BF.png";
import CI from "../../assets/map_image/CI.png";
import IT from "../../assets/map_image/IT.png";
import TG from "../../assets/map_image/TG.png";

type WorldMapProps = {
    paysDreams?: string[];
};

const detailCountry = [
  { country_code : "FR", pays: "France", description: "hello world", href: '/pays/', img: FR},
  { country_code : "BF", pays: "Burkina Faso", description: "hello world", href: '/pays/', img: BF },
  { country_code : "TG", pays: "Togo", description: "hello world", href: '/pays/', img: TG },
  { country_code : "CI", pays: "Côte d'ivoire", description: "hello world", href: '/pays/', img: CI },
  { country_code : "IT", pays: "Italie", description: "hello world", href: '/pays/', img: IT },
]

const Map: React.FC<WorldMapProps> = ({ paysDreams = []}) => {
    const [scale] = useState(4.5);
    const [translate, setTranslate] = useState({x: -1270, y: -640});
    const [isDragging, setIsDragging] = useState(false);
    const lastPos = useRef<{ x: number; y: number} | null >(null);
    const [hoveredCountry, setHoveredCountry] = useState<string | null>(null);
    const [popup, setPopup] = useState(false);
    // const [popupPosition, setPopupPosition] = useState<{ x: number; y: number}>({
    //   x: 0,
    //   y: 0,
    // })
    // const [popupCountry, setPopupCountry] = useState<string | null>(null);
    const [selectedCountry, setSelectedCountry] = useState<any>(null);

    // const handleWheel = (e: React.WheelEvent<SVGSVGElement>) => {
    //     e.preventDefault();
    //     const zoomIntensity = 0.1; 
    //     const newScale = e.deltaY < 0 ? scale * (1 + zoomIntensity) : scale * (1 - zoomIntensity);
    //     setScale(Math.min(Math.max(newScale, 0.5), 8));
    // };

    const handleMouseDown = (e: React.MouseEvent) => {
        setIsDragging(true);
        lastPos.current = {x: e.clientX, y: e.clientY};
    };

    const handleMouseUp = () => {
        setIsDragging(false);
        lastPos.current = null;
    }

    const handleMouseMove = (e: React.MouseEvent) => {
        if(!isDragging || !lastPos.current) return;
        const dx = e.clientX - lastPos.current.x;
        const dy = e.clientY - lastPos.current.y;
        setTranslate((prev) => ({x: prev.x + dx, y: prev.y + dy}));
        lastPos.current = { x: e.clientX, y: e.clientY};
    };

    // const handleCountryClick = (e: React.MouseEvent<SVGAElement, MouseEvent>, countryCode: string, isPaysDREAMS: boolean) => {
    //   if (!isPaysDREAMS) {
    //     setPopup(false);
    //     return;
    //   }

    //   const rect = (e.target as SVGAElement).getBoundingClientRect();
    //   const posX = rect.left + rect.width / 2;
    //   const posY = rect.top + rect.height / 2;

    //   setPopupPosition({ x: posX, y: posY});
    //   setPopup(true);
    //   setPopupCountry(countryCode)
    // };

    const handleCountryClick = (countryCode : string) => {
      const found = detailCountry.find((c) => c.country_code === countryCode);
      if(found) {
        setSelectedCountry(found);
        setPopup(true);
      } else {
        setPopup(false);
        setSelectedCountry(null);
      }
    };

    return (
        <div className="relative w-full h-[80vh]"> 
          <svg
            viewBox="0 0 800 600"
            width="100%"
            height="100%"
          //   onWheel={handleWheel}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
            style={{ cursor: isDragging ? "grabbing" : "grab", background: "#f9f9f9"}}
          >
            <g transform={`translate(${translate.x},${translate.y}) scale(${scale})`}>
                {paths.map((country) => {
                    const isPaysDREAMS = paysDreams.includes(country.code);
                    const isHovered = hoveredCountry === country.code;
                    return(
                        <path
                          key={country.code}
                          d={country.d}
                          fill={isPaysDREAMS ? "#93720a" : "#dadada"}
                          fillOpacity={isHovered ? "0.8 ":"1"}
                          stroke={isHovered ? "#222222" :"none"}
                          stroke-width={isHovered ? "0.1" : "0"}
                          strokeOpacity="1"
                          fill-rule="evenodd"
                          style={{ transition: "fill 0.3s" }}
                          className="country"
                          cursor="pointer"
                          onMouseEnter={() => setHoveredCountry(country.code)}
                          onMouseLeave={() => setHoveredCountry(null)}
                          // onClick={() => isPaysDREAMS ? setPopup(true) : setPopup(false)}
                          onClick={() => handleCountryClick(country.code)}
                        />
                    )
                })}
            </g>
          </svg>
          
          {popup && selectedCountry && (
            <div className="absolute z-[999] w-[300px] bg-white border border-gray-300 shadow-lg rounded-md transition-all" 
            // style={{
            // left: `${popupPosition.x + 10}px`,
            // top: `${popupPosition.y - 100}px`,
            // }} 
            style={{ left: "950px", top:"220px"}}>
              <img src={selectedCountry.img} id="img" className=" relative h-[150px] w-full border-b-[3px] border-[#93720a] bg-cover bg-center"/>
              <div className="popup-map-infos-close" onClick={() => setPopup(false)}>
                <strong className="absolute right-[3px] top-[3px] flex h-[25px] w-[25px] items-center justify-center rounded-full bg-[#93720a] text-white cursor-pointer text-sm font-bold">
                    x
                </strong>
              </div>

              <div className="text-center py-2">
                <h2 id="title" className="text-center py-2 text-[#93720a] font-semibold text-lg mb-2">{selectedCountry.pays}</h2>
                {/* <ul className="text-center list-none p-0 m-0 space-y-1">
                  <li id="nb" className="uppercase font-bold"><div className="inline font-bold text-[#93720a]" />{selectedCountry.description}</li>
                  {/* <li id="percent" className="upper font-bold"><div className="inline font-bold text-[#93720a]">10%</div>&nbsp;ababab</li>
                  <li id="help" className="upper font-bold"><div className="inline font-bold text-[#93720a]">47</div>&nbsp;ababab</li>
                </ul> */}
                <div className="mt-3">
                <a href={`${selectedCountry.href}`} id="btn" data-country="" className="mx-auto inline-block border text-[#93720a] border-[#93720a] px-4 py-1 rounded-md font-medium hover:bg-[rgb(220, 67, 54)] hover:text-white transition-colors">Voir la fiche</a>
                </div>
              </div>
            </div>
          )}
        </div>
    );
};

export default Map;