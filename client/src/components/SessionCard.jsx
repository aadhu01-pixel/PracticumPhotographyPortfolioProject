
import { SelectToggle } from "./SelectToggle";

export function SessionCard({ session, selected, onSelectChange }) {
    return (
        <article>
            <img
                src={session.image}
                alt={session.alt}
                className="aspect-[3/2] w-full object-cover"
            />

            <div className="pt-5">
                <p className="mb-2 text-xs uppercase tracking-[0.15em] text-accent">
                    {session.category}
                </p>

                <h3 className="mb-2 font-heading text-lg">
                    {session.title}
                </h3>

                <p className="mb-5 text-sm text-ink-soft">
                    {session.description}
                </p>

                <SelectToggle selected={selected} onChange={onSelectChange} />
            </div>
        </article>
    );
}
