import { useState } from 'react';

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        if (!email || !password) {
            setError("Veuillez remplir tous les champs.");
            return;
        }

        try {
            setLoading(true);

            // Appel à l'API pour la connexion (simulation ici)
            //SImulation erreur
            await new Promise((_, reject) =>
                setTimeout(() => reject(new Error("Identifiants invalides")), 1000)
            );


            console.log("Email:", email, "Password:", password);
            alert("Connexion réussie ! (simulation)");


        } catch (err: unknown) {
            setError("Erreur de connexion : " + (err instanceof Error ? err.message : "Inconnu"));
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-container min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white shadow-md rounded-2xl p-8 w-full max-w-md">
                <h2 className="text-2xl font-semibold text-center mb-6 text-gray-800">Connexion</h2>

                <form onSubmit={handleSubmit} className="login-form space-y-5">
                    <div className="form-group">
                        <label
                            htmlFor="email"
                            className="block text-sm font-medium text-gray-700 mb-1"
                        >
                            Email :
                        </label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                        />
                        {error && (
                            <p className="error-message text-red-500 text-sm mt-1">{error}</p>
                        )}
                    </div>

                    <div className="form-group">
                        <label
                            htmlFor="password"
                            className="block text-sm font-medium text-gray-700 mb-1"
                        >
                            Mot de passe :
                        </label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                        />
                        {error && (
                            <p className="error-message text-red-500 text-sm mt-1">{error}</p>
                        )}
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full py-2.5 rounded-lg font-medium text-white transition 
          ${loading
                                ? "bg-yellow-400 cursor-not-allowed"
                                : "bg-yellow-600 hover:bg-yellow-700"
                            }`}
                    >
                        {loading ? "Chargement..." : "Se connecter"}
                    </button>
                </form>
            </div>
        </div>

    );
}

export default Login;