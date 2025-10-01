import doclogo from "../assets/documentlogo.svg";
import suivilogo from "../assets/suivilogo.svg";

function Accompagnement() {
    return (
        <main className="max-w-5xl mx-auto px-4">
            {/* Section Introduction / Accroche */}
            <section className="text-center">
                <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
                    Accompagnement{" "}
                    <span className="text-yellow-500">administratif et juridique</span>
                </h1>
                <p className="mb-6 text-gray-700 max-w-3xl mx-auto">
                    Arriver dans un nouveau pays peut être un vrai parcours du combattant :
                    papiers, droits, démarches… autant de sources de stress. Avec{" "}
                    <span className="font-bold">DREAMS</span>, personne n’est seul : nous
                    accompagnons chacun pas à pas pour faciliter ses démarches et retrouver
                    confiance et sécurité.
                </p>
            </section>

            {/* Section Que proposons-nous ? */}
            <section className="mb-1">
                <div className="grid md:grid-cols-1 gap-6">

                    {/* Carte 1 */}
                    <div className="relative bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border-l-4 border-b-4 border-red-500 overflow-hidden flex flex-col md:flex-row items-center">
                        <div className="relative z-10 flex-1">
                            <h3 className="text-xl font-bold mb-3 text-gray-800">Orientation dans les démarches</h3>
                            <p className="text-gray-600 mb-4 leading-relaxed text-sm">
                                Aide pour remplir les formulaires et comprendre les procédures
                                (asile, préfecture, CAF…).
                            </p>
                        </div>
                        {/* Image décorative */}
                        <div className="flex items-center justify-center flex-1">
                            <img src={doclogo} alt="Icône de documents" className="w-32 h-32 md:w-44 md:h-44" />
                        </div>
                    </div>






                    {/* Carte 1 */}
                    {/* <div className="bg-white p-6 shadow-lg rounded-xl hover:shadow-xl transition">
                        <h3 className="text-xl font-semibold mb-2 text-red-500">
                            Orientation dans les démarches
                        </h3>
                        <p className="text-gray-600">
                            Aide pour remplir les formulaires et comprendre les procédures
                            (asile, préfecture, CAF…).
                        </p>
                    </div> */}

                    {/* Carte 2 */}
                    <div className="bg-white p-6 shadow-lg rounded-xl hover:shadow-xl transition">
                        <h3 className="text-xl font-semibold mb-2 text-red-500">
                            Accompagnement juridique
                        </h3>
                        <p className="text-gray-600">
                            Informations sur les droits et aide à préparer des dossiers
                            (asile, régularisation, logement, emploi).
                        </p>
                    </div>

                    {/* Carte 3 */}
                    <div className="relative bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border-l-4 border-b-4 border-blue-500 overflow-hidden flex flex-col md:flex-row items-center">
                        <div className="relative z-10 flex-1">
                            <h3 className="text-xl font-bold mb-3 text-gray-800">Suivi personnalisé</h3>
                            <p className="text-gray-600 mb-4 leading-relaxed text-sm">
                                Accompagnement au cas par cas : suivi régulier selon les besoins
                            spécifiques de chaque personne.
                            </p>
                        </div>
                        {/* Image décorative */}
                        <div className="flex items-center justify-center flex-1">
                            <img src={suivilogo} alt="Icône de suivi" className="w-32 h-32 md:w-44 md:h-44" />
                        </div>
                    </div>

                    
                </div>
            </section>

            {/* Section Redirection vers formulaire */}
            <section className="text-center">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
                    Besoin d’aide ?
                </h2>
                <p className="text-gray-600 mb-6">
                    Remplissez notre formulaire d’accompagnement et un bénévole DREAMS
                    prendra contact avec vous rapidement.
                </p>
                <a
                    href="/formulaire-aide"
                    className="inline-block px-6 py-3 rounded-lg bg-red-600 text-white font-semibold hover:bg-red-700 transition"
                >
                    Remplir le formulaire
                </a>
            </section>


        </main>
    );
}

export default Accompagnement;
