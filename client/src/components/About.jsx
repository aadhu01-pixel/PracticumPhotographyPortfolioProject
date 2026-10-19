
export function About() {
    return (
        <section
            id="about"
            className="mx-auto grid max-w-[1100px] grid-cols-1 items-center gap-8 border-t border-line px-6 pt-12 pb-16 lg:grid-cols-[1fr_1.4fr] lg:gap-12"
        >
            <img
                src="/images/about/about.jpg"
                alt="Black-and-white portrait of a smiling man with a grey beard"
                className="aspect-[4/5] max-h-[480px] w-full object-cover"
            />

            <div>
                <h2 className="mb-4 font-heading text-[1.75rem] font-bold">
                    About Us
                </h2>

                <p className="mb-4 max-w-[42rem] text-ink-soft">
                    Luma Photography is a small studio capturing portraits,
                    weddings and events in natural light. Our aim is simple:
                    timeless images that tell your story.
                </p>

                <p className="mb-4 max-w-[42rem] text-ink-soft">
                    We keep every session relaxed and unhurried, so your
                    photos feel honest, and like you.
                </p>
            </div>
        </section>
    );
}
