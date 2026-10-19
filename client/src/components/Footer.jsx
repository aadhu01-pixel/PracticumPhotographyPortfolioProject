
export function Footer() {
    return (
        <footer
            id="contact"
            className="border-t border-line bg-surface"
        >
            <div className="mx-auto grid max-w-[1100px] grid-cols-1 gap-8 px-6 py-12 md:grid-cols-[2fr_1fr_1fr]">
                {/* Brand */}
                <div>
                    <p className="font-heading text-[1.1rem] font-bold">
                        Luma <span className="text-accent">Photography</span>
                    </p>
                    <p className="mt-2 max-w-sm text-sm text-ink-soft">
                        Portraits, weddings and events, captured with care and
                        made to last.
                    </p>
                </div>

                {/* Session links */}
                <div>
                    <h3 className="mb-3 text-sm uppercase tracking-[0.1em] font-bold">
                        Sessions
                    </h3>
                    <ul className="flex flex-col gap-2 text-sm text-ink-soft">
                        <li>
                            <a href="#sessions" className="hover:text-accent">
                                Portraits
                            </a>
                        </li>
                        <li>
                            <a href="#sessions" className="hover:text-accent">
                                Weddings
                            </a>
                        </li>
                        <li>
                            <a href="#sessions" className="hover:text-accent">
                                Events
                            </a>
                        </li>
                    </ul>
                </div>

                {/* Contact */}
                <div>
                    <h3 className="mb-3 text-sm uppercase tracking-[0.1em] font-bold">
                        Contact Us
                    </h3>
                    <div className="space-y-2 text-sm text-ink-soft">
                        <p>hi@lumaphoto.example</p>
                        <p>437 Shutter Lane, New York</p>
                    </div>
                </div>
            </div>

            <p className="px-6 pb-6 text-center text-sm text-ink-soft">
                © 2026 Luma Photography. Built for learning.
            </p>
        </footer>
    );
}
