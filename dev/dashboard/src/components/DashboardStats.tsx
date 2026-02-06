// components/DashboardStats.jsx
import { useState, useEffect } from "react";

import { apiFetch } from "../services/api";

type Antenne = {
  _id: string;
  nom: string;
  description: string;
  image: string;
};

type Account = {
  _id: string;
  nom: string;
  connexion: Date;
};

type Event = {
  id: number;
  titre: string;
  date: string;
  starttime: string;
  endtime: string;
  location: string;
  description: string;
  antenna: string;
};

type Project = {
  id: number;
  titre: string;
  description: string;
  pays: string
}

const DashboardStats = () => {
  const [antennes, setAntennes] = useState<Antenne[]>([]);
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [activeView, setActiveView] = useState<
    "overview" | "antennes" | "membres" | "evenements"
  >("overview");

  const getAccounts = () => {
    apiFetch("/api/accounts/")
      .then((res) => res.json())
      .then((data) => setAccounts(data))
      .catch((err) => console.error("Erreur comptes:", err));
  };

  const getEvents = () => {
    apiFetch("/api/event/get/")
      .then((res) => res.json())
      .then((data) => setEvents(data))
      .catch((err) => console.error("Erreur comptes:", err));
  };

  const getProjects = () => {
    apiFetch("/api/project/get/")
      .then((res) => res.json())
      .then((data) => setProjects(data))
      .catch((err) => console.error("Erreur comptes:", err));
  };

  const getAntennes = () => {
    apiFetch("/api/antenne/get")
      .then((res) => res.json())
      .then((data) => setAntennes(data))
      .catch((err) => console.error("Erreur antennes:", err));
  };

  useEffect(() => {
    getAntennes();
    getAccounts();
    getEvents();
    getProjects();
  }, []);

  // Statistiques principales avec données réelles
  const mainStats = [
    {
      title: "Utilisateurs",
      value: accounts.length.toString(),
      isPositive: true,
      icon: (
        <svg
          className="w-6 h-6 text-blue-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
          />
        </svg>
      ),
    },
    {
      title: "Antennes actives",
      value: antennes.length.toString(),
      isPositive: true,
      icon: (
        <svg
          className="w-6 h-6 text-green-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
          />
        </svg>
      ),
    },
    {
      title: "Événements à venir",
      value: events.length.toString(),
      isPositive: true,
      icon: (
        <svg
          className="w-6 h-6 text-purple-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
      ),
    },
    {
      title: "Projets en cours",
      value: projects.length.toString(),
      isPositive: true,
      icon: (
        <svg
          className="w-6 h-6 text-yellow-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 7a2 2 0 012-2h4l2 2h8a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V7z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 13l2 2 4-4"
          />
        </svg>
      ),
    },
  ];

  // Navigation tabs
  const NavigationTabs = () => (
    <div className="flex space-x-1 bg-gray-100 p-1 rounded-2xl">
      {[
        { id: "overview", label: "Vue générale" },
        { id: "antennes", label: `Antennes (${antennes.length})` },
        { id: "membres", label: `Membres (${accounts.length})` },
        { id: "evenements", label: `Evenements (${events.length})` },
      ].map((tab) => (
        <button
          key={tab.id}
          onClick={() => setActiveView(tab.id as any)}
          className={`flex items-center space-x-2 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
            activeView === tab.id
              ? "bg-white text-gray-900 shadow-sm"
              : "text-gray-600 hover:text-gray-900"
          }`}
        >
          <span>{tab.label}</span>
        </button>
      ))}
    </div>
  );

  // Vue compacte des antennes
  const AntennesView = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {antennes.map((antenne) => (
        <div
          key={antenne._id}
          className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 group"
        >
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center space-x-4">
              <div className="w-14 h-14 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <span className="text-white font-bold text-xl">
                  {antenne.nom.charAt(0)}
                </span>
              </div>
              <div>
                <h3 className="font-bold text-gray-900 text-lg">
                  {antenne.nom}
                </h3>
                <p className="text-gray-600 text-sm mt-1 line-clamp-2">
                  {antenne.description}
                </p>
              </div>
            </div>
          </div>
          <div className="mt-4">
            {/* Bouton Voir Détails */}
          </div>
        </div>
      ))}
    </div>
  );

  // Vue compacte des membres
  const MembresView = () => (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
      <div className="p-6 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900">
          {accounts.length} Membres
        </h3>
      </div>
      <div className="divide-y divide-gray-100">
        {accounts.slice(0, 8).map((account) => (
          <div
            key={account._id}
            className="p-4 hover:bg-gray-50 transition-colors duration-150"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-teal-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-sm">
                    {account.nom.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">{account.nom}</h4>
                  <p className="text-sm text-gray-600">Membre actif</p>
                </div>
              </div>
              <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                Membre
              </span>
            </div>
          </div>
        ))}
      </div>
      {accounts.length > 8 && (
        <div className="p-4 border-t border-gray-200">
          <button className="w-full text-center text-blue-600 hover:text-blue-700 font-medium text-sm">
            Voir tous les {accounts.length} membres
          </button>
        </div>
      )}
    </div>
  );

  // Vue compacte des événements
  const EvenementsView = () => (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
      <div className="p-6 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900">
          Événements à venir
        </h3>
      </div>
      <div className="divide-y divide-gray-100">
        {events.map((event) => (
          <div
            key={event.id}
            className="p-4 hover:bg-gray-50 transition-colors duration-150"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h4 className="font-medium text-gray-900 mb-1">
                  {event.titre}
                </h4>
                <div className="flex items-center space-x-4 text-sm text-gray-600">
                  <span className="flex items-center">
                    <svg
                      className="w-4 h-4 mr-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                    </svg>
                    {event.location}
                  </span>
                  <span className="flex items-center">
                    <svg
                      className="w-4 h-4 mr-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    {event.date}
                  </span>
                  <span className="flex items-center">
                    <svg
                      className="w-4 h-4 mr-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
                      />
                    </svg>
                    Antenne : {event.antenna}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // Vue d'ensemble
  const OverviewView = () => (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Aperçu des antennes */}
      <div className="lg:col-span-2">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">
            Antennes récentes
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {antennes.slice(0, 6).map((antenne) => (
            <div
              key={antenne._id}
              className="bg-white rounded-xl p-4 shadow-sm border border-gray-100"
            >
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                  <span className="text-white font-bold">
                    {antenne.nom.charAt(0)}
                  </span>
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">{antenne.nom}</h3>
                  <p className="text-sm text-gray-600 line-clamp-1">
                    {antenne.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Activités récentes */}
      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Activités récentes
        </h2>
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
          <div className="p-6 space-y-4">
            {accounts.filter((account) => account.connexion !== null && account.connexion !== undefined).slice(0, 5).map((account) => (
              <div key={account._id} className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">
                    {account.nom} s'est connecté
                  </p>
                  <span className="text-xs text-gray-500">
                    le{" "}
                    {new Date(account.connexion).toLocaleDateString("fr-FR", {
                      day: "2-digit",
                      month: "long",
                    })}{" "}
                    à{" "}
                    {new Date(account.connexion).toLocaleTimeString("fr-FR", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* En-tête avec navigation */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Tableau de bord</h1>
          <p className="text-gray-600 mt-1">
            Gérez votre réseau d'antennes et membres
          </p>
        </div>
        <NavigationTabs />
      </div>

      {/* Statistiques principales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {mainStats.map((stat, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition duration-200"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  {stat.title}
                </p>
                <p className="text-2xl font-bold text-gray-900 mt-1">
                  {stat.value}
                </p>
                <span className="text-sm font-medium">{stat.change}</span>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg">{stat.icon}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Contenu principal selon la vue active */}
      <div className="min-h-[400px]">
        {activeView === "overview" && <OverviewView />}
        {activeView === "antennes" && <AntennesView />}
        {activeView === "membres" && <MembresView />}
        {activeView === "evenements" && <EvenementsView />}
      </div>
    </div>
  );
};

export default DashboardStats;
