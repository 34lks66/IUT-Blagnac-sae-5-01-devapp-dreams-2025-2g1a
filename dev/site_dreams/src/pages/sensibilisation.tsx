import MenuPays from '../components/menu_pays';
import FooterMain from "../components/Footer"
import Header from "../components/header"
import "../styles/sensibilisation.css"

function Sensibilisation() {

  return (
    <>
       
        <MenuPays/>
        <Header/>

        <div className="sensibilisation">

            <section className="accroche">
                <h1>LE SAVIEZ-VOUS ?</h1>
                <p>Une statistique de fou choquante</p>
            </section>

            <section className="qui">
                <div className="texte">
                    <h2>Qui sont les minorités ?</h2>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                        Donec ut commodo magna. Fusce eget arcu odio. 
                        Donec sagittis, urna in varius cursus, mi nulla faucibus nulla, sed lobortis ipsum lacus quis nunc. 
                        Praesent nec libero ultrices, pulvinar lectus at, porttitor arcu. Mauris cursus velit in orci placerat, eu sollicitudin felis aliquet. 
                        Mauris vel tincidunt elit, ut scelerisque eros. Nullam a lacus aliquet, tempor enim id, tempor risus.
                    </p>
                </div>
                <div className="image">
                    <img src="public/images/pride-flag.jpg" alt="" />
                </div>
            </section>

            <section className="difficultes">
                <div className="image">
                    <img src="public/images/difficultes-lgbt.jpg" alt="" />
                </div>
                <div className="texte">
                    <h2>D'importantes difficultés</h2>
                    <p>
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ut commodo magna. Fusce eget arcu odio. Donec sagittis, urna in varius cursus, mi nulla faucibus nulla, sed lobortis ipsum lacus quis nunc. Praesent nec libero ultrices, pulvinar lectus at, porttitor arcu. Mauris cursus velit in orci placerat, eu sollicitudin felis aliquet. Mauris vel tincidunt elit, ut scelerisque eros. Nullam a lacus aliquet, tempor enim id, tempor risus.</p>
                </div>
            </section>

            <section className="ressources">
                <h2>Ressources</h2>
                <p>
                    • Blabla : loremipsumlienexemple.com <br />
                    • Blabla : loremipsumlienexemple.com <br />
                    • Blabla : loremipsumlienexemple.com
                </p>
            </section>
        
        </div>
        <FooterMain />
    </>
  )
}

export default Sensibilisation

