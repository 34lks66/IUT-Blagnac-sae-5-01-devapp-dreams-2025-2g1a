import people from "../../assets/people.png";

const About: React.FC = () => {

  return (
    <section id="missions" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-6">
          {/* <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
            Qui sommes-nous ?
          </h2> */}
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6 text-center">
                    Qui{" "}
                    <span className="text-yellow-500">sommes-nous ?</span>
              </h1>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <p className="!text-lg font-semibold text-gray-900">Chez DREAMS, nous accompagnons les personnes en situation d'exil ou de rupture sociale, en particulier issues de minorités sexuelles, afin de les rendre autonomes et heureux.</p>
            </div>
            <img src={people} alt="people" />
          </div>
        </div>
    </section>
  )
}

export default About

