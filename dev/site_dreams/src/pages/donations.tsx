import React, { useMemo, useState } from "react";
import "../styles/donation.css";

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

  return (
    <main className="don">
      {/* HERO */}
      <section className="don-hero">
        <img
          className="don-hero__img"
          src="/images/donate.png"
          alt="Faire un don - DREAMS"
        />
        <div className="don-hero__content">
          <div className="don-hero__card">
            <p className="don-hero__breadcrumb">Accueil / Faire un don</p>
            <h1 className="don-title">Faire un don</h1>
            <p className="don-hero__subtitle">
              Soutiens l’accompagnement des personnes LGBTQQ+ en France, en Europe et en Afrique.
            </p>
          </div>
        </div>
      </section>

      {/* INTRO */}
      <section className="don-intro">
        <div className="don-intro__inner">
          <h2 className="don-subtitle">Ton soutien compte</h2>
          <div className="don-divider don-divider--rainbow" />
          <p className="don-paragraph">
            Chaque contribution permet de renforcer l’accueil, l’orientation, l’hébergement solidaire
            et l’accompagnement administratif et juridique. Merci pour ta générosité.
          </p>
        </div>
      </section>

      {/* FORMULAIRE */}
      <section className="don-wrap">
        <form className="don-form" onSubmit={handleSubmit} noValidate>
          {/* Colonne gauche */}
          <div className="don-col">
            {/* Montant */}
            <div className="don-block">
              <h3 className="don-subtitle">Montant</h3>
              <div className="don-divider don-divider--rainbow2" />
              <div className="don-presets">
                {presets.map((p) => (
                  <button
                    type="button"
                    key={p.id}
                    className={`don-preset ${presetActive === p.id ? "is-active" : ""}`}
                    onClick={() => applyPreset(p)}
                    aria-pressed={presetActive === p.id}
                  >
                    {p.label}
                  </button>
                ))}
                <div className="don-custom">
                  <label htmlFor="amount" className="don-label">
                    Autre
                  </label>
                  <div className="don-inputWrap">
                    <input
                      id="amount"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      className={`don-input ${errors.amount ? "has-error" : ""}`}
                      value={amount === "" ? "" : amount}
                      onChange={(e) => onCustomAmount(e.target.value)}
                      placeholder="Montant (€)"
                      aria-invalid={!!errors.amount}
                    />
                    <span className="don-inputSuffix">€</span>
                  </div>
                  {errors.amount && <p className="don-error">{errors.amount}</p>}
                </div>
              </div>
            </div>

            {/* Moyen de paiement */}
            <div className="don-block">
              <h3 className="don-subtitle">Moyen de paiement</h3>
              <div className="don-divider don-divider--rainbow" />
              <div className="don-radios">
                <label className="don-radio">
                  <input
                    type="radio"
                    name="pay"
                    value="card"
                    checked={payMethod === "card"}
                    onChange={() => setPayMethod("card")}
                  />
                  <span>Carte bancaire</span>
                </label>
                <label className="don-radio">
                  <input
                    type="radio"
                    name="pay"
                    value="paypal"
                    checked={payMethod === "paypal"}
                    onChange={() => setPayMethod("paypal")}
                  />
                  <span>PayPal</span>
                </label>
                <label className="don-radio">
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
              {errors.payMethod && <p className="don-error">{errors.payMethod}</p>}
            </div>
          </div>

          {/* Colonne droite */}
          <div className="don-col">
            {/* Infos donateur */}
            <div className="don-block">
              <h3 className="don-subtitle">Tes informations</h3>
              <div className="don-divider don-divider--warm" />

              <div className="don-grid">
                <div className="don-field">
                  <label htmlFor="firstName" className="don-label">Prénom *</label>
                  <input
                    id="firstName"
                    className={`don-input ${errors.firstName ? "has-error" : ""}`}
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                  {errors.firstName && <p className="don-error">{errors.firstName}</p>}
                </div>

                <div className="don-field">
                  <label htmlFor="lastName" className="don-label">Nom *</label>
                  <input
                    id="lastName"
                    className={`don-input ${errors.lastName ? "has-error" : ""}`}
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                  {errors.lastName && <p className="don-error">{errors.lastName}</p>}
                </div>

                <div className="don-field">
                  <label htmlFor="email" className="don-label">Email *</label>
                  <input
                    id="email"
                    type="email"
                    className={`don-input ${errors.email ? "has-error" : ""}`}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  {errors.email && <p className="don-error">{errors.email}</p>}
                </div>

                <div className="don-field">
                  <label htmlFor="phone" className="don-label">Téléphone</label>
                  <input
                    id="phone"
                    className="don-input"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>

                <div className="don-field">
                  <label htmlFor="country" className="don-label">Pays</label>
                  <input
                    id="country"
                    className="don-input"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                  />
                </div>

                <div className="don-field">
                  <label htmlFor="city" className="don-label">Ville *</label>
                  <input
                    id="city"
                    className={`don-input ${errors.city ? "has-error" : ""}`}
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                  />
                  {errors.city && <p className="don-error">{errors.city}</p>}
                </div>

                <div className="don-field">
                  <label htmlFor="address" className="don-label">Adresse *</label>
                  <input
                    id="address"
                    className={`don-input ${errors.address ? "has-error" : ""}`}
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                  {errors.address && <p className="don-error">{errors.address}</p>}
                </div>

                <div className="don-field">
                  <label htmlFor="postal" className="don-label">Code postal</label>
                  <input
                    id="postal"
                    className="don-input"
                    value={postal}
                    onChange={(e) => setPostal(e.target.value)}
                  />
                </div>
              </div>

              <div className="don-consents">
                <label className="don-check">
                  <input
                    type="checkbox"
                    checked={agree}
                    onChange={(e) => setAgree(e.target.checked)}
                  />
                  <span>
                    J’accepte la <a href="/vie-privee">politique de confidentialité</a>.
                  </span>
                </label>
                {errors.agree && <p className="don-error">{errors.agree}</p>}

                <label className="don-check">
                  <input
                    type="checkbox"
                    checked={newsOptin}
                    onChange={(e) => setNewsOptin(e.target.checked)}
                  />
                  <span>Je souhaite recevoir des nouvelles de DREAMS.</span>
                </label>
              </div>
            </div>

            {/* CTA */}
            <div className="don-actions">
              <button type="submit" className="don-btn don-btn--solid">
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
