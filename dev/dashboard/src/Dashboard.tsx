import { useState } from "react";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Content from "./components/Content";
import { AuthProvider } from "./components/context/AuthContext";
import { useAuth } from "./components/utils/useAuth";

const DashboardContent = () => {
  const [activeTab, setActiveTab] = useState("beneficiaires");
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const { loading } = useAuth();

  if (loading) {
    return (
      <div className="w-full h-screen flex items-center justify-center text-gray-500">
        Chargement de votre session...
      </div>
    );
  }

  return (
    <div className="flex h-screen overflow-hidden bg-gray-100">
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isMobileOpen={isMobileOpen}
        setIsMobileOpen={setIsMobileOpen}
      />
      <div className="flex-1 flex flex-col overflow-hidden">
        {activeTab === "dashboard" && (
          <Header onMenuClick={() => setIsMobileOpen(true)} />
        )}
        {!loading && <Content activeTab={activeTab} />}
      </div>
    </div>
  );
};

export default function Dashboard() {
  return (

    <DashboardContent />

  );
}
