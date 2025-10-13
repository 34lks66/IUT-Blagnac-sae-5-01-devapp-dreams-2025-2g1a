import "../styles/sensibilisation.css"
import none from "../assets/none.jpg";
import hero from "../assets/hero_section/sensibilisation.png";

const LGBTQ = [
    { letter: 'L', word: 'Lesbiennes', color: 'text-[#fb2c36]' },
    { letter: 'G', word: 'Gays', color: 'text-[#ff6900]' },
    { letter: 'B', word: 'Bisexuels', color: 'text-[#fdc700]' },
    { letter: 'T', word: 'Transgenres', color: 'text-[#00b148]' },
    { letter: 'Q', word: 'Queers', color: 'text-[#2b7fff]' },
    { letter: '+', word: 'Autres', color: 'text-gray-500' },
]
function Sensibilisation() {

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
                        Accueil / Sensibilisations des minorités sexuelles
                    </div>
                    <h1 className="text-3xl md:text-4xl font-extrabold mb-2 bg-gradient-to-r from-yellow-500 to-[#93720a] bg-clip-text text-transparent">
                        Sensibilisations des minorités sexuelles
                    </h1>
                    <p className="text-gray-700">
                        ABABABA
                    </p>
                </div>
            </div>
        </section>

        {/* ============ INTRODUCTION SECTION ============ */}
            <section className="bg-[#f4f1ea]">
                <div className="max-w-6xl mx-auto py-7">
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6 text-center">
                            Qui sont{" "}
                            <span className="text-yellow-500">les minorités sexuelles ?</span>
                    </h1>
                    <p className="text-gray-700 max-w-4xl mx-auto mb-6 text-center">
                        Une minorité sexuelle et de genre est un groupe social dont l’identité de genre, l’identité sexuelle, l’orientation ou les pratiques sexuelles diffèrent de la majorité du reste de la société
                    </p>
                    <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-6 gap-4 text-center">
                        {LGBTQ.map((item, index) => (
                            <div
                            key={index}
                            className="mb-8 md:mb-6"
                            >
                            <div className={`text-4xl font-bold ${item.color} mb-6`}>{item.letter}</div>
                            <div className={`text-3xl font-bold ${item.color}`}>{item.word}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ============ Impact et résultats ============ */}
            <section className="max-w-6xl m-auto py-7 px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-center">
                  <div>
                    <h2 className="font-black text-8xl leading-tight">4</h2>
                    <p className="font-semibold text-yellow-500 uppercase">Participation à la Gay Pride</p>
                  </div>
                  <div>
                    <h2 className="font-black text-8xl leading-tight">25</h2>
                    <p className="font-semibold text-yellow-500 uppercase">Soirées de convivialité</p>
                  </div>
                  <div>
                    <h2 className="font-black text-8xl leading-tight">8</h2>
                    <p className="font-semibold text-yellow-500 uppercase">Tenue de stands</p>
                  </div>
                  <div>
                    <h2 className="font-black text-8xl leading-tight">12</h2>
                    <p className="font-semibold text-yellow-500 uppercase">Interventions en structures</p>
                  </div>
                </div>
            </section>

            {/* ============ Actions de sensibilisation ============ */}
            <section className="bg-[#f5f7f6]">
                <div className="max-w-6xl mx-auto py-7 px-4">
                <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-8 text-center">
                        Actions de{" "}
                        <span className="text-yellow-500">sensibilisation</span>
                </h1>
                <p className="text-base text-gray-700 text-center mx-auto mb-10">Les actions de sensibilisation nous permettent de renforcer la {" "}
                    <span className="text-yellow-600 font-semibold">visibilité</span>, l'
                    <span className="text-yellow-600 font-semibold">éducation</span> et la{" "} 
                    <span className="text-yellow-600 font-semibold">cohésion</span> autour des enjeux LGBTQIA+. <br />Voici les actions de sensibilisation principales menées par DREAMS : </p>
                {/* ============ Participation à la Gay Pride ============ */}
                <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-12 items-center mb-20">
                    <div className="relative order-1 md:order-none">
                        <img src={none} alt="people" className="w-full h-64 md:h-80 object-cover rounded-lg shadow-md transition-all duration-300"/>
                    </div>
                    <div className="space-y-6">
                        <h3 className="text-3xl font-extrabold mb-6 text-gray-900">Participation à la Gay Pride</h3>
                        <p className="text-gray-700 mb-6 leading-relaxed border-l-4 border-yellow-500 pl-3">
                            Chaque année, DREAMS participe avec enthousiasme aux marches des fiertés locales et régionales.
                            Ces moments festifs et revendicatifs permettent de <b>rendre visibles les personnes LGBTQIA+, de promouvoir l’égalité des droits et de lutter contre les discriminations dans l’espace public.</b><br />
                            Au-delà de la parade, c’est aussi une célébration de la diversité et du vivre-ensemble, où chaque participant·e contribue à faire entendre la voix de la communauté. <br />
                            4 participations ont déjà permis à DREAMS de fédérer ses membres, renforcer ses liens avec d’autres associations, et sensibiliser des centaines de personnes à la cause LGBTQIA+.
                        </p>
                    </div>
                </div>
                {/* ============ Soirées de convivialité ============ */}
                <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-12 items-center mb-20">
                    <div className="space-y-6">
                        <h3 className="text-3xl font-extrabold mb-6 text-gray-900">Soirées de convivialité</h3>
                        <p className="text-gray-700 mb-6 leading-relaxed border-l-4 border-yellow-500 pl-3">
                            Les soirées de convivialité organisées par DREAMS sont des espaces chaleureux où se mêlent échanges, solidarité et bienveillance.
                            Elles offrent la possibilité aux membres de la communauté et à leurs allié·e·s de se retrouver, discuter, partager des expériences et rompre l’isolement que peuvent vivre certaines personnes LGBTQIA+. <br />
                            {/* Ces 25 soirées favorisent la création de liens durables, le soutien mutuel et la construction d’un réseau inclusif. */}
                            <b>Ces soirées favorisent le dialogue entre membres de la communauté et personnes alliées, la solidarité et le bien-être au sein de la communauté, tout en luttant contre l’isolement.</b><br />
                            Dans une ambiance simple et accueillante, elles contribuent à renforcer le sentiment d’appartenance à une communauté soudée et ouverte.
                        </p>
                    </div>
                    <div className="relative order-1 md:order-none">
                        <img src={none} alt="people" className="w-full h-80 object-cover rounded-lg shadow-md transition-all duration-300"/>
                    </div>
                </div>
                {/* ============ Tenue de stand ============ */}
                <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-12 items-center mb-20">
                    <div className="relative order-1 md:order-none">
                        <img src={none} alt="people" className="w-full h-80 object-cover rounded-lg shadow-md transition-all duration-300"/>
                    </div>
                    <div className="space-y-6">
                        <h3 className="text-3xl font-extrabold mb-6 text-gray-900">Tenue de stand</h3>
                        <p className="text-gray-700 mb-4 leading-relaxed border-l-4 border-yellow-500 pl-3">
                            Les bénévoles de DREAMS sont présents sur les
                            stands pour échanger et sensibiliser le public aux questions
                            LGBTQIA+. Ces moments permettent d’informer, d’orienter et de créer
                            un espace de dialogue bienveillant pour <b> sensibiliser directement le public et orienter les personnes en questionnement.</b>
                        </p>
                        <p className="text-gray-700 mb-3 font-medium">
                            Plusieurs outils pédagogiques sont également disponibles :
                        </p>
                        <ul className="list-disc list-inside text-gray-700 space-y-1">
                            <li>Jeux de sensibilisation</li>
                            <li>Brochures d’information</li>
                            <li>Matériel de prévention</li>
                            <li>Supports visuels et témoignages</li>
                            <li>Rencontres avec les bénévoles</li>
                        </ul>
                    </div>
                </div>
                {/* ============ Interventions dans les structures ============ */}
                <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-12 items-center mb-20">
                    <div className="space-y-6">
                        <h3 className="text-3xl font-extrabold mb-6 text-gray-900">Interventions dans les structures</h3>
                        <p className="text-gray-700 mb-4 leading-relaxed border-l-4 border-yellow-500 pl-3">
                            DREAMS intervient aussi dans les <b>écoles</b>, <b>entreprises</b>, <b>associations</b> et <b>institutions publiques</b> afin de sensibiliser aux questions d’orientation sexuelle et d’identité de genre.
                            Ces interventions visent à informer, déconstruire les préjugés et promouvoir des environnements inclusifs pour toutes et tous.
                            À travers des ateliers participatifs, des échanges et des témoignages, les intervenant·e·s de DREAMS contribuent à faire évoluer les mentalités et à prévenir toute forme de discrimination. <br />
                            {/* Plus de 12 interventions menées chaque année permettent de toucher plus de 300 personnes, du public scolaire aux professionnel·le·s. */}
                            Chaque année plus de 300 personnes sont sensibilisés. 
                        </p>
                    </div>
                    <div className="relative order-1 md:order-none">
                        <img src={none} alt="people" className="w-full h-80 object-cover rounded-lg shadow-md transition-all duration-300"/>
                    </div>
                </div>
                {/* ============ Présence sur les réseaux sociaux ============ */}
                <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-12 items-center mb-20">
                    <div className="relative order-1 md:order-none">
                        <img src={none} alt="people" className="w-full h-80 object-cover rounded-lg shadow-md transition-all duration-300"/>
                    </div>
                    <div className="space-y-6">
                        <h3 className="text-3xl font-extrabold mb-6 text-gray-900">Présence sur les réseaux sociaux</h3>
                        <p className="text-gray-700 mb-4 leading-relaxed border-l-4 border-yellow-500 pl-3">
                            DREAMS assure une présence active sur les réseaux sociaux afin de sensibiliser le grand public de manière continue et accessible.
                            Les publications partagées abordent des thématiques variées : inclusion, égalité, témoignages, prévention, et lutte contre les discriminations.
                            Grâce à ces canaux, l’association diffuse des messages positifs, éducatifs et engageants, permettant de déconstruire les clichés et de créer du lien au-delà des frontières géographiques.
                            Avec plus de 150 publications par an, DREAMS amplifie sa mission de sensibilisation et offre un espace d’expression pour toutes les voix de la communauté LGBTQIA+.
                        </p>
                    </div>
                </div>
                </div>
            </section>

            {/* <section className="accroche">
                <h1>LE SAVIEZ-VOUS ?</h1>
                <p>Une statistique de fou choquante</p>
            </section> */}

            <section className="difficultes">
                <div className="texte">
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6 text-center">
                            D'importantes{" "}
                            <span className="text-yellow-500">difficultés</span>
                    </h1>
                    <p>
                      Les difficultés des minorités sexuelles sont importantes, et ce encore plus dans certains endroits du  monde. <br />
                      Au Burkina Faso, l'homosexualité est officiellement interdite depuis septembre 2025. <br />
                      Au Togo, les actes sexuels homosexuels sont passibles de 3 ans d'emprisonnement et les personnes LGBT rencontrent des difficultés légalent que ne vivient pas des togolais non-LGBT.
                    </p>
                </div>
                <div className="image">
                    <img src="public/images/difficultes-lgbt.jpg" alt="" />
                </div>
            </section>

            <section className="aide">
              <div className="image">
                    <img src="public/images/pride-flag.jpg" alt="" />
              </div>
              <div className="texte">
                  <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6 text-center">
                            Un accès{" "}
                            <span className="text-yellow-500">compliqué à l'aide</span>
                    </h1>
                  <p>
                    Dans les pays ou les personnes LGBT sont hors-la-loi ou sont sujettes à de grosses discrimations, il n'existe très souvent pas de protection.  
                    Les personnes concernées sont alors livrées à elles-mêmes dans un environnement qui leur est très hostile. <br />
                    Les personnes LGBT sont plus fréquemment en proie aux problèmes mentaux que la population dans son ensemble.
                  </p>
              </div>
            </section>
    </main>
  )
}

export default Sensibilisation

