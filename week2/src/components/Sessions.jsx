
import { useState } from "react";
import { sessions } from "../data/sessions";
import { SessionCard } from "./SessionCard";

const categories = ["All", "Portrait", "Wedding", "Event"];

export function Sessions({ selectedSession, onSelectSession }) {
    const [filter, setFilter] = useState("All");

    const filteredSessions =
        filter === "All"
            ? sessions
            : sessions.filter((session) => session.category === filter);

    return (
        <section
            id="sessions"
            className="mx-auto max-w-[1100px] border-t border-line px-6 py-12"
        >
            <h2 className="mb-6 font-heading text-[1.75rem] font-bold">
                Sessions
            </h2>

            <p className="mb-6 text-ink-soft">
                Ready to capture your next great moment? Choose a session,
                then book it using the form below.
            </p>

            <div className="mb-8 flex flex-wrap gap-x-6 gap-y-3">
                {categories.map((category) => (
                    <button
                        key={category}
                        type="button"
                        aria-pressed={filter === category}
                        onClick={() => setFilter(category)}
                        className={`border-b pb-1 text-[0.8rem] uppercase tracking-[0.15em] transition-colors ${filter === category
                            ? "border-accent text-accent"
                            : "border-transparent text-ink-soft hover:text-accent"
                            }`}
                    >
                        {category}
                    </button>
                ))}
            </div>

            <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
                {filteredSessions.map((session) => (
                    <SessionCard
                        key={session.id}
                        session={session}
                        selected={selectedSession === session.category}
                        onSelectChange={(isSelected) => {
                            onSelectSession(isSelected ? session.category : "");

                            // take the visitor to the form, where the session is now filled in
                            if (isSelected) {
                                document
                                    .getElementById("book-shoot")
                                    .scrollIntoView({ behavior: "smooth" });
                            }
                        }}
                    />
                ))}
            </div>
        </section>
    );
}
