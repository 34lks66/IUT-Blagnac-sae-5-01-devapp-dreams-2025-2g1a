import { useState } from "react";

export default function CookieBanner() {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <div
      style={{
        position: "fixed",
        bottom: "0",
        left: "0",
        width: "100%",
        padding: "16px",
        background: "#222",
        color: "#fff",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        zIndex: 9999,
      }}
    >
      <span>
        Ce site utilise des cookies pour améliorer votre expérience.  
        C’est juste un exemple, aucun cookie n’est réellement géré.
      </span>

      <button
        onClick={() => setVisible(false)}
        style={{
          marginLeft: "20px",
          padding: "8px 16px",
          background: "#4caf50",
          border: "none",
          color: "white",
          cursor: "pointer",
        }}
      >
        OK
      </button>
    </div>
  );
}
