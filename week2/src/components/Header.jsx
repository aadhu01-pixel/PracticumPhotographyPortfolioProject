export function Header() {
    return (
        <header className="sticky top-0 z-10 border-b border-line bg-bg">
            <nav className="mx-auto flex max-w-[1100px] items-center justify-between px-6 py-4">
                <a href="#hero" className="text-xl font-bold font-heading">
                    Luma <span className="text-accent">Photography</span>
                </a>

                <ul className="hidden gap-6 md:flex">
                    <li><a href="#hero" className="text-ink-soft hover:text-accent">Home</a></li>
                    <li><a href="#gallery" className="text-ink-soft hover:text-accent">Gallery</a></li>
                    <li><a href="#sessions" className="text-ink-soft hover:text-accent">Sessions</a></li>
                    <li><a href="#about" className="text-ink-soft hover:text-accent">About</a></li>
                    <li><a href="#booking" className="text-ink-soft hover:text-accent">Book a Shoot</a></li>
                    <li><a href="#contact" className="text-ink-soft hover:text-accent">Contact</a></li>
                </ul>
            </nav>
        </header>
    );
}