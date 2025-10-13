import doclogo from "../assets/documentlogo.svg";
import suivilogo from "../assets/suivilogo.svg";
import justicelogo from "../assets/justicelogo.svg";
import hero from "../assets/hero_section/accompagnement.png";

function Accompagnement() {
    return (
        <main className="bg-white text-gray-800 font-sans leading-relaxed">
            {/* ============ HERO SECTION ============ */}
            <section className="eval-hero relative overflow-hidden">
                <img
                    src={hero}
                    alt="Accompagnement administratif"
                    className="eval-hero__img w-full h-64 md:h-72 object-cover object-center"
                />
                <div className="eval-hero__content absolute inset-0 flex items-end">
                    <div className="eval-hero__card w-full max-w-6xl mx-auto mb-4 bg-white/95 rounded-2xl p-4 md:p-5 shadow-lg">
                        <div className=" text-gray-500 text-xs">
                            Accueil / Accompagnement administratif & juridique
                        </div>
                        <h1 className="text-3xl md:text-4xl font-extrabold mb-2 ">
                            Accompagnement <span className="text-yellow-500">administratif et juridique</span>
                        </h1>
                        <p className="text-gray-700">
                            Votre partenaire de confiance pour toutes vos démarches.
                        </p>
                    </div>
                </div>
            </section>

            {/* ============ INTRODUCTION SECTION ============ */}
            <section className="max-w-6xl mx-auto py-7 px-4">
                <div className="text-center">
                    <h2 className="text-2xl md:text-3xl font-extrabold mb-4">
                        Notre <span className="text-yellow-500 ">mission</span>
                    </h2>
                    <p className="text-gray-700 max-w-4xl mx-auto mb-6">
                        Arriver dans un nouveau pays peut être un vrai parcours du combattant :
                        papiers, droits, démarches… autant de sources de stress. Avec{" "}
                        <span className="font-bold">DREAMS</span>, personne n'est seul : nous
                        accompagnons chacun pas à pas pour faciliter ses démarches et retrouver
                        confiance et sécurité.
                    </p>
                </div>
            </section>

            {/* ============ SERVICES SECTION ============ */}
            <section className="max-w-6xl mx-auto  px-4">
                <div className="md:grid-cols-2 gap-8 items-center">
                    {/* Colonne texte */}
                    <div className="text-center">
                        <h2 className="text-2xl md:text-3xl font-extrabold mb-4 ">
                            Que <span className="text-yellow-500">proposons-nous ?</span>
                        </h2>
                    </div>

                </div>
            </section>

            {/* ============ SERVICES DETAILS ============ */}
            <section className="max-w-6xl mx-auto py-7 px-4">

                {/* Carte 1 - Orientation */}
                <div className="group relative bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-1 border-l-4 border-b-4 border-red-500 overflow-hidden flex flex-col md:flex-row items-center mb-8 cursor-pointer mr-32">
                    <div className="absolute inset-0 bg-red-500 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-[cubic-bezier(0.65,0,0.35,1)] z-0"></div>

                    <div className="relative z-10 flex-1 transition-all duration-300 group-hover:text-white">
                        <h3 className="text-xl font-bold mb-3 text-gray-800 group-hover:text-white transition-colors duration-300">
                            Orientation dans les démarches
                        </h3>
                        <p className="text-gray-600 mb-4 leading-relaxed text-sm group-hover:text-white transition-colors duration-300">
                            L’objectif est de faciliter l’accès aux droits : explication des étapes, aide à la lecture des documents, et orientation vers les services compétents si nécessaire.
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

                {/* Carte 2 - Juridique */}
                <div className="group relative bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-1 border-r-4 border-b-4 border-purple-500 overflow-hidden flex flex-col md:flex-row items-center mb-8 cursor-pointer ml-32">
                    <div className="absolute inset-0 bg-purple-500 transform translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-[cubic-bezier(0.65,0,0.35,1)] z-0"></div>

                    <div className="relative z-10 flex items-center justify-center flex-1">
                        <img
                            src={justicelogo}
                            alt="Icône juridique"
                            className="w-32 h-32 md:w-44 md:h-44 transition-all duration-500 group-hover:-translate-x-20 group-hover:opacity-0 group-hover:scale-75"
                        />
                    </div>

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

                {/* Carte 3 - Suivi */}
                <div className="group relative bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-1 border-l-4 border-b-4 border-blue-500 overflow-hidden flex flex-col md:flex-row items-center cursor-pointer mr-32">
                    <div className="absolute inset-0 bg-blue-500 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-[cubic-bezier(0.65,0,0.35,1)] z-0"></div>

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
            </section>

            {/* ============ DOMAINES D'INTERVENTION ============ */}
            <section className="max-w-6xl mx-auto py-7 px-4">
                <div className="text-center mb-8">
                    <h2 className="text-2xl md:text-3xl font-extrabold mb-4 ">
                        Nos domaines <span className="text-yellow-500">d'intervention</span>
                    </h2>


                    <p className="text-gray-700 max-w-3xl mx-auto">
                        Nous vous accompagnons dans toutes vos démarches auprès des principales institutions
                    </p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {/* OFII */}
                    <div className="border border-gray-200 rounded-xl p-4 bg-white text-center hover:shadow-lg transition-shadow duration-300">
                        <div className="w-12 h-12 mx-auto mb-3 bg-blue-100 rounded-full flex items-center justify-center">
                            <span className="text-blue-600 font-bold text-sm">OFII</span>
                        </div>
                        <h4 className="font-bold text-gray-800 text-sm">Office Français de l'Immigration et de l'Intégration</h4>
                    </div>

                    {/* OFPRA */}
                    <div className="border border-gray-200 rounded-xl p-4 bg-white text-center hover:shadow-lg transition-shadow duration-300">
                        <div className="w-12 h-12 mx-auto mb-3 bg-green-100 rounded-full flex items-center justify-center">
                            <span className="text-green-600 font-bold text-sm">OFPRA</span>
                        </div>
                        <h4 className="font-bold text-gray-800 text-sm">Office Français de Protection des Réfugiés et Apatrides</h4>
                    </div>

                    {/* CNDA */}
                    <div className="border border-gray-200 rounded-xl p-4 bg-white text-center hover:shadow-lg transition-shadow duration-300">
                        <div className="w-12 h-12 mx-auto mb-3 bg-purple-100 rounded-full flex items-center justify-center">
                            <span className="text-purple-600 font-bold text-sm">CNDA</span>
                        </div>
                        <h4 className="font-bold text-gray-800 text-sm">Cour Nationale du Droit d'Asile</h4>
                    </div>

                    {/* CAF */}
                    <div className="border border-gray-200 rounded-xl p-4 bg-white text-center hover:shadow-lg transition-shadow duration-300">
                        <div className="w-12 h-12 mx-auto mb-3 bg-red-100 rounded-full flex items-center justify-center">
                            <span className="text-red-600 font-bold text-sm">CAF</span>
                        </div>
                        <h4 className="font-bold text-gray-800 text-sm">Caisse d'Allocations Familiales</h4>
                    </div>

                    {/* SOLIDARIO */}
                    <div className="border border-gray-200 rounded-xl p-4 bg-white text-center hover:shadow-lg transition-shadow duration-300">
                        <div className="w-12 h-12 mx-auto mb-3 bg-yellow-100 rounded-full flex items-center justify-center">
                            <span className="text-yellow-600 font-bold text-sm">SOLIDARIO</span>
                        </div>
                        <h4 className="font-bold text-gray-800 text-sm">Partenariat Solidarité</h4>
                    </div>

                    {/* Recherche logement */}
                    <div className="border border-gray-200 rounded-xl p-4 bg-white text-center hover:shadow-lg transition-shadow duration-300">
                        <div className="w-12 h-12 mx-auto mb-3 bg-indigo-100 rounded-full flex items-center justify-center">
                            <span className="text-indigo-600 text-lg">🏠</span>
                        </div>
                        <h4 className="font-bold text-gray-800 text-sm">Recherche de logement</h4>
                    </div>

                    {/* France Travail */}
                    <div className="border border-gray-200 rounded-xl p-4 bg-white text-center hover:shadow-lg transition-shadow duration-300">
                        <div className="w-12 h-12 mx-auto mb-3 bg-orange-100 rounded-full flex items-center justify-center">
                            <span className="text-orange-600 text-lg">💼</span>
                        </div>
                        <h4 className="font-bold text-gray-800 text-sm">France Travail</h4>
                    </div>

                    {/* Université */}
                    <div className="border border-gray-200 rounded-xl p-4 bg-white text-center hover:shadow-lg transition-shadow duration-300">
                        <div className="w-12 h-12 mx-auto mb-3 bg-cyan-100 rounded-full flex items-center justify-center">
                            <span className="text-cyan-600 text-lg">🎓</span>
                        </div>
                        <h4 className="font-bold text-gray-800 text-sm">Université & Formation</h4>
                    </div>
                </div>
            </section>


            {/* Section Redirection vers formulaire */}
            <section className="text-center max-w-6xl mx-auto py-7 px-4">
                <button
                    className="group relative item card rounded-xl text-center border-t-4 border-t-yellow-500 bg-white shadow-md px-5 py-3 mb-2 overflow-hidden transition-all duration-400 hover:shadow-lg"
                    onClick={() => {
                        window.location.href = "/formulaire-aide";
                    }}
                >
                    <div className="absolute inset-0 bg-yellow-500 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-[cubic-bezier(0.65,0,0.35,1)] z-0"></div>
                    <div className="relative z-10">
                        <div className="title-content flex justify-center">
                            <span className="font-bold title font-title text-gray-800 group-hover:text-white transition-colors duration-300">
                                Besoin d’aide ?
                            </span>
                        </div>
                        <div className="btn-content flex justify-center mb-3 mt-3">
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