const Hebergement = () => {
  return (
    <main className="w-full min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <section className="eval-hero relative overflow-hidden">
        <img
          src="/images/hebergement-intro.jpg"
          alt="Hébergement solidaire et temporaire"
          className="eval-hero__img w-full h-64 md:h-72 object-cover object-center"
        />
        <div className="eval-hero__content absolute inset-0 flex items-end">
          <div className="eval-hero__card w-full max-w-6xl mx-auto mb-4 bg-white/95 rounded-2xl p-4 md:p-5 shadow-lg">
            <div className="text-gray-500 text-xs">
              Accueil / Hébergement solidaire et temporaire
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold mb-2 bg-gradient-to-r from-yellow-500 to-[#93720a] bg-clip-text text-transparent">
              Hébergement solidaire et temporaire
            </h1>
            <p className="text-gray-700">
              Parce qu’être <span className="font-semibold bg-gradient-to-r from-yellow-500 to-[#93720a] bg-clip-text text-transparent">LGBTQIA+</span> et en demande d’asile,
              c’est souvent fuir la haine pour en retrouver ici.
              <br />
              Dans un système d’hébergement <span className="font-semibold bg-gradient-to-r from-yellow-500 to-[#93720a] bg-clip-text text-transparent">solidaire et temporaire</span>,
              nous offrons un <span className="font-semibold bg-gradient-to-r from-yellow-500 to-[#93720a] bg-clip-text text-transparent">refuge sûr et bienveillant </span>
              à celles et ceux qui ont subi des violences liées au genre et à l’orientation sexuelle.
            </p>
          </div>
        </div>
      </section>

      {/* Section Message d'espoir */}
      <section className="px-6 md:px-20 py-16 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-r from-red-500 via-yellow-500 via-green-500 via-blue-500 to-purple-500 h-1 w-32 mx-auto mb-8 rounded-full"></div>
          <p className="text-2xl md:text-3xl text-gray-800 leading-relaxed font-medium mb-6">
            L'hébergement solidaire et temporaire permet à chaque personne de se reconstruire,
            retrouver sa dignité et reprendre espoir.
          </p>
          <p className="text-xl md:text-2xl text-gray-700 font-semibold">
            Face à l'exclusion et à la peur, nous répondons par la{' '}
            <span className="bg-gradient-to-r from-yellow-500 to-[#93720a] bg-clip-text text-transparent">solidarité</span>, l'
            <span className="bg-gradient-to-r from-yellow-500 to-[#93720a] bg-clip-text text-transparent">inclusion</span> et la{' '}
            <span className="bg-gradient-to-r from-yellow-500 to-[#93720a] bg-clip-text text-transparent">fierté</span>.
          </p>
        </div>
      </section>

     {/* Section Objectifs */}
      <section className="px-6 md:px-20 py-16 bg-gradient-to-br from-gray-50 to-gray-100">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4 text-center">
          Nos <span className="bg-gradient-to-r from-yellow-500 to-[#93720a] bg-clip-text text-transparent">Objectifs</span>
        </h2>
        <div className="h-1 w-24 bg-gradient-to-r from-yellow-500 to-[#93720a] mx-auto mb-16 rounded-full"></div>

        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
          {/* Objectif 1 */}
          <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-yellow-500 to-[#93720a] flex items-center justify-center shadow-md">
                <div className="w-3 h-3 bg-white rounded-full"></div>
              </div>
              <h4 className="text-sm font-semibold text-[#93720a] uppercase tracking-wide">
                Urgence
              </h4>
            </div>
            <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">
              Solution rapide et sécurisée
            </h3>
            <p className="text-gray-700 leading-relaxed">
              Proposer une solution d'hébergement rapide et sécurisée pour répondre
              aux urgences et situations critiques.
            </p>
          </div>

          {/* Objectif 2 */}
          <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-yellow-500 to-[#93720a] flex items-center justify-center shadow-md">
                <div className="w-3 h-3 bg-white rounded-full"></div>
              </div>
              <h4 className="text-sm font-semibold text-[#93720a] uppercase tracking-wide">
                Protection
              </h4>
            </div>
            <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">
              Soutien aux victimes de VBG
            </h3>
            <p className="text-gray-700 leading-relaxed">
              Soutenir spécifiquement les bénéficiaires victimes de violences
              basées sur le genre avec un accompagnement adapté et protecteur.
            </p>
          </div>

          {/* Objectif 3 */}
          <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-yellow-500 to-[#93720a] flex items-center justify-center shadow-md">
                <div className="w-3 h-3 bg-white rounded-full"></div>
              </div>
              <h4 className="text-sm font-semibold text-[#93720a] uppercase tracking-wide">
                Autonomie
              </h4>
            </div>
            <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">
              Autonomie progressive
            </h3>
            <p className="text-gray-700 leading-relaxed">
              Offrir un suivi continu qui favorise l'autonomie progressive
              et l'insertion sociale des bénéficiaires.
            </p>
          </div>
        </div>
      </section>

      {/* Section Que proposons-nous ? - Alternance avec images */}
      <section className="px-6 md:px-20 py-16 bg-white">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4 text-center">
          Que <span className="bg-gradient-to-r from-yellow-500 to-[#93720a] bg-clip-text text-transparent">proposons-nous</span> ?
        </h2>
        <div className="h-1 w-24 bg-gradient-to-r from-yellow-500 to-[#93720a] mx-auto mb-16 rounded-full"></div>
        {/* ====== SYSTÈME D’HÉBERGEMENT ROTATIF ====== */}
        <div className="max-w-6xl mx-auto mb-20">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1">
              <img
                src="/images/hebergement.jpg"
                alt="Système d'hébergement"
                className="rounded-2xl shadow-xl w-full h-[400px] object-cover"
              />
            </div>
            <div className="order-1 md:order-2">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-yellow-500 to-[#93720a] flex items-center justify-center shadow-md">
                  <div className="w-3 h-3 bg-white rounded-full"></div>
                </div>
                <h4 className="text-lg font-semibold text-[#93720a] uppercase tracking-wide">
                  Flexibilité
                </h4>
              </div>

              <h3 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-yellow-500 to-[#93720a] bg-clip-text text-transparent mb-4">
                Système d’hébergement rotatif
              </h3>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                Durée flexible de <strong className="text-[#93720a]">1 semaine à 6 mois</strong>,
                selon les besoins spécifiques de chaque bénéficiaire. Cette approche permet
                une adaptation personnalisée aux situations individuelles.
              </p>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <span className="text-[#93720a] mr-3 text-xl">•</span>
                  <span>Adaptation aux besoins individuels</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#93720a] mr-3 text-xl">•</span>
                  <span>Solution immédiate en cas d'urgence</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#93720a] mr-3 text-xl">•</span>
                  <span>Accompagnement vers l'autonomie</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* ====== SOUTIEN AUX VICTIMES DE VBG ====== */}
        <div className="max-w-6xl mx-auto mb-20">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-yellow-500 to-[#93720a] flex items-center justify-center shadow-md">
                  <div className="w-3 h-3 bg-white rounded-full"></div>
                </div>
                <h4 className="text-lg font-semibold text-[#93720a] uppercase tracking-wide">
                  Protection
                </h4>
              </div>

              <h3 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-yellow-500 to-[#93720a] bg-clip-text text-transparent mb-4">
                Soutien aux victimes de VBG
              </h3>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                Mise à disposition d’un <strong className="text-[#93720a]">cadre protecteur </strong>
                pour les victimes de violences basées sur le genre, avec un accompagnement
                psychologique et social spécialisé.
              </p>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <span className="text-[#93720a] mr-3 text-xl">•</span>
                  <span>Environnement sécurisé et confidentiel</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#93720a] mr-3 text-xl">•</span>
                  <span>Soutien psychologique professionnel</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#93720a] mr-3 text-xl">•</span>
                  <span>Accompagnement social personnalisé</span>
                </li>
              </ul>
            </div>
            <div>
              <img
                src="/images/soutien-vbg.jpg"
                alt="Soutien aux victimes"
                className="rounded-2xl shadow-xl w-full h-[400px] object-cover"
              />
            </div>
          </div>
        </div>

        {/* ====== MISE À L’ABRI ET SUIVI ====== */}
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1">
              <img
                src="/images/mise-abri.jpg"
                alt="Mise à l'abri et suivi"
                className="rounded-2xl shadow-xl w-full h-[400px] object-cover"
              />
            </div>
            <div className="order-1 md:order-2">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-yellow-500 to-[#93720a] flex items-center justify-center shadow-md">
                  <div className="w-3 h-3 bg-white rounded-full"></div>
                </div>
                <h4 className="text-lg font-semibold text-[#93720a] uppercase tracking-wide">
                  Accompagnement
                </h4>
              </div>

              <h3 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-yellow-500 to-[#93720a] bg-clip-text text-transparent mb-4">
                Mise à l’abri et suivi
              </h3>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                Accueil dans un environnement sûr avec un
                <strong className="text-[#93720a]"> accompagnement personnalisé</strong> :
                orientation, suivi de parcours et soutien continu vers l'autonomie.
              </p>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <span className="text-[#93720a] mr-3 text-xl">•</span>
                  <span>Référent dédié pour chaque personne</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#93720a] mr-3 text-xl">•</span>
                  <span>Suivi régulier et bienveillant</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#93720a] mr-3 text-xl">•</span>
                  <span>Construction d'un projet de vie durable</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>


      {/* Section Témoignages */}
      <section className="px-6 md:px-20 py-16 bg-gradient-to-br from-yellow-50 to-orange-50">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4 text-center">
          <span className="bg-gradient-to-r from-yellow-500 to-[#93720a] bg-clip-text text-transparent">Témoignages</span>
        </h2>
        <div className="h-1 w-24 bg-gradient-to-r from-yellow-500 to-[#93720a] mx-auto mb-12 rounded-full"></div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl p-8 md:p-10 shadow-xl border-t-4 border-yellow-500">
            <div className="flex items-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-yellow-500 to-[#93720a] rounded-full flex items-center justify-center text-white font-bold text-xl flex-shrink-0 shadow-lg">
                A
              </div>
              <div className="ml-4">
                <h3 className="font-semibold text-gray-800 text-lg">Ancienne bénéficiaire</h3>
                <p className="text-gray-600 text-sm">Hébergée pendant 3 mois</p>
              </div>
            </div>
            <blockquote className="text-lg md:text-xl text-gray-700 italic leading-relaxed border-l-4 border-yellow-500 pl-6">
              "Grâce au programme d'hébergement temporaire, j'ai pu retrouver ma dignité et
              ma confiance. L'accompagnement bienveillant m'a permis de me reconstruire
              petit à petit. Aujourd'hui, j'ai mon propre logement et je peux enfin envisager
              l'avenir avec sérénité. Cette aide a été un véritable tremplin vers mon autonomie."
            </blockquote>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Hebergement;