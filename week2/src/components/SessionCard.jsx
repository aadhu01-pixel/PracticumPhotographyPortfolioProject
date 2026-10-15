
import { useState } from "react";

export function SessionCard({ session }) {
    const [selected, setSelected] = useState(false);

    return (
        <article className="overflow-hidden rounded-sm border border-stone-300">
            <img
                src={session.image}
                alt={session.alt}
                className="aspect-[3/2] w-full object-cover"
            />

            <div className="p-5">
                <h3 className="mb-2 font-heading text-lg">
                    {session.title}
                </h3>

                <p className="mb-5 text-sm text-ink-soft">
                    {session.description}
                </p>

                <button
                    type="button"
                    onClick={() => setSelected(!selected)}
                    className={`rounded-sm border px-4 py-2 text-sm transition ${selected
                        ? "border-amber-700 bg-amber-700 text-white"
                        : "border-stone-300 hover:border-amber-700"
                        }`}
                >
                    {selected ? "Selected ✓" : "Select Session"}
                </button>
            </div>
        </article>
    );
}
