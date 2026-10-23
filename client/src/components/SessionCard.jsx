
import { Link } from "react-router";
import { SelectToggle } from "./SelectToggle";

export function SessionCard({ session, selected, onSelectChange }) {
    return (
        <article>
            {/* the image and title open the session's page; the select button stays separate */}
            <Link to={`/sessions/${session.slug}`} className="group block">
                <img
                    src={session.imageUrl}
                    alt={session.imageAlt}
                    className="aspect-[3/2] w-full object-cover transition-opacity group-hover:opacity-90"
                />
            </Link>

            <div className="pt-5">
                <p className="mb-2 text-xs uppercase tracking-[0.15em] text-accent">
                    {session.category}
                </p>

                <h3 className="mb-2 font-heading text-lg">
                    <Link to={`/sessions/${session.slug}`} className="transition-colors hover:text-accent">
                        {session.title}
                    </Link>
                </h3>

                <p className="mb-5 text-sm text-ink-soft">
                    {session.description}
                </p>

                <SelectToggle selected={selected} onChange={onSelectChange} />
            </div>
        </article>
    );
}
