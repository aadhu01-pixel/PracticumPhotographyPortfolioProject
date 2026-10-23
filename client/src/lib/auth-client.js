import { createAuthClient } from "better-auth/react";

// the API is reached through the same origin (Vite proxy in dev, Vercel rewrite in production)
export const authClient = createAuthClient({
    baseURL: window.location.origin,
});

export const { signIn, signUp, signOut, useSession } = authClient;
