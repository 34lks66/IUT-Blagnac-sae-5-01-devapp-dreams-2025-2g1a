import { useRef, useState } from "react";
import { paths } from "../../data/paths";

type WorldMapProps = {
    paysDreams?: string[];
};

const Map: React.FC<WorldMapProps> = ({ paysDreams = []}) => {
    const [scale] = useState(4.5);
    const [translate, setTranslate] = useState({x: -1270, y: -640});
    const [isDragging, setIsDragging] = useState(false);
    const lastPos = useRef<{ x: number; y: number} | null >(null);

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

    return (
        <div style={{ width: "100%", height: "80vh" }}> 
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
                    return(
                        <path
                          key={country.code}
                          d={country.d}
                          fill={isPaysDREAMS ? "#93720a" : "#dadada"}
                          fillOpacity="1"
                          stroke="none"
                          stroke-width="0"
                          strokeOpacity="1"
                          fill-rule="evenodd"
                          style={{ transition: "fill 0.3s" }}
                          className="country"
                          cursor="pointer"
                        />
                    )
                })}
            </g>
        </svg>
        </div>
    );
};

export default Map;