export function Header() {
    return (
        <header className="sticky top-0 z-10 border-b border-line bg-bg">
            <nav className="mx-auto flex max-w-[1100px] flex-col items-center gap-3 p-4 sm:flex-row sm:justify-between sm:gap-0 sm:px-6">
                <a href="#hero" className="text-xl font-bold font-heading">
                    Luma <span className="text-accent">Photography</span>
                </a>

                <ul className="flex flex-wrap justify-center gap-4 sm:gap-6">
                    <li><a href="#hero" className="text-[0.95rem] text-ink-soft transition-colors hover:text-accent">Home</a></li>
                    <li><a href="#gallery" className="text-[0.95rem] text-ink-soft transition-colors hover:text-accent">Gallery</a></li>
                    <li><a href="#sessions" className="text-[0.95rem] text-ink-soft transition-colors hover:text-accent">Sessions</a></li>
                    <li><a href="#about" className="text-[0.95rem] text-ink-soft transition-colors hover:text-accent">About</a></li>
                    <li><a href="#book-shoot" className="text-[0.95rem] text-ink-soft transition-colors hover:text-accent">Book a Shoot</a></li>
                    <li><a href="#contact" className="text-[0.95rem] text-ink-soft transition-colors hover:text-accent">Contact</a></li>
                </ul>
            </nav>
        </header>
    );
}