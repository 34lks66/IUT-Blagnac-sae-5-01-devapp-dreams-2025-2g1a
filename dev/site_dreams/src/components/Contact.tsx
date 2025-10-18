import A from "../assets/contact_image/A.png";
import B from "../assets/contact_image/B.png";
import L8 from "../assets/contact_image/L8.png";
import L37 from "../assets/contact_image/37.png";
import none from "../assets/none.jpg";

function Contact() {

  return (
    <div className="max-w-6xl mx-auto my-16 px-6">
      <h1 className="text-4xl font-bold text-center mb-10 text-gray-800">
        Où <span className="text-yellow-500">nous trouver ?</span>
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
      <div className="flex flex-col gap-8 border border-gray-200 rounded-lg bg-white shadow-sm p-8">
        <div className="flex flex-col gap-3">
            <div className="text-2xl font-bold text-gray-800 border-b pb-2">Adresse</div>
            <p className="text-gray-700 font-medium">Siège social - Toulouse</p>
            <p className="text-base font-medium text-gray-600">13 RUE D'HYERES 31500 Toulouse</p>
            <div className="flex flex-col border border-gray-200 bg-gray-50 p-4 rounded-md gap-2">
                <p className="font-medium text-gray-700">à quelques minutes de la Côte Pavée et du centre ville</p>
                <div className="flex items-center gap-2">
                    <img src={A} alt="ligne A" className="w-7 h-6"/>
                    <span>Ligne A : Jolimont - à environ 15 min à pied</span>
                </div>
                <div className="flex items-center gap-2">
                    <img src={B} alt="ligne B" className="w-7 h-6"/>
                    <span>Ligne B : François Verdier - à environ 20 min à pied</span>
                </div>
                <div className="flex items-center gap-2">
                    <img src={L8} alt="linéo L8" className="w-7 h-6"/>
                    <img src={L37} alt="linéo L8" className="w-7 h-6"/>
                    <span>Ligne L8 et 37 desservent le quartier</span>
                </div>
            </div>
        </div>
        {/* <div className="gap-4 border-b border-gray-300 flex flex-col items-start w-[400px] p-6"> */}
        <div className="flex flex-col gap-3">
            {/* <div className="m-0 text-xl font-bold no-underline">Horaires</div> */}
            <div className="text-2xl font-bold text-gray-800 border-b pb-2">Horaires</div>
            <p className="text-gray-600">Lundi - Vendredi: 10h - 18h</p>
            <p className="text-gray-600">Samedi: 10h - 13h</p>
        </div>
        {/* <div className="gap-4 border-b border-gray-300 flex flex-col items-start w-[400px] p-6"> */}
        <div className="flex flex-col gap-3">
            {/* <div className="m-0 text-xl font-bold no-underline">Nous contacter</div> */}
            <div className="text-2xl font-bold text-gray-800 border-b pb-2">Nous contacter</div>
            <a href="mailto:assodreamsfr@gmail.com"
               className="text-yellow-600 hover:underline">
            assodreamsfr@gmail.com
            </a>
            <p className="font-medium text-gray-600">07 58 20 92 26</p>
            <div className="flex gap-4 mt-4">
                <a
                    href="https://www.facebook.com/people/DREAMSAsso/61571981955508/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-10 h-10 rounded-full border border-gray-300 hover:bg-gray-100 transition"
                  >
                    <i className="fa-brands fa-facebook-f text-gray-700 text-lg"></i>
                </a>
                <a
                    href="https://www.instagram.com/dreams_asso/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-10 h-10 rounded-full border border-gray-300 hover:bg-gray-100 transition"
                >
                    <i className="fa-brands fa-instagram text-gray-700 text-lg"></i>
                </a>
                <a
                    href="https://www.tiktok.com/@dreams_asso?_t=ZN-8tODtZI5CCd&_r=1"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-10 h-10 rounded-full border border-gray-300 hover:bg-gray-100 transition"
                >
                    <i className="fa-brands fa-tiktok text-gray-700 text-lg"></i>
                </a>
                <a
                    href="https://x.com/DREAMS_ASSO"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-10 h-10 rounded-full border border-gray-300 hover:bg-gray-100 transition"
                >
                    <i className="fa-brands fa-x-twitter text-gray-700 text-lg"></i>
                </a>
                </div>
        </div>
      </div>
      <div className="flex flex-col gap-6">
        <div className="border border-gray-200 rounded-lg overflow-hidden shadow-sm h-[350px]">
            <iframe 
              title="Localisation"
              src="https://www.google.com/maps?q=13+RUE+D'HYERES+31500+Toulouse&output=embed"
              className="w-full h-full border-0"
            //   allowFullScreen=""
              loading="lazy"
              ></iframe>
        </div>
        <div className="grid grid-cols-2 gap-4">
            <img src={none} alt="Siège social DREAMS - Toulouse" className="rounded-lg object-cover h-56 w-full" />
            <img src={none} alt="Siège social DREAMS - Toulouse" className="rounded-lg object-cover h-56 w-full" />
        </div>
      </div>
    </div>
    </div>
  )
}

export default Contact

