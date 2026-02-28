import { Link } from "react-router-dom";

function NotFound() {
    return (
        <main className="flex-grow flex items-center justify-center py-16 px-4" style={{ minHeight: "70vh" }}>
            <div style={{ maxWidth: "800px", width: "100%", textAlign: "center" }}>
                {/* Illustration animée */}
                <div style={{ marginBottom: "48px", display: "flex", justifyContent: "center" }}>
                    <div className="notfound-float" style={{ position: "relative", width: "320px", height: "320px" }}>
                        {/* Forme abstraite en fond */}
                        <svg
                            style={{ width: "100%", height: "100%", color: "#eab308", opacity: 0.1, position: "absolute", inset: 0 }}
                            viewBox="0 0 200 200"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M44.7,-76.4C58.1,-69.2,69.2,-58.1,77.3,-44.7C85.4,-31.3,90.4,-15.7,89.7,-0.4C89.1,14.9,82.8,29.8,74,43C65.2,56.2,53.8,67.7,40.4,75.2C27,82.7,11.5,86.2,-3.2,91.8C-17.9,97.3,-35.8,104.9,-51.2,100.8C-66.6,96.6,-79.6,80.7,-87.3,63.5C-95,46.3,-97.5,27.8,-96,10.2C-94.6,-7.4,-89.2,-24.1,-80.4,-39.2C-71.5,-54.3,-59.1,-67.7,-44.3,-74.2C-29.6,-80.7,-14.8,-80.3,0.8,-81.7C16.4,-83.1,31.3,-83.5,44.7,-76.4Z"
                                fill="currentColor"
                                transform="translate(100 100)"
                            />
                        </svg>
                        <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                            <span style={{ fontSize: "160px", lineHeight: 1, fontWeight: 900, color: "#eab308", letterSpacing: "-0.05em", opacity: 0.2 }}>
                                404
                            </span>
                            <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                                <svg
                                    style={{ width: "128px", height: "128px", color: "#eab308" }}
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="1.5"
                                    />
                                    <path
                                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="1.5"
                                    />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Message d'erreur */}
                <div>
                    <h2 style={{ fontSize: "2.25rem", fontWeight: 800, color: "#111827", marginBottom: "16px" }}>
                        Oups ! Cette page semble s'être égarée.
                    </h2>
                    <p style={{ fontSize: "1.125rem", color: "#4b5563", marginBottom: "40px", maxWidth: "512px", marginLeft: "auto", marginRight: "auto", lineHeight: 1.75 }}>
                        Il semblerait que le chemin que vous cherchez ne soit pas encore
                        tracé. Ne vous inquiétez pas, nos racines sont solides et vous
                        pouvez facilement retrouver votre route.
                    </p>
                    <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "center", gap: "16px" }}>
                        <Link
                            to="/"
                            style={{
                                display: "inline-flex",
                                alignItems: "center",
                                padding: "16px 32px",
                                backgroundColor: "#eab308",
                                color: "white",
                                fontWeight: 700,
                                borderRadius: "8px",
                                textDecoration: "none",
                                boxShadow: "0 10px 15px -3px rgba(234, 179, 8, 0.3)",
                                transition: "all 0.2s",
                            }}
                            onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "#ea580c"; }}
                            onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "#eab308"; }}
                        >
                            <svg
                                style={{ width: "20px", height: "20px", marginRight: "8px" }}
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    d="M10 19l-7-7m0 0l7-7m-7 7h18"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                />
                            </svg>
                            Retourner à l'accueil
                        </Link>
                        <Link
                            to="/contact"
                            style={{
                                display: "inline-flex",
                                alignItems: "center",
                                padding: "16px 32px",
                                backgroundColor: "white",
                                border: "1px solid #e5e7eb",
                                color: "#374151",
                                fontWeight: 700,
                                borderRadius: "8px",
                                textDecoration: "none",
                                transition: "all 0.2s",
                            }}
                            onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "#f9fafb"; }}
                            onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "white"; }}
                        >
                            Contactez-nous
                        </Link>
                    </div>
                </div>
            </div>

            <style>{`
        @keyframes notfound-float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        .notfound-float {
          animation: notfound-float 6s ease-in-out infinite;
        }
      `}</style>
        </main>
    );
}

export default NotFound;
