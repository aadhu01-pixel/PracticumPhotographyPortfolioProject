export function BookingForm({ sessions, selectedSession, onSessionChange }) {
    const fieldClass =
        "w-full border border-line bg-surface px-3.5 py-3 text-[0.95rem] text-ink rounded-none focus:outline-none focus:border-accent";

    const labelClass =
        "text-xs uppercase tracking-[0.1em] text-ink-soft";

    return (
        <section
            id="book-shoot"
            className="mx-auto grid max-w-[1100px] grid-cols-1 gap-8 border-t border-line px-6 pt-12 pb-20 lg:grid-cols-[1fr_1.6fr] lg:gap-16"
        >
            <div>
                <p className="mb-4 text-[0.8rem] uppercase tracking-[0.15em] text-accent">
                    Let's work together
                </p>

                <h2 className="mb-2 font-heading text-[1.75rem] font-bold">
                    Book a Shoot
                </h2>

                <p className="text-ink-soft">
                    Tell us a little about what you have in mind and we'll get
                    back to you within two days.
                </p>
            </div>

            <form
                className="grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-2"
                onSubmit={(event) => {
                    event.preventDefault();
                    alert("Demo form — no request was sent.");
                }}
            >
                <div className="flex flex-col gap-1.5">
                    <label htmlFor="name" className={labelClass}>
                        Name
                    </label>
                    <input
                        id="name"
                        name="name"
                        type="text"
                        required
                        className={fieldClass}
                    />
                </div>

                <div className="flex flex-col gap-1.5">
                    <label htmlFor="email" className={labelClass}>
                        Email
                    </label>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        className={fieldClass}
                    />
                </div>

                <div className="flex flex-col gap-1.5">
                    <label htmlFor="session" className={labelClass}>
                        Session type
                    </label>
                    <select
                        id="session"
                        name="session"
                        required
                        value={selectedSession}
                        onChange={(event) => onSessionChange(event.target.value)}
                        className={fieldClass}
                    >
                        <option value="" disabled>
                            Choose a session
                        </option>
                        {sessions.map((session) => (
                            <option key={session.id} value={session.category}>
                                {session.title}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="flex flex-col gap-1.5">
                    <label htmlFor="date" className={labelClass}>
                        Preferred date
                    </label>
                    <input
                        id="date"
                        name="date"
                        type="date"
                        className={fieldClass}
                    />
                </div>

                <div className="flex flex-col gap-1.5 sm:col-span-2">
                    <label htmlFor="message" className={labelClass}>
                        Message
                    </label>
                    <textarea
                        id="message"
                        name="message"
                        rows={3}
                        className={`${fieldClass} resize-y`}
                    />
                </div>

                <button
                    type="submit"
                    className="mt-2 justify-self-start rounded-[3px] bg-accent px-[1.7rem] py-[0.85rem] text-[0.9rem] font-semibold tracking-[0.1em] uppercase text-button-text transition hover:-translate-y-px hover:bg-accent-dark"
                >
                    Send Request
                </button>
            </form>
        </section>
    );
}
