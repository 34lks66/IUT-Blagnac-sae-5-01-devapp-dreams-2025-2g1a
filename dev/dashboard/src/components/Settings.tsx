const Settings = () => {
    
   
    return(
        <div className="bg-white rounded-xl p-12 shadow-md text-center">
        <div className="max-w-md mx-auto">
            <div className="w-16 h-16 bg-yellow-500 rounded-xl mx-auto mb-4 flex items-center justify-center">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
            </div>
            <h2 className="text-2xl font-bold mb-3 bg-yellow-500 bg-clip-text text-transparent">
            Settings
            </h2>
            <p className="text-gray-600 mb-6">Paramètres</p>
            <span className="inline-block px-6 py-2 bg-gray-100 text-gray-600 rounded-lg font-medium text-sm">
            Fonctionnalité à venir
            </span>
        </div>
        </div>
    )
};

  export default Settings;