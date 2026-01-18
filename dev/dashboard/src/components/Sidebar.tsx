import { useState } from "react";
import logoDreams from "../../../site_dreams/src/assets/logo.png";
import { useAuth } from "./utils/useAuth";
import { apiFetch } from "../services/api";

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isMobileOpen: boolean;
  setIsMobileOpen: (open: boolean) => void;
}

async function logout() {
  try {
    const response = await apiFetch("/api/logout", {
      method: "POST",
    });

    if (response.ok) {
      window.location.href = "/login";
    }
  } catch (error) {
    console.error("Erreur lors de la déconnexion", error);
  }
}

const Sidebar = ({
  activeTab,
  setActiveTab,
  isMobileOpen,
  setIsMobileOpen,
}: SidebarProps) => {
  const { role } = useAuth();
  const [expandedMenus, setExpandedMenus] = useState<string[]>([]);

  const toggleMenu = (id: string) => {
    setExpandedMenus((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  interface MenuItem {
    id: string;
    label: string;
    icon: React.ReactNode;
    subItems?: MenuItem[];
  }

  const menuItems: MenuItem[] = [
    {
      id: "settings",
      label: "Paramètres",
      icon: (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
      ),
    },
    {
        id: "outilgestion",
        label: "Outil de gestion",
        icon: (
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
            />
          </svg>
        ),
      },
  ];

  if (role !== "O") {
    menuItems.splice(
      0,
      0,
      {
        id: "beneficiaires",
        label: "Bénéficiaires",
        icon: (
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
        ),
      },
      {
        id: "dashboard",
        label: "Tableau de bord",
        icon: (
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
            />
          </svg>
        ),
      },
      {
        id: "home_group",
        label: "Page d'accueil",
        icon: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-5 h-5"
          >
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
            <polyline points="9 22 9 12 15 12 15 22"></polyline>
          </svg>
        ),
        subItems: [
          {
            id: "accueil",
            label: "Actualités",
            icon: (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-5 h-5"
              >
                <path d="M15 18h-5" />
                <path d="M18 14h-8" />
                <path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-4 0v-9a2 2 0 0 1 2-2h2" />
                <rect width="8" height="4" x="10" y="6" rx="1" />
              </svg>
            ),
          },
          {
            id: "projects",
            label: "Projets",
            icon: (
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                />
              </svg>
            ),
          },
        ]
      },
      {
        id: "agenda",
        label: "Agenda",
        icon: (
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <rect
              x="3"
              y="4"
              width="18"
              height="18"
              rx="2"
              ry="2"
              strokeWidth={2}
            />
            <path
              d="M16 2v4M8 2v4"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        ),
      },
      {
        id: "pages",
        label: "Pages Pays",
        icon: (
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
        ),
      },
      {
        id: "pages_antennes",
        label: "Pages Antennes",
        icon: (
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
        ),
      },
      {
        id: "users",
        label: "Utilisateurs",
        icon: (
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
            />
          </svg>
        ),
      },
    );
  }

  return (
    <>
      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}
      {/* Sidebar */}
      <aside
        className={`
        fixed md:static inset-y-0 left-0 z-50
        w-64
        transform transition-transform duration-300 ease-in-out
        ${isMobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
      `}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-6 border-b border-white/20">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-14">
                <div>
                  <h2 className="text-2xl font-bold">DREAMS</h2>
                  <p className="text-xs text-black/80 mt-1">Admin Dashboard</p>
                </div>
                <img
                  src={logoDreams}
                  alt="logo DREAMS"
                  className="h-20 w-auto"
                />
              </div>
              <button
                className="md:hidden text-black hover:text-yellow-100 transition-colors"
                onClick={() => setIsMobileOpen(false)}
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>
          {/* Navigation */}
          <nav className="flex-1 p-4 overflow-y-auto">
            <ul className="space-y-1">
              {menuItems.map((item) => (
                <li key={item.id}>
                  {item.subItems ? (
                    <div>
                      <button
                        onClick={() => toggleMenu(item.id)}
                        className={`
                          w-full text-left px-4 py-3 rounded-lg transition-all duration-200
                          flex items-center justify-between font-medium text-sm
                          hover:bg-white/10 text-black/90
                        `}
                      >
                        <div className="flex items-center gap-3">
                          {item.icon}
                          <span>{item.label}</span>
                        </div>
                        <svg
                          className={`w-4 h-4 transition-transform ${expandedMenus.includes(item.id) ? "rotate-180" : ""
                            }`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                      {expandedMenus.includes(item.id) && (
                        <ul className="pl-6 mt-1 space-y-1 bg-white/5 rounded-lg">
                          {item.subItems.map((subItem) => (
                            <li key={subItem.id}>
                              <button
                                onClick={() => {
                                  setActiveTab(subItem.id);
                                  setIsMobileOpen(false);
                                }}
                                className={`
                                   w-full text-left px-4 py-2 rounded-lg transition-all duration-200
                                   flex items-center gap-3 font-medium text-sm
                                   ${activeTab === subItem.id
                                    ? "bg-white text-[#93720a] shadow-lg"
                                    : "hover:bg-white/10 text-black/80"
                                  }
                                 `}
                              >
                                {subItem.icon}
                                <span>{subItem.label}</span>
                              </button>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ) : (
                    <button
                      onClick={() => {
                        setActiveTab(item.id);
                        setIsMobileOpen(false);
                      }}
                      className={`
                        w-full text-left px-4 py-3 rounded-lg transition-all duration-200
                        flex items-center gap-3 font-medium text-sm
                        ${activeTab === item.id
                          ? "bg-white text-[#93720a] shadow-lg"
                          : "hover:bg-white/10 text-black/90"
                        }
                      `}
                    >
                      {item.icon}
                      <span>{item.label}</span>
                    </button>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-white/20">
            <button
              className="w-full px-4 py-3 bg-white/10 hover:bg-white/20 rounded-lg transition-colors flex items-center gap-3 font-medium text-sm"
              onClick={logout}
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                />
              </svg>
              <span>Déconnexion</span>
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
