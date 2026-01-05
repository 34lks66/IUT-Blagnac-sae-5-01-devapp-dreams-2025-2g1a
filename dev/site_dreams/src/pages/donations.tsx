import React, { useMemo, useState } from "react";

type Preset = { id: string; label: string; value: number };

const Donations: React.FC = () => {
  // Montants prédéfinis
  const presets = useMemo<Preset[]>(
    () => [
      { id: "p10", label: "10€", value: 10 },
      { id: "p20", label: "20€", value: 20 },
      { id: "p30", label: "30€", value: 30 },
      { id: "p50", label: "50€", value: 50 },
      { id: "p100", label: "100€", value: 100 },
    ],
    []
  );

  const [amount, setAmount] = useState<number | "">("");
  const [presetActive, setPresetActive] = useState<string | null>(null);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [country, setCountry] = useState("France");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [postal, setPostal] = useState("");

  const [payMethod, setPayMethod] = useState<"card" | "paypal" | "bank" | "">("");
  const [agree, setAgree] = useState(false);
  const [newsOptin, setNewsOptin] = useState(false);

  const [errors, setErrors] = useState<Record<string, string>>({});

  const applyPreset = (p: Preset) => {
    setAmount(p.value);
    setPresetActive(p.id);
  };

  const onCustomAmount = (v: string) => {
    const cleaned = v.replace(/[^\d]/g, "");
    const num = cleaned === "" ? "" : Math.max(0, parseInt(cleaned, 10) || 0);
    setAmount(num as number | "");
    setPresetActive(null);
  };

  const validate = () => {
    const e: Record<string, string> = {};
    if (amount === "" || (typeof amount === "number" && amount <= 0)) e.amount = "Montant invalide.";
    if (!firstName.trim()) e.firstName = "Prénom requis.";
    if (!lastName.trim()) e.lastName = "Nom requis.";
    if (!email.trim() || !/^\S+@\S+\.\S+$/.test(email)) e.email = "Email invalide.";
    if (!city.trim()) e.city = "Ville requise.";
    if (!address.trim()) e.address = "Adresse requise.";
    if (!payMethod) e.payMethod = "Choisis un moyen de paiement.";
    if (!agree) e.agree = "Tu dois accepter la politique de confidentialité.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (ev) => {
    ev.preventDefault();
    if (!validate()) return;
    const payload = {
      amount,
      donor: { firstName, lastName, email, phone, country, city, address, postal },
      payMethod,
      newsOptin,
    };
    console.log("Donation payload:", payload);
    alert("Merci ❤️ pour ton soutien !");
  };

  const goldTitle = "bg-gradient-to-r from-[#d4af37] to-[#a87700] bg-clip-text text-transparent";
  const rainbow = "bg-[linear-gradient(90deg,#ef4444_0%,#f59e0b_25%,#facc15_40%,#22c55e_60%,#3b82f6_80%,#8b5cf6_100%)]";
  const rainbow2 = "bg-[linear-gradient(90deg,#22c55e,#3b82f6,#8b5cf6)]";
  const warm = "bg-[linear-gradient(90deg,#f43f5e,#fb923c,#facc15)]";

  return (
    <main className="bg-white text-gray-800 leading-relaxed">
      {/* HERO */}
      <section className="relative overflow-hidden">
        <img
          className="w-full h-[42vh] md:h-[54vh] object-cover object-center notranslate"
          translate="no"
          src="/images/donate.png"
          alt="Faire un don - DREAMS"
        />
        <div className="absolute inset-0 flex items-end">
          <div className="w-full max-w-[960px] mx-auto mb-4 bg-white/95 rounded-2xl p-4 md:p-5 shadow-[0_10px_30px_rgba(0,0,0,0.08)]">
            <p className="text-gray-500 text-xs">Accueil / Faire un don</p>
            <h1 className={`text-3xl md:text-4xl font-extrabold ${goldTitle}`}>Faire un don</h1>
            <p className="text-gray-700">
              Soutiens l’accompagnement des personnes LGBTQQ+ en France, en Europe et en Afrique.
            </p>
          </div>
        </div>
      </section>

      {/* INTRO */}
      <section className="max-w-[1100px] mx-auto px-4 pt-7 pb-2">
        <div>
          <h2 className={`text-[20px] font-extrabold ${goldTitle}`}>Ton soutien compte</h2>
          <div className={`h-1 w-18 rounded-full my-2 ${rainbow}`} />
          <p className="text-gray-700">
            Chaque contribution permet de renforcer l’accueil, l’orientation, l’hébergement solidaire
            et l’accompagnement administratif et juridique. Merci pour ta générosité.
          </p>
        </div>
      </section>

      {/* FORMULAIRE */}
      <section className="max-w-[1100px] mx-auto px-4 pb-10">
        <form className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6" onSubmit={handleSubmit} noValidate>
          {/* Colonne gauche */}
          <div className="flex flex-col gap-4">
            {/* Montant */}
            <div className="bg-white border border-gray-200 rounded-2xl p-4 shadow-[0_6px_18px_rgba(0,0,0,0.04)]">
              <h3 className={`text-[20px] font-extrabold ${goldTitle}`}>Montant</h3>
              <div className={`h-1 w-18 rounded-full my-2 ${rainbow2}`} />

              <div className="flex flex-wrap items-end gap-2.5">
                {presets.map((p) => {
                  const active = presetActive === p.id;
                  return (
                    <button
                      type="button"
                      key={p.id}
                      onClick={() => applyPreset(p)}
                      aria-pressed={active}
                      className={[
                        "px-3.5 py-2 rounded-xl font-extrabold border transition active:translate-y-px",
                        active
                          ? "bg-gray-900 text-white border-gray-900"
                          : "bg-white border-gray-300 hover:bg-gray-50",
                      ].join(" ")}
                    >
                      {p.label}
                    </button>
                  );
                })}

                <div className="flex items-end gap-2">
                  <label htmlFor="amount" className="text-xs text-gray-500 block mb-1">
                    Autre
                  </label>
                  <div className="relative">
                    <input
                      id="amount"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      value={amount === "" ? "" : amount}
                      onChange={(e) => onCustomAmount(e.target.value)}
                      placeholder="Montant (€)"
                      aria-invalid={!!errors.amount}
                      className={[
                        "pl-3 pr-8 py-2 rounded-xl border outline-none transition",
                        errors.amount
                          ? "border-red-500 ring-2 ring-red-500/10"
                          : "border-gray-300 focus:border-gray-900 focus:ring-2 focus:ring-gray-900/10",
                      ].join(" ")}
                    />
                    <span className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 font-bold">€</span>
                  </div>
                </div>
              </div>

              {errors.amount && <p className="text-red-600 text-xs mt-2">{errors.amount}</p>}
            </div>

            {/* Moyen de paiement */}
            <div className="bg-white border border-gray-200 rounded-2xl p-4 shadow-[0_6px_18px_rgba(0,0,0,0.04)]">
              <h3 className={`text-[20px] font-extrabold ${goldTitle}`}>Moyen de paiement</h3>
              <div className={`h-1 w-18 rounded-full my-2 ${rainbow}`} />

              <div className="flex flex-col gap-2.5">
                <label className="inline-flex items-center gap-2">
                  <input
                    type="radio"
                    name="pay"
                    value="card"
                    checked={payMethod === "card"}
                    onChange={() => setPayMethod("card")}
                  />
                  <span>Carte bancaire</span>
                </label>
                <label className="inline-flex items-center gap-2">
                  <input
                    type="radio"
                    name="pay"
                    value="paypal"
                    checked={payMethod === "paypal"}
                    onChange={() => setPayMethod("paypal")}
                  />
                  <span>PayPal</span>
                </label>
                <label className="inline-flex items-center gap-2">
                  <input
                    type="radio"
                    name="pay"
                    value="bank"
                    checked={payMethod === "bank"}
                    onChange={() => setPayMethod("bank")}
                  />
                  <span>Virement bancaire</span>
                </label>
              </div>

              {errors.payMethod && <p className="text-red-600 text-xs mt-2">{errors.payMethod}</p>}
            </div>
          </div>

          {/* Colonne droite */}
          <div className="flex flex-col gap-4">
            {/* Infos donateur */}
            <div className="bg-white border border-gray-200 rounded-2xl p-4 shadow-[0_6px_18px_rgba(0,0,0,0.04)]">
              <h3 className={`text-[20px] font-extrabold ${goldTitle}`}>Tes informations</h3>
              <div className={`h-1 w-18 rounded-full my-2 ${warm}`} />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label htmlFor="firstName" className="text-xs text-gray-500 block mb-1">
                    Prénom *
                  </label>
                  <input
                    id="firstName"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className={[
                      "w-full rounded-xl border px-3 py-2 outline-none transition",
                      errors.firstName
                        ? "border-red-500 ring-2 ring-red-500/10"
                        : "border-gray-300 focus:border-gray-900 focus:ring-2 focus:ring-gray-900/10",
                    ].join(" ")}
                  />
                  {errors.firstName && <p className="text-red-600 text-xs mt-1">{errors.firstName}</p>}
                </div>

                <div>
                  <label htmlFor="lastName" className="text-xs text-gray-500 block mb-1">
                    Nom *
                  </label>
                  <input
                    id="lastName"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className={[
                      "w-full rounded-xl border px-3 py-2 outline-none transition",
                      errors.lastName
                        ? "border-red-500 ring-2 ring-red-500/10"
                        : "border-gray-300 focus:border-gray-900 focus:ring-2 focus:ring-gray-900/10",
                    ].join(" ")}
                  />
                  {errors.lastName && <p className="text-red-600 text-xs mt-1">{errors.lastName}</p>}
                </div>

                <div>
                  <label htmlFor="email" className="text-xs text-gray-500 block mb-1">
                    Email *
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={[
                      "w-full rounded-xl border px-3 py-2 outline-none transition",
                      errors.email
                        ? "border-red-500 ring-2 ring-red-500/10"
                        : "border-gray-300 focus:border-gray-900 focus:ring-2 focus:ring-gray-900/10",
                    ].join(" ")}
                  />
                  {errors.email && <p className="text-red-600 text-xs mt-1">{errors.email}</p>}
                </div>

                <div>
                  <label htmlFor="phone" className="text-xs text-gray-500 block mb-1">
                    Téléphone
                  </label>
                  <input
                    id="phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full rounded-xl border border-gray-300 px-3 py-2 outline-none transition focus:border-gray-900 focus:ring-2 focus:ring-gray-900/10"
                  />
                </div>

                <div>
                  <label htmlFor="country" className="text-xs text-gray-500 block mb-1">
                    Pays
                  </label>
                  <input
                    id="country"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    className="w-full rounded-xl border border-gray-300 px-3 py-2 outline-none transition focus:border-gray-900 focus:ring-2 focus:ring-gray-900/10"
                  />
                </div>

                <div>
                  <label htmlFor="city" className="text-xs text-gray-500 block mb-1">
                    Ville *
                  </label>
                  <input
                    id="city"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className={[
                      "w-full rounded-xl border px-3 py-2 outline-none transition",
                      errors.city
                        ? "border-red-500 ring-2 ring-red-500/10"
                        : "border-gray-300 focus:border-gray-900 focus:ring-2 focus:ring-gray-900/10",
                    ].join(" ")}
                  />
                  {errors.city && <p className="text-red-600 text-xs mt-1">{errors.city}</p>}
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="address" className="text-xs text-gray-500 block mb-1">
                    Adresse *
                  </label>
                  <input
                    id="address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className={[
                      "w-full rounded-xl border px-3 py-2 outline-none transition",
                      errors.address
                        ? "border-red-500 ring-2 ring-red-500/10"
                        : "border-gray-300 focus:border-gray-900 focus:ring-2 focus:ring-gray-900/10",
                    ].join(" ")}
                  />
                  {errors.address && <p className="text-red-600 text-xs mt-1">{errors.address}</p>}
                </div>

                <div>
                  <label htmlFor="postal" className="text-xs text-gray-500 block mb-1">
                    Code postal
                  </label>
                  <input
                    id="postal"
                    value={postal}
                    onChange={(e) => setPostal(e.target.value)}
                    className="w-full rounded-xl border border-gray-300 px-3 py-2 outline-none transition focus:border-gray-900 focus:ring-2 focus:ring-gray-900/10"
                  />
                </div>
              </div>

              <div className="mt-3 space-y-2">
                <label className="flex items-start gap-2">
                  <input type="checkbox" checked={agree} onChange={(e) => setAgree(e.target.checked)} className="mt-1" />
                  <span className="text-sm">
                    J’accepte la{" "}
                    <a href="/vie-privee" className="underline">
                      politique de confidentialité
                    </a>
                    .
                  </span>
                </label>
                {errors.agree && <p className="text-red-600 text-xs">{errors.agree}</p>}

                <label className="flex items-start gap-2">
                  <input
                    type="checkbox"
                    checked={newsOptin}
                    onChange={(e) => setNewsOptin(e.target.checked)}
                    className="mt-1"
                  />
                  <span className="text-sm">Je souhaite recevoir des nouvelles de <span className="notranslate" translate="no">DREAMS</span>.</span>
                </label>
              </div>
            </div>

            {/* CTA */}
            <div className="bg-white border border-gray-200 rounded-2xl p-4 shadow-[0_6px_18px_rgba(0,0,0,0.04)]">
              <button
                type="submit"
                className="inline-block px-4 py-2 rounded-xl font-extrabold bg-black text-white hover:bg-gray-800 transition"
              >
                Faire un don →
              </button>
            </div>
          </div>
        </form>
      </section>
    </main>
  );
};

export default Donations;
