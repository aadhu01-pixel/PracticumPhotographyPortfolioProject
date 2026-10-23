import { useState, useEffect } from "react";
import { useParams, Link } from "react-router";

// the page for one session, e.g. /sessions/portrait-session
export function SessionDetail() {
    const { slug } = useParams();
    const [session, setSession] = useState(null);
    const [loading, setLoading] = useState(true);
    const [notFound, setNotFound] = useState(false);
    const [activeImage, setActiveImage] = useState(null);

    useEffect(() => {
        // start at the top, not wherever the visitor was on the home page
        window.scrollTo({ top: 0, behavior: "instant" });

        async function loadSession() {
            setLoading(true);
            setNotFound(false);
            try {
                const response = await fetch(`/api/sessions/${slug}`);
                if (!response.ok) {
                    setNotFound(true);
                    return;
                }
                const data = await response.json();
                setSession(data);
                setActiveImage({ url: data.imageUrl, alt: data.imageAlt });
            } catch (err) {
                console.error("Failed to load session", err);
                setNotFound(true);
            } finally {
                setLoading(false);
            }
        }
        loadSession();
    }, [slug]);

    if (loading) {
        return <p className="mx-auto max-w-[1100px] px-6 py-16 text-ink-soft">Loading...</p>;
    }

    if (notFound) {
        return (
            <section className="mx-auto max-w-[1100px] px-6 py-16">
                <p className="text-ink-soft">Sorry, we couldn't find that session.</p>
                <a href="/#sessions" className="mt-2 inline-block text-accent underline">
                    Back to sessions
                </a>
            </section>
        );
    }

    // the cover image first, then the session's own photos
    const images = [
        { url: session.imageUrl, alt: session.imageAlt },
        ...session.photos.map((photo) => ({ url: photo.url, alt: photo.alt })),
    ];

    return (
        <section className="mx-auto grid max-w-[1100px] grid-cols-1 gap-10 px-6 pt-12 pb-20 md:grid-cols-2 lg:gap-16">
            <div>
                <img
                    src={activeImage.url}
                    alt={activeImage.alt}
                    className="aspect-[3/2] w-full object-cover"
                />

                {images.length > 1 && (
                    <div className="mt-3 flex flex-wrap gap-2">
                        {images.map((image) => (
                            <button
                                key={image.url}
                                type="button"
                                aria-label={`Show photo: ${image.alt}`}
                                aria-pressed={activeImage.url === image.url}
                                onClick={() => setActiveImage(image)}
                                className={`h-16 w-16 overflow-hidden border-2 ${activeImage.url === image.url ? "border-accent" : "border-line"}`}
                            >
                                <img src={image.url} alt="" className="h-full w-full object-cover" />
                            </button>
                        ))}
                    </div>
                )}
            </div>

            <div>
                <p className="mb-4 text-[0.8rem] uppercase tracking-[0.15em] text-accent">
                    {session.category}
                </p>

                <h1 className="mb-4 font-heading text-[1.75rem] font-bold">
                    {session.title}
                </h1>

                <p className="text-ink-soft">{session.description}</p>

                <dl className="mt-8 grid gap-5 border-t border-line pt-6">
                    <div>
                        <dt className="text-xs uppercase tracking-[0.1em] text-ink-soft">Duration</dt>
                        <dd className="mt-1">{session.duration}</dd>
                    </div>
                    <div>
                        <dt className="text-xs uppercase tracking-[0.1em] text-ink-soft">What you get</dt>
                        <dd className="mt-1">{session.deliverables}</dd>
                    </div>
                </dl>

                {/* the home page reads ?session= and preselects it in the booking form */}
                <Link
                    to={`/?session=${encodeURIComponent(session.category)}`}
                    className="mt-8 inline-block rounded-[3px] bg-accent px-[1.7rem] py-[0.85rem] text-[0.9rem] font-semibold tracking-[0.1em] uppercase text-button-text transition hover:-translate-y-px hover:bg-accent-dark"
                >
                    Book this session
                </Link>
            </div>
        </section>
    );
}
