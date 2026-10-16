
export function Hero() {
    return (
        <section id="hero">
            <div className="mx-auto grid max-w-[1100px] grid-cols-1 items-end gap-0 px-6 pt-10 pb-8 sm:pt-12 sm:pb-10 md:grid-cols-[1.5fr_1fr] md:gap-12 md:pt-14">
                <div>
                    <p className="mb-4 text-[0.8rem] tracking-[0.15em] uppercase text-accent">
                        Welcome to Luma Photography
                    </p>

                    <h1 className="font-heading text-[2.25rem] leading-[1.05] font-bold sm:text-[3.5rem]">
                        Capturing Moments,
                        <span className="block text-accent">Creating Memories</span>
                    </h1>
                </div>

                <div>
                    <p className="mt-5 max-w-[26rem] text-base text-ink-soft sm:text-[1.1rem]">
                        Explore our collection of stunning photographs that capture the
                        beauty of the world around us.
                    </p>

                    <a
                        href="#book-shoot"
                        className="mt-8 inline-block rounded-[3px] bg-accent px-[1.7rem] py-[0.85rem] text-[0.9rem] font-semibold tracking-[0.1em] uppercase text-button-text transition hover:-translate-y-px hover:bg-accent-dark"
                    >
                        Book a Shoot
                    </a>
                </div>
            </div>

            <img
                src="/images/hero/hero-field.jpg"
                alt="Person walking across a golden hillside toward the sea under a wide, cloud-streaked sky"
                className="aspect-[4/3] max-h-[500px] w-full object-cover object-[60%_90%] sm:aspect-[3/2] md:aspect-[21/9]"
            />
        </section>
    );
}
