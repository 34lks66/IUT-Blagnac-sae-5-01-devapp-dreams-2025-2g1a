import "../styles/sensibilisation.css"

function Sensibilisation() {

  return (
    <>

        <div className="sensibilisation">

            {/* <section className="accroche">
                <h1>LE SAVIEZ-VOUS ?</h1>
                <p>Une statistique de fou choquante</p>
            </section> */}

            <section className="qui">
                <h2>Qui sont les minorités sexuelles ?</h2>
                <p>
                    Une minorité sexuelle et de genre est un groupe social dont l’identité de genre, l’identité sexuelle, l’orientation ou les pratiques sexuelles diffèrent de la majorité du reste de la société
                </p>
                <div className="grid">
                    <div className="lettre"><span className="L">L</span></div>
                    <div className="lettre"><span className="G">G</span></div>
                    <div className="lettre"><span className="B">B</span></div>
                    <div className="lettre"><span className="T">T</span></div>
                    <div className="lettre"><span className="Q">Q</span></div>
                    <div className="lettre"><span className="A">+</span></div>
                    <div className="desc"><span className="L">Lesbiennes</span></div>
                    <div className="desc"><span className="G">Gays</span></div>
                    <div className="desc"><span className="B">Bisexuels</span></div>
                    <div className="desc"><span className="T">Transgenres</span></div>
                    <div className="desc"><span className="Q">Queers</span></div>
                    <div className="desc"><span className="A">Autres</span></div>
                </div>
            </section>

            <section className="difficultes">
                <div className="texte">
                    <h2>D'importantes difficultés</h2>
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
                  <h2>Un accès compliqué à l'aide</h2>
                  <p>
                    Dans les pays ou les personnes LGBT sont hors-la-loi ou sont sujettes à de grosses discrimations, il n'existe très souvent pas de protection.  
                    Les personnes concernées sont alors livrées à elles-mêmes dans un environnement qui leur est très hostile. <br />
                    Les personnes LGBT sont plus fréquemment en proie aux problèmes mentaux que la population dans son ensemble.
                  </p>
              </div>
            </section>

            <section className="ressources">
                <h2>Ressources utiles :</h2>
                <p>
                    • <span>Minorités sexuelles et de genre en Afrique :</span> https://fr.wikipedia.org/wiki/Minorit%C3%A9s_sexuelles_et_de_genre_en_Afrique <br />
                    • <span></span> : loremipsumlienexemple.com <br />
                    • <span></span> : loremipsumlienexemple.com
                </p>
            </section>
        
        </div>
    </>
  )
}

export default Sensibilisation

