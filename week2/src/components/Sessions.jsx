
import { useState } from "react";
import { sessions } from "../data/sessions";
import { SessionCard } from "./SessionCard";

const categories = ["All", "Portrait", "Wedding", "Event"];

export function Sessions() {
    const [filter, setFilter] = useState("All");

    const filteredSessions =
        filter === "All"
            ? sessions
            : sessions.filter((session) => session.category === filter);

    return (
        <section
            id="sessions"
            className="mx-auto max-w-[1100px] border-t border-stone-300 px-6 py-12"
        >
            <h2 className="mb-4 font-['Libre_Baskerville'] text-3xl">
                Sessions
            </h2>

            <p className="mb-6 text-stone-500">
                Ready to capture your next great moment? Choose a session,
                then book it using the form below.
            </p>

            <div className="mb-8 flex flex-wrap gap-2">
                {categories.map((category) => (
                    <button
                        key={category}
                        type="button"
                        onClick={() => setFilter(category)}
                        className={`rounded-full border px-4 py-2 text-sm transition ${filter === category
                                ? "border-amber-700 bg-amber-700 text-white"
                                : "border-stone-300 hover:border-amber-700"
                            }`}
                    >
                        {category}
                    </button>
                ))}
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {filteredSessions.map((session) => (
                    <SessionCard key={session.id} session={session} />
                ))}
            </div>
        </section>
    );
}
