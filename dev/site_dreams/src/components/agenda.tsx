interface Event {
    id: number;
    title: string;
    date: string;
    time: string;
    location: string;
    description: string;
    antenna: string;
}

function groupEventsByMonth(events: Event[]) {
    const groups: Record<string, Event[]> = {};

    events.forEach((event) => {
        const date = new Date(event.date);
        const monthYear = date.toLocaleDateString("fr-FR", {
            month: "long",
            year: "numeric",
        });
        if (!groups[monthYear]) groups[monthYear] = [];
        groups[monthYear].push(event);
    });

    return groups;
}

export default function Agenda() {


    const events: Event[] = [
        {
            id: 1,
            title: "Atelier d’accompagnement juridique",
            date: "2025-10-21",
            time: "14:00",
            location: "Maison des associations, Toulouse",
            description:
                "Séance d’aide pour les démarches de régularisation et les demandes d’asile.",
            antenna: "France - Toulouse",
        },
        {
            id: 2,
            title: "Café-rencontre interculturel ☕",
            date: "2025-10-25",
            time: "16:00",
            location: "Centre communautaire, Bruxelles",
            description:
                "Moment convivial pour échanger sur les cultures et les parcours de vie.",
            antenna: "Belgique - Bruxelles",
        },
        {
            id: 3,
            title: "Journée portes ouvertes DREAMS 🌍",
            date: "2025-11-02",
            time: "10:00",
            location: "Maison DREAMS, Paris",
            description:
                "Présentation de l’association et de ses projets dans chaque antenne.",
            antenna: "France - Paris",
        },
        {
            id: 4,
            title: "Atelier CV & emploi",
            date: "2025-11-08",
            time: "15:30",
            location: "Bibliothèque municipale, Vientiane",
            description:
                "Atelier pour accompagner les réfugiés dans la rédaction de CV et lettres de motivation.",
            antenna: "Laos - Vientiane",
        },
        {
            id: 5,
            title: "Formation bénévoles DREAMS 🤝",
            date: "2025-11-15",
            time: "09:00",
            location: "Local DREAMS, Rome",
            description:
                "Session de formation à l’accueil et à l’accompagnement administratif.",
            antenna: "Italie - Rome",
        },
        {
            id: 6,
            title: "Fête de fin d’année 🎉",
            date: "2025-12-20",
            time: "18:00",
            location: "Salle des fêtes, Paris",
            description:
                "Soirée festive rassemblant toutes les antennes DREAMS pour célébrer l’année écoulée.",
            antenna: "France - Paris",
        },
        {
            id: 7,
            title: "Début normalement",
            date: "2000-12-20",
            time: "18:00",
            location: "Salle des fêtes, Paris",
            description:
                "Soirée festive rassemblant toutes les antennes DREAMS pour célébrer l’année écoulée.",
            antenna: "France - Paris",
        },
        {
            id: 8,
            title: "Anniverssaire du GOAT",
            date: "2026-02-23",
            time: "18:00",
            location: "Salle des fêtes, Toulouse",
            description:
                "Soirée festive rassemblant toutes les antennes DREAMS pour célébrer l'anniversaire du goat.",
            antenna: "France - Toulouse",
        },
    ];

    const groupedEvents = groupEventsByMonth(events.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()));


    return (

        <div className="max-w-4xl mx-auto my-12 px-4">
            <h1 className="text-4xl font-bold text-center mb-10 text-gray-800">
                Agenda <span className="text-yellow-500">DREAMS</span>
            </h1>
            {events.length === 0 && (
                <p className="text-center text-gray-600">Aucun événement à venir pour le moment. Revenez bientôt !</p>
            )}
            
            {Object.entries(groupedEvents).map(([monthYear, monthEvents]) => (
                <div key={monthYear} className="mb-10">
                    <h2 className="text-2xl font-semibold text-yellow-500 mb-4 capitalize border-b pb-2">
                        {monthYear}
                    </h2>

                    {/* Liste des événements */}
                    <div className="space-y-4">
                        {monthEvents.map((event) => {
                            const dateObj = new Date(event.date);
                            const day = dateObj.getDate();
                            const month = dateObj
                                .toLocaleString("fr-FR", { month: "short" })
                                .toUpperCase();

                            return (
                                <div
                                    key={event.id}
                                    className="flex items-center bg-white shadow-md rounded-xl p-4 hover:shadow-lg transition"
                                >
                                    <div className="bg-yellow-400 text-white rounded-xl px-3 py-2 text-center mr-4">
                                        <p className="text-2xl font-bold">{day}</p>
                                        <p className="text-xs uppercase">{month}</p>
                                    </div>

                                    <div>
                                        <h3 className="text-lg font-semibold">{event.title}</h3>
                                        <p className="text-gray-600">
                                            {event.location} à {event.time}
                                        </p>
                                        <p className="text-sm text-gray-500">
                                            {event.description}
                                        </p>
                                        <p className="text-base text-yellow-600">
                                            {event.antenna}
                                        </p>
                                    </div>
                                </div>
                            );
                        })}

                    </div>
                </div>
            ))}
        </div>
    );
}