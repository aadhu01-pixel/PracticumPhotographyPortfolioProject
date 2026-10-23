import { useState } from "react";
import { useNavigate, Link } from "react-router";
import { signIn, signUp } from "../lib/auth-client";

// one page for both forms: mode is "signin" or "signup"
export function Login({ mode }) {
    const navigate = useNavigate();
    const [error, setError] = useState(null);
    const [busy, setBusy] = useState(false);

    const isSignup = mode === "signup";

    async function handleSubmit(event) {
        event.preventDefault();
        setError(null);
        setBusy(true);

        const form = new FormData(event.currentTarget);
        const email = String(form.get("email"));
        const password = String(form.get("password"));
        const name = String(form.get("name") ?? "");

        try {
            const result = isSignup
                ? await signUp.email({ email, password, name })
                : await signIn.email({ email, password });

            // better-auth returns { error } instead of throwing, e.g. for a wrong password
            if (result.error) {
                setError(result.error.message ?? "That didn't work. Please try again.");
                return;
            }

            navigate("/");
        } catch {
            setError("Something went wrong. Please try again.");
        } finally {
            setBusy(false);
        }
    }

    return (
        <section className="mx-auto max-w-md px-6 pt-16 pb-20">
            <p className="mb-4 text-[0.8rem] uppercase tracking-[0.15em] text-accent">
                {isSignup ? "Join Luma" : "Welcome back"}
            </p>

            <h1 className="mb-2 font-heading text-[1.75rem] font-bold">
                {isSignup ? "Create an account" : "Sign in"}
            </h1>

            <p className="text-ink-soft">
                {isSignup
                    ? "It takes less than a minute."
                    : "Sign in to continue to your account."}
            </p>

            <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-5">
                {isSignup && (
                    <Field label="Name" name="name" type="text" autoComplete="name" required />
                )}

                <Field label="Email" name="email" type="email" autoComplete="email" required />

                <Field
                    label="Password"
                    name="password"
                    type="password"
                    autoComplete={isSignup ? "new-password" : "current-password"}
                    minLength={8}
                    required
                    hint="At least 8 characters."
                />

                {error && (
                    <p role="alert" className="border border-accent bg-surface px-3.5 py-3 text-sm text-accent-dark">
                        {error}
                    </p>
                )}

                <button
                    type="submit"
                    disabled={busy}
                    className="mt-2 rounded-[3px] bg-accent px-[1.7rem] py-[0.85rem] text-[0.9rem] font-semibold tracking-[0.1em] uppercase text-button-text transition hover:bg-accent-dark disabled:cursor-not-allowed disabled:opacity-50"
                >
                    {busy ? "One moment..." : isSignup ? "Create account" : "Sign in"}
                </button>
            </form>

            <p className="mt-6 text-center text-sm text-ink-soft">
                {isSignup ? (
                    <>Already have an account? <Link to="/login" className="text-accent underline">Sign in</Link></>
                ) : (
                    <>New here? <Link to="/signup" className="text-accent underline">Create an account</Link></>
                )}
            </p>
        </section>
    );
}

// a labelled input, matching the booking form's style
function Field({ label, name, hint, ...inputProps }) {
    const hintId = hint ? `${name}-hint` : undefined;

    return (
        <div className="flex flex-col gap-1.5">
            <label htmlFor={name} className="text-xs uppercase tracking-[0.1em] text-ink-soft">
                {label}
            </label>
            <input
                id={name}
                name={name}
                aria-describedby={hintId}
                className="w-full border border-line bg-surface px-3.5 py-3 text-[0.95rem] text-ink rounded-none focus:outline-none focus:border-accent"
                {...inputProps}
            />
            {hint && (
                <p id={hintId} className="text-xs text-ink-soft">
                    {hint}
                </p>
            )}
        </div>
    );
}
