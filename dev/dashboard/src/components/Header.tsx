const Header = ({ onMenuClick }: { onMenuClick: () => void }) => {
  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
      <div className="flex items-center gap-4">
        <button
          className="md:hidden text-gray-600 hover:text-gray-800"
          onClick={onMenuClick}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <h1 className="text-2xl font-bold text-yellow-500 bg-clip-text text-transparent">
          Tableau de bord DREAMS
        </h1>
      </div>
      <div className="flex items-center gap-4">
        <a
          href="http://51.255.197.47"
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-2 text-sm font-medium text-white bg-yellow-500 rounded-md shadow hover:opacity-90 transition"
        >
          Voir le site
        </a>
        {/* <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-yellow-500 to-[#93720a] flex items-center justify-center text-white font-bold shadow-md">
            A
          </div>
          <div className="hidden sm:block">
            <p className="text-sm font-semibold text-gray-800">Admin</p>
            <p className="text-xs text-gray-500">Administrateur</p>
          </div>
        </div> */}
      </div>
    </header>
  );
};

export default Header;