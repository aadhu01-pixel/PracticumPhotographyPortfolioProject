import { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router";
import { formatPrice } from "../lib/format";

// how many times to check, and how long to wait between checks
const MAX_CHECKS = 6;
const CHECK_DELAY_MS = 2000;

// Stripe sends the visitor here after paying: /checkout/success?order=<order id>.
// Reaching this page doesn't prove anything - the status shown always comes from the server,
// where only the Stripe webhook can mark an order "paid".
export function CheckoutSuccess() {
    const [searchParams] = useSearchParams();
    const orderId = searchParams.get("order");

    const [order, setOrder] = useState(null);
    const [error, setError] = useState(null);
    const [gaveUp, setGaveUp] = useState(false);

    useEffect(() => {
        if (!orderId) return;

        // set to true when the page closes, so we stop checking
        let stopped = false;

        async function checkOrder() {
            // the webhook can arrive a moment after the redirect, so ask a few times
            for (let check = 1; check <= MAX_CHECKS; check++) {
                try {
                    const response = await fetch(`/api/orders/${orderId}`);
                    if (stopped) return;
                    if (response.status === 401) {
                        setError("Please sign in to see your order.");
                        return;
                    }
                    if (!response.ok) {
                        setError("We couldn't find that order.");
                        return;
                    }

                    const data = await response.json();
                    if (stopped) return;
                    setOrder(data);
                    if (data.status === "paid") return;
                } catch (err) {
                    console.error("Failed to load order", err);
                    if (!stopped) setError("We couldn't check your order. Please refresh the page.");
                    return;
                }

                await new Promise((resolve) => setTimeout(resolve, CHECK_DELAY_MS));
                if (stopped) return;
            }
            setGaveUp(true);
        }
        checkOrder();

        return () => {
            stopped = true;
        };
    }, [orderId]);

    let heading;
    let message;
    if (!orderId) {
        heading = "No order to show";
        message = "This page shows an order after checkout.";
    } else if (error) {
        heading = "Something went wrong";
        message = error;
    } else if (order?.status === "paid") {
        heading = "Payment confirmed";
        message = "Thank you! Your session is booked. We'll be in touch by email to arrange the details.";
    } else if (gaveUp) {
        heading = "Still confirming your payment";
        message = "We haven't received confirmation from Stripe yet. If you completed the payment, refresh this page in a minute.";
    } else {
        heading = "Confirming your payment...";
        message = "This usually takes a few seconds.";
    }

    return (
        <section className="mx-auto max-w-xl px-6 pt-16 pb-20">
            <p className="mb-4 text-[0.8rem] uppercase tracking-[0.15em] text-accent">
                Checkout
            </p>

            <h1 className="mb-2 font-heading text-[1.75rem] font-bold">{heading}</h1>

            <p role="status" className="text-ink-soft">{message}</p>

            {order && !error && (
                <dl className="mt-8 grid gap-5 border-t border-line pt-6">
                    {order.items.map((item) => (
                        <div key={item.title}>
                            <dt className="text-xs uppercase tracking-[0.1em] text-ink-soft">Session</dt>
                            <dd className="mt-1">{item.title}</dd>
                        </div>
                    ))}
                    <div>
                        <dt className="text-xs uppercase tracking-[0.1em] text-ink-soft">Total</dt>
                        <dd className="mt-1">{formatPrice(order.totalCents)}</dd>
                    </div>
                    <div>
                        <dt className="text-xs uppercase tracking-[0.1em] text-ink-soft">Status</dt>
                        <dd className="mt-1 capitalize">{order.status}</dd>
                    </div>
                    <div>
                        <dt className="text-xs uppercase tracking-[0.1em] text-ink-soft">Order number</dt>
                        <dd className="mt-1 break-all text-sm">{order.id}</dd>
                    </div>
                </dl>
            )}

            <Link to="/" className="mt-8 inline-block text-accent underline">
                Back to home
            </Link>
        </section>
    );
}
