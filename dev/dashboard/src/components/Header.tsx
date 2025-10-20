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
        <h1 className="text-2xl font-bold bg-gradient-to-r from-yellow-500 to-[#93720a] bg-clip-text text-transparent">
          Tableau de bord DREAMS
        </h1>
      </div>
      <div className="flex items-center gap-4">
        <button className="text-gray-600 hover:text-gray-800 transition-colors">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
          </svg>
        </button>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-yellow-500 to-[#93720a] flex items-center justify-center text-white font-bold shadow-md">
            A
          </div>
          <div className="hidden sm:block">
            <p className="text-sm font-semibold text-gray-800">Admin</p>
            <p className="text-xs text-gray-500">Administrateur</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;