function PagePolitique() {
  return (
    <main className="min-h-screen bg-gray-50 py-12 justify">
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 bg-white shadow-lg rounded-2xl py-10 sm:py-12">
        {/* ====================== POLITIQUE DE CONFIDENTIALITÉ ====================== */}
        <header className="mb-10 border-b border-gray-200 pb-6">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-2">
            Politique de confidentialité
          </h1>
          <p className="mt-4 text-gray-600">
            L’association <span className="font-semibold">DREAMS</span> attache une grande importance à la protection des données
            personnelles des personnes qu’elle accompagne, de ses bénévoles et des visiteurs de son site internet.
            La présente politique a pour objectif d’expliquer de manière claire et transparente comment vos données sont
            collectées, utilisées et protégées conformément au RGPD.
          </p>
        </header>

        <section className="mb-8" id="responsable">
          <h2 className="text-xl font-semibold text-gray-900 mb-3">1. Responsable du traitement</h2>
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 text-gray-800">
            <p className="font-semibold">Association DREAMS</p>
            <p>38 rue d’Aubuisson</p>
            <p>31000 Toulouse – France</p>
            <p className="mt-2">
              <a href="mailto:assodreamsfr@gmail.com" className="text-indigo-600 hover:underline">
                assodreamsfr@gmail.com
              </a>
              <br />
              <a href="tel:+337582209226" className="text-indigo-600 hover:underline">
                +33 7 58 22 09 226
              </a>
            </p>
          </div>
        </section>

        <section className="mb-8" id="vie-privee">
          <h2 className="text-xl font-semibold text-gray-900 mb-3">2. Données personnelles collectées</h2>
          <p className="text-gray-700 mb-3">
            Sur notre site, nous collectons uniquement les données strictement nécessaires au traitement
            des demandes de contact et des candidatures au bénévolat :
          </p>
          <ul className="list-disc list-inside space-y-1 text-gray-700">
            <li>Nom</li>
            <li>Prénom</li>
            <li>Adresse e-mail</li>
            <li>Numéro de téléphone</li>
          </ul>
          <p className="mt-4 text-gray-700">
            Ces informations sont fournies volontairement via notre formulaire et ne sont jamais revendues ni utilisées à des fins commerciales.
          </p>
          <p className="mt-4 text-gray-700">
            Des <span className="font-medium">cookies techniques</span> peuvent être utilisés pour assurer le bon fonctionnement du site
            et réaliser des statistiques de fréquentation anonymisées.
          </p>
        </section>

        <section className="mb-8" id="finalites">
          <h2 className="text-xl font-semibold text-gray-900 mb-3">3. Finalités et durée de conservation</h2>
          <p className="text-gray-700 mb-3">
            Les données collectées servent uniquement à :
          </p>
          <ul className="list-disc list-inside space-y-1 text-gray-700 mb-3">
            <li>Répondre aux demandes de contact et de bénévolat </li>
            <li>Organiser les activités de l’association </li>
            <li>Assurer la communication interne et externe de DREAMS.</li>
          </ul>
          <p className="text-gray-700">
            Les données sont conservées :
          </p>
          <ul className="list-disc list-inside space-y-1 text-gray-700 mb-3">
            <li>12 mois pour les formulaires de contact </li>
            <li>2 ans pour les candidatures au bénévolat.</li>
          </ul>
          <p className="text-gray-700">
            Au-delà, elles sont supprimées ou anonymisées.
          </p>
        </section>

        <section className="mb-8" id="droits">
          <h2 className="text-xl font-semibold text-gray-900 mb-3">4. Vos droits</h2>
          <p className="text-gray-700 mb-3">
            Conformément au RGPD, vous disposez des droits suivants :
          </p>
          <ul className="list-disc list-inside space-y-1 text-gray-700 mb-3">
            <li>Droit d’accès, de rectification et de suppression de vos données </li>
            <li>Droit d’opposition et de limitation du traitement </li>
            <li>Droit de retirer votre consentement à tout moment.</li>
          </ul>
          <p className="text-gray-700 mb-3">
            Pour exercer ces droits, contactez :
            <a href="mailto:assodreamsfr@gmail.com" className="text-indigo-600 hover:underline ml-1">
              assodreamsfr@gmail.com
            </a>
          </p>
          <p className="text-gray-700">
            En cas de litige, vous pouvez saisir la{" "}
            <a href="https://www.cnil.fr" className="text-indigo-600 hover:underline" target="_blank">
              CNIL (Commission Nationale de l’Informatique et des Libertés)
            </a>.
          </p>
        </section>

        <section className="mb-8" id="cookies">
          <h2 className="text-xl font-semibold text-gray-900 mb-3">5. Cookies</h2>
          <p className="text-gray-700 mb-3">
            Le site de l’association DREAMS peut utiliser des cookies techniques et statistiques anonymes.
            Aucun cookie publicitaire n’est installé sans votre consentement.
          </p>
          <p className="text-gray-700">
            Vous pouvez gérer ou supprimer les cookies depuis les paramètres de votre navigateur.
          </p>
        </section>

        {/* ====================== MENTIONS LÉGALES ====================== */}
        <section className="mt-14 border-t border-gray-200 pt-8" id="mentions-legales">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-2">
            Mentions légales
          </h1>
          <p className="text-gray-700 mb-2">
            Le présent site est édité par l’association <strong>DREAMS</strong>,
            association à but non lucratif régie par la loi du 1er juillet 1901, dont le siège social est situé au :
          </p>
          <p className="text-gray-700 mb-2">
            38 rue d’Aubuisson, 31000 Toulouse – France
          </p>
          <p className="text-gray-700 mb-2">
            Responsable : <strong>Christian Tchabon</strong>
          </p>
          <p className="text-gray-700 mb-2">
            Contact :{" "}
            <a href="mailto:assodreamsfr@gmail.com" className="text-indigo-600 hover:underline">
              assodreamsfr@gmail.com
            </a>{" "}<br />
            Téléphone :{" "}
            <a href="tel:+337582209226" className="text-indigo-600 hover:underline">
              +33 7 58 22 09 226
            </a>
          </p>
          <p className="text-gray-700 mb-2">
            Hébergeur : <strong>[Nom de l’hébergeur]</strong> — [Adresse complète, pays]
          </p>
          <p className="text-gray-700">
            Le site www.dreams-asso.org a pour objet de présenter les actions, missions et valeurs de l’association DREAMS.
            Toute reproduction, utilisation ou diffusion du contenu sans autorisation est interdite.
          </p>
        </section>
      </section>
    </main>
  );
}

export default PagePolitique;
