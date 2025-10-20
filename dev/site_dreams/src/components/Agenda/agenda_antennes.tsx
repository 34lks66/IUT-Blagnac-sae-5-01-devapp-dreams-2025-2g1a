import type { Event } from "../../data/type";

interface AgendaProps {
    lEvents: Event[];
}


export default function Agenda({ lEvents }: AgendaProps) {

    const events = lEvents;

    return (
        <div className="max-w-4xl mx-auto my-12 px-4">
            {events.length === 0 && (
                <p className="text-center text-gray-600">
                    Aucun événement à venir pour le moment. Revenez bientôt !
                </p>
            )}

            {/* Liste simple des événements */}
            <div className="space-y-4">
                {events.map((event) => {
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
                                <p className="text-sm text-gray-500">{event.description}</p>
                                <p className="text-base text-yellow-600">{event.antenna}</p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>


    );
}