import doclogo from "../assets/documentlogo.svg";
import suivilogo from "../assets/suivilogo.svg";
import justicelogo from "../assets/justicelogo.svg";
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
                <div className="grid md:grid-cols-1 gap-15">

                    {/* Carte 1 */}
                    <div className="group relative bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-500 transform hover:-translate-y-1 border-l-4 border-b-4 border-red-500 overflow-hidden flex flex-col md:flex-row items-center mr-32 cursor-pointer">

                        <div className="absolute inset-0 bg-red-500 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-[cubic-bezier(0.65,0,0.35,1)] z-0"></div>

                        {/* Contenu texte */}
                        <div className="relative z-10 flex-1 transition-all duration-300 group-hover:text-white">
                            <h3 className="text-xl font-bold mb-3 text-gray-800 group-hover:text-white transition-colors duration-300">
                                Orientation dans les démarches
                            </h3>
                            <p className="text-gray-600 mb-4 leading-relaxed text-sm group-hover:text-white transition-colors duration-300">
                                Aide pour remplir les formulaires et comprendre les procédures
                                (asile, préfecture, CAF…).
                            </p>
                        </div>


                        <div className="relative z-10 flex items-center justify-center flex-1">
                            <img
                                src={doclogo}
                                alt="Icône de documents"
                                className="w-32 h-32 md:w-44 md:h-44 transition-all duration-500 group-hover:translate-x-20 group-hover:opacity-0 group-hover:scale-75"
                            />
                        </div>

                    </div>


                    {/* Carte 2 */}
                    <div className="group relative bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-500 transform hover:-translate-y-1 border-r-4 border-b-4 border-purple-500 overflow-hidden flex flex-col md:flex-row items-center ml-32 cursor-pointer">

                        <div className="absolute inset-0 bg-purple-500 transform translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-[cubic-bezier(0.65,0,0.35,1)] z-0"></div>

                        <div className="relative z-10 flex items-center justify-center flex-1">
                            <img
                                src={justicelogo}
                                alt="Icône juridique"
                                className="w-32 h-32 md:w-44 md:h-44 transition-all duration-500 group-hover:-translate-x-20 group-hover:opacity-0 group-hover:scale-75"
                            />
                        </div>

                        {/* Contenu texte */}
                        <div className="relative z-10 flex-1 transition-all duration-300 group-hover:text-white">
                            <h3 className="text-xl font-bold mb-3 text-gray-800 group-hover:text-white transition-colors duration-300">
                                Accompagnement juridique
                            </h3>
                            <p className="text-gray-600 mb-4 leading-relaxed text-sm group-hover:text-white transition-colors duration-300">
                                Informations sur les droits et aide à préparer des dossiers
                                (asile, régularisation, logement, emploi).
                            </p>
                        </div>

                    </div>


                    {/* Carte 3 */}
                    <div className="group relative bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-500 transform hover:-translate-y-1 border-l-4 border-b-4 border-blue-500 overflow-hidden flex flex-col md:flex-row items-center mr-32 cursor-pointer">

                        <div className="absolute inset-0 bg-blue-500 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-[cubic-bezier(0.65,0,0.35,1)] z-0"></div>

                        {/* Contenu texte */}
                        <div className="relative z-10 flex-1 transition-all duration-300 group-hover:text-white">
                            <h3 className="text-xl font-bold mb-3 text-gray-800 group-hover:text-white transition-colors duration-300">
                                Suivi personnalisé
                            </h3>
                            <p className="text-gray-600 mb-4 leading-relaxed text-sm group-hover:text-white transition-colors duration-300">
                                Accompagnement au cas par cas : suivi régulier selon les besoins
                                spécifiques de chaque personne.
                            </p>
                        </div>

                        <div className="relative z-10 flex items-center justify-center flex-1">
                            <img
                                src={suivilogo}
                                alt="Icône de suivi"
                                className="w-32 h-32 md:w-44 md:h-44 transition-all duration-500 group-hover:translate-x-20 group-hover:opacity-0 group-hover:scale-75"
                            />
                        </div>

                    </div>


                </div>
            </section>

            {/* Section Redirection vers formulaire */}
            <section className="text-center">
                <button
                    className="group relative item card rounded-xl text-center border-t-4 border-t-yellow-500 bg-white shadow-md px-3 md:px-5 xl:px-40 2xl:px-48 py-3 mb-2 overflow-hidden transition-all duration-400 hover:shadow-lg"
                    onClick={() => {
                        window.location.href = "/formulaire-aide";
                    }}
                >
                    <div className="absolute inset-0 bg-yellow-500 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-[cubic-bezier(0.65,0,0.35,1)] z-0"></div>
                    <div className="relative z-10">
                        <div className="title-content flex justify-start md:justify-center">
                            <span className="font-bold title font-title text-gray-800 group-hover:text-white transition-colors duration-300">
                                Besoin d’aide ?
                            </span>
                        </div>
                        <div className="btn-content flex justify-center md:justify-center mb-3 mt-3">
                            <span className="btn my-3 text-gray-600 group-hover:text-white transition-colors duration-300">
                                Remplissez notre formulaire d’accompagnement et un bénévole <span className="font-bold">DREAMS </span>
                                prendra contact avec vous rapidement.
                            </span>
                        </div>
                    </div>
                </button>
            </section>




        </main>
    );
}

export default Accompagnement;
