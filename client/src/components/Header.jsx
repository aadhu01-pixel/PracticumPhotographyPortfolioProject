import { Link } from "react-router";
import { useSession, signOut } from "../lib/auth-client";

const linkClass = "text-[0.95rem] text-ink-soft transition-colors hover:text-accent";

export function Header() {
    // asks the server who is logged in (using the session cookie)
    const { data: session } = useSession();

    return (
        <header className="sticky top-0 z-10 border-b border-line bg-bg">
            <nav className="mx-auto flex max-w-[1100px] flex-col items-center gap-3 p-4 sm:flex-row sm:justify-between sm:gap-0 sm:px-6">
                {/* Link changes the URL but doesn't scroll, so go back to the top ourselves */}
                <Link
                    to="/"
                    onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                    className="text-xl font-bold font-heading"
                >
                    Luma <span className="text-accent">Photography</span>
                </Link>

                {/* "/#..." so the links also work from the login and signup pages */}
                <ul className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
                    <li><a href="/#hero" className={linkClass}>Home</a></li>
                    <li><a href="/#gallery" className={linkClass}>Gallery</a></li>
                    <li><a href="/#sessions" className={linkClass}>Sessions</a></li>
                    <li><a href="/#about" className={linkClass}>About</a></li>
                    <li><a href="/#book-shoot" className={linkClass}>Book a Shoot</a></li>
                    <li><a href="/#contact" className={linkClass}>Contact</a></li>

                    {session?.user ? (
                        <>
                            <li className="text-[0.95rem] text-ink">
                                Hi, {session.user.name}
                            </li>
                            <li>
                                <button
                                    type="button"
                                    onClick={() => signOut()}
                                    className={`cursor-pointer ${linkClass}`}
                                >
                                    Sign out
                                </button>
                            </li>
                        </>
                    ) : (
                        <li>
                            <Link to="/login" className={linkClass}>
                                Sign in
                            </Link>
                        </li>
                    )}
                </ul>
            </nav>
        </header>
    );
}
